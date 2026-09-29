import React from "react";
import { ShieldCheck, Clock, MessageSquare, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const PreventionSection: React.FC = () => {
  const checklist = [
    { title: "Standardized Blood Pressure Check", freq: "Semi-annual or 7-day protocol", status: "Due Soon", color: "bg-[#F5C76A]/20 text-[#B45309]", icon: Clock, note: "Day 3 of 7 AM/PM protocol active" },
    { title: "Fasting Lipid & ApoB Evaluation", freq: "Annual / 6 months", status: "Complete", color: "bg-[#16A34A]/10 text-[#16A34A]", icon: CheckCircle2, note: "Completed Sep 8 (105 mg/dL)" },
    { title: "HbA1c & Fasting Glucose Screening", freq: "Annual", status: "Complete", color: "bg-[#16A34A]/10 text-[#16A34A]", icon: CheckCircle2, note: "Completed Sep 8 (5.7%)" },
    { title: "Cervical Screening (HPV / Cytology)", freq: "Every 3–5 years (age 25–65)", status: "Complete", color: "bg-[#16A34A]/10 text-[#16A34A]", icon: CheckCircle2, note: "Next due November 2027" },
    { title: "Comprehensive Dental & Gum Exam", freq: "Every 6–12 months", status: "Due Soon", color: "bg-[#F5C76A]/20 text-[#B45309]", icon: Clock, note: "Recommended by October 2026" },
    { title: "Colorectal Screening (FIT Test)", freq: "Biennial (starting at age 50 or 45 with family history)", status: "Discuss with clinician", color: "bg-[#38BDF8]/15 text-[#0284C7]", icon: MessageSquare, note: "Review at next primary doctor visit" },
    { title: "Ophthalmology / Intraocular Pressure", freq: "Every 2 years after age 40", status: "Complete", color: "bg-[#16A34A]/10 text-[#16A34A]", icon: CheckCircle2, note: "Last checked May 2025" },
    { title: "Vaccination & Booster Review", freq: "Annual / Seasonal", status: "Complete", color: "bg-[#16A34A]/10 text-[#16A34A]", icon: CheckCircle2, note: "Tetanus/Diphtheria and seasonal up to date" },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#FAFAF8] border-t border-[#0F172A]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#14B8A6]/10 text-[#0F766E] text-xs font-semibold uppercase tracking-wider">
            Preventive Engine
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold text-[#0F172A] tracking-tight">
            Healthy isn&apos;t just how you feel today.
          </h2>
          <p className="text-base sm:text-lg text-[#64748B]">
            True longevity is preventing the conditions that steal decades of healthy living. Norya builds an age-, sex-, and country-tailored checklist so you never miss an essential screening.
          </p>
        </div>

        {/* Organized Checklist Grid */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-[#0F172A]/8 shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#0F172A]/5 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                Preventive Health Checklist
              </span>
              <h3 className="text-lg font-semibold text-[#0F172A]">
                Personalized for Sarah (Age 44, Spain / Europe)
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-[#16A34A] bg-[#16A34A]/10 px-3 py-1 rounded-full">
                6 of 8 Tasks Current
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {checklist.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 flex items-start justify-between gap-3 hover:border-[#14B8A6]/30 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-[#0F172A]">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-[#64748B]">
                      {item.freq}
                    </div>
                    <div className="text-[11px] text-[#0F766E] font-medium pt-1">
                      {item.note}
                    </div>
                  </div>

                  <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full shrink-0 flex items-center gap-1 ${item.color}`}>
                    <Icon className="w-3 h-3" />
                    {item.status}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-[#0F172A]/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
            <span>
              Follows European Society of Cardiology and national primary care preventive frameworks.
            </span>
            <Link
              href="/app"
              className="text-xs font-bold text-[#14B8A6] hover:underline"
            >
              Open Your Prevention Plan →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
