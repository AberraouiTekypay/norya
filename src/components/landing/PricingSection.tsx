import React from "react";
import { Check, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-24 sm:py-32 bg-white border-t border-[#0F172A]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#14B8A6]/10 text-[#0F766E] text-xs font-semibold uppercase tracking-wider">
            Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold text-[#0F172A] tracking-tight">
            Start free. Improve from there.
          </h2>
          <p className="text-base sm:text-lg text-[#64748B]">
            Norya will always offer a comprehensive, non-gimmicky free tier for everyday health tracking. No aggressive paywalls. No subscription surprises.
          </p>
        </div>

        {/* 2-Tier Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Tier 1: Free Tier */}
          <div className="rounded-3xl p-6 sm:p-8 bg-[#FAFAF8] border border-[#0F172A]/8 shadow-soft flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                  Norya Core
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#CCFBF1] text-[#0F766E]">
                  Free Forever
                </span>
              </div>

              <div>
                <div className="text-4xl font-bold text-[#0F172A]">€0</div>
                <div className="text-xs text-[#64748B] mt-1">Full access to health fundamentals</div>
              </div>

              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Everything required to centralize your wearable data, understand your blood tests, and focus on your top 3 health priorities.
              </p>

              <div className="pt-4 border-t border-[#0F172A]/5 space-y-2.5">
                {[
                  "Personal health profile & data vault",
                  "Apple Health & Google Health sync",
                  "Lab test uploads (PDF / photos)",
                  "Top 3 priority engine with Grade A/B evidence",
                  "Today's practical action checklist",
                  "10 AI Health Coach interactions / month",
                  "Age- & region-tailored prevention checklist",
                  "Standard Health Opportunity Score",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-[#0F172A]">
                    <Check className="w-4 h-4 text-[#14B8A6] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/app"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0F172A] text-white font-medium text-xs sm:text-sm hover:bg-[#1E293B] transition-all"
              >
                <span>Launch Free Health OS</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#14B8A6]" />
              </Link>
            </div>
          </div>

          {/* Tier 2: Norya Plus */}
          <div className="rounded-3xl p-6 sm:p-8 bg-white border-2 border-[#14B8A6]/40 shadow-card flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#14B8A6] text-[#0F172A] font-bold text-[10px] tracking-wider uppercase px-4 py-1 rounded-bl-xl">
              Coming Soon
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#14B8A6]">
                  Norya Plus
                </span>
                <span className="text-xs font-medium text-[#64748B]">
                  Beta Enrolling
                </span>
              </div>

              <div>
                <div className="text-4xl font-bold text-[#0F172A]">
                  €7.99 <span className="text-base font-normal text-[#64748B]">/ month</span>
                </div>
                <div className="text-xs text-[#64748B] mt-1">
                  Expected launch pricing (€7.99–€9.99/mo depending on region)
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                For individuals wanting unlimited conversational health intelligence, personal habit experiments, and doctor appointment preparation briefs.
              </p>

              <div className="pt-4 border-t border-[#0F172A]/5 space-y-2.5">
                {[
                  "Everything in Norya Free, plus:",
                  "Unlimited contextual AI Health Coach",
                  "Advanced multi-year trend correlations",
                  "1-Page Doctor Consultation Brief generator",
                  "Personal lifestyle experiments (e.g. caffeine, post-meal walking)",
                  "Deep biomarker longitudinal curves",
                  "Priority OCR lab extraction & verification",
                  "Sunday adaptive weekly health reviews",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-[#0F172A]">
                    <Sparkles className="w-4 h-4 text-[#14B8A6] shrink-0" />
                    <span className={idx === 0 ? "font-bold text-[#0F172A]" : ""}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="#waitlist"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#14B8A6] text-[#0F172A] font-bold text-xs sm:text-sm hover:bg-[#0D9488] shadow-sm transition-all"
              >
                <span>Join Plus Early Access List</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

        {/* Safety Note */}
        <div className="mt-12 text-center text-xs text-[#64748B] max-w-xl mx-auto flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#14B8A6] shrink-0" />
          <span>
            Emergency and clinical red-flag features are never locked behind paywalls. Safety protocols are always available to all users.
          </span>
        </div>

      </div>
    </section>
  );
};
