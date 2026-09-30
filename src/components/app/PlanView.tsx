"use client";

import React, { useState } from "react";
import { useHealth } from "@/context/HealthContext";
import {
  CheckCircle2,
  Circle,
  Plus,
  Flame,
  Calendar,
  Sparkles,
  ArrowRight,
  TrendingUp,
  RotateCcw,
  FlaskConical,
  X,
  Utensils,
  ShieldCheck,
} from "lucide-react";
import { HabitTracker } from "./HabitTracker";

export const PlanView: React.FC = () => {
  const {
    dailyTasks,
    toggleTaskCompletion,
    skipTask,
    deferTask,
    addNewTask,
    user,
    experiments,
    checkinExperiment,
    startNewExperiment,
    setIsNutritionModalOpen,
    setIsSupplementModalOpen,
  } = useHealth();

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState<
    "movement" | "exercise" | "nutrition" | "recovery" | "measurement" | "prevention"
  >("movement");
  const [newTaskTarget, setNewTaskTarget] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSundayReview, setShowSundayReview] = useState(false);
  const [reviewTab, setReviewTab] = useState<"compliance" | "vitals" | "adjustments">("compliance");
  const [reviewSavedToast, setReviewSavedToast] = useState(false);

  const completedCount = dailyTasks.filter((t) => t.status === "completed").length;
  const adherenceRate = Math.round((completedCount / (dailyTasks.length || 1)) * 100);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    addNewTask({
      title: newTaskTitle,
      category: newTaskCategory,
      target: newTaskTarget || "Daily habit",
    });
    setNewTaskTitle("");
    setNewTaskTarget("");
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
            Execution & Behavioral Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
            Plan & Habits
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Small, evidence-based actions adapted to your real routine.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsSupplementModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAFAF8] border border-[#0F172A]/10 text-xs font-semibold text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-[#14B8A6]" />
            <span>Supplement Auditor</span>
          </button>
          <button
            onClick={() => setShowSundayReview(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#0F172A]/10 text-xs font-semibold text-[#0F172A] hover:bg-[#F1F5F9] shadow-2xs transition-colors"
          >
            <Sparkles className="w-4 h-4 text-[#14B8A6]" />
            <span>Weekly Review</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F172A] text-white text-xs font-semibold hover:bg-[#1E293B] shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4 text-[#14B8A6]" />
            <span>Add Action</span>
          </button>
        </div>
      </div>

      {/* Weekly Adherence & Adaptive Feedback Banner */}
      <div className="p-6 rounded-3xl bg-white border border-[#0F172A]/8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
            This Week&apos;s Adaptive Adherence
          </span>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl sm:text-4xl font-bold text-[#0F172A]">
              84%
            </span>
            <span className="text-xs font-semibold text-[#16A34A] bg-[#16A34A]/10 px-2.5 py-0.5 rounded-full">
              Strong Consistency
            </span>
          </div>
          <p className="text-xs text-[#64748B]">
            You have completed 18 of 21 planned habit sessions over the last 7 days.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#CCFBF1]/30 border border-[#14B8A6]/20 max-w-md text-xs text-[#0F766E] leading-relaxed">
          <strong>Norya Adaptive Adherence:</strong> When you miss a target repeatedly, we don&apos;t penalize you. We adjust the goal downward (e.g. from 8,000 to 7,000 steps) until the habit solidifies, then gently build back up.
        </div>
      </div>

      {/* Daily Tasks List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-[#64748B] px-1">
          <span>Today&apos;s Action Items ({dailyTasks.length} Max)</span>
          <span className="text-[#16A34A]">{completedCount} of {dailyTasks.length} Done</span>
        </div>

        <div className="space-y-2.5">
          {dailyTasks.map((task) => {
            const isDone = task.status === "completed";
            const isSkipped = task.status === "skipped";

            return (
              <div
                key={task.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isDone
                    ? "bg-[#FAFAF8] border-[#0F172A]/5 opacity-75"
                    : isSkipped
                    ? "bg-[#F1F5F9]/40 border-[#0F172A]/5 line-through opacity-50"
                    : "bg-white border-[#0F172A]/8 shadow-xs hover:border-[#14B8A6]/40"
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleTaskCompletion(task.id)}
                    className="mt-0.5 text-[#14B8A6] hover:scale-110 transition-transform"
                    aria-label={`Toggle ${task.title}`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
                    ) : (
                      <Circle className="w-5 h-5 text-[#64748B]/40 hover:text-[#14B8A6]" />
                    )}
                  </button>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs sm:text-sm font-semibold text-[#0F172A] ${isDone ? "line-through text-[#64748B]" : ""}`}>
                        {task.title}
                      </span>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#F1F5F9] text-[#64748B]">
                        {task.category}
                      </span>
                    </div>
                    <div className="text-xs text-[#64748B]">
                      Target: {task.target} {task.current ? `• Current: ${task.current}` : ""}
                    </div>
                    {task.impactNote && (
                      <div className="text-[11px] text-[#0F766E] font-medium pt-0.5">
                        💡 {task.impactNote}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  {!isDone && (
                    <>
                      <button
                        onClick={() => deferTask(task.id)}
                        className="text-[11px] text-[#64748B] hover:text-[#0F172A] px-2.5 py-1 rounded-lg hover:bg-[#F1F5F9]"
                      >
                        Defer
                      </button>
                      <button
                        onClick={() => skipTask(task.id, "Skipped by user")}
                        className="text-[11px] text-[#64748B] hover:text-[#0F172A] px-2.5 py-1 rounded-lg hover:bg-[#F1F5F9]"
                      >
                        Skip
                      </button>
                    </>
                  )}
                  {isDone && (
                    <span className="text-[11px] font-semibold text-[#16A34A] bg-[#16A34A]/10 px-2.5 py-1 rounded-lg">
                      Completed
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Circadian Habit Stacking Engine */}
      <HabitTracker />

      {/* Personal Health Experiments */}
      <div className="space-y-4 pt-4 border-t border-[#0F172A]/8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-[#14B8A6]" />
            <h2 className="text-base sm:text-lg font-bold text-[#0F172A]">
              Personal Health Experiments
            </h2>
          </div>
          <span className="text-xs text-[#64748B]">
            Testing hypotheses in your own physiology
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {experiments.map((exp) => {
            const isActive = exp.status === "active";
            const isCompleted = exp.status === "completed";
            const completedCheckins = exp.checkins.filter((c) => c.completed).length;
            const pct = Math.round((completedCheckins / exp.durationDays) * 100);

            return (
              <div
                key={exp.id}
                className="p-5 rounded-2xl bg-white border border-[#0F172A]/8 shadow-soft space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase text-[#0F766E] bg-[#CCFBF1] px-2 py-0.5 rounded-full">
                      {exp.category}
                    </span>
                    <h3 className="text-sm font-bold text-[#0F172A]">
                      {exp.title}
                    </h3>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
                      isActive
                        ? "bg-[#14B8A6] text-white"
                        : isCompleted
                        ? "bg-[#16A34A]/10 text-[#16A34A]"
                        : "bg-[#F1F5F9] text-[#64748B]"
                    }`}
                  >
                    {isActive ? `Day ${exp.currentDay} of 14` : isCompleted ? "Completed" : "Upcoming"}
                  </span>
                </div>

                <p className="text-xs text-[#64748B] leading-relaxed">
                  {exp.hypothesis}
                </p>

                {/* Expected biomarker delta */}
                {exp.expectedDelta && (
                  <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#0F172A]/5 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#0F172A] text-[11px]">Target Biomarker:</span>
                      <span className="font-mono text-[#0F766E] font-semibold">{exp.targetBiomarker}</span>
                    </div>
                    <div className="text-[11px] text-[#64748B]">
                      Expected Impact: <strong>{exp.expectedDelta}</strong>
                    </div>
                  </div>
                )}

                {/* 14-Day Checkin Circles */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-[11px] text-[#64748B]">
                    <span>14-Day Checkin Streak</span>
                    <span className="font-mono font-bold text-[#0F172A]">
                      {completedCheckins} / {exp.durationDays} Days ({pct}%)
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    {Array.from({ length: 14 }).map((_, i) => {
                      const dayNum = i + 1;
                      const checkin = exp.checkins.find((c) => c.day === dayNum);
                      const isDone = checkin?.completed;
                      const isCurrent = exp.currentDay === dayNum && isActive;

                      return (
                        <button
                          key={dayNum}
                          onClick={() => isActive && checkinExperiment(exp.id, dayNum)}
                          disabled={!isActive}
                          title={`Day ${dayNum}${checkin?.note ? `: ${checkin.note}` : ""}`}
                          className={`w-6 h-6 rounded-lg text-[10px] font-mono font-bold flex items-center justify-center transition-all ${
                            isDone
                              ? "bg-[#14B8A6] text-white shadow-2xs"
                              : isCurrent
                              ? "bg-white border-2 border-[#14B8A6] text-[#14B8A6]"
                              : "bg-[#F1F5F9] text-[#94A3B8]"
                          }`}
                        >
                          {isDone ? "✓" : dayNum}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Experiment Action Row */}
                <div className="pt-2 border-t border-[#0F172A]/5 flex items-center justify-between text-xs gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    {isActive ? (
                      <button
                        onClick={() => checkinExperiment(exp.id, exp.currentDay, "Completed daily protocol")}
                        className="px-3.5 py-1.5 rounded-xl bg-[#0F172A] text-white text-xs font-semibold hover:bg-[#1E293B] transition-colors"
                      >
                        Check In Today (Day {exp.currentDay})
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          startNewExperiment({
                            title: exp.title,
                            category: exp.category,
                            hypothesis: exp.hypothesis,
                            durationDays: 14,
                            targetBiomarker: exp.targetBiomarker,
                            expectedDelta: exp.expectedDelta,
                            scientificRationale: exp.scientificRationale,
                          })
                        }
                        className="px-3.5 py-1.5 rounded-xl bg-[#CCFBF1] text-[#0F766E] text-xs font-semibold hover:bg-[#99F6E4] transition-colors"
                      >
                        Activate Protocol →
                      </button>
                    )}

                    {exp.category === "nutrition" && (
                      <button
                        onClick={() => setIsNutritionModalOpen(true)}
                        className="px-3 py-1.5 rounded-xl bg-[#FAFAF8] text-[#0F766E] border border-[#14B8A6]/20 hover:bg-[#CCFBF1] transition-colors flex items-center gap-1 font-medium"
                      >
                        <Utensils className="w-3.5 h-3.5 text-[#14B8A6]" />
                        <span>Meal Blueprint</span>
                      </button>
                    )}
                  </div>

                  <span className="text-[11px] text-[#64748B]">14-Day N=1 Trial</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal: Add Custom Action */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#0F172A]">Add Daily Action</h3>
              <button onClick={() => setShowAddModal(false)} className="text-[#64748B] hover:text-[#0F172A]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[#64748B]">Action Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 15-minute mobility stretch"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full mt-1 px-3.5 py-2.5 rounded-xl border border-[#0F172A]/10 text-xs sm:text-sm text-[#0F172A]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#64748B]">Category</label>
                <select
                  value={newTaskCategory}
                  onChange={(e) => setNewTaskCategory(e.target.value as any)}
                  className="w-full mt-1 px-3.5 py-2.5 rounded-xl border border-[#0F172A]/10 text-xs sm:text-sm text-[#0F172A]"
                >
                  <option value="movement">Movement</option>
                  <option value="exercise">Exercise</option>
                  <option value="nutrition">Nutrition</option>
                  <option value="recovery">Recovery</option>
                  <option value="measurement">Measurement (BP/Weight)</option>
                  <option value="prevention">Prevention</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#64748B]">Target or Frequency</label>
                <input
                  type="text"
                  placeholder="e.g. 15 minutes before bed"
                  value={newTaskTarget}
                  onChange={(e) => setNewTaskTarget(e.target.value)}
                  className="w-full mt-1 px-3.5 py-2.5 rounded-xl border border-[#0F172A]/10 text-xs sm:text-sm text-[#0F172A]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#64748B] hover:bg-[#F1F5F9]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0F172A] text-white text-xs font-semibold hover:bg-[#1E293B]"
                >
                  Save Action
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Interactive 3-Tab Sunday Weekly Review */}
      {showSundayReview && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#0F172A]/5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#14B8A6]" />
                <h3 className="text-lg font-bold text-[#0F172A]">Sunday Weekly Review</h3>
              </div>
              <button onClick={() => setShowSundayReview(false)} className="text-[#64748B] hover:text-[#0F172A]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 pb-1 border-b border-[#0F172A]/5 text-xs">
              <button
                onClick={() => setReviewTab("compliance")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                  reviewTab === "compliance"
                    ? "bg-[#0F172A] text-white"
                    : "text-[#64748B] hover:bg-[#F1F5F9]"
                }`}
              >
                1. Weekly Compliance
              </button>
              <button
                onClick={() => setReviewTab("vitals")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                  reviewTab === "vitals"
                    ? "bg-[#0F172A] text-white"
                    : "text-[#64748B] hover:bg-[#F1F5F9]"
                }`}
              >
                2. Biomarker Shifts
              </button>
              <button
                onClick={() => setReviewTab("adjustments")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                  reviewTab === "adjustments"
                    ? "bg-[#0F172A] text-white"
                    : "text-[#64748B] hover:bg-[#F1F5F9]"
                }`}
              >
                3. Next Week Reset
              </button>
            </div>

            {/* Tab 1: Compliance */}
            {reviewTab === "compliance" && (
              <div className="space-y-3 text-xs text-[#64748B] animate-in fade-in">
                <div className="p-4 rounded-2xl bg-[#CCFBF1]/30 border border-[#14B8A6]/20 space-y-1.5 text-[#0F766E]">
                  <span className="font-bold uppercase tracking-wider text-[10px]">What Succeeded:</span>
                  <ul className="space-y-1">
                    <li>• Daily steps averaged <strong>6,920 steps</strong> (+17% week-over-week)</li>
                    <li>• Protein target hit on <strong>5 of 7 days</strong> (120g anchor)</li>
                    <li>• Blood pressure monitoring: Day 3/7 on track (average 134/84 mmHg)</li>
                  </ul>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#F97360]/10 border border-[#F97360]/20 text-[#0F172A] space-y-1">
                  <span className="font-bold uppercase tracking-wider text-[10px] text-[#F97360]">Friction Point:</span>
                  <p>Sleep duration dipped to 5h 54m on Wednesday and Thursday due to late screen exposure.</p>
                </div>
              </div>
            )}

            {/* Tab 2: Vitals */}
            {reviewTab === "vitals" && (
              <div className="space-y-3 text-xs text-[#64748B] animate-in fade-in">
                <div className="grid grid-cols-2 gap-3 text-[#0F172A]">
                  <div className="p-3.5 rounded-xl bg-[#FAFAF8] border border-[#0F172A]/5">
                    <span className="text-[10px] uppercase font-bold text-[#64748B]">Weight Trend</span>
                    <div className="text-xl font-bold font-mono">82.4 kg (-0.3 kg)</div>
                    <span className="text-[10px] text-[#16A34A] font-semibold">Steady -3.7 kg total</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#FAFAF8] border border-[#0F172A]/5">
                    <span className="text-[10px] uppercase font-bold text-[#64748B]">Resting HR</span>
                    <div className="text-xl font-bold font-mono">67 bpm (-5 bpm)</div>
                    <span className="text-[10px] text-[#16A34A] font-semibold">Aerobic adaptation</span>
                  </div>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Your cardiovascular baseline is adapting well to consistent brisk walking. Blood pressure is steady without excessive spikes.
                </p>
              </div>
            )}

            {/* Tab 3: Adjustments */}
            {reviewTab === "adjustments" && (
              <div className="space-y-3 text-xs text-[#0F172A] animate-in fade-in">
                <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 space-y-2">
                  <span className="font-bold uppercase tracking-wider text-[10px] text-[#0F766E]">
                    Coach Recommendations for Next Week:
                  </span>
                  <div className="space-y-1 text-xs text-[#64748B]">
                    <p>1. <strong>Keep Step Goal at 7,000</strong>: Do not increase steps yet; consolidate this habit first.</p>
                    <p>2. <strong>Set Bedtime Anchor to 22:15</strong>: Protect your 7-hour recovery window.</p>
                    <p>3. <strong>Complete Remaining 4 Days of BP Protocol</strong>: Conclude the ESC home record for doctor consultation.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="pt-2 flex items-center justify-between">
              {reviewSavedToast && (
                <span className="text-xs font-semibold text-[#16A34A]">✓ Week confirmed!</span>
              )}
              <div className="ml-auto flex gap-2">
                <button
                  onClick={() => setShowSundayReview(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#64748B] hover:bg-[#F1F5F9]"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setReviewSavedToast(true);
                    setTimeout(() => {
                      setReviewSavedToast(false);
                      setShowSundayReview(false);
                    }, 1200);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#0F172A] text-white text-xs font-semibold hover:bg-[#1E293B]"
                >
                  Commit & Lock In Week
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
