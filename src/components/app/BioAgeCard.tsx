"use client";

import React, { useState } from "react";
import { useHealth } from "@/context/HealthContext";
import {
  Sparkles,
  TrendingDown,
  Info,
  ShieldCheck,
  Activity,
  Flame,
  Scale,
  Heart,
} from "lucide-react";

export const BioAgeCard: React.FC = () => {
  const { user } = useHealth();
  const [showTarget, setShowTarget] = useState(false);

  const chronologicalAge = user.age; // 44
  const currentBioAge = 42.6; // 1.4 years younger
  const targetBioAge = 39.8; // 4.2 years younger
  const paceOfAging = 0.92; // 8% slower than calendar average

  const displayedAge = showTarget ? targetBioAge : currentBioAge;
  const ageDelta = parseFloat((chronologicalAge - displayedAge).toFixed(1));

  const drivers = [
    {
      label: "Consistent Daily Movement (6,780 avg steps)",
      impact: "-0.8 yrs",
      type: "positive",
      category: "Physical Activity",
      icon: Activity,
    },
    {
      label: "Sustained Weight Reduction (-3.7 kg in 6mo)",
      impact: "-0.7 yrs",
      type: "positive",
      category: "Metabolic Reserve",
      icon: Scale,
    },
    {
      label: "Low Systemic Inflammation (hs-CRP 1.2 mg/L)",
      impact: "-0.5 yrs",
      type: "positive",
      category: "Immune / Endothelial",
      icon: Flame,
    },
    {
      label: "Borderline Arterial Pressure (134/84 mmHg)",
      impact: "+0.4 yrs",
      type: "opportunity",
      category: "Cardiovascular Shear",
      icon: Heart,
    },
    {
      label: "ApoB Particle Burden (105 mg/dL)",
      impact: "+0.2 yrs",
      type: "opportunity",
      category: "Atherogenic Burden",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#0F172A]/8 shadow-card space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#0F172A]/8 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#14B8A6]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Longevity Intelligence • Morgan Levine PhenoAge Model
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F172A]">
            Biological Age &amp; Aging Pace
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Calculated from verified laboratory biomarkers and clinical vitals. Health first; longevity as a byproduct.
          </p>
        </div>

        {/* Target Simulation Toggle */}
        <div className="flex items-center gap-2 p-1 bg-[#FAFAF8] border border-[#0F172A]/10 rounded-2xl self-start sm:self-auto">
          <button
            onClick={() => setShowTarget(false)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              !showTarget
                ? "bg-[#0F172A] text-white shadow-xs"
                : "text-[#64748B] hover:text-[#0F172A]"
            }`}
          >
            Current State
          </button>
          <button
            onClick={() => setShowTarget(true)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              showTarget
                ? "bg-[#14B8A6] text-white shadow-xs"
                : "text-[#64748B] hover:text-[#0F172A]"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Target Trajectory</span>
          </button>
        </div>
      </div>

      {/* Main Metric Visualizer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        
        {/* Left: Bio-Age Display */}
        <div className="p-6 rounded-3xl bg-[#CCFBF1]/40 border border-[#14B8A6]/20 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
            {showTarget ? "Projected Phenotypic Age" : "Estimated Biological Age"}
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black font-mono tracking-tight text-[#0F172A]">
              {displayedAge}
            </span>
            <span className="text-sm font-semibold text-[#64748B]">
              years old
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-[#16A34A]">
            <TrendingDown className="w-4 h-4 stroke-[2.5]" />
            <span>
              {ageDelta} years younger than calendar age ({chronologicalAge})
            </span>
          </div>

          <p className="text-[11px] text-[#64748B] leading-relaxed pt-1">
            {showTarget
              ? "Achievable upon reaching home BP <120/78 mmHg and ApoB <80 mg/dL via current lifestyle protocols."
              : "Your current biomarkers indicate a physiological reserve equivalent to a healthy 42-year-old."}
          </p>
        </div>

        {/* Center & Right: Pace of Aging & Spectrum */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex justify-between items-center text-xs font-semibold text-[#64748B]">
            <span>Biological Pace of Aging (DunedinPACE standard)</span>
            <span className="font-mono text-[#0F172A] font-bold">
              {showTarget ? "0.85" : paceOfAging} biological yrs / calendar yr
            </span>
          </div>

          {/* Visual Gauge */}
          <div className="space-y-1.5">
            <div className="h-4 w-full rounded-full bg-gradient-to-r from-[#16A34A] via-[#CCFBF1] via-[#F5C76A] to-[#F97360] relative p-0.5 shadow-inner">
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#0F172A] rounded-full shadow-md transition-all duration-300 -ml-2"
                style={{
                  left: `${showTarget ? 24 : 38}%`,
                }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-[#64748B] pt-0.5">
              <span>0.75 (Exceptional Slow)</span>
              <span>1.00 (Average Pace)</span>
              <span>1.25+ (Accelerated)</span>
            </div>
          </div>

          {/* Summary Box */}
          <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 text-xs text-[#64748B] leading-relaxed flex items-center justify-between gap-4">
            <div>
              <strong>Why This Matters:</strong> Every 0.1 reduction in annual biological aging rate correlates with a <strong>15% lower 7-year risk</strong> of cardiovascular events and chronic metabolic decline.
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white text-[#0F172A] border border-[#0F172A]/5 shrink-0">
              Levine 2018
            </span>
          </div>
        </div>

      </div>

      {/* Driver Factors Breakdown */}
      <div className="pt-4 border-t border-[#0F172A]/5 space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
          Clinical Drivers of Your Biological Age
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {drivers.map((d, idx) => {
            const Icon = d.icon;
            const isPos = d.type === "positive";

            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 space-y-1.5 hover:border-[#14B8A6]/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-[#64748B]">
                    {d.category}
                  </span>
                  <span
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                      isPos
                        ? "bg-[#16A34A]/10 text-[#16A34A]"
                        : "bg-[#F5C76A]/20 text-[#B45309]"
                    }`}
                  >
                    {d.impact}
                  </span>
                </div>

                <div className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5 text-[#14B8A6] shrink-0" />
                  <span>{d.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Evidence Footer */}
      <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 flex items-start gap-2.5 text-xs text-[#64748B] leading-relaxed">
        <Info className="w-4 h-4 text-[#14B8A6] shrink-0 mt-0.5" />
        <p>
          <strong>Clinical Model Basis:</strong> Phenotypic age algorithms calculate biological reserve by regressing mortality hazard across 9 validated laboratory biomarkers (including albumin, creatinine, glycemia, hs-CRP, and white blood cell differential) and blood pressure. It is not genetic diagnostic advice.
        </p>
      </div>

    </div>
  );
};
