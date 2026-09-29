import React from "react";
import { ArrowDown, AlertCircle, Sparkles, CheckCircle2 } from "lucide-react";

export const ProblemSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1F5F9] text-[#64748B] text-xs font-semibold uppercase tracking-wider">
            The Fundamental Problem
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold text-[#0F172A] tracking-tight leading-tight">
            You already have enough health data. <br />
            <span className="text-[#14B8A6]">What you need is clarity.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
            Wearables measure sleep. Labs measure biomarkers. Apps track workouts. Doctors hold medical records. But nobody tells you which information matters most, or what simple action to take next.
          </p>
        </div>

        {/* Visual flow: Fragmented inputs -> Norya engine -> 3 Priorities */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-[#0F172A]/8 shadow-card">
          <div className="text-center text-xs font-bold uppercase tracking-wider text-[#64748B] mb-6">
            From fragmented noise to focused execution
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center mb-8">
            <div className="p-3 rounded-xl bg-[#F1F5F9]/80 border border-[#0F172A]/5 text-xs text-[#0F172A] font-medium">
              📱 Apple Health & Steps
            </div>
            <div className="p-3 rounded-xl bg-[#F1F5F9]/80 border border-[#0F172A]/5 text-xs text-[#0F172A] font-medium">
              ⌚ Watch Sleep & HRV
            </div>
            <div className="p-3 rounded-xl bg-[#F1F5F9]/80 border border-[#0F172A]/5 text-xs text-[#0F172A] font-medium">
              🩸 Lab PDF (ApoB, HbA1c)
            </div>
            <div className="p-3 rounded-xl bg-[#F1F5F9]/80 border border-[#0F172A]/5 text-xs text-[#0F172A] font-medium">
              🩺 Blood Pressure & Weight
            </div>
          </div>

          {/* Flow convergence indicator */}
          <div className="flex flex-col items-center justify-center my-4">
            <div className="w-12 h-12 rounded-full bg-[#14B8A6]/10 text-[#14B8A6] flex items-center justify-center shadow-xs animate-bounce">
              <ArrowDown className="w-6 h-6" />
            </div>
            <div className="mt-2 px-4 py-1.5 rounded-full bg-[#0F172A] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" />
              Norya Prioritization Engine
            </div>
          </div>

          {/* Result: 3 Clear Priorities */}
          <div className="mt-8 pt-8 border-t border-[#0F172A]/10">
            <div className="text-center mb-4">
              <span className="text-xs uppercase font-bold tracking-wider text-[#0F766E] bg-[#CCFBF1] px-3 py-1 rounded-full">
                Your Output: 3 Highest-Leverage Actions
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#F97360]/20 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#F97360] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-[#0F172A]">Blood Pressure</h4>
                  <p className="text-xs text-[#64748B] mt-0.5">Standardized 7-day home measurement protocol</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#14B8A6]/30 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#14B8A6] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-[#0F172A]">Cardio Fitness Base</h4>
                  <p className="text-xs text-[#64748B] mt-0.5">7,000 steps + 35-min brisk outdoor walk</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#16A34A]/20 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#16A34A] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-[#0F172A]">Metabolic Trajectory</h4>
                  <p className="text-xs text-[#64748B] mt-0.5">Sustain weight trend & 120g protein anchor</p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center text-xs text-[#64748B]">
              Every priority includes evidence grade, expected benefit, and what you can safely ignore right now.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
