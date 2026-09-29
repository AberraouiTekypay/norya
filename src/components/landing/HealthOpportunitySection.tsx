import React from "react";
import { Info, TrendingDown, ArrowRight } from "lucide-react";
import Link from "next/link";

export const HealthOpportunitySection: React.FC = () => {
  const domains = [
    { label: "Cardiovascular", score: 11, max: 25, color: "bg-[#F97360]", note: "Modifiable opportunity in home BP readings and ApoB" },
    { label: "Metabolic", score: 6, max: 20, color: "bg-[#14B8A6]", note: "Weight down 3.7 kg; HbA1c trending toward optimal 5.6%" },
    { label: "Physical Capacity", score: 6, max: 20, color: "bg-[#14B8A6]", note: "Moving from 6,780 to 7,500 daily steps yields largest boost" },
    { label: "Recovery", score: 4, max: 15, color: "bg-[#F5C76A]", note: "3 short sleep nights; resting HR slightly elevated" },
    { label: "Nutrition", score: 2, max: 10, color: "bg-[#16A34A]", note: "Consistent 120g protein anchor; healthy Mediterranean baseline" },
    { label: "Prevention", score: 2, max: 10, color: "bg-[#16A34A]", note: "Screenings up to date according to national protocols" },
  ];

  return (
    <section className="py-24 sm:py-32 bg-white border-t border-[#0F172A]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#CCFBF1] text-[#0F766E] text-xs font-semibold uppercase tracking-wider">
            Proprietary Scoring Metric
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold text-[#0F172A] tracking-tight">
            See where improvement is possible.
          </h2>
          <p className="text-base sm:text-lg text-[#64748B]">
            Instead of confusing biological age estimates or scary disease risk calculators, Norya calculates your <strong>Health Opportunity</strong>: how much modifiable improvement remains within your reach.
          </p>
        </div>

        {/* Visual Score Card */}
        <div className="max-w-4xl mx-auto rounded-3xl p-6 sm:p-10 bg-[#FAFAF8] border border-[#0F172A]/8 shadow-card">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-[#0F172A]/8">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                Overall Health Opportunity
              </span>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl sm:text-6xl font-bold tracking-tight text-[#0F172A]">
                  31
                </span>
                <span className="text-sm font-medium text-[#64748B]">
                  out of 100 max opportunity
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#16A34A]">
                <TrendingDown className="w-4 h-4" />
                <span>Down 7 points over 90 days (Favorable improvement)</span>
              </div>
            </div>

            <div className="sm:max-w-xs text-xs text-[#64748B] leading-relaxed p-3 rounded-2xl bg-white border border-[#0F172A]/5">
              💡 <strong>How to read this score:</strong> A lower score means you have successfully addressed the low-hanging fruit in your health. 0 is the theoretical minimum unaddressed risk.
            </div>
          </div>

          {/* 6 Domain Breakdown Bars */}
          <div className="mt-8 space-y-5">
            <div className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Breakdown by Health Domain
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {domains.map((item, idx) => {
                const percentage = Math.round((item.score / item.max) * 100);
                return (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-[#0F172A]/5 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-[#0F172A]">{item.label}</span>
                      <span className="font-mono text-[#64748B]">
                        {item.score} / {item.max} pts
                      </span>
                    </div>

                    <div className="w-full h-2 rounded-full bg-[#F1F5F9] overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    <p className="text-[11px] text-[#64748B] leading-normal">
                      {item.note}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Clinical Disclaimer */}
          <div className="mt-8 pt-6 border-t border-[#0F172A]/8 flex items-start gap-2.5 text-xs text-[#64748B]">
            <Info className="w-4 h-4 text-[#14B8A6] shrink-0 mt-0.5" />
            <p>
              <strong>Clinical & Regulatory Disclaimer:</strong> Health Opportunity is an internal Norya prioritization and habit-tracking index. It is not a diagnostic tool, medical device, or validated clinical prognostic risk calculator (such as Framingham or SCORE2).
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
