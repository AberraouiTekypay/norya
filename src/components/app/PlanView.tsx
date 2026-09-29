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
} from "lucide-react";

export const PlanView: React.FC = () => {
  const {
    dailyTasks,
    toggleTaskCompletion,
    skipTask,
    deferTask,
    addNewTask,
    user,
  } = useHealth();

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState<
    "movement" | "exercise" | "nutrition" | "recovery" | "measurement" | "prevention"
  >("movement");
  const [newTaskTarget, setNewTaskTarget] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSundayReview, setShowSundayReview] = useState(false);

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

  const experiments = [
    {
      title: "10-Minute Post-Meal Walk",
      hypothesis: "A short 10-minute walk within 30 minutes after dinner lowers postprandial glucose peaks and aids digestion.",
      duration: "14 Days (Active: Day 6)",
      status: "In Progress",
      progress: 60,
    },
    {
      title: "14:00 Caffeine Cutoff",
      hypothesis: "Eliminating caffeine after 14:00 increases slow-wave deep sleep and stabilizes morning resting heart rate.",
      duration: "14 Days",
      status: "Upcoming",
      progress: 0,
    },
  ];

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

        <div className="flex items-center gap-2">
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
          {experiments.map((exp, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-[#0F172A]/8 shadow-soft space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#0F172A]">
                  {exp.title}
                </h3>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  exp.status === "In Progress" ? "bg-[#CCFBF1] text-[#0F766E]" : "bg-[#F1F5F9] text-[#64748B]"
                }`}>
                  {exp.status}
                </span>
              </div>

              <p className="text-xs text-[#64748B] leading-relaxed">
                {exp.hypothesis}
              </p>

              <div className="pt-2 border-t border-[#0F172A]/5 flex items-center justify-between text-xs text-[#64748B]">
                <span>Duration: {exp.duration}</span>
                {exp.progress > 0 && (
                  <span className="font-mono text-[#0F766E] font-bold">
                    {exp.progress}% Complete
                  </span>
                )}
              </div>
            </div>
          ))}
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

      {/* Modal: Sunday Weekly Review */}
      {showSundayReview && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#0F172A]/5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#14B8A6]" />
                <h3 className="text-lg font-bold text-[#0F172A]">Sunday Weekly Review</h3>
              </div>
              <button onClick={() => setShowSundayReview(false)} className="text-[#64748B] hover:text-[#0F172A]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-[#64748B]">
              <div className="p-3.5 rounded-2xl bg-[#CCFBF1]/30 border border-[#14B8A6]/20 text-[#0F766E] space-y-1">
                <span className="font-bold uppercase tracking-wider text-[10px]">What Improved This Week:</span>
                <ul className="space-y-0.5">
                  <li>• Daily steps increased by <strong>+17%</strong> (averaged 6,920 steps)</li>
                  <li>• Weight dropped smoothly by <strong>-0.3 kg</strong> to 82.4 kg</li>
                  <li>• Morning BP reading protocol: 3 of 7 readings successfully completed</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F97360]/10 border border-[#F97360]/20 text-[#0F172A] space-y-1">
                <span className="font-bold uppercase tracking-wider text-[10px] text-[#F97360]">Needs Attention Next Week:</span>
                <p>3 consecutive short nights pulled your sleep average to 5h 54m.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 text-[#0F172A] space-y-1">
                <span className="font-bold uppercase tracking-wider text-[10px] text-[#64748B]">Coach Adjustment:</span>
                <p>&ldquo;Maintain your 7,000-step target without increasing it yet. Move lights-out forward by 30 minutes to repay sleep debt.&rdquo;</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowSundayReview(false)}
                className="px-6 py-2.5 rounded-xl bg-[#0F172A] text-white text-xs font-semibold hover:bg-[#1E293B]"
              >
                Accept Next Week&apos;s Plan
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
