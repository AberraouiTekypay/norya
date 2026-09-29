import React from "react";
import { BookOpen, CheckCircle, ShieldAlert, Award, FileCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export const ScienceSection: React.FC = () => {
  const pillars = [
    {
      grade: "Grade A/B",
      title: "Rigorous Evidence Grading",
      description: "We strictly differentiate between established randomized clinical trials and preliminary animal or in-vitro hypotheses. If an intervention lacks robust human data, we do not recommend it as a priority.",
      icon: Award,
    },
    {
      grade: "Guidelines",
      title: "Validated Preventive Methods",
      description: "Rooted in European Society of Cardiology, American Heart Association, and national health authorities. We use standardized clinical guidelines rather than trendy influencer protocols.",
      icon: FileCheck,
    },
    {
      grade: "Explainability",
      title: "Total Transparency & 'Why?'",
      description: "Every priority card, task, and biomarker insight includes a clear explanation of the scientific rationale, estimated benefit, and physiological mechanism. No black-box AI magic.",
      icon: BookOpen,
    },
    {
      grade: "Ethics",
      title: "Human Medicine Still Matters",
      description: "Norya acts as your intelligent health organizer and wellness coach. We know our boundaries: diagnostic decisions and prescription therapies always belong in the hands of licensed clinicians.",
      icon: ShieldAlert,
    },
  ];

  return (
    <section id="science" className="py-24 sm:py-32 bg-white border-t border-[#0F172A]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#14B8A6]/10 text-[#0F766E] text-xs font-semibold uppercase tracking-wider">
            Scientific Rigor
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold text-[#0F172A] tracking-tight">
            Evidence first. Hype never.
          </h2>
          <p className="text-base sm:text-lg text-[#64748B]">
            In an industry crowded with biohacking promises, Norya stands for scientific conservatism. We prioritize the basic interventions with the strongest proof of extending healthy life.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl bg-[#FAFAF8] border border-[#0F172A]/8 hover:border-[#14B8A6]/40 transition-colors shadow-soft space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#0F172A]/5 text-[#14B8A6] flex items-center justify-center shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-[#0F766E] bg-[#CCFBF1] px-2.5 py-1 rounded-full">
                    {pillar.grade}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#0F172A]">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA to full Science page */}
        <div className="mt-12 text-center">
          <Link
            href="/science"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0F172A] text-white font-medium text-xs sm:text-sm hover:bg-[#1E293B] shadow-sm transition-all"
          >
            <span>Read our complete approach to science & evidence</span>
            <ArrowRight className="w-4 h-4 text-[#14B8A6]" />
          </Link>
        </div>

      </div>
    </section>
  );
};
