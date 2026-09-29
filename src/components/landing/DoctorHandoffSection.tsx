import React from "react";
import { FileText, Printer, Copy, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

export const DoctorHandoffSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-white border-t border-[#0F172A]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#CCFBF1] text-[#0F766E] text-xs font-semibold uppercase tracking-wider">
            Clinical Collaboration
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold text-[#0F172A] tracking-tight">
            Better prepared for your doctor.
          </h2>
          <p className="text-base sm:text-lg text-[#64748B]">
            Medical appointments are typically 15 minutes long. Norya compiles your home blood pressure logs, recent lab trends, and lifestyle data into a concise, 1-page clinical brief so you spend consultation time on high-value decisions.
          </p>
        </div>

        {/* Doctor Summary Paper Mockup */}
        <div className="max-w-3xl mx-auto rounded-3xl p-6 sm:p-10 bg-[#FAFAF8] border border-[#0F172A]/10 shadow-card space-y-6">
          
          {/* Header of the report */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#0F172A]/10 gap-3">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#64748B]">
                Norya Health OS • Clinical Consultation Brief
              </div>
              <h3 className="text-xl font-bold text-[#0F172A]">
                Patient Health Summary: Sarah M. (Age 44)
              </h3>
              <p className="text-xs text-[#64748B]">
                Prepared for Primary Care Consultation • Madrid, Spain
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/app"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-[#0F172A]/10 text-xs font-medium text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
              >
                <Printer className="w-3.5 h-3.5 text-[#14B8A6]" />
                <span>Export 1-Page PDF</span>
              </Link>
            </div>
          </div>

          {/* Section 1: Reason for Consult */}
          <div className="space-y-1.5 text-xs">
            <span className="font-bold text-[#0F172A] uppercase tracking-wider text-[11px]">
              1. Reason for Review
            </span>
            <div className="p-3 rounded-xl bg-white border border-[#0F172A]/5 text-[#0F172A] leading-relaxed">
              Review of 3-week home blood pressure log (average 134/84 mmHg) and follow-up on recent lipid biomarkers (ApoB 105 mg/dL).
            </div>
          </div>

          {/* Section 2: Vitals & Trends */}
          <div className="space-y-1.5 text-xs">
            <span className="font-bold text-[#0F172A] uppercase tracking-wider text-[11px]">
              2. Home Vitals & 90-Day Trends
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="p-2.5 rounded-xl bg-white border border-[#0F172A]/5">
                <div className="text-[10px] text-[#64748B]">Home BP (3-wk avg)</div>
                <div className="text-xs font-bold text-[#F97360]">134/84 mmHg</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#0F172A]/5">
                <div className="text-[10px] text-[#64748B]">Body Weight</div>
                <div className="text-xs font-bold text-[#16A34A]">82.4 kg (-3.7 kg)</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#0F172A]/5">
                <div className="text-[10px] text-[#64748B]">ApoB Particle Count</div>
                <div className="text-xs font-bold text-[#F5C76A]">105 mg/dL</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#0F172A]/5">
                <div className="text-[10px] text-[#64748B]">Resting Pulse</div>
                <div className="text-xs font-bold text-[#0F172A]">67 bpm (Stable)</div>
              </div>
            </div>
          </div>

          {/* Section 3: Suggested Questions to Discuss */}
          <div className="space-y-1.5 text-xs">
            <span className="font-bold text-[#0F172A] uppercase tracking-wider text-[11px]">
              3. Questions Prepared for Discussion
            </span>
            <div className="p-3.5 rounded-xl bg-[#CCFBF1]/30 border border-[#14B8A6]/20 space-y-2 text-[#0F766E]">
              <div className="flex items-start gap-2">
                <span>•</span>
                <span>Given my family history (father CAD at 62) and home readings (134/84), is another 6 months of lifestyle modification appropriate or do we consider low-dose therapy?</span>
              </div>
              <div className="flex items-start gap-2">
                <span>•</span>
                <span>Should we test Lp(a) once to refine long-term cardiovascular risk stratification?</span>
              </div>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="pt-2 flex justify-between items-center text-xs">
            <span className="text-[#64748B]">Zero clutter. Designed specifically for doctor review.</span>
            <Link
              href="/app"
              className="text-[#14B8A6] font-bold hover:underline flex items-center gap-1"
            >
              Generate your summary in App →
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
};
