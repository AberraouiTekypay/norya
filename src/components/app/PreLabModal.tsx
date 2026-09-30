"use client";

import React, { useState } from "react";
import { useHealth } from "@/context/HealthContext";
import {
  X,
  Clock,
  CheckCircle2,
  Circle,
  AlertCircle,
  Droplets,
  Printer,
  ShieldAlert,
  Flame,
  Coffee,
  HelpCircle,
  Sparkles,
} from "lucide-react";

export const PreLabModal: React.FC = () => {
  const { isPreLabModalOpen, setIsPreLabModalOpen, preLabSteps, togglePreLabStep, user } =
    useHealth();
  const [activeTab, setActiveTab] = useState<"protocol" | "faq">("protocol");
  const [expandedRationale, setExpandedRationale] = useState<string | null>("prelab-1");

  if (!isPreLabModalOpen) return null;

  const completedCount = preLabSteps.filter((s) => s.checked).length;
  const readinessPercent = Math.round((completedCount / preLabSteps.length) * 100);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-[#0F172A]/10 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#0F172A] text-white flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#14B8A6]/20 border border-[#14B8A6]/30 flex items-center justify-center text-[#14B8A6]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold tracking-tight">
                  Pre-Lab Diagnostic Preparation Protocol
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  48h Countdown
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Eliminate pre-analytical errors before testing lipid panels, ApoB, HbA1c, hs-CRP, and metabolic markers.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsPreLabModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Readiness Bar */}
        <div className="px-5 sm:px-6 py-3.5 bg-[#F0FDFA] border-b border-[#14B8A6]/20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="text-xs font-bold text-[#0F766E]">
              Phlebotomy Readiness: {completedCount}/{preLabSteps.length} Steps
            </div>
            <div className="flex-1 max-w-xs h-2 bg-[#CCFBF1] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0F766E] rounded-full transition-all duration-300"
                style={{ width: `${readinessPercent}%` }}
              />
            </div>
            <span className="text-xs font-mono font-bold text-[#0F766E]">{readinessPercent}%</span>
          </div>

          <button
            onClick={handlePrint}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#14B8A6]/30 text-xs font-semibold text-[#0F766E] hover:bg-[#CCFBF1] transition-colors shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Pocket Ticket</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* Clinical Alert Box */}
          <div className="p-3.5 rounded-2xl bg-[#FFFBEB] border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Over 60% of lab errors occur in the pre-analytical phase:</span> Common mistakes like drinking black coffee, intense workouts 24h prior, or taking biotin cause false inflammation spikes and distorted lipid panels.
            </div>
          </div>

          {/* Interactive Steps List */}
          <div className="space-y-3">
            {preLabSteps.map((step) => {
              const isExpanded = expandedRationale === step.id;
              return (
                <div
                  key={step.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    step.checked
                      ? "bg-[#FAFAF8] border-[#14B8A6]/40"
                      : "bg-white border-[#0F172A]/10 hover:border-[#0F172A]/20"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <button
                      onClick={() => togglePreLabStep(step.id)}
                      className="flex items-start gap-3 text-left flex-1"
                    >
                      <div className="mt-0.5 shrink-0 text-[#14B8A6]">
                        {step.checked ? (
                          <CheckCircle2 className="w-5 h-5 text-[#16A34A] fill-[#DCFCE7]" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-300 hover:text-[#14B8A6]" />
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                            {step.timeLabel}
                          </span>
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                              step.criticality === "critical"
                                ? "bg-rose-50 text-rose-700"
                                : step.criticality === "recommended"
                                ? "bg-blue-50 text-blue-700"
                                : "bg-emerald-50 text-emerald-700"
                            }`}
                          >
                            {step.criticality === "critical"
                              ? "Critical Priority"
                              : step.criticality === "recommended"
                              ? "Recommended"
                              : "Best Practice"}
                          </span>
                        </div>

                        <h4
                          className={`text-sm font-bold ${
                            step.checked ? "text-[#64748B] line-through" : "text-[#0F172A]"
                          }`}
                        >
                          {step.title}
                        </h4>

                        <p className="text-xs text-[#475569] leading-relaxed">
                          {step.instruction}
                        </p>
                      </div>
                    </button>

                    <button
                      onClick={() => setExpandedRationale(isExpanded ? null : step.id)}
                      className="p-1 rounded-lg text-slate-400 hover:text-[#0F172A] hover:bg-slate-100 transition-colors shrink-0"
                      title="Why this matters clinically"
                    >
                      <HelpCircle className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Rationale accordions */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-[#0F766E] bg-[#F0FDFA] p-3 rounded-xl space-y-1 animate-in fade-in duration-150">
                      <div className="font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Clinical Rationale & Mechanism:</span>
                      </div>
                      <p className="text-[#134E4A] leading-relaxed">
                        {step.rationale}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick FAQ / Common Mistakes */}
          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#0F172A]/10 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Quick Phlebotomy FAQ
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white border border-[#0F172A]/5 space-y-1">
                <div className="font-bold text-[#0F172A] flex items-center gap-1.5">
                  <Coffee className="w-3.5 h-3.5 text-amber-600" />
                  <span>Can I drink black coffee?</span>
                </div>
                <div className="text-[11px] text-[#64748B]">
                  No. Black coffee stimulates gastric acid, raises cortisol, and activates hepatic lipase, altering fasting blood glucose and lipids.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#0F172A]/5 space-y-1">
                <div className="font-bold text-[#0F172A] flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-blue-600" />
                  <span>How much water should I drink?</span>
                </div>
                <div className="text-[11px] text-[#64748B]">
                  Drink 500 mL of still water 45-60 min prior. Good hydration plumps veins and prevents hemoconcentration from falsely raising albumin.
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-[#FAFAF8] border-t border-[#0F172A]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-[#64748B] text-[11px]">
            Targeting Lab: <span className="font-semibold text-[#0F172A]">Laboratorios Echevarne / Casablanca Pathologists</span>
          </div>

          <button
            onClick={() => setIsPreLabModalOpen(false)}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#0F172A] text-white font-semibold hover:bg-slate-800 transition-colors shadow-xs"
          >
            Got It, Proceed
          </button>
        </div>

      </div>
    </div>
  );
};
