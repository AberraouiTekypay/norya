"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, Shield, Activity, RefreshCw } from "lucide-react";
import Link from "next/link";

export const AICoachShowcase: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<"tired" | "cgm" | "bloodtest">("tired");

  return (
    <section id="coach" className="py-24 sm:py-32 bg-[#0F172A] text-white relative overflow-hidden">
      {/* Soft teal atmospheric glow in dark background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-[#14B8A6]/10 to-[#38BDF8]/10 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14B8A6]/15 border border-[#14B8A6]/30 text-[#CCFBF1] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" />
            Contextual Health Intelligence
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-tight">
            An AI coach that understands your health — <br />
            <span className="text-[#14B8A6]">not just your questions.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
            Generic chatbots give generic advice. Norya retrieves your actual sleep trends, resting heart rate shifts, and blood test biomarkers to generate grounded, practical answers.
          </p>

          {/* Interactive Scenario Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <button
              onClick={() => setActiveScenario("tired")}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                activeScenario === "tired"
                  ? "bg-[#14B8A6] text-[#0F172A] font-bold shadow-glow"
                  : "bg-white/10 text-white hover:bg-white/15"
              }`}
            >
              1. &ldquo;Why am I more tired today?&rdquo;
            </button>
            <button
              onClick={() => setActiveScenario("cgm")}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                activeScenario === "cgm"
                  ? "bg-[#14B8A6] text-[#0F172A] font-bold shadow-glow"
                  : "bg-white/10 text-white hover:bg-white/15"
              }`}
            >
              2. &ldquo;Should I buy a continuous glucose monitor?&rdquo;
            </button>
            <button
              onClick={() => setActiveScenario("bloodtest")}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                activeScenario === "bloodtest"
                  ? "bg-[#14B8A6] text-[#0F172A] font-bold shadow-glow"
                  : "bg-white/10 text-white hover:bg-white/15"
              }`}
            >
              3. &ldquo;Explain my ApoB blood test&rdquo;
            </button>
          </div>
        </div>

        {/* Conversation Box */}
        <div className="max-w-3xl mx-auto rounded-3xl p-6 sm:p-10 bg-[#1E293B]/70 border border-white/10 shadow-2xl backdrop-blur-md space-y-6">
          
          {/* User message */}
          <div className="flex justify-end">
            <div className="max-w-lg rounded-2xl rounded-tr-xs p-4 bg-[#14B8A6] text-[#0F172A] text-sm font-medium shadow-sm">
              {activeScenario === "tired" && "Why am I more tired today? Should I push through a hard gym workout?"}
              {activeScenario === "cgm" && "Should I buy a CGM (continuous glucose monitor) to optimize my health?"}
              {activeScenario === "bloodtest" && "Can you explain my ApoB result from my blood test? Why does it matter?"}
            </div>
          </div>

          {/* Norya Context Pill */}
          <div className="flex items-center gap-2 text-xs text-[#94A3B8] border-b border-white/10 pb-3">
            <Activity className="w-3.5 h-3.5 text-[#14B8A6]" />
            <span>Norya retrieved Sarah&apos;s data:</span>
            {activeScenario === "tired" && (
              <span className="font-mono text-[#CCFBF1]">Sleep 5h 54m (vs 7h 02m avg) • RHR +5 bpm</span>
            )}
            {activeScenario === "cgm" && (
              <span className="font-mono text-[#CCFBF1]">HbA1c 5.7% (optimal trend) • €50/mo budget</span>
            )}
            {activeScenario === "bloodtest" && (
              <span className="font-mono text-[#CCFBF1]">ApoB 105 mg/dL • Father heart disease at 62</span>
            )}
          </div>

          {/* Norya Assistant response */}
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-xl bg-[#14B8A6] text-[#0F172A] font-bold flex items-center justify-center shrink-0 text-sm">
              N
            </div>
            <div className="space-y-4 text-sm text-[#E2E8F0] leading-relaxed max-w-xl">
              
              {activeScenario === "tired" && (
                <>
                  <p>
                    Your sleep averaged <strong>5h 54m</strong> over the last three nights, versus your usual <strong>7h 02m</strong> baseline. Your resting heart rate this morning is also <strong>5 bpm</strong> above your recent baseline.
                  </p>
                  <p>
                    Today I would prioritize recovery over a hard workout. Pushing through high-intensity training right now will unnecessarily elevate cortisol and delay adaptation.
                  </p>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <span className="text-xs uppercase font-bold text-[#14B8A6] tracking-wider">
                      Recommended Action for Today
                    </span>
                    <ul className="text-xs space-y-1.5 text-white/90">
                      <li>• 30–45 minute easy outdoor walk in natural daylight</li>
                      <li>• 500ml water with electrolytes before lunch</li>
                      <li>• Move lights-out forward to 22:15 tonight</li>
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <Link
                      href="/app"
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
                    >
                      Explain why sleep alters BP
                    </Link>
                    <Link
                      href="/app"
                      className="px-3 py-1.5 rounded-lg bg-[#14B8A6]/20 text-[#CCFBF1] hover:bg-[#14B8A6]/30 text-xs font-semibold transition-colors"
                    >
                      Adjust today&apos;s plan to Active Recovery
                    </Link>
                  </div>
                </>
              )}

              {activeScenario === "cgm" && (
                <>
                  <p>
                    <strong>Not important for you right now.</strong>
                  </p>
                  <p>
                    Your HbA1c is already moving in the right direction (5.7% down from 5.9%), and you are not diabetic. A continuous glucose monitor costs €70–€100 every month and will not change your top 3 priorities.
                  </p>
                  <p className="text-[#CCFBF1]">
                    Your €50/month health budget is far better spent on quality whole foods, a validated blood-pressure monitor, or comfortable walking shoes.
                  </p>
                  <div className="flex gap-2 pt-2">
                    <span className="px-3 py-1 rounded-md bg-white/10 text-xs text-[#94A3B8]">
                      Save: €800+/year on unnecessary gadgets
                    </span>
                  </div>
                </>
              )}

              {activeScenario === "bloodtest" && (
                <>
                  <p>
                    Apolipoprotein B (ApoB) counts the exact number of circulating atherogenic particles that can penetrate arterial walls.
                  </p>
                  <p>
                    Your result is <strong>105 mg/dL</strong> (down from 112 mg/dL in March). Because your father had coronary heart disease at 62, managing particle count (&lt;80-90 mg/dL) is a proven lever for long-term arterial protection.
                  </p>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs text-[#CCFBF1]">
                    💡 Suggested question for your doctor: &ldquo;Given my father&apos;s history and ApoB of 105, is continuing our lifestyle protocol for 6 more months appropriate before considering pharmacotherapy?&rdquo;
                  </div>
                  <div className="pt-2">
                    <Link
                      href="/app"
                      className="inline-flex items-center gap-1.5 text-xs text-[#14B8A6] font-semibold hover:underline"
                    >
                      <span>Prepare this for your next doctor appointment</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </>
              )}

            </div>
          </div>

          {/* Under conversation disclaimer & capability badge */}
          <div className="pt-4 border-t border-white/10 text-center text-xs text-[#94A3B8]">
            Norya can <strong className="text-white">explain</strong>, <strong className="text-white">prioritize</strong>, <strong className="text-white">adapt</strong>, and tell you when something needs a qualified healthcare professional.
          </div>

        </div>

        {/* CTA to test the Coach live in App */}
        <div className="mt-12 text-center">
          <Link
            href="/app"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#14B8A6] text-[#0F172A] font-semibold text-sm hover:bg-[#0D9488] shadow-glow transition-all"
          >
            <span>Try the interactive AI Coach in Norya App</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
