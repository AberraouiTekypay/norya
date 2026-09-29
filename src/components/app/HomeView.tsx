"use client";

import React, { useState } from "react";
import { useHealth } from "@/context/HealthContext";
import {
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingDown,
  ChevronDown,
  ChevronUp,
  Activity,
  Heart,
  Footprints,
  Plus,
  Stethoscope,
  Info,
} from "lucide-react";

export const HomeView: React.FC = () => {
  const {
    user,
    priorities,
    dailyTasks,
    toggleTaskCompletion,
    skipTask,
    opportunityScore,
    setActiveTab,
    sendCoachMessage,
    unitSystem,
  } = useHealth();

  const [expandedPriority, setExpandedPriority] = useState<string | null>("p1");
  const [quickQuestion, setQuickQuestion] = useState("");

  const completedCount = dailyTasks.filter((t) => t.status === "completed").length;

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickQuestion.trim()) return;
    sendCoachMessage(quickQuestion);
    setQuickQuestion("");
    setActiveTab("coach");
  };

  const handleSuggestionClick = (prompt: string) => {
    sendCoachMessage(prompt);
    setActiveTab("coach");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Header & Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
            Tuesday, September 29 • Health Cockpit
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#0F172A]">
            Good morning, {user.firstName}
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Your health picture is centered around 3 core priorities.
          </p>
        </div>

        {/* Opportunity Score Widget */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#0F172A]/8 shadow-soft">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
              Opportunity Score
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
                {opportunityScore.totalScore}
              </span>
              <span className="text-xs font-semibold text-[#16A34A] flex items-center">
                <TrendingDown className="w-3.5 h-3.5 mr-0.5" />
                {opportunityScore.delta90d} in 90d
              </span>
            </div>
            <div className="text-[10px] text-[#64748B]">
              Lower is better (less unaddressed risk)
            </div>
          </div>
          <button
            onClick={() => setActiveTab("progress")}
            className="p-2 rounded-xl bg-[#FAFAF8] text-[#14B8A6] hover:bg-[#CCFBF1] transition-colors"
            title="View Score Details"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Top 3 Priorities (The Norya Core Engine) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#0F172A]">
              My Top 3 Priorities
            </h2>
            <span className="text-[11px] font-semibold text-[#0F766E] bg-[#CCFBF1] px-2 py-0.5 rounded-full">
              Evidence-Graded
            </span>
          </div>
          <span className="text-xs text-[#64748B]">
            Focus here. Everything else is secondary.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {priorities.map((item) => {
            const isExpanded = expandedPriority === item.id;
            const borderColor =
              item.status === "Needs attention"
                ? "border-[#F97360]/30 hover:border-[#F97360]/50"
                : item.status === "Worth improving"
                ? "border-[#14B8A6]/30 hover:border-[#14B8A6]/50"
                : "border-[#16A34A]/30 hover:border-[#16A34A]/50";

            const badgeBg =
              item.status === "Needs attention"
                ? "bg-[#F97360]/10 text-[#F97360]"
                : item.status === "Worth improving"
                ? "bg-[#CCFBF1] text-[#0F766E]"
                : "bg-[#16A34A]/10 text-[#16A34A]";

            return (
              <div
                key={item.id}
                className={`rounded-2xl p-5 bg-white border ${borderColor} shadow-soft flex flex-col justify-between transition-all`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#64748B]">
                      Priority #{item.rank}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${badgeBg}`}>
                      {item.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#0F172A]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-[#0F172A] leading-relaxed">
                    {item.why}
                  </p>

                  {/* Expandable deeper evidence & "Not important now" */}
                  {isExpanded && (
                    <div className="pt-3 border-t border-[#0F172A]/5 space-y-3 text-xs animate-in fade-in">
                      <div className="p-2.5 rounded-xl bg-[#FAFAF8] space-y-1">
                        <div className="font-bold text-[#0F766E] flex items-center gap-1 text-[11px]">
                          <span>Evidence {item.evidenceGrade}</span> • <span>Impact: {item.impact}</span>
                        </div>
                        <p className="text-[11px] text-[#64748B] leading-normal">
                          {item.evidenceSummary}
                        </p>
                      </div>

                      {item.notImportantNow && item.notImportantNow.length > 0 && (
                        <div className="p-2.5 rounded-xl bg-[#F1F5F9]/60 space-y-1">
                          <span className="font-bold text-[#64748B] text-[10px] uppercase tracking-wider">
                            What you can safely ignore right now:
                          </span>
                          <ul className="text-[11px] text-[#64748B] space-y-0.5">
                            {item.notImportantNow.map((ign, iIdx) => (
                              <li key={iIdx}>✕ {ign}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-[#0F172A]/5 flex items-center justify-between text-xs">
                  <button
                    onClick={() => setExpandedPriority(isExpanded ? null : item.id)}
                    className="text-[11px] font-semibold text-[#14B8A6] hover:underline flex items-center gap-1"
                  >
                    <span>{isExpanded ? "Less detail" : "Why this priority?"}</span>
                    {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>
                  <span className="text-[11px] text-[#64748B]">
                    Cost: {item.costLevel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Today's Plan (Execution Engine) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#0F172A]">
              Today&apos;s Plan
            </h2>
            <span className="text-xs font-semibold text-[#16A34A] bg-[#16A34A]/10 px-2 py-0.5 rounded-full">
              {completedCount} of {dailyTasks.length} Completed
            </span>
          </div>
          <button
            onClick={() => setActiveTab("plan")}
            className="text-xs font-semibold text-[#14B8A6] hover:underline"
          >
            Manage Weekly Plan →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {dailyTasks.map((task) => {
            const isDone = task.status === "completed";
            return (
              <div
                key={task.id}
                className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                  isDone
                    ? "bg-[#FAFAF8] border-[#0F172A]/5 opacity-80"
                    : "bg-white border-[#0F172A]/8 shadow-xs hover:border-[#14B8A6]/40"
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleTaskCompletion(task.id)}
                    className="mt-0.5 text-[#14B8A6] hover:scale-110 transition-transform"
                    aria-label={`Mark ${task.title} complete`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
                    ) : (
                      <Circle className="w-5 h-5 text-[#64748B]/40 hover:text-[#14B8A6]" />
                    )}
                  </button>

                  <div className="space-y-0.5">
                    <div className={`text-xs sm:text-sm font-semibold text-[#0F172A] ${isDone ? "line-through text-[#64748B]" : ""}`}>
                      {task.title}
                    </div>
                    <div className="text-xs text-[#64748B]">
                      Target: {task.target} {task.current ? `(${task.current})` : ""}
                    </div>
                    {task.impactNote && (
                      <div className="text-[11px] text-[#0F766E] font-medium pt-0.5">
                        💡 {task.impactNote}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {isDone ? (
                    <span className="text-[10px] font-bold text-[#16A34A] bg-[#16A34A]/10 px-2 py-0.5 rounded">
                      Done
                    </span>
                  ) : (
                    <button
                      onClick={() => skipTask(task.id, "User skipped for today")}
                      className="text-[11px] text-[#64748B] hover:text-[#0F172A] px-2 py-1 rounded hover:bg-[#F1F5F9]"
                    >
                      Skip
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Quick AI Health Coach Prompt Bar */}
      <div className="p-6 rounded-3xl bg-[#0F172A] text-white shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#14B8A6]" />
            <h3 className="text-base font-bold text-white">
              Ask Norya AI Coach
            </h3>
          </div>
          <span className="text-xs text-[#94A3B8]">
            Contextual memory: Sarah (BP 134/84, ApoB 105 mg/dL)
          </span>
        </div>

        {/* Input form */}
        <form onSubmit={handleAsk} className="relative">
          <input
            type="text"
            placeholder="Ask anything: 'Why am I tired today?' or 'Is my ApoB dangerous?'..."
            value={quickQuestion}
            onChange={(e) => setQuickQuestion(e.target.value)}
            className="w-full pl-4 pr-24 py-3 rounded-xl bg-white/10 border border-white/15 text-xs sm:text-sm text-white placeholder:text-white/40 focus:outline-hidden focus:border-[#14B8A6]"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1.5 bottom-1.5 px-4 rounded-lg bg-[#14B8A6] text-[#0F172A] font-bold text-xs hover:bg-[#0D9488] transition-colors"
          >
            Ask Coach
          </button>
        </form>

        {/* Suggested Prompts */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-[#94A3B8]">Suggested:</span>
          {[
            "Why am I more tired today?",
            "Explain my ApoB blood test",
            "Should I buy a CGM?",
            "What should I ask my doctor?",
          ].map((prompt, pIdx) => (
            <button
              key={pIdx}
              onClick={() => handleSuggestionClick(prompt)}
              className="text-xs px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[#CCFBF1] transition-colors text-left"
            >
              &ldquo;{prompt}&rdquo;
            </button>
          ))}
        </div>
      </div>

      {/* 5. Doctor Handoff Quick Banner */}
      <div className="p-4 rounded-2xl bg-white border border-[#0F172A]/8 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#CCFBF1] text-[#0F766E] flex items-center justify-center shrink-0">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#0F172A]">
              Prepare for your next doctor appointment
            </div>
            <div className="text-[11px] text-[#64748B]">
              Generate a structured 1-page summary with your 3-week home BP log and ApoB trend.
            </div>
          </div>
        </div>

        <button
          onClick={() => setActiveTab("doctor")}
          className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-[#0F172A] text-white text-xs font-medium hover:bg-[#1E293B] shrink-0"
        >
          <span>View Doctor Brief</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#14B8A6]" />
        </button>
      </div>

    </div>
  );
};
