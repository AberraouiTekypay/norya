"use client";

import React, { useState } from "react";
import { Check, X, ShieldAlert, Sparkles } from "lucide-react";

export const AffordabilitySection: React.FC = () => {
  const [selectedBudget, setSelectedBudget] = useState<number>(50);

  const budgetBreakdowns: Record<number, { prioritize: string[]; avoid: string[] }> = {
    0: {
      prioritize: [
        "Daily 7,000–8,000 step walking habit (Free)",
        "Standardized home sleep wind-down schedule (Free)",
        "Whole-food protein anchor from legumes & eggs (No added cost)",
        "Public health system preventive screenings (Covered)",
      ],
      avoid: [
        "Private longevity clinics charging €3,000+",
        "Commercial CGMs & monthly sensor subscriptions",
        "Influencer supplement stacks",
      ],
    },
    25: {
      prioritize: [
        "Validated Omron home blood-pressure cuff (One-time €35)",
        "Basic resistance bands or local park fitness access",
        "Extra fiber-rich seeds, leafy greens, and oats",
      ],
      avoid: [
        "Unproven nootropic blends",
        "Speculative biological age DNA kits",
        "Commercial VO2max gym tests",
      ],
    },
    50: {
      prioritize: [
        "Omron validated home BP monitor + 7-day AM/PM protocol",
        "Local gym or community pool membership (€25–€35/mo)",
        "High-protein staple nutrition (wild fish, Greek yogurt, legumes)",
        "Occasional baseline ApoB check through local accredited lab",
      ],
      avoid: [
        "€100/mo continuous glucose monitors (CGMs)",
        "Proprietary cold-plunge memberships",
        "20-bottle supplement subscriptions",
      ],
    },
    100: {
      prioritize: [
        "Dedicated fitness or strength coaching session monthly",
        "Annual comprehensive metabolic/lipid blood panel (ApoB, HbA1c, Ferritin)",
        "High-quality supportive walking/running shoes",
        "Validated home smart scale & blood pressure equipment",
      ],
      avoid: [
        "Off-label longevity prescription cocktails",
        "Commercial full-body MRI scans without symptoms",
        "Expensive IV vitamin infusions",
      ],
    },
  };

  const activePlan = budgetBreakdowns[selectedBudget] || budgetBreakdowns[50];

  return (
    <section className="py-24 sm:py-32 bg-white border-t border-[#0F172A]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#14B8A6]/10 text-[#0F766E] text-xs font-semibold uppercase tracking-wider">
            Democratizing Health Intelligence
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold text-[#0F172A] tracking-tight">
            Better health shouldn&apos;t be a luxury.
          </h2>
          <p className="text-base sm:text-lg text-[#64748B]">
            You shouldn&apos;t need a private longevity clinic in Zurich, a personal physician, and thousands of euros in tests to improve your health. Norya is built for ordinary people using the resources they already have.
          </p>
        </div>

        {/* Interactive Budget Simulator */}
        <div className="max-w-4xl mx-auto rounded-3xl p-6 sm:p-10 bg-[#FAFAF8] border border-[#0F172A]/8 shadow-card">
          
          <div className="text-center space-y-3 mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Select Your Realistic Monthly Health Budget
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {[0, 25, 50, 100].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setSelectedBudget(amount)}
                  className={`px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
                    selectedBudget === amount
                      ? "bg-[#0F172A] text-white shadow-sm scale-105"
                      : "bg-white text-[#64748B] border border-[#0F172A]/10 hover:border-[#14B8A6]/40"
                  }`}
                >
                  €{amount} / month
                </button>
              ))}
            </div>
            <p className="text-xs text-[#64748B]">
              Norya adapts all recommendations to stay strictly within your budget.
            </p>
          </div>

          {/* Allocation Comparison Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 sm:p-8 rounded-2xl border border-[#0F172A]/5">
            
            {/* What Norya Recommends */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#16A34A]/10 text-[#16A34A] text-xs font-bold flex items-center justify-center">
                  ✓
                </span>
                <h4 className="text-sm font-bold text-[#0F172A] uppercase tracking-wide">
                  High-Impact Allocation (€{selectedBudget}/mo)
                </h4>
              </div>
              <ul className="space-y-3">
                {activePlan.prioritize.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-[#0F172A]">
                    <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What to Skip */}
            <div className="space-y-4 md:border-l md:border-[#0F172A]/5 md:pl-6">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#F97360]/10 text-[#F97360] text-xs font-bold flex items-center justify-center">
                  ✕
                </span>
                <h4 className="text-sm font-bold text-[#64748B] uppercase tracking-wide">
                  Unnecessary Expenses Skipped
                </h4>
              </div>
              <ul className="space-y-3">
                {activePlan.avoid.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-[#64748B]">
                    <X className="w-4 h-4 text-[#94A3B8] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          <div className="mt-8 text-center text-xs font-bold uppercase tracking-wider text-[#14B8A6]">
            Health first. Hype never.
          </div>

        </div>

      </div>
    </section>
  );
};
