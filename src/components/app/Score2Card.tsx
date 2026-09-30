"use client";

import React from "react";
import { useHealth } from "@/context/HealthContext";
import {
  TrendingDown,
  Info,
  Sliders,
  Sparkles,
  RotateCcw,
} from "lucide-react";

export const Score2Card: React.FC = () => {
  const { score2Profile, updateScore2Profile } = useHealth();

  const { baselineRiskPercent, riskCategory, systolicBP, nonHdlOrApoB, isSmoker, relativeRiskReduction } =
    score2Profile;

  const handleResetToBaseline = () => {
    updateScore2Profile({
      systolicBP: 134,
      nonHdlOrApoB: 105,
      isSmoker: false,
    });
  };

  const handleApplyOptimalProtocol = () => {
    updateScore2Profile({
      systolicBP: 120,
      nonHdlOrApoB: 78,
      isSmoker: false,
    });
  };

  // Color mapping
  const categoryConfig = {
    Low: {
      color: "text-[#16A34A]",
      bg: "bg-[#16A34A]/10",
      border: "border-[#16A34A]/20",
      label: "Low 10-Year CVD Risk (<2.5%)",
      desc: "Optimal cardiovascular longevity trajectory. Continue baseline lifestyle habits.",
    },
    Moderate: {
      color: "text-[#B45309]",
      bg: "bg-[#F5C76A]/20",
      border: "border-[#F5C76A]/30",
      label: "Moderate 10-Year CVD Risk (2.5% – 7.5%)",
      desc: "Lifestyle optimization recommended to shift into the low-risk bracket before middle age.",
    },
    High: {
      color: "text-[#EA580C]",
      bg: "bg-[#EA580C]/15",
      border: "border-[#EA580C]/30",
      label: "High 10-Year CVD Risk (7.5% – 10.0%)",
      desc: "Active clinical discussion regarding blood pressure and lipid lowering therapy indicated.",
    },
    "Very High": {
      color: "text-[#DC2626]",
      bg: "bg-[#DC2626]/15",
      border: "border-[#DC2626]/30",
      label: "Very High 10-Year CVD Risk (>10.0%)",
      desc: "Prompt medical consultation for aggressive risk factor reduction required.",
    },
  }[riskCategory];

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#0F172A]/8 shadow-card space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#0F172A]/8 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#14B8A6]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              ESC SCORE2 Clinical Engine (European Society of Cardiology)
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F172A]">
            10-Year Cardiovascular Risk Trajectory
          </h2>
          <p className="text-xs text-[#64748B] max-w-xl leading-relaxed">
            Validated risk estimation for European &amp; Mediterranean populations (Spain/Morocco) based on arterial pressure, atherogenic particle count, and age.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleApplyOptimalProtocol}
            className="px-3.5 py-2 rounded-xl bg-[#CCFBF1]/50 hover:bg-[#CCFBF1] text-[#0F766E] border border-[#14B8A6]/20 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" />
            <span>Simulate Norya Goal</span>
          </button>
          <button
            onClick={handleResetToBaseline}
            className="p-2 rounded-xl bg-[#FAFAF8] hover:bg-[#F1F5F9] border border-[#0F172A]/10 text-[#64748B] transition-colors"
            title="Reset to current baseline vitals"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Risk Output Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        
        {/* Left: Big Risk Metric */}
        <div className={`p-6 rounded-3xl ${categoryConfig.bg} border ${categoryConfig.border} space-y-2`}>
          <div className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
            10-Year Fatal &amp; Non-Fatal CVD Risk
          </div>
          
          <div className="flex items-baseline gap-2">
            <span className={`text-4xl sm:text-5xl font-black font-mono tracking-tight ${categoryConfig.color}`}>
              {baselineRiskPercent}%
            </span>
            <span className="text-xs font-semibold text-[#64748B]">
              probability
            </span>
          </div>

          <div className={`text-xs font-bold ${categoryConfig.color}`}>
            {categoryConfig.label}
          </div>

          <p className="text-[11px] text-[#0F172A] leading-relaxed pt-1">
            {categoryConfig.desc}
          </p>
        </div>

        {/* Center: ESC 4-Tier Gauge */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex justify-between items-center text-xs font-semibold text-[#64748B]">
            <span>ESC Risk Spectrum (Low to Very High)</span>
            {relativeRiskReduction > 0 && (
              <span className="text-[#16A34A] font-bold flex items-center gap-1">
                <TrendingDown className="w-4 h-4" />
                <span>-{relativeRiskReduction}% Risk vs Baseline</span>
              </span>
            )}
          </div>

          {/* Visual Bar Spectrum */}
          <div className="space-y-1.5">
            <div className="h-4 w-full rounded-full bg-gradient-to-r from-[#16A34A] via-[#F5C76A] via-[#EA580C] to-[#DC2626] relative p-0.5 shadow-inner">
              {/* Marker pin */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#0F172A] rounded-full shadow-md transition-all duration-300 -ml-2"
                style={{
                  left: `${Math.min(96, Math.max(4, (baselineRiskPercent / 12) * 100))}%`,
                }}
              />
            </div>

            <div className="flex justify-between text-[10px] font-mono text-[#64748B] pt-0.5">
              <span>0% (Low)</span>
              <span>2.5% (Mod)</span>
              <span>7.5% (High)</span>
              <span>10%+ (Very High)</span>
            </div>
          </div>

          {/* Context note */}
          <div className="p-3.5 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 text-xs text-[#64748B] flex items-center justify-between gap-4">
            <div>
              <strong>Current Calibration:</strong> Female, Age 44, Non-smoker, Low-to-Moderate CVD region (Spain).
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white border border-[#0F172A]/5 text-[#0F172A] shrink-0">
              ESC 2021
            </span>
          </div>
        </div>

      </div>

      {/* Interactive Trajectory Sliders */}
      <div className="pt-4 border-t border-[#0F172A]/5 space-y-6">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#14B8A6]" />
          <h3 className="text-sm font-bold text-[#0F172A]">
            Modifiable Risk Factor Simulator
          </h3>
          <span className="text-xs text-[#64748B]">
            (Adjust to observe immediate impact on 10-year cardiovascular risk)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Systolic BP Slider */}
          <div className="p-5 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-[#0F172A]">
                  Systolic Blood Pressure
                </span>
                <p className="text-[11px] text-[#64748B]">
                  ESC Home Target: &lt; 130 mmHg (Optimal: 120 mmHg)
                </p>
              </div>
              <div className="text-right">
                <span className="text-base font-bold font-mono text-[#0F172A]">
                  {systolicBP} mmHg
                </span>
                <div className="text-[10px] text-[#14B8A6] font-semibold">
                  {systolicBP <= 120 ? "Optimal" : systolicBP <= 130 ? "Normal" : "Borderline"}
                </div>
              </div>
            </div>

            <input
              type="range"
              min="110"
              max="170"
              step="1"
              value={systolicBP}
              onChange={(e) => updateScore2Profile({ systolicBP: parseInt(e.target.value) })}
              className="w-full accent-[#14B8A6] cursor-pointer"
            />

            <div className="flex justify-between text-[10px] text-[#64748B]">
              <span>110 mmHg (Athletic)</span>
              <span>134 mmHg (Baseline)</span>
              <span>170 mmHg (Stage 2)</span>
            </div>
          </div>

          {/* ApoB / Particle Burden Slider */}
          <div className="p-5 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-[#0F172A]">
                  ApoB Particle Burden
                </span>
                <p className="text-[11px] text-[#64748B]">
                  ESC Moderate Risk Target: &lt; 80 mg/dL (Optimal: &lt; 65 mg/dL)
                </p>
              </div>
              <div className="text-right">
                <span className="text-base font-bold font-mono text-[#0F172A]">
                  {nonHdlOrApoB} mg/dL
                </span>
                <div className="text-[10px] text-[#14B8A6] font-semibold">
                  {nonHdlOrApoB < 80 ? "Target Reached" : "Modifiable Gap"}
                </div>
              </div>
            </div>

            <input
              type="range"
              min="60"
              max="150"
              step="1"
              value={nonHdlOrApoB}
              onChange={(e) => updateScore2Profile({ nonHdlOrApoB: parseInt(e.target.value) })}
              className="w-full accent-[#14B8A6] cursor-pointer"
            />

            <div className="flex justify-between text-[10px] text-[#64748B]">
              <span>60 mg/dL (Ideal)</span>
              <span>105 mg/dL (Baseline)</span>
              <span>150 mg/dL (Elevated)</span>
            </div>
          </div>

        </div>

        {/* Smoking Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 gap-3">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-[#0F172A]">
              Tobacco / Nicotine Inhalation
            </span>
            <p className="text-[11px] text-[#64748B]">
              Smoking induces endothelial oxidative stress, almost doubling 10-year risk (+85%).
            </p>
          </div>

          <button
            onClick={() => updateScore2Profile({ isSmoker: !isSmoker })}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all self-start sm:self-auto ${
              isSmoker
                ? "bg-[#DC2626] text-white shadow-xs"
                : "bg-white text-[#16A34A] border border-[#16A34A]/20"
            }`}
          >
            {isSmoker ? "Active Smoker (+85% Risk)" : "✓ Non-Smoker (Current)"}
          </button>
        </div>
      </div>

      {/* Footer Scientific Citation */}
      <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 flex items-start gap-2.5 text-xs text-[#64748B] leading-relaxed">
        <Info className="w-4 h-4 text-[#14B8A6] shrink-0 mt-0.5" />
        <p>
          Calculations are adapted from the <strong>SCORE2 risk algorithms</strong> published by the SCORE2 working group and the <em>European Society of Cardiology (ESC) 2021 Cardiovascular Prevention Guidelines</em>. Educational estimation only; clinical decisions regarding pharmacotherapy should be made with your primary physician or cardiologist.
        </p>
      </div>

    </div>
  );
};
