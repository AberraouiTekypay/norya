"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Activity, Heart, Footprints, AlertCircle } from "lucide-react";

export const Hero: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"priorities" | "today" | "coach">("priorities");

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle atmospheric ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-gradient-to-tr from-[#14B8A6]/15 via-[#CCFBF1]/25 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Text Core */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Subtle Category Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#CCFBF1]/60 border border-[#14B8A6]/20 text-[#0F766E] text-xs font-semibold tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] animate-pulse" />
            Science-First Personal Health OS
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-[#0F172A] leading-[1.08]">
            Your health. <br className="hidden sm:inline" />
            <span className="text-[#14B8A6]">One place.</span> One plan.
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-[#64748B] leading-relaxed max-w-2xl mx-auto font-normal">
            Connect your health data, upload your blood tests and reports, and let Norya turn everything into a simple, science-backed plan focused on what matters most.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              href="#waitlist"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#0F172A] text-white text-base font-medium hover:bg-[#1E293B] shadow-md hover:shadow-lg transition-all group"
            >
              <span>Get Early Access</span>
              <ArrowRight className="w-4 h-4 text-[#14B8A6] group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/app"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white border border-[#0F172A]/10 text-[#0F172A] text-base font-medium hover:bg-[#F8FAFC] hover:border-[#14B8A6]/30 shadow-xs transition-all"
            >
              <Activity className="w-4 h-4 text-[#14B8A6]" />
              <span>Explore Live Health OS</span>
            </Link>
          </div>

          {/* Trust Line */}
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-[#64748B]/90 pt-1">
            <ShieldCheck className="w-4 h-4 text-[#14B8A6]" />
            <span>Built around evidence. Designed for everyday life. Not biohacking hype.</span>
          </div>
        </div>

        {/* HERO PRODUCT VISUAL: The Central Norya Interface */}
        <div className="mt-14 max-w-4xl mx-auto">
          <div className="relative rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-[#0F172A]/10 via-[#0F172A]/5 to-transparent border border-white/60 shadow-float backdrop-blur-xs">
            <div className="rounded-2xl bg-white border border-[#0F172A]/10 overflow-hidden shadow-xs">
              
              {/* Product Window Header */}
              <div className="bg-[#FAFAF8] px-4 py-3 border-b border-[#0F172A]/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#F97360]/70" />
                  <div className="w-3 h-3 rounded-full bg-[#F5C76A]/70" />
                  <div className="w-3 h-3 rounded-full bg-[#16A34A]/70" />
                  <span className="ml-2 text-xs text-[#64748B] font-medium hidden sm:inline">
                    app.getnorya.com — Personal Health Operating System
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#CCFBF1] text-[#0F766E] text-xs font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6]" />
                    Synced: Apple Health & Labs
                  </span>
                  <Link
                    href="/app"
                    className="text-xs font-semibold text-[#14B8A6] hover:underline hidden sm:inline"
                  >
                    Open Full Screen →
                  </Link>
                </div>
              </div>

              {/* Product Main Dashboard Body */}
              <div className="p-5 sm:p-8 bg-[#FAFAF8] space-y-6">
                
                {/* Greeting & Health Status Pill */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-xs uppercase tracking-wider font-semibold text-[#64748B]">
                      Tuesday, September 29
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-[#0F172A] tracking-tight">
                      Good morning, Sarah
                    </h2>
                  </div>
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white border border-[#0F172A]/5 shadow-xs">
                    <div className="text-right">
                      <div className="text-[11px] uppercase tracking-wider text-[#64748B] font-semibold">
                        Health Status
                      </div>
                      <div className="text-xs font-medium text-[#16A34A] flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
                        Favorable Trajectory
                      </div>
                    </div>
                    <div className="h-7 w-px bg-[#0F172A]/10" />
                    <div className="text-right">
                      <div className="text-[11px] uppercase tracking-wider text-[#64748B] font-semibold">
                        Opportunity Score
                      </div>
                      <div className="text-sm font-bold text-[#0F172A]">
                        31 <span className="text-[11px] font-normal text-[#16A34A]">(-7 in 90d)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Preview Switcher */}
                <div className="flex items-center gap-2 border-b border-[#0F172A]/5 pb-1">
                  <button
                    onClick={() => setActiveTab("priorities")}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                      activeTab === "priorities"
                        ? "bg-[#0F172A] text-white shadow-xs"
                        : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9]"
                    }`}
                  >
                    1. Top 3 Priorities
                  </button>
                  <button
                    onClick={() => setActiveTab("today")}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                      activeTab === "today"
                        ? "bg-[#0F172A] text-white shadow-xs"
                        : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9]"
                    }`}
                  >
                    2. Today&apos;s Plan
                  </button>
                  <button
                    onClick={() => setActiveTab("coach")}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                      activeTab === "coach"
                        ? "bg-[#0F172A] text-white shadow-xs"
                        : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9]"
                    }`}
                  >
                    3. AI Coach Response
                  </button>
                </div>

                {/* Tab 1: Top 3 Priorities */}
                {activeTab === "priorities" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                      <span>What matters most right now (Max 3)</span>
                      <span className="text-[#14B8A6] font-normal">Evidence Grade A</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {/* Priority 1 */}
                      <div className="p-4 rounded-2xl bg-white border border-[#F97360]/20 shadow-xs relative overflow-hidden group hover:border-[#F97360]/40 transition-all">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-[#F97360]" />
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-[#F97360] uppercase tracking-wider">
                            Priority #1
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F97360]/10 text-[#F97360]">
                            Needs attention
                          </span>
                        </div>
                        <h4 className="text-base font-semibold text-[#0F172A] mb-1">
                          Blood Pressure
                        </h4>
                        <p className="text-xs text-[#64748B] leading-relaxed">
                          Home readings average 134/84 mmHg. 7-day measurement protocol in progress.
                        </p>
                        <div className="mt-3 pt-2.5 border-t border-[#0F172A]/5 flex items-center justify-between text-[11px] text-[#0F172A]">
                          <span className="font-medium text-[#0F766E]">Next: Log AM reading</span>
                          <span className="text-[#64748B]">Cost: €0</span>
                        </div>
                      </div>

                      {/* Priority 2 */}
                      <div className="p-4 rounded-2xl bg-white border border-[#14B8A6]/20 shadow-xs relative overflow-hidden group hover:border-[#14B8A6]/40 transition-all">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-[#14B8A6]" />
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-[#14B8A6] uppercase tracking-wider">
                            Priority #2
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#CCFBF1] text-[#0F766E]">
                            Improving
                          </span>
                        </div>
                        <h4 className="text-base font-semibold text-[#0F172A] mb-1">
                          Aerobic Fitness Base
                        </h4>
                        <p className="text-xs text-[#64748B] leading-relaxed">
                          6,780 steps 30-day average. Target 7,000 + brisk 35-min walks 4x/week.
                        </p>
                        <div className="mt-3 pt-2.5 border-t border-[#0F172A]/5 flex items-center justify-between text-[11px] text-[#0F172A]">
                          <span className="font-medium text-[#0F766E]">Next: 35-min walk</span>
                          <span className="text-[#64748B]">Cost: €0</span>
                        </div>
                      </div>

                      {/* Priority 3 */}
                      <div className="p-4 rounded-2xl bg-white border border-[#16A34A]/20 shadow-xs relative overflow-hidden group hover:border-[#16A34A]/40 transition-all">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-[#16A34A]" />
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-[#16A34A] uppercase tracking-wider">
                            Priority #3
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#16A34A]/10 text-[#16A34A]">
                            Stable
                          </span>
                        </div>
                        <h4 className="text-base font-semibold text-[#0F172A] mb-1">
                          Weight & Metabolic
                        </h4>
                        <p className="text-xs text-[#64748B] leading-relaxed">
                          82.4 kg (-3.7 kg in 6mo). ApoB at 105 mg/dL. 120g protein anchor.
                        </p>
                        <div className="mt-3 pt-2.5 border-t border-[#0F172A]/5 flex items-center justify-between text-[11px] text-[#0F172A]">
                          <span className="font-medium text-[#0F766E]">Preserve lean mass</span>
                          <span className="text-[#64748B]">ApoB: 105</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Today's Plan */}
                {activeTab === "today" && (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                      <span>Today&apos;s practical actions (4 max)</span>
                      <span className="text-[#14B8A6]">1 of 4 completed</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div className="p-3.5 rounded-xl bg-white border border-[#0F172A]/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
                          <div>
                            <div className="text-sm font-semibold text-[#0F172A] line-through text-[#64748B]">
                              Morning Blood Pressure
                            </div>
                            <div className="text-xs text-[#64748B]">132/83 mmHg logged at 07:45</div>
                          </div>
                        </div>
                        <span className="text-[11px] font-medium text-[#16A34A] bg-[#16A34A]/10 px-2 py-0.5 rounded-md">
                          Done
                        </span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white border border-[#14B8A6]/30 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Footprints className="w-5 h-5 text-[#14B8A6]" />
                          <div>
                            <div className="text-sm font-semibold text-[#0F172A]">7,000 Daily Steps</div>
                            <div className="text-xs text-[#64748B]">5,420 / 7,000 steps (77%)</div>
                          </div>
                        </div>
                        <span className="text-[11px] font-medium text-[#0F766E] bg-[#CCFBF1] px-2 py-0.5 rounded-md">
                          Active
                        </span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white border border-[#0F172A]/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Activity className="w-5 h-5 text-[#64748B]" />
                          <div>
                            <div className="text-sm font-semibold text-[#0F172A]">35-Minute Brisk Walk</div>
                            <div className="text-xs text-[#64748B]">Planned for afternoon daylight</div>
                          </div>
                        </div>
                        <span className="text-[11px] font-medium text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded-md">
                          Pending
                        </span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white border border-[#0F172A]/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Heart className="w-5 h-5 text-[#64748B]" />
                          <div>
                            <div className="text-sm font-semibold text-[#0F172A]">120g Protein Target</div>
                            <div className="text-xs text-[#64748B]">85g logged so far</div>
                          </div>
                        </div>
                        <span className="text-[11px] font-medium text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded-md">
                          Pending
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: AI Coach Interaction */}
                {activeTab === "coach" && (
                  <div className="p-4 rounded-2xl bg-[#0F172A] text-white space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#CCFBF1]">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" />
                        Context-Aware Response
                      </span>
                      <span className="text-[#94A3B8] text-[11px]">Synced with Sarah&apos;s wearables</span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#1E293B] text-xs text-[#E2E8F0]">
                      <span className="font-semibold text-white">Sarah: </span>
                      &ldquo;Why am I more tired today? Should I push through a hard run?&rdquo;
                    </div>

                    <div className="p-3 rounded-xl bg-[#0F766E]/20 border border-[#14B8A6]/20 text-xs text-white leading-relaxed space-y-2">
                      <p>
                        Your sleep averaged <strong>5h 54m</strong> over the last 3 nights versus your 7h 02m baseline. Your resting heart rate is also <strong>+5 bpm</strong> above your normal rest state.
                      </p>
                      <p className="text-[#CCFBF1]">
                        I recommend active recovery today: a 30-45 minute easy walk instead of high-intensity training.
                      </p>
                    </div>

                    <div className="flex gap-2 pt-1">
                      <span className="px-2.5 py-1 rounded-lg bg-white/10 text-[11px] text-white">
                        ✓ 30-45m easy walk
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-white/10 text-[11px] text-white">
                        ✓ Earlier bedtime
                      </span>
                    </div>
                  </div>
                )}

                {/* Ask Norya Quick Input Bar */}
                <div className="pt-2">
                  <div className="relative">
                    <input
                      type="text"
                      readOnly
                      value="Ask Norya anything: 'Why is blood pressure my top priority?' or 'Explain my ApoB'"
                      className="w-full pl-4 pr-24 py-3 rounded-xl bg-white border border-[#0F172A]/10 text-xs sm:text-sm text-[#64748B] shadow-2xs cursor-pointer hover:border-[#14B8A6]/40 transition-colors"
                    />
                    <Link
                      href="/app"
                      className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-[#0F172A] text-white text-xs font-medium hover:bg-[#1E293B] transition-colors"
                    >
                      Ask AI Coach
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
