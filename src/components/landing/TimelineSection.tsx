import React from "react";
import { Sparkles, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export const TimelineSection: React.FC = () => {
  const timelineData = [
    {
      year: "2024",
      period: "Baseline Health Balance",
      metrics: [
        { label: "Weight", val: "86.1 kg" },
        { label: "Blood Pressure", val: "121/78 mmHg" },
        { label: "Daily Steps", val: "7,800 avg" },
      ],
      insight: "Metabolic and cardiovascular foundations stable. Low unaddressed opportunity.",
      badge: "Optimal Baseline",
      badgeColor: "bg-[#16A34A]/10 text-[#16A34A]",
    },
    {
      year: "2025",
      period: "Lifestyle Shift & Work Stress",
      metrics: [
        { label: "Daily Activity", val: "-21% (5,200 steps)" },
        { label: "Average Sleep", val: "-32 mins (6h 04m)" },
        { label: "Resting HR", val: "+5 bpm (72 bpm)" },
      ],
      insight: "Drop in daily movement coincided with shortened sleep windows and rising resting pulse.",
      badge: "Gradual Shift",
      badgeColor: "bg-[#F5C76A]/20 text-[#B45309]",
    },
    {
      year: "2026 (Early)",
      period: "Cardiometabolic Signal",
      metrics: [
        { label: "Weight", val: "86.1 kg" },
        { label: "Blood Pressure", val: "136/86 mmHg" },
        { label: "HbA1c / ApoB", val: "5.9% / 112 mg/dL" },
      ],
      insight: "Persistent lower movement and sleep debt mirrored rising arterial pressure and particle count.",
      badge: "Opportunity Identified",
      badgeColor: "bg-[#F97360]/15 text-[#F97360]",
    },
    {
      year: "2026 (Current with Norya)",
      period: "Targeted Habit Recovery",
      metrics: [
        { label: "Weight", val: "82.4 kg (-3.7 kg)" },
        { label: "Blood Pressure", val: "134/84 mmHg (AM Protocol)" },
        { label: "HbA1c / ApoB", val: "5.7% / 105 mg/dL" },
      ],
      insight: "Standardized walking and protein anchor reversing glycation and lipid markers.",
      badge: "Favorable Trajectory",
      badgeColor: "bg-[#CCFBF1] text-[#0F766E]",
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#FAFAF8] border-t border-[#0F172A]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#14B8A6]/10 text-[#0F766E] text-xs font-semibold uppercase tracking-wider">
            Longitudinal Health Context
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold text-[#0F172A] tracking-tight">
            Your health makes more sense when you see the whole story.
          </h2>
          <p className="text-base sm:text-lg text-[#64748B]">
            Isolated blood tests and random weigh-ins tell you where you are today. Norya connects years of habits and biomarkers so you understand how you got here.
          </p>
        </div>

        {/* Timeline Visualization */}
        <div className="max-w-4xl mx-auto relative">
          
          {/* Vertical Connecting Line */}
          <div className="hidden sm:block absolute left-8 top-6 bottom-6 w-0.5 bg-[#0F172A]/10 -z-0" />

          <div className="space-y-8 relative z-10">
            {timelineData.map((item, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
                
                {/* Timeline node */}
                <div className="w-16 h-16 rounded-2xl bg-white border border-[#0F172A]/10 shadow-xs flex flex-col items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4 text-[#14B8A6] mb-0.5" />
                  <span className="text-xs font-bold text-[#0F172A]">{item.year}</span>
                </div>

                {/* Content Card */}
                <div className="flex-1 rounded-3xl p-6 sm:p-7 bg-white border border-[#0F172A]/8 shadow-soft space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-base sm:text-lg font-semibold text-[#0F172A]">
                      {item.period}
                    </h4>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>

                  {/* Metrics grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {item.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="p-3 rounded-xl bg-[#FAFAF8] border border-[#0F172A]/5">
                        <div className="text-[11px] uppercase tracking-wider text-[#64748B] font-semibold">
                          {m.label}
                        </div>
                        <div className="text-sm font-bold text-[#0F172A] mt-0.5">
                          {m.val}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Norya Observation */}
                  <div className="p-3.5 rounded-xl bg-[#CCFBF1]/40 border border-[#14B8A6]/20 flex items-start gap-2.5 text-xs text-[#0F766E] leading-relaxed">
                    <Sparkles className="w-4 h-4 text-[#14B8A6] shrink-0 mt-0.5" />
                    <div>
                      <strong>Norya Contextual Insight:</strong> {item.insight}
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

        <div className="mt-12 text-center">
          <Link
            href="/app"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#14B8A6] hover:underline"
          >
            <span>Explore your own personal health timeline in Norya</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
};
