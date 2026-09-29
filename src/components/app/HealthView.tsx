"use client";

import React, { useState } from "react";
import { useHealth } from "@/context/HealthContext";
import {
  Heart,
  Scale,
  Footprints,
  Moon,
  Apple,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  ArrowRight,
  Activity,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";

export const HealthView: React.FC = () => {
  const { user, setActiveTab } = useHealth();
  const [selectedDomain, setSelectedDomain] = useState<string>("cardiovascular");

  const domains = [
    {
      id: "cardiovascular",
      label: "Cardiovascular",
      icon: Heart,
      status: "Needs attention",
      statusColor: "bg-[#F97360]/10 text-[#F97360]",
      headline: "Blood pressure regulation & atherogenic particle management",
      metrics: [
        { label: "Home Blood Pressure", val: "134/84 mmHg", note: "3-wk avg (Borderline Stage 1)", status: "warning" },
        { label: "Apolipoprotein B (ApoB)", val: "105 mg/dL", note: "Down from 112 in Mar (Target <90)", status: "warning" },
        { label: "Resting Heart Rate", val: "67 bpm", note: "Favorable baseline trend", status: "optimal" },
      ],
      whatMatters: "Cardiovascular health is dominated by arterial pressure and cumulative atherogenic particle exposure. Consistent home monitoring and sustained walking are the primary lifestyle levers.",
      nextAction: "Complete Day 4 of your 7-day standardized home blood pressure protocol.",
    },
    {
      id: "metabolic",
      label: "Metabolic Health",
      icon: Scale,
      status: "On track",
      statusColor: "bg-[#16A34A]/10 text-[#16A34A]",
      headline: "Glycemic regulation and visceral adiposity reduction",
      metrics: [
        { label: "Body Weight", val: "82.4 kg", note: "-3.7 kg over 6 months", status: "optimal" },
        { label: "HbA1c (Glycated Hb)", val: "5.7%", note: "Improved from 5.9% (Mar)", status: "optimal" },
        { label: "Fasting Triglycerides", val: "142 mg/dL", note: "Down from 168 (Normal <150)", status: "optimal" },
      ],
      whatMatters: "Modest, sustained weight reduction reverses early fatty liver accumulation and improves peripheral insulin sensitivity without aggressive caloric starvation.",
      nextAction: "Maintain your 120g protein anchor to protect lean tissue mass.",
    },
    {
      id: "physical_capacity",
      label: "Physical Capacity",
      icon: Footprints,
      status: "Worth improving",
      statusColor: "bg-[#CCFBF1] text-[#0F766E]",
      headline: "Aerobic base and functional strength",
      metrics: [
        { label: "Average Daily Steps", val: "6,780 steps", note: "30-day average (+18% in 90d)", status: "optimal" },
        { label: "Zone 2 Brisk Walking", val: "4 days / week", note: "35 minutes outdoors", status: "optimal" },
        { label: "Estimated VO2max", val: "31 mL/kg/min", note: "Average for age 44 female", status: "optimal" },
      ],
      whatMatters: "Building a consistent aerobic floor reduces resting heart rate and stimulates endothelial nitric oxide production to soften arterial stiffness.",
      nextAction: "Progress step target from 6,780 to 7,500 daily steps over the next 3 weeks.",
    },
    {
      id: "recovery",
      label: "Recovery & Sleep",
      icon: Moon,
      status: "Worth improving",
      statusColor: "bg-[#F5C76A]/20 text-[#B45309]",
      headline: "Sleep duration, consistency, and autonomic nervous tone",
      metrics: [
        { label: "3-Night Sleep Average", val: "5h 54m", note: "Below normal 7h 02m baseline", status: "warning" },
        { label: "Resting HR Elevation", val: "+5 bpm", note: "Sympathetic elevation from short sleep", status: "warning" },
        { label: "Sleep Consistency Score", val: "74%", note: "Bedtime variance: 52 mins", status: "optimal" },
      ],
      whatMatters: "Sleep is the non-negotiable biological reset for vascular tone and glucose tolerance. Consecutive short nights directly cause morning blood pressure spikes.",
      nextAction: "Prioritize an earlier lights-out tonight (22:15) with zero screen exposure after 21:30.",
    },
    {
      id: "nutrition",
      label: "Nutrition Baseline",
      icon: Apple,
      status: "On track",
      statusColor: "bg-[#16A34A]/10 text-[#16A34A]",
      headline: "Protein sufficiency and dietary fiber quality",
      metrics: [
        { label: "Protein Daily Target", val: "120 g / day", note: "Averaging 108g / day", status: "optimal" },
        { label: "Fiber & Micronutrients", val: "High", note: "Legumes, olive oil, seasonal greens", status: "optimal" },
        { label: "Alcohol Intake", val: "1–2 units / wk", note: "Occasional red wine with meals", status: "optimal" },
      ],
      whatMatters: "Zero calorie-counting obsession. Prioritizing protein protects metabolic rate while dietary soluble fiber actively clears circulating digestive bile acids (reducing ApoB).",
      nextAction: "Incorporate oat bran or chia seeds to support soluble fiber clearance.",
    },
    {
      id: "prevention",
      label: "Preventive Care",
      icon: ShieldCheck,
      status: "On track",
      statusColor: "bg-[#16A34A]/10 text-[#16A34A]",
      headline: "Evidence-based age and region-tailored clinical screenings",
      metrics: [
        { label: "Screening Completion", val: "6 of 8 Current", note: "Spain / Europe primary care guidelines", status: "optimal" },
        { label: "Next Due Check", val: "Dental Exam", note: "Target by October 2026", status: "warning" },
        { label: "Oncology Screening", val: "Cervical HPV Current", note: "Next due Nov 2027", status: "optimal" },
      ],
      whatMatters: "Catching cardiometabolic risk and cellular dysplasias decades before symptom onset is the cornerstone of genuine preventive medicine.",
      nextAction: "Review full checklist in the Prevention tab.",
    },
  ];

  const current = domains.find((d) => d.id === selectedDomain) || domains[0];
  const CurrentIcon = current.icon;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
          Whole-Person Physiology
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
          Six Health Domains
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
          Comprehensive physiological tracking without the clutter of traditional medical records.
        </p>
      </div>

      {/* Domain Navigation Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {domains.map((dom) => {
          const Icon = dom.icon;
          const isSelected = selectedDomain === dom.id;
          return (
            <button
              key={dom.id}
              onClick={() => setSelectedDomain(dom.id)}
              className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                isSelected
                  ? "bg-[#0F172A] text-white border-[#0F172A] shadow-sm"
                  : "bg-white text-[#0F172A] border-[#0F172A]/8 hover:border-[#14B8A6]/40"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-4 h-4 ${isSelected ? "text-[#14B8A6]" : "text-[#64748B]"}`} />
                <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                  isSelected ? "bg-white/20 text-white" : dom.statusColor
                }`}>
                  {dom.status === "Needs attention" ? "Attention" : dom.status === "Worth improving" ? "Improving" : "On track"}
                </span>
              </div>
              <span className="text-xs font-bold leading-tight">
                {dom.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Domain Focus Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#0F172A]/8 shadow-card space-y-6">
        
        {/* Domain Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#0F172A]/8 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 text-[#14B8A6] flex items-center justify-center shrink-0">
              <CurrentIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-[#0F172A]">
                  {current.label}
                </h2>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${current.statusColor}`}>
                  {current.status}
                </span>
              </div>
              <p className="text-xs text-[#64748B] mt-0.5">
                {current.headline}
              </p>
            </div>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {current.metrics.map((m, mIdx) => (
            <div key={mIdx} className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                {m.label}
              </span>
              <div className="text-lg font-bold text-[#0F172A] font-mono">
                {m.val}
              </div>
              <p className="text-xs text-[#64748B]">
                {m.note}
              </p>
            </div>
          ))}
        </div>

        {/* What Matters Deep Dive */}
        <div className="p-5 rounded-2xl bg-white border border-[#0F172A]/5 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
            Why this matters for your longevity
          </h3>
          <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
            {current.whatMatters}
          </p>
        </div>

        {/* Recommended Action */}
        <div className="p-4 rounded-2xl bg-[#CCFBF1]/30 border border-[#14B8A6]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F766E]">
              Recommended Next Action
            </span>
            <div className="text-xs sm:text-sm font-semibold text-[#0F172A]">
              {current.nextAction}
            </div>
          </div>

          <button
            onClick={() => setActiveTab("plan")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F172A] text-white font-medium text-xs hover:bg-[#1E293B] shrink-0"
          >
            <span>Execute in Plan</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#14B8A6]" />
          </button>
        </div>

      </div>

    </div>
  );
};
