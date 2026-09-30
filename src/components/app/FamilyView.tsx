"use client";

import React, { useState } from "react";
import { useHealth } from "@/context/HealthContext";
import {
  Pill,
  Calendar,
  PhoneCall,
  Plus,
  Stethoscope,
  ChevronRight,
  UserCheck,
  Check,
} from "lucide-react";

export const FamilyView: React.FC = () => {
  const {
    familyMembers,
    activeFamilyMemberId,
    setActiveFamilyMemberId,
    toggleFamilyMedication,
    addFamilyDoctorQuestion,
    addDoctorQuestion,
    setActiveTab,
  } = useHealth();

  const [newQuestionText, setNewQuestionText] = useState("");
  const [syncedQuestions, setSyncedQuestions] = useState<Record<string, boolean>>({});

  const activeMember =
    familyMembers.find((m) => m.id === activeFamilyMemberId) || familyMembers[0];

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;
    addFamilyDoctorQuestion(activeMember.id, newQuestionText.trim());
    setNewQuestionText("");
  };

  const handleSyncToDoctorMode = (question: string, index: number) => {
    const key = `${activeMember.id}-${index}`;
    addDoctorQuestion(`[Family - ${activeMember.name} (${activeMember.relationLabel})]: ${question}`);
    setSyncedQuestions((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setSyncedQuestions((prev) => ({ ...prev, [key]: false }));
    }, 2500);
  };

  // Medication summary counts
  const totalMedsAcrossFamily = familyMembers.reduce(
    (acc, m) => acc + m.medications.length,
    0
  );
  const takenMedsAcrossFamily = familyMembers.reduce(
    (acc, m) => acc + m.medications.filter((med) => med.takenToday).length,
    0
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
            Multi-Generation Care Coordination
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
            Circle of Care
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Manage medications, screening timelines, and clinical appointments for your dependents.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-[#CCFBF1]/50 border border-[#14B8A6]/20 text-xs font-semibold text-[#0F766E] flex items-center gap-2">
            <Pill className="w-4 h-4 text-[#14B8A6]" />
            <span>
              {takenMedsAcrossFamily} of {totalMedsAcrossFamily} Meds Taken Today
            </span>
          </div>

          <button
            onClick={() => setActiveTab("doctor")}
            className="px-3.5 py-2.5 rounded-2xl bg-[#0F172A] text-white hover:bg-[#1E293B] text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-soft"
          >
            <Stethoscope className="w-3.5 h-3.5 text-[#14B8A6]" />
            <span className="hidden sm:inline">Doctor Mode</span>
          </button>
        </div>
      </div>

      {/* Profile Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {familyMembers.map((member) => {
          const isActive = member.id === activeMember.id;
          const medsCount = member.medications.length;
          const medsTaken = member.medications.filter((m) => m.takenToday).length;

          return (
            <button
              key={member.id}
              onClick={() => setActiveFamilyMemberId(member.id)}
              className={`p-4 rounded-3xl text-left border transition-all flex items-start gap-3.5 ${
                isActive
                  ? "bg-white border-[#14B8A6] shadow-md ring-2 ring-[#14B8A6]/20"
                  : "bg-white border-[#0F172A]/8 hover:border-[#14B8A6]/40 shadow-soft"
              }`}
            >
              <div
                className={`w-11 h-11 rounded-2xl ${member.avatarBg} text-white font-bold text-base flex items-center justify-center shrink-0 shadow-xs`}
              >
                {member.avatarInitial}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#0F172A] truncate">
                    {member.name}
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FAFAF8] border border-[#0F172A]/5 text-[#64748B]">
                    {member.country === "Morocco" ? "🇲🇦 MA" : "🇪🇸 ES"}
                  </span>
                </div>

                <div className="text-[11px] text-[#64748B] pt-0.5">
                  {member.relationLabel} • Age {member.age}
                </div>

                <div className="mt-2 flex items-center gap-2 text-[10px] font-medium">
                  {medsCount > 0 ? (
                    <span
                      className={`px-2 py-0.5 rounded-md ${
                        medsTaken === medsCount
                          ? "bg-[#16A34A]/10 text-[#16A34A]"
                          : "bg-[#F5C76A]/20 text-[#B45309]"
                      }`}
                    >
                      {medsTaken}/{medsCount} meds taken
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-md bg-[#F1F5F9] text-[#64748B]">
                      Lifestyle monitoring
                    </span>
                  )}
                  <span className="text-[#0F766E]">
                    {member.upcomingScreenings.length} screenings
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Member Cockpit */}
      <div className="space-y-6">
        
        {/* Banner with Overview */}
        <div className="p-6 rounded-3xl bg-white border border-[#0F172A]/8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div
              className={`w-14 h-14 rounded-2xl ${activeMember.avatarBg} text-white font-bold text-2xl flex items-center justify-center shrink-0 shadow-soft`}
            >
              {activeMember.avatarInitial}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-[#0F172A]">
                  {activeMember.name}
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#14B8A6]/10 text-[#0F766E] font-medium">
                  {activeMember.relationLabel}
                </span>
                <span className="text-xs text-[#64748B]">
                  ({activeMember.city}, {activeMember.country})
                </span>
              </div>

              <p className="text-xs text-[#64748B] max-w-xl leading-relaxed">
                <strong>Primary Focus:</strong> {activeMember.primaryFocus}
              </p>

              <div className="flex items-center gap-1.5 pt-1 flex-wrap">
                {activeMember.conditions.map((cond, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#F1F5F9] text-[#0F172A]"
                  >
                    • {cond}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Vital snippet & emergency contact */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 border-t md:border-t-0 md:border-l border-[#0F172A]/8 pt-4 md:pt-0 md:pl-6">
            <div className="p-3 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 text-center sm:text-left">
              <div className="text-[10px] uppercase font-semibold text-[#64748B]">
                {activeMember.vitalSnippet.label}
              </div>
              <div className="text-base font-bold font-mono text-[#0F172A] mt-0.5">
                {activeMember.vitalSnippet.value}
              </div>
              <span
                className={`text-[10px] font-semibold ${
                  activeMember.vitalSnippet.status === "positive"
                    ? "text-[#16A34A]"
                    : activeMember.vitalSnippet.status === "warning"
                    ? "text-[#B45309]"
                    : "text-[#0284C7]"
                }`}
              >
                ● Monitored Status
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 text-xs text-[#64748B] space-y-1">
              <div className="text-[10px] uppercase font-semibold text-[#0F172A] flex items-center gap-1">
                <PhoneCall className="w-3 h-3 text-[#14B8A6]" />
                Emergency Contact
              </div>
              <div className="font-bold text-[#0F172A] text-[11px]">
                {activeMember.emergencyContact.name}
              </div>
              <div className="text-[11px] font-mono text-[#0F766E]">
                {activeMember.emergencyContact.phone}
              </div>
              <div className="text-[10px] text-[#64748B]">
                {activeMember.emergencyContact.relation}
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Grid: Medications & Screenings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Medications Checklist */}
          <div className="p-6 rounded-3xl bg-white border border-[#0F172A]/8 shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#0F172A]/5">
              <div className="flex items-center gap-2">
                <Pill className="w-4 h-4 text-[#14B8A6]" />
                <h3 className="text-sm font-bold text-[#0F172A]">
                  Daily Medication Schedule
                </h3>
              </div>
              <span className="text-xs text-[#64748B]">
                {activeMember.medications.filter((m) => m.takenToday).length} of{" "}
                {activeMember.medications.length} confirmed today
              </span>
            </div>

            {activeMember.medications.length === 0 ? (
              <div className="p-8 rounded-2xl bg-[#FAFAF8] text-center space-y-2 border border-[#0F172A]/5">
                <UserCheck className="w-8 h-8 text-[#14B8A6] mx-auto opacity-70" />
                <p className="text-xs font-semibold text-[#0F172A]">
                  No Active Prescription Regimen
                </p>
                <p className="text-[11px] text-[#64748B] max-w-xs mx-auto">
                  {activeMember.name} is currently managed through evidence-based lifestyle modification and preventive screening.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {activeMember.medications.map((med) => (
                  <div
                    key={med.id}
                    onClick={() => toggleFamilyMedication(activeMember.id, med.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      med.takenToday
                        ? "bg-[#16A34A]/5 border-[#16A34A]/20"
                        : "bg-[#FAFAF8] border-[#0F172A]/8 hover:border-[#14B8A6]/40"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                          med.takenToday
                            ? "bg-[#16A34A] text-white"
                            : "border-2 border-[#CBD5E1] bg-white"
                        }`}
                      >
                        {med.takenToday && <Check className="w-4 h-4 stroke-[3]" />}
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-bold ${
                              med.takenToday
                                ? "text-[#16A34A] line-through"
                                : "text-[#0F172A]"
                            }`}
                          >
                            {med.name} {med.dosage}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-white text-[#64748B] border border-[#0F172A]/5">
                            {med.scheduleLabel}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#64748B]">
                          Indications: {med.prescribedFor}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-semibold px-2 py-1 rounded-md shrink-0 ${
                        med.takenToday
                          ? "bg-[#16A34A]/10 text-[#16A34A]"
                          : "bg-[#F5C76A]/20 text-[#B45309]"
                      }`}
                    >
                      {med.takenToday ? "Taken Today" : "Pending Dose"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upcoming Screenings & Clinical Timeline */}
          <div className="p-6 rounded-3xl bg-white border border-[#0F172A]/8 shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#0F172A]/5">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#14B8A6]" />
                <h3 className="text-sm font-bold text-[#0F172A]">
                  Preventive Screening Roadmap
                </h3>
              </div>
              <span className="text-xs text-[#0F766E] font-medium">
                {activeMember.upcomingScreenings.length} tracked items
              </span>
            </div>

            <div className="space-y-3">
              {activeMember.upcomingScreenings.map((screening) => (
                <div
                  key={screening.id}
                  className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 space-y-2 hover:border-[#14B8A6]/30 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs font-bold text-[#0F172A]">
                      {screening.title}
                    </h4>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        screening.status === "due"
                          ? "bg-[#F5C76A]/20 text-[#B45309]"
                          : screening.status === "scheduled"
                          ? "bg-[#14B8A6]/10 text-[#0F766E]"
                          : "bg-[#F1F5F9] text-[#64748B]"
                      }`}
                    >
                      {screening.dueDate}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#64748B] leading-relaxed">
                    {screening.notes}
                  </p>

                  <div className="flex items-center justify-between pt-1 text-[10px] text-[#64748B]">
                    <span>📍 Provider: {screening.provider}</span>
                    <span className="font-semibold text-[#0F172A]">
                      {screening.importance === "high" ? "Priority Action" : "Routine"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Doctor Questions & Care Advocacy */}
        <div className="p-6 rounded-3xl bg-white border border-[#0F172A]/8 shadow-soft space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#0F172A]/5">
            <div>
              <h3 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-[#14B8A6]" />
                Questions for {activeMember.name}'s Next Medical Consultation
              </h3>
              <p className="text-xs text-[#64748B]">
                Prepared clinical questions to ensure doctors address the critical data points during visits.
              </p>
            </div>
            
            <button
              onClick={() => setActiveTab("doctor")}
              className="text-xs text-[#0F766E] hover:underline font-semibold flex items-center gap-1 self-start sm:self-auto"
            >
              <span>View Full Consultation Brief</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* List of Questions */}
          <div className="space-y-2">
            {activeMember.doctorQuestions.map((q, idx) => {
              const isSynced = syncedQuestions[`${activeMember.id}-${idx}`];
              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="font-mono text-[#14B8A6] font-bold text-xs mt-0.5">
                      Q{idx + 1}.
                    </span>
                    <span className="text-[#0F172A] leading-relaxed">{q}</span>
                  </div>

                  <button
                    onClick={() => handleSyncToDoctorMode(q, idx)}
                    disabled={isSynced}
                    className={`shrink-0 px-2.5 py-1 rounded-lg border text-[11px] font-medium transition-colors flex items-center gap-1 ${
                      isSynced
                        ? "bg-[#16A34A]/10 text-[#16A34A] border-[#16A34A]/20"
                        : "text-[#64748B] hover:text-[#0F172A] hover:bg-white border-[#0F172A]/10"
                    }`}
                    title="Copy into Sarah's main Doctor Consultation Brief"
                  >
                    {isSynced ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Attached to Brief</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3 h-3" />
                        <span>Add to Doctor Brief</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Add Question Form */}
          <form onSubmit={handleAddQuestion} className="flex gap-2 pt-2">
            <input
              type="text"
              value={newQuestionText}
              onChange={(e) => setNewQuestionText(e.target.value)}
              placeholder={`Add a question for ${activeMember.name}'s physician (e.g. dosage, refill, lab follow-up)...`}
              className="flex-1 px-4 py-2.5 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/10 text-xs text-[#0F172A] focus:outline-none focus:border-[#14B8A6]"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-2xl bg-[#0F172A] text-white hover:bg-[#1E293B] text-xs font-semibold shrink-0 transition-colors shadow-xs"
            >
              Add Question
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
