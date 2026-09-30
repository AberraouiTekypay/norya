"use client";

import React from "react";
import { useHealth } from "@/context/HealthContext";
import {
  X,
  Heart,
  Baby,
  ShieldCheck,
  CheckCircle2,
  Circle,
  Calendar,
  Printer,
  Sparkles,
  Info,
  Clock,
  ArrowRight,
} from "lucide-react";

export const PediatricScreeningModal: React.FC = () => {
  const { isPediatricModalOpen, setIsPediatricModalOpen, pediatricScreening, togglePediatricTask } =
    useHealth();

  if (!isPediatricModalOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-[#0F172A]/10 overflow-hidden text-left">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#0F172A] text-white flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <Heart className="w-5 h-5 fill-rose-400/30" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold tracking-tight">
                  Pediatric Cardiovascular Screening Protocol
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Ages 9–11 Window
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Universal lipid screening roadmap for daughter Sofia (Age 11) based on EAS & AAP Consensus Guidelines.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsPediatricModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Milestone Banner */}
        <div className="px-5 sm:px-6 py-3.5 bg-[#FFF1F2] border-b border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-rose-900 font-semibold">
            <Baby className="w-4 h-4 text-rose-600 shrink-0" />
            <span>Target Patient: Sofia M. (11 Years Old) • Status: Due for Baseline Draw</span>
          </div>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-rose-300 text-xs font-semibold text-rose-800 hover:bg-rose-50 transition-colors shadow-2xs shrink-0"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Pediatrician Slip</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Clinical Consensus Explainer */}
          <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/10 space-y-2 text-xs leading-relaxed text-[#334155]">
            <div className="font-bold text-[#0F172A] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#14B8A6]" />
              <span>Why Screen at Ages 9–11?</span>
            </div>
            <p>
              {pediatricScreening.pediatricGuidelineConsensus}
            </p>
            <p className="text-[#64748B]">
              Pubertal hormone surges temporarily depress circulating LDL-C and Total Cholesterol by 10-20% between ages 12 and 16. Performing the baseline lipid draw between <strong>ages 9 and 11</strong> provides the cleanest, most reliable lifetime baseline before pubertal hormonal fluctuations begin.
            </p>
          </div>

          {/* Pediatric Reference Targets */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Standard Pediatric Reference Ranges (EAS / AAP)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {pediatricScreening.targetBiomarkers.map((target, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white border border-[#0F172A]/10 shadow-xs space-y-2">
                  <div className="text-xs font-bold text-[#0F172A]">
                    {target.marker}
                  </div>
                  <div className="text-xs font-mono font-bold text-[#0F766E] bg-[#CCFBF1]/50 px-2 py-1 rounded-lg">
                    {target.pediatricNormal}
                  </div>
                  <p className="text-[11px] text-[#64748B] leading-relaxed">
                    {target.why}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Checklist */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Pediatric Preparation & Care Actions
            </h3>

            <div className="space-y-2">
              {pediatricScreening.actionChecklist.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => togglePediatricTask(idx)}
                  className={`w-full flex items-start gap-3 p-3.5 rounded-2xl border text-left text-xs transition-all ${
                    item.completed
                      ? "bg-[#FAFAF8] border-[#14B8A6]/40 text-[#64748B]"
                      : "bg-white border-[#0F172A]/10 hover:border-[#0F172A]/20 text-[#0F172A]"
                  }`}
                >
                  <div className="mt-0.5 shrink-0 text-[#14B8A6]">
                    {item.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A] fill-[#DCFCE7]" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-300 hover:text-[#14B8A6]" />
                    )}
                  </div>
                  <span className={item.completed ? "line-through text-[#64748B]" : "font-medium"}>
                    {item.task}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Pediatrician Discussion Prompts */}
          <div className="p-4 rounded-2xl bg-[#F0FDFA] border border-[#14B8A6]/20 space-y-2 text-xs">
            <div className="font-bold text-[#0F766E]">Suggested Questions for Sofia&apos;s Pediatrician:</div>
            <ul className="list-disc list-inside space-y-1 text-[#134E4A]">
              <li>&ldquo;Given maternal borderline ApoB (105 mg/dL) and paternal grandfather CAD at 62, can we run a standard non-fasting or fasting lipid panel during Sofia&apos;s 11-year wellness check?&rdquo;</li>
              <li>&ldquo;Are Sofia&apos;s growth velocity and BMI percentiles following an optimal trajectory without early visceral adiposity?&rdquo;</li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-[#FAFAF8] border-t border-[#0F172A]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-[#64748B] text-[11px]">
            National Heart, Lung, and Blood Institute (NHLBI) & American Academy of Pediatrics (AAP)
          </div>

          <button
            onClick={() => setIsPediatricModalOpen(false)}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#0F172A] text-white font-semibold hover:bg-slate-800 transition-colors shadow-xs"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
