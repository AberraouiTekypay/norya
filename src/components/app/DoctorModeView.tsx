"use client";

import React, { useState } from "react";
import { useHealth } from "@/context/HealthContext";
import {
  Printer,
  Copy,
  Check,
  Stethoscope,
  Plus,
  HelpCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export const DoctorModeView: React.FC = () => {
  const { doctorSummary, user } = useHealth();
  const [copied, setCopied] = useState(false);
  const [customQuestion, setCustomQuestion] = useState("");
  const [questionsList, setQuestionsList] = useState(
    doctorSummary.suggestedQuestionsToDiscuss
  );

  const handleCopy = () => {
    const textToCopy = `
NORYA HEALTH BRIEF: ${doctorSummary.userProfile.fullName} (Age ${doctorSummary.userProfile.age}, ${doctorSummary.userProfile.country})
Generated on: ${doctorSummary.generatedAt}

REASON FOR CONSULTATION:
${doctorSummary.reasonForConsultation}

KEY VITALS & TRENDS:
${doctorSummary.keyVitalTrends.map((v) => `• ${v.metric}: ${v.value} (${v.trend})`).join("\n")}

LATEST LAB BIOMARKERS:
${doctorSummary.latestAbnormalBiomarkers.map((b) => `• ${b.marker}: ${b.value} (Ref: ${b.refRange}) - ${b.note}`).join("\n")}

ACTIVE MEDICATIONS:
${doctorSummary.activeMedications.join(", ")}

LIFESTYLE CONTEXT:
${doctorSummary.lifestyleSummary}

PATIENT QUESTIONS TO DISCUSS:
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
    setQuestionsList((prev) => [...prev, customQuestion]);
    setCustomQuestion("");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
            Clinical Collaboration Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
            Prepare for My Doctor
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            A concise, 1-page structured consultation brief for your upcoming medical visit.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#0F172A]/10 text-xs font-semibold text-[#0F172A] hover:bg-[#FAFAF8] shadow-2xs transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-[#16A34A]" /> : <Copy className="w-4 h-4 text-[#14B8A6]" />}
            <span>{copied ? "Copied to Clipboard" : "Copy Text"}</span>
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

      {/* Structured 1-Page Medical Document Sheet */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#0F172A]/10 shadow-card space-y-6 max-w-4xl mx-auto print:shadow-none print:border-none print:p-0">
        
        {/* Document Header */}
        <div className="pb-6 border-b border-[#0F172A]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#64748B] tracking-wider">
              Norya Clinical Collaboration Brief • getnorya.com
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A]">
              Patient: {doctorSummary.userProfile.fullName}
            </h2>
            <div className="text-xs text-[#64748B] mt-0.5">
              Age {doctorSummary.userProfile.age} • Female • Madrid, {doctorSummary.userProfile.country} • Generated: {doctorSummary.generatedAt}
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-mono text-[#0F766E] bg-[#CCFBF1] px-2.5 py-1 rounded-md font-bold">
              Primary Care Copy
            </span>
          </div>
        </div>

        {/* Section 1: Reason for Consultation */}
        <div className="space-y-1.5 text-xs">
          <span className="font-bold text-[#0F172A] uppercase tracking-wider text-[11px]">
            1. Reason for Review / Primary Concern
          </span>
          <div className="p-3.5 rounded-xl bg-[#FAFAF8] border border-[#0F172A]/5 text-[#0F172A] leading-relaxed">
            {doctorSummary.reasonForConsultation}
          </div>
        </div>

        {/* Section 2: Key Vitals & Trends */}
        <div className="space-y-2 text-xs">
          <span className="font-bold text-[#0F172A] uppercase tracking-wider text-[11px]">
            2. Verified Vitals & 90-Day Trends
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {doctorSummary.keyVitalTrends.map((v, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[#FAFAF8] border border-[#0F172A]/5 space-y-0.5">
                <div className="text-[#64748B] text-[11px] font-semibold">{v.metric}</div>
                <div className="text-sm font-bold text-[#0F172A] font-mono">{v.value}</div>
                <div className="text-[11px] text-[#0F766E]">{v.trend}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Latest Biomarkers */}
        <div className="space-y-2 text-xs">
          <span className="font-bold text-[#0F172A] uppercase tracking-wider text-[11px]">
            3. Latest Relevant Biomarkers (Laboratorios Echevarne)
          </span>
          <div className="space-y-2">
            {doctorSummary.latestAbnormalBiomarkers.map((b, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[#FAFAF8] border border-[#0F172A]/5 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div>
                  <div className="font-bold text-[#0F172A]">{b.marker}</div>
                  <div className="text-[11px] text-[#64748B]">{b.note}</div>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-xs text-[#0F172A]">{b.value}</span>
                  <span className="text-[11px] text-[#64748B] ml-2">(Ref: {b.refRange})</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Current Medications & Background */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-[#FAFAF8] border border-[#0F172A]/5 space-y-1">
            <span className="font-bold uppercase tracking-wider text-[10px] text-[#64748B]">Active Medications</span>
            <div className="text-[#0F172A] font-medium">{doctorSummary.activeMedications.join(", ")}</div>
          </div>
          <div className="p-3.5 rounded-xl bg-[#FAFAF8] border border-[#0F172A]/5 space-y-1">
            <span className="font-bold uppercase tracking-wider text-[10px] text-[#64748B]">Family History</span>
            <div className="text-[#0F172A] font-medium">{user.familyHistory.join(", ")}</div>
          </div>
        </div>

        {/* Section 5: Questions Prepared to Discuss */}
        <div className="space-y-2 text-xs">
          <span className="font-bold text-[#0F172A] uppercase tracking-wider text-[11px]">
            4. Structured Questions for Clinical Discussion
          </span>
          <div className="p-4 rounded-xl bg-[#CCFBF1]/30 border border-[#14B8A6]/20 space-y-2 text-[#0F766E]">
            {questionsList.map((q, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="font-bold">{idx + 1}.</span>
                <span>{q}</span>
              </div>
            ))}
          </div>

          {/* Add custom question */}
          <form onSubmit={handleAddQuestion} className="flex gap-2 pt-2">
            <input
              type="text"
              placeholder="Add another question for your doctor..."
              value={customQuestion}
              onChange={(e) => setCustomQuestion(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-xl border border-[#0F172A]/10 text-xs text-[#0F172A]"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#0F172A] text-white text-xs font-semibold hover:bg-[#1E293B]"
            >
              Add Question
            </button>
          </form>
        </div>

        {/* Document Footer Notice */}
        <div className="pt-4 border-t border-[#0F172A]/10 text-[10px] text-[#64748B] text-center">
          Summary generated via Norya Personal Health OS. Intended solely to facilitate patient-physician discussion. Not a diagnosis or clinical prescription.
        </div>

      </div>

    </div>
  );
};
