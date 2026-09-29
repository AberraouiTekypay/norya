"use client";

import React, { useState } from "react";
import { useHealth } from "@/context/HealthContext";
import {
  TrendingDown,
  TrendingUp,
  Award,
  Calendar,
  Sparkles,
  Heart,
  Scale,
  Footprints,
  Moon,
  Info,
} from "lucide-react";

export const ProgressView: React.FC = () => {
  const { user, opportunityScore } = useHealth();
  const [timeframe, setTimeframe] = useState<"30d" | "90d" | "1y">("90d");

  const personalBests = [
    { title: "Resting Heart Rate", value: "65 bpm", current: "67 bpm", status: "Within 2 bpm of 12-month best", icon: Heart },
    { title: "Body Weight", value: "82.4 kg", current: "82.4 kg", status: "Current weight is your 2-year low", icon: Scale },
    { title: "Daily Movement", value: "7,820 steps", current: "6,780 avg", status: "Sustained weekly personal peak", icon: Footprints },
    { title: "Sleep Consistency", value: "86%", current: "74%", status: "Achieved July 2026", icon: Moon },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
            Longitudinal Health Trajectory
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
            Progress & Outcomes
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Encouraging, trend-based evidence of your habit consistency over time.
          </p>
        </div>

        {/* Timeframe selector */}
        <div className="flex items-center gap-1 p-1 bg-white border border-[#0F172A]/10 rounded-2xl shadow-2xs">
          {(["30d", "90d", "1y"] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                timeframe === tf
                  ? "bg-[#0F172A] text-white shadow-xs"
                  : "text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              {tf === "30d" ? "30 Days" : tf === "90d" ? "90 Days" : "1 Year"}
            </button>
          ))}
        </div>
      </div>

      {/* Main Score Progression Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#0F172A]/8 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#0F172A]/8 gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Health Opportunity Score
            </span>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-bold text-[#0F172A]">
                {opportunityScore.totalScore}
              </span>
              <span className="text-sm font-semibold text-[#16A34A] flex items-center gap-1">
                <TrendingDown className="w-4 h-4" />
                <span>Down 7 points ({timeframe} trend)</span>
              </span>
            </div>
            <p className="text-xs text-[#64748B]">
              Favorable trajectory: unaddressed modifiable risk has decreased by 18% since January.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 text-xs text-[#64748B] max-w-xs leading-relaxed">
            💡 <strong>Score Interpretation:</strong> A lower score means you have steadily closed gaps in arterial pressure, physical movement, and lipid balance.
          </div>
        </div>

        {/* Domain Bars */}
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
            Progress by Health Domain ({timeframe})
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {opportunityScore.domainBreakdown.map((item, idx) => {
              const pct = Math.round((item.score / item.maxScore) * 100);
              return (
                <div key={idx} className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-[#0F172A]">{item.label}</span>
                    <span className="font-mono text-[#64748B]">{item.score} / {item.maxScore}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#E2E8F0] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#14B8A6]"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-[#64748B]">
                    {item.opportunityText}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Key Metric Trend Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Weight */}
        <div className="p-5 rounded-3xl bg-white border border-[#0F172A]/8 shadow-soft space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-[#64748B]">
            <span>Body Weight</span>
            <span className="text-[#16A34A] font-bold">-3.7 kg in 6mo</span>
          </div>
          <div className="text-2xl font-bold text-[#0F172A] font-mono">
            82.4 kg
          </div>
          <div className="text-xs text-[#64748B]">
            From baseline 86.1 kg in March. Steady pace of -0.6 kg/month.
          </div>
        </div>

        {/* Daily Movement */}
        <div className="p-5 rounded-3xl bg-white border border-[#0F172A]/8 shadow-soft space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-[#64748B]">
            <span>Daily Movement</span>
            <span className="text-[#16A34A] font-bold">+18% vs Baseline</span>
          </div>
          <div className="text-2xl font-bold text-[#0F172A] font-mono">
            6,780 steps
          </div>
          <div className="text-xs text-[#64748B]">
            Targeting 7,000 baseline with 35-min brisk outdoor walks.
          </div>
        </div>

        {/* Resting Heart Rate */}
        <div className="p-5 rounded-3xl bg-white border border-[#0F172A]/8 shadow-soft space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-[#64748B]">
            <span>Resting Pulse</span>
            <span className="text-[#16A34A] font-bold">-5 bpm vs Jan</span>
          </div>
          <div className="text-2xl font-bold text-[#0F172A] font-mono">
            67 bpm
          </div>
          <div className="text-xs text-[#64748B]">
            Down from 72 bpm baseline. Reflects enhanced parasympathetic tone.
          </div>
        </div>

      </div>

      {/* Personal Bests Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-[#14B8A6]" />
          <h2 className="text-base sm:text-lg font-bold text-[#0F172A]">
            Personal Bests & Milestones
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {personalBests.map((pb, idx) => {
            const Icon = pb.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-[#0F172A]/8 shadow-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#64748B]">{pb.title}</span>
                  <Icon className="w-4 h-4 text-[#14B8A6]" />
                </div>
                <div className="text-xl font-bold text-[#0F172A] font-mono">
                  {pb.value}
                </div>
                <p className="text-[11px] text-[#0F766E] font-medium leading-relaxed">
                  ✓ {pb.status}
                </p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
