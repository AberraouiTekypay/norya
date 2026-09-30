"use client";

import React, { useState } from "react";
import { useHealth } from "@/context/HealthContext";
import {
  Sun,
  Flame,
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Moon,
  Activity,
  Heart,
  Droplets,
  ShieldCheck,
} from "lucide-react";

export const HabitTracker: React.FC = () => {
  const { circadianHabits, toggleCircadianHabit } = useHealth();
  const [selectedPeriod, setSelectedPeriod] = useState<"all" | "morning" | "noon" | "afternoon" | "evening">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const completedCount = circadianHabits.filter((h) => h.completed).length;
  const adherencePercent = Math.round((completedCount / circadianHabits.length) * 100);

  const filteredHabits = circadianHabits.filter((h) =>
    selectedPeriod === "all" ? true : h.period === selectedPeriod
  );

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#0F172A]/10 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#0F172A]/5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
              Circadian Timing & Habit Stacking
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#14B8A6]/10 text-[#0F766E] font-bold">
              BJ Fogg / James Clear Framework
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#0F172A] mt-0.5">
            Daily Biological Anchors
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Evidence-based micro-actions timed to your natural endocrine cycles for maximal metabolic efficiency.
          </p>
        </div>

        {/* Adherence Gauge */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#F0FDFA] border border-[#14B8A6]/20">
          <div className="w-10 h-10 rounded-xl bg-white text-[#0F766E] font-bold text-sm flex items-center justify-center shadow-2xs border border-[#14B8A6]/20">
            {adherencePercent}%
          </div>
          <div>
            <div className="text-xs font-bold text-[#0F766E]">
              {completedCount} of {circadianHabits.length} Completed
            </div>
            <div className="text-[11px] text-[#134E4A]">
              Daily Circadian Sync
            </div>
          </div>
        </div>
      </div>

      {/* Period Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {[
          { id: "all", label: "All Anchors" },
          { id: "morning", label: "🌅 Morning Dawn" },
          { id: "noon", label: "🥗 Midday Meal" },
          { id: "afternoon", label: "🏃 Afternoon Base" },
          { id: "evening", label: "🌙 Evening Sleep" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedPeriod(tab.id as typeof selectedPeriod)}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all whitespace-nowrap ${
              selectedPeriod === tab.id
                ? "bg-[#0F172A] text-white shadow-2xs"
                : "bg-[#FAFAF8] text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Habits List */}
      <div className="space-y-3">
        {filteredHabits.map((habit) => {
          const isExpanded = expandedId === habit.id;
          return (
            <div
              key={habit.id}
              className={`p-4 rounded-2xl border transition-all ${
                habit.completed
                  ? "bg-[#FAFAF8] border-[#14B8A6]/30"
                  : "bg-white border-[#0F172A]/10 hover:border-[#0F172A]/20"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <button
                  onClick={() => toggleCircadianHabit(habit.id)}
                  className="flex items-start gap-3.5 text-left flex-1"
                >
                  <div className="mt-0.5 shrink-0 text-[#14B8A6]">
                    {habit.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-[#16A34A] fill-[#DCFCE7]" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300 hover:text-[#14B8A6]" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#64748B]" />
                        <span>{habit.timeWindow}</span>
                      </span>

                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700 flex items-center gap-1">
                        <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span>{habit.streakDays} Day Streak</span>
                      </span>

                      <span className="text-[10px] font-medium text-[#64748B]">
                        Target: {habit.biologicalTarget}
                      </span>
                    </div>

                    <h3
                      className={`text-sm font-bold ${
                        habit.completed ? "text-[#64748B] line-through" : "text-[#0F172A]"
                      }`}
                    >
                      {habit.title}
                    </h3>

                    <p className="text-xs text-[#475569] leading-relaxed">
                      {habit.action}
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => setExpandedId(isExpanded ? null : habit.id)}
                  className="p-1 rounded-lg text-slate-400 hover:text-[#0F172A] hover:bg-slate-100 transition-colors shrink-0"
                  title="View biological pathway"
                >
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Biological pathway explanation */}
              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-[#0F766E] bg-[#F0FDFA] p-3 rounded-xl space-y-1 animate-in fade-in duration-150">
                  <div className="font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Biological Pathway & Clinical Rationale:</span>
                  </div>
                  <p className="text-[#134E4A] leading-relaxed">
                    {habit.scienceNote}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
