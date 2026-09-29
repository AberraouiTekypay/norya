import React from "react";
import { Check, Sparkles, Activity, FileText, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export const ShowcaseSection: React.FC = () => {
  const screens = [
    {
      title: "Home Cockpit",
      subtitle: "Instant orientation in under 10 seconds",
      desc: "Top 3 priorities, daily plan, and biometric trend at a glance.",
      tag: "Daily Overview",
      link: "/app",
    },
    {
      title: "Contextual AI Coach",
      subtitle: "Conversational health intelligence",
      desc: "Grounded answers citing your real sleep, labs, and vitals.",
      tag: "Intelligence",
      link: "/app",
    },
    {
      title: "Biomarker Extraction",
      subtitle: "Automatic OCR and clinical mapping",
      desc: "Turn messy lab PDFs into longitudinal biomarker curves.",
      tag: "Labs & Tests",
      link: "/app",
    },
    {
      title: "6 Health Domains",
      subtitle: "Cardiovascular, Metabolic, Recovery...",
      desc: "Comprehensive physiological monitoring without clinical clutter.",
      tag: "Whole Person",
      link: "/app",
    },
    {
      title: "Execution Plan",
      subtitle: "Actionable weekly targets",
      desc: "Adaptive habits that fit your real schedule and monthly budget.",
      tag: "Habits",
      link: "/app",
    },
    {
      title: "Health Opportunity",
      subtitle: "Proprietary 0–100 progress score",
      desc: "Clear visual proof that your daily actions are moving the needle.",
      tag: "Outcomes",
      link: "/app",
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#FAFAF8] border-t border-[#0F172A]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#14B8A6]/10 text-[#0F766E] text-xs font-semibold uppercase tracking-wider">
            User Experience
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold text-[#0F172A] tracking-tight">
            Designed to make health feel clear.
          </h2>
          <p className="text-base sm:text-lg text-[#64748B]">
            Apple-level clarity, Oura-level elegance, and Notion-level organization. Every screen was built to reduce cognitive load and keep you focused on what actually improves your health.
          </p>
        </div>

        {/* Art-Directed Multi-Card Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {screens.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-white border border-[#0F172A]/8 hover:border-[#14B8A6]/40 transition-all shadow-soft flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-[#0F766E] bg-[#CCFBF1] px-2.5 py-0.5 rounded-full">
                    {item.tag}
                  </span>
                  <span className="text-xs font-mono text-[#94A3B8]">0{idx + 1}</span>
                </div>

                <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#14B8A6] transition-colors">
                  {item.title}
                </h3>

                <div className="text-xs font-semibold text-[#64748B]">
                  {item.subtitle}
                </div>

                <p className="text-xs text-[#64748B] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-[#0F172A]/5 flex items-center justify-between">
                <Link
                  href={item.link}
                  className="text-xs font-bold text-[#0F172A] group-hover:text-[#14B8A6] transition-colors flex items-center gap-1.5"
                >
                  <span>Launch Screen</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom prompt to open full app */}
        <div className="mt-14 text-center">
          <Link
            href="/app"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#0F172A] text-white font-medium text-sm hover:bg-[#1E293B] shadow-md transition-all group"
          >
            <span>Experience the Live Norya App Experience</span>
            <ArrowRight className="w-4 h-4 text-[#14B8A6] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
};
