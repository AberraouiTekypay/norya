import React from "react";
import { FolderLock, Target, CalendarCheck, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export const SolutionSection: React.FC = () => {
  const features = [
    {
      number: "01",
      icon: FolderLock,
      title: "Everything in one place",
      subtitle: "Personal Health Vault",
      description:
        "Bring together your wearable logs, blood tests, clinical documents, blood pressure records, and body measurements into a single, encrypted, beautifully organized vault.",
      highlights: ["Automatic lab biomarker extraction", "Longitudinal timeline since 2024", "Export for doctors at any time"],
      visualTag: "Vault & Timeline",
    },
    {
      number: "02",
      icon: Target,
      title: "Know what matters most",
      subtitle: "Rule-Based Prioritization Engine",
      description:
        "Instead of bombarding you with 50 different metrics, Norya calculates your highest-leverage opportunities and exposes only the Top 3 priorities. We also tell you what you can safely ignore.",
      highlights: ["Evidence Grade A-E transparency", "Max 3 priorities at any time", "Zero biohacking theater"],
      visualTag: "Priority Matrix",
    },
    {
      number: "03",
      icon: CalendarCheck,
      title: "Get a plan you can actually follow",
      subtitle: "Daily & Weekly Action Engine",
      description:
        "Complex health science converted into practical, low-friction habits: step targets, brisk walks, protein anchors, and measurement reminders tailored to your monthly budget.",
      highlights: ["Never more than 4-5 actions per day", "Adaptive goals when life gets busy", "Zero calorie-counting obsession"],
      visualTag: "Action Engine",
    },
    {
      number: "04",
      icon: TrendingUp,
      title: "See whether it works",
      subtitle: "Health Opportunity & Trend Tracking",
      description:
        "Track meaningful biological trends across months and years. See your Health Opportunity score drop as your blood pressure, ApoB, weight, and fitness improve.",
      highlights: ["Personal best comparisons", "Proprietary opportunity score", "Measurable habit adherence"],
      visualTag: "Progress Metrics",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-white border-t border-[#0F172A]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#CCFBF1] text-[#0F766E] text-xs font-semibold uppercase tracking-wider">
            The Solution
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold text-[#0F172A] tracking-tight">
            One health system built around you.
          </h2>
          <p className="text-base sm:text-lg text-[#64748B]">
            Designed to reduce complexity rather than generate more notifications. Simple on the surface, rigorous underneath.
          </p>
        </div>

        {/* 4 Alternating Feature Blocks */}
        <div className="space-y-16">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            const isEven = idx % 2 === 1;

            return (
              <div
                key={idx}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                  isEven ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Text Column */}
                <div
                  className={`lg:col-span-6 space-y-5 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-[#14B8A6] bg-[#CCFBF1] px-2.5 py-1 rounded-lg">
                      {feat.number}
                    </span>
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#64748B]">
                      {feat.subtitle}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-semibold text-[#0F172A] tracking-tight">
                    {feat.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                    {feat.description}
                  </p>

                  <div className="space-y-2.5 pt-2">
                    {feat.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-[#0F172A]">
                        <CheckCircle className="w-4 h-4 text-[#14B8A6] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <Link
                      href="/app"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#14B8A6] hover:text-[#0F766E] transition-colors"
                    >
                      <span>Explore this in the Health OS</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Visual Card Column */}
                <div
                  className={`lg:col-span-6 ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="rounded-3xl p-6 sm:p-8 bg-[#FAFAF8] border border-[#0F172A]/8 shadow-soft">
                    <div className="flex items-center justify-between pb-4 border-b border-[#0F172A]/5 mb-6">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#0F172A]">
                        <Icon className="w-4 h-4 text-[#14B8A6]" />
                        <span>Norya Core Feature</span>
                      </div>
                      <span className="text-[11px] font-mono font-medium text-[#64748B] bg-white px-2 py-0.5 rounded-full border border-[#0F172A]/5">
                        {feat.visualTag}
                      </span>
                    </div>

                    {/* Micro-preview dependent on card */}
                    {idx === 0 && (
                      <div className="space-y-3">
                        <div className="p-3.5 rounded-xl bg-white border border-[#0F172A]/5 flex items-center justify-between">
                          <span className="text-xs font-semibold text-[#0F172A]">Laboratorios Echevarne PDF</span>
                          <span className="text-[11px] text-[#16A34A] bg-[#16A34A]/10 px-2 py-0.5 rounded">7 biomarkers parsed</span>
                        </div>
                        <div className="p-3.5 rounded-xl bg-white border border-[#0F172A]/5 flex items-center justify-between">
                          <span className="text-xs font-semibold text-[#0F172A]">Apple Health Wearable Stream</span>
                          <span className="text-[11px] text-[#0F766E] bg-[#CCFBF1] px-2 py-0.5 rounded">6,780 steps 30d avg</span>
                        </div>
                        <div className="p-3.5 rounded-xl bg-white border border-[#0F172A]/5 flex items-center justify-between">
                          <span className="text-xs font-semibold text-[#0F172A]">Home Blood Pressure Cuff</span>
                          <span className="text-[11px] text-[#F97360] bg-[#F97360]/10 px-2 py-0.5 rounded">134/84 mmHg logged</span>
                        </div>
                      </div>
                    )}

                    {idx === 1 && (
                      <div className="space-y-2.5">
                        <div className="p-3 rounded-xl bg-white border-l-4 border-l-[#F97360] border border-[#0F172A]/5">
                          <div className="text-xs font-semibold text-[#0F172A]">1. Blood Pressure Protocol</div>
                          <div className="text-[11px] text-[#64748B]">Evidence: Grade A • Cost: €0</div>
                        </div>
                        <div className="p-3 rounded-xl bg-white border-l-4 border-l-[#14B8A6] border border-[#0F172A]/5">
                          <div className="text-xs font-semibold text-[#0F172A]">2. Aerobic Fitness Base (7,000 steps)</div>
                          <div className="text-[11px] text-[#64748B]">Evidence: Grade A • Cost: €0</div>
                        </div>
                        <div className="p-3 rounded-xl bg-white border-l-4 border-l-[#16A34A] border border-[#0F172A]/5">
                          <div className="text-xs font-semibold text-[#0F172A]">3. Weight & Protein Baseline (120g)</div>
                          <div className="text-[11px] text-[#64748B]">Evidence: Grade A • Cost: Low</div>
                        </div>
                      </div>
                    )}

                    {idx === 2 && (
                      <div className="space-y-2">
                        <div className="p-3 rounded-xl bg-white border border-[#0F172A]/5 flex items-center justify-between">
                          <span className="text-xs text-[#0F172A]">Morning Blood Pressure Reading</span>
                          <span className="text-xs text-[#16A34A] font-semibold">Done ✓</span>
                        </div>
                        <div className="p-3 rounded-xl bg-white border border-[#14B8A6]/20 flex items-center justify-between">
                          <span className="text-xs text-[#0F172A]">35-Minute Outdoor Brisk Walk</span>
                          <span className="text-xs text-[#14B8A6] font-semibold">Planned for 16:30</span>
                        </div>
                        <div className="p-3 rounded-xl bg-white border border-[#0F172A]/5 flex items-center justify-between">
                          <span className="text-xs text-[#0F172A]">120g Daily Protein Target</span>
                          <span className="text-xs text-[#64748B]">85g / 120g logged</span>
                        </div>
                      </div>
                    )}

                    {idx === 3 && (
                      <div className="p-4 rounded-xl bg-white border border-[#0F172A]/5 space-y-3">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-semibold text-[#0F172A]">Health Opportunity Score</span>
                          <span className="font-bold text-[#16A34A]">31 (-7 in 90 days)</span>
                        </div>
                        <div className="w-full bg-[#F1F5F9] h-2.5 rounded-full overflow-hidden">
                          <div className="bg-[#14B8A6] h-full rounded-full w-[31%]" />
                        </div>
                        <div className="flex justify-between text-[11px] text-[#64748B]">
                          <span>Weight: 82.4 kg (-3.7 kg)</span>
                          <span>ApoB: 105 mg/dL (-7)</span>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
