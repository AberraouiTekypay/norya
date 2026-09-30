"use client";

import React, { useState } from "react";
import { useHealth } from "@/context/HealthContext";
import {
  Printer,
  Copy,
  Check,
  Database,
} from "lucide-react";

export const DoctorModeView: React.FC = () => {
  const {
    doctorSummary,
    user,
    familyMembers,
    activeFamilyMemberId,
    setActiveFamilyMemberId,
    addDoctorQuestion,
    bloodPressureLogs,
    score2Profile,
    setIsFhirModalOpen,
  } = useHealth();
  const [copied, setCopied] = useState(false);
  const [customQuestion, setCustomQuestion] = useState("");

  const activeMember =
    familyMembers.find((m) => m.id === activeFamilyMemberId) || familyMembers[0];
  const isSelf = activeMember.relationship === "self";

  // Calculate 7-day BP protocol average if self
  const validBpLogs = bloodPressureLogs.filter((l) => l.dayIndex > 1);
  const avgSystolic = validBpLogs.length
    ? Math.round(validBpLogs.reduce((acc, l) => acc + l.systolic, 0) / validBpLogs.length)
    : user.bloodPressureSystolic;
  const avgDiastolic = validBpLogs.length
    ? Math.round(validBpLogs.reduce((acc, l) => acc + l.diastolic, 0) / validBpLogs.length)
    : user.bloodPressureDiastolic;

  const questionsList = isSelf
    ? doctorSummary.suggestedQuestionsToDiscuss
    : activeMember.doctorQuestions;

  const handleCopy = () => {
    const textToCopy = `
NORYA CLINICAL CONSULTATION BRIEF
Document ID: NOR-2026-9042 • getnorya.com
Patient: ${activeMember.name} (Age ${activeMember.age}, ${activeMember.country})
Role: ${activeMember.relationLabel}
Generated: ${doctorSummary.generatedAt}

1. REASON FOR REVIEW / PRIMARY CONCERN:
${isSelf ? doctorSummary.reasonForConsultation : activeMember.primaryFocus}

2. VERIFIED VITALS & 90-DAY TELEMETRY:
• Standardized Home Blood Pressure: ${avgSystolic}/${avgDiastolic} mmHg (Protocol Mean)
• Resting Heart Rate: ${user.restingHeartRateBpm} bpm
• Body Weight: ${user.weightKg} kg (-3.7 kg in 6mo)
• 10-Year ESC SCORE2 CVD Risk: ${score2Profile.baselineRiskPercent}% (${score2Profile.riskCategory})

3. LATEST LABORATORY BIOMARKERS (Echevarne / Casablanca):
${doctorSummary.latestAbnormalBiomarkers.map((b) => `• ${b.marker}: ${b.value} (Ref: ${b.refRange}) - ${b.note}`).join("\n")}

4. ACTIVE MEDICATIONS & CONDITIONS:
• Active Regimen: ${activeMember.medications.length ? activeMember.medications.map((m) => `${m.name} ${m.dosage} (${m.scheduleLabel})`).join(", ") : "None (Lifestyle trial active)"}
• Known Conditions: ${activeMember.conditions.join(", ")}

5. QUESTIONS PREPARED FOR PHYSICIAN DISCUSSION:
${questionsList.map((q, idx) => `${idx + 1}. ${q}`).join("\n")}
    `.trim();

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;
    addDoctorQuestion(customQuestion);
    setCustomQuestion("");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header (Hidden on Print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
            Clinical Collaboration Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
            Prepare for My Doctor
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            A concise, 1-page standardized consultation brief formatted for rapid clinical review.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsFhirModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAFAF8] border border-[#0F172A]/10 text-xs font-semibold text-[#0F172A] hover:bg-[#F1F5F9] shadow-2xs transition-colors"
          >
            <Database className="w-4 h-4 text-[#14B8A6]" />
            <span>Export FHIR R4</span>
          </button>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#0F172A]/10 text-xs font-semibold text-[#0F172A] hover:bg-[#FAFAF8] shadow-2xs transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-[#16A34A]" /> : <Copy className="w-4 h-4 text-[#14B8A6]" />}
            <span>{copied ? "Copied" : "Copy Brief"}</span>
          </button>
          
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F172A] text-white text-xs font-semibold hover:bg-[#1E293B] shadow-xs transition-colors"
          >
            <Printer className="w-4 h-4 text-[#14B8A6]" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Profile Switcher for Family Coordination (Hidden on Print) */}
      <div className="p-3.5 rounded-2xl bg-white border border-[#0F172A]/8 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-3 print:hidden">
        <div className="text-xs text-[#64748B]">
          Generating Consultation Brief for:{" "}
          <strong className="text-[#0F172A]">{activeMember.name}</strong> ({activeMember.relationLabel})
        </div>
        <div className="flex items-center gap-1.5">
          {familyMembers.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveFamilyMemberId(m.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                m.id === activeMember.id
                  ? "bg-[#0F172A] text-white shadow-xs"
                  : "bg-[#FAFAF8] text-[#64748B] hover:text-[#0F172A] border border-[#0F172A]/5"
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>
      </div>

      {/* Structured 1-Page Medical Document Sheet (Print Optimized) */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#0F172A]/10 shadow-card space-y-6 max-w-4xl mx-auto print:shadow-none print:border-none print:p-0 print:m-0 print:max-w-none text-left">
        
        {/* Document Header & Clinical Metadata */}
        <div className="pb-6 border-b-2 border-[#0F172A] flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-[#0F172A] text-[#14B8A6] font-bold text-xs flex items-center justify-center font-mono">
                N
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                Norya Health OS • Clinical Consultation Brief
              </span>
            </div>
            
            <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] pt-1">
              Patient: {activeMember.name}
            </h2>

            <div className="text-xs text-[#64748B] flex flex-wrap gap-x-4 gap-y-0.5">
              <span><strong>Age:</strong> {activeMember.age}</span>
              <span><strong>Sex:</strong> {activeMember.gender === "female" ? "Female" : "Male"}</span>
              <span><strong>Location:</strong> {activeMember.city}, {activeMember.country}</span>
              <span><strong>Doc ID:</strong> NOR-2026-9042</span>
            </div>
          </div>

          {/* Right Header Badges */}
          <div className="flex sm:flex-col items-start sm:items-end justify-between sm:justify-start gap-2">
            <span className="text-xs font-mono font-bold text-[#0F766E] bg-[#CCFBF1] px-3 py-1 rounded-lg border border-[#14B8A6]/20">
              Primary Care / Specialist Copy
            </span>
            <span className="text-[10px] text-[#64748B] font-mono">
              Generated: {doctorSummary.generatedAt}
            </span>
          </div>
        </div>

        {/* Section 1: Chief Clinical Reason & Consultation Goal */}
        <div className="space-y-1.5 text-xs">
          <div className="font-bold text-[#0F172A] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <span className="w-4 h-4 rounded bg-[#0F172A] text-white flex items-center justify-center text-[10px]">1</span>
            <span>Reason for Review &amp; Consultation Goals</span>
          </div>
          <div className="p-4 rounded-xl bg-[#FAFAF8] border border-[#0F172A]/8 text-[#0F172A] leading-relaxed">
            {isSelf ? doctorSummary.reasonForConsultation : activeMember.primaryFocus}
          </div>
        </div>

        {/* Section 2: Verified Vitals & 90-Day Telemetry */}
        <div className="space-y-2 text-xs">
          <div className="font-bold text-[#0F172A] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <span className="w-4 h-4 rounded bg-[#0F172A] text-white flex items-center justify-center text-[10px]">2</span>
            <span>Verified Vitals &amp; Standardized 7-Day Home Telemetry</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#0F172A]/8 space-y-0.5">
              <div className="text-[#64748B] text-[10px] uppercase font-semibold">Standardized Home BP</div>
              <div className="text-sm font-bold font-mono text-[#0F172A]">{avgSystolic}/{avgDiastolic} mmHg</div>
              <div className="text-[10px] text-[#B45309] font-medium">ESC Protocol Mean (Day 2-7)</div>
            </div>

            <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#0F172A]/8 space-y-0.5">
              <div className="text-[#64748B] text-[10px] uppercase font-semibold">Resting Heart Rate</div>
              <div className="text-sm font-bold font-mono text-[#0F172A]">{user.restingHeartRateBpm} bpm</div>
              <div className="text-[10px] text-[#16A34A] font-medium">-5 bpm vs Jan Baseline</div>
            </div>

            <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#0F172A]/8 space-y-0.5">
              <div className="text-[#64748B] text-[10px] uppercase font-semibold">Body Weight</div>
              <div className="text-sm font-bold font-mono text-[#0F172A]">{user.weightKg} kg</div>
              <div className="text-[10px] text-[#16A34A] font-medium">-3.7 kg in 6mo (86.1 ➔ 82.4)</div>
            </div>

            <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#0F172A]/8 space-y-0.5">
              <div className="text-[#64748B] text-[10px] uppercase font-semibold">ESC SCORE2 10-Yr Risk</div>
              <div className="text-sm font-bold font-mono text-[#0F172A]">{score2Profile.baselineRiskPercent}%</div>
              <div className="text-[10px] text-[#B45309] font-medium">Moderate (Target: 2.1% Low)</div>
            </div>
          </div>
        </div>

        {/* Section 3: Latest Laboratory Biomarkers */}
        <div className="space-y-2 text-xs">
          <div className="font-bold text-[#0F172A] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <span className="w-4 h-4 rounded bg-[#0F172A] text-white flex items-center justify-center text-[10px]">3</span>
            <span>Latest Accredited Laboratory Biomarkers</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {doctorSummary.latestAbnormalBiomarkers.map((b, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-[#FAFAF8] border border-[#0F172A]/8 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#0F172A]">{b.marker}</span>
                  <span className="font-mono font-bold text-[#0F172A]">{b.value}</span>
                </div>
                <div className="text-[10px] text-[#64748B]">Ref: {b.refRange}</div>
                <div className="text-[10px] text-[#0F766E] font-medium">{b.note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Current Medications & Background */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-[#FAFAF8] border border-[#0F172A]/8 space-y-1.5">
            <span className="font-bold uppercase tracking-wider text-[10px] text-[#64748B]">
              Active Prescription Regimen
            </span>
            <div className="text-[#0F172A] font-medium leading-relaxed">
              {activeMember.medications.length
                ? activeMember.medications.map((m) => `${m.name} ${m.dosage} (${m.scheduleLabel})`).join("; ")
                : "No pharmaceutical therapy. Currently managed through standardized lifestyle trial."}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#FAFAF8] border border-[#0F172A]/8 space-y-1.5">
            <span className="font-bold uppercase tracking-wider text-[10px] text-[#64748B]">
              Known Conditions &amp; Family History
            </span>
            <div className="text-[#0F172A] font-medium leading-relaxed">
              {activeMember.conditions.join(", ")}
              {isSelf && ` • Family Risk: ${user.familyHistory.join(", ")}`}
            </div>
          </div>
        </div>

        {/* Section 5: Specific Evidence-Based Questions for Discussion */}
        <div className="space-y-2 text-xs">
          <div className="font-bold text-[#0F172A] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <span className="w-4 h-4 rounded bg-[#0F172A] text-white flex items-center justify-center text-[10px]">4</span>
            <span>Structured Consultation Questions Prepared by Patient</span>
          </div>

          <div className="p-4 rounded-xl bg-[#CCFBF1]/30 border border-[#14B8A6]/20 space-y-2.5 text-[#0F766E]">
            {questionsList.map((q, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <span className="font-bold font-mono">Q{idx + 1}.</span>
                <span className="leading-relaxed text-[#0F172A]">{q}</span>
              </div>
            ))}
          </div>

          {/* Add custom question (hidden on print) */}
          <form onSubmit={handleAddQuestion} className="flex gap-2 pt-2 print:hidden">
            <input
              type="text"
              placeholder="Add another clinical question to this brief..."
              value={customQuestion}
              onChange={(e) => setCustomQuestion(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-[#0F172A]/10 text-xs text-[#0F172A] focus:outline-none focus:border-[#14B8A6]"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-[#0F172A] text-white text-xs font-semibold hover:bg-[#1E293B] shrink-0"
            >
              Add Question
            </button>
          </form>
        </div>

        {/* Section 6: Physician Assessment & Formal Sign-Off */}
        <div className="pt-6 border-t border-[#0F172A]/10 space-y-4">
          <div className="font-bold text-[#0F172A] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <span className="w-4 h-4 rounded bg-[#0F172A] text-white flex items-center justify-center text-[10px]">5</span>
            <span>Physician Clinical Assessment, Orders &amp; Sign-Off</span>
          </div>

          <div className="h-24 rounded-xl border border-dashed border-[#0F172A]/20 bg-[#FAFAF8] p-3 text-[11px] text-[#94A3B8]">
            Clinical notes, therapeutic adjustments, lab orders, or referral plan...
          </div>

          <div className="grid grid-cols-2 gap-8 pt-4 text-xs">
            <div className="border-t border-[#0F172A]/30 pt-1.5">
              <span className="text-[10px] text-[#64748B] uppercase font-semibold block">
                Physician Signature &amp; Collegiate / License #
              </span>
            </div>
            <div className="border-t border-[#0F172A]/30 pt-1.5">
              <span className="text-[10px] text-[#64748B] uppercase font-semibold block">
                Date &amp; Next Clinical Review Window
              </span>
            </div>
          </div>
        </div>

        {/* Document Footer Notice */}
        <div className="pt-4 border-t border-[#0F172A]/10 text-[10px] text-[#64748B] text-center leading-normal">
          Norya Personal Health Operating System • getnorya.com • Produced to facilitate patient-physician shared decision-making. Not a diagnostic prescription. An EM300.co Company.
        </div>

      </div>

    </div>
  );
};
