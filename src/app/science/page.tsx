import React from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Award, BookOpen, FileCheck, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Science & Evidence — Norya",
  description: "Evidence first. Hype never. Learn how Norya filters biomedical interventions using rigorous clinical evidence grading.",
};

export default function SciencePage() {
  const grades = [
    { grade: "Grade A", label: "Established Consensus", desc: "Supported by multiple large randomized controlled trials (RCTs) or meta-analyses with consistent human clinical endpoints (e.g. blood pressure control, aerobic movement, sustained weight moderation)." },
    { grade: "Grade B", label: "Strong Evidence", desc: "Supported by well-designed prospective cohort studies or individual robust RCTs with clear biological mechanisms." },
    { grade: "Grade C", label: "Reasonable / Emerging", desc: "Supported by preliminary clinical trials or observational correlations; recommended only when cost and risk are negligible." },
    { grade: "Grade D", label: "Preliminary / Speculative", desc: "In-vitro or animal data; not sufficiently substantiated in humans to justify consumer expense or habit displacement." },
    { grade: "Grade E", label: "Ineffective or Unsafe", desc: "Disproven by randomized clinical trials or carrying unfavorable safety and cost ratios. Excluded by Norya." },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#0F172A]">
      <Navbar />
      <main className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#CCFBF1] text-[#0F766E] text-xs font-semibold uppercase tracking-wider">
            Scientific Charter
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-[#0F172A]">
            Evidence First. Hype Never.
          </h1>
          <p className="text-base sm:text-lg text-[#64748B] max-w-2xl mx-auto">
            How Norya filters biomedical interventions to keep everyday people focused on what actually extends healthy lifespan.
          </p>
        </div>

        {/* Core Principles */}
        <div className="p-8 rounded-3xl bg-white border border-[#0F172A]/8 shadow-card space-y-6">
          <h2 className="text-xl font-bold text-[#0F172A]">
            The 4 Tenets of Norya Science
          </h2>

          <div className="space-y-4 text-sm text-[#64748B] leading-relaxed">
            <p>
              <strong>1. Hierarchy of Evidence:</strong> Not all studies are equal. A sensational headline based on mice does not justify purchasing a €90 bottle of synthetic pills. Norya requires human clinical verification before promoting any recommendation.
            </p>
            <p>
              <strong>2. Action Prioritization over Feature Count:</strong> Providing 50 different metrics creates decision paralysis. The highest value service is identifying the <strong>3 highest-leverage actions</strong> and explicitly labeling lower-yield interventions as &ldquo;not important right now.&rdquo;
            </p>
            <p>
              <strong>3. Respect for Clinical Medicine:</strong> We reject the anti-doctor ethos common in modern biohacking circles. Primary care physicians, cardiologists, and public screening programs are the backbone of preventive longevity.
            </p>
            <p>
              <strong>4. Total Transparency:</strong> You can tap any priority card in Norya to inspect the evidence grade, physiological mechanism, and estimated clinical benefit.
            </p>
          </div>
        </div>

        {/* Evidence Grading Scale */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[#0F172A]">
            The Norya Evidence Grading Scale
          </h2>

          <div className="space-y-3">
            {grades.map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white border border-[#0F172A]/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#0F766E] bg-[#CCFBF1] px-2 py-0.5 rounded">
                      {item.grade}
                    </span>
                    <span className="text-sm font-bold text-[#0F172A]">{item.label}</span>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 rounded-3xl bg-[#0F172A] text-white text-center space-y-4">
          <h3 className="text-2xl font-bold">See Norya in Action</h3>
          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl mx-auto">
            Experience our evidence-based personal health operating system directly in your browser.
          </p>
          <div className="pt-2">
            <Link
              href="/app"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#14B8A6] text-[#0F172A] font-bold text-xs sm:text-sm hover:bg-[#0D9488] transition-colors"
            >
              <span>Explore Live Health OS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
