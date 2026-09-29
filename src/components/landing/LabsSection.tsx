import React from "react";
import { UploadCloud, FileText, CheckCircle2, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";
import Link from "next/link";

export const LabsSection: React.FC = () => {
  const parsedMarkers = [
    { name: "Apolipoprotein B (ApoB)", val: "105 mg/dL", ref: "< 90 mg/dL", status: "Mildly Elevated", color: "text-[#F97360] bg-[#F97360]/10", delta: "-7 mg/dL vs Mar" },
    { name: "Glycated Hemoglobin (HbA1c)", val: "5.7 %", ref: "< 5.7 %", status: "Borderline / Improving", color: "text-[#F5C76A] bg-[#F5C76A]/20", delta: "-0.2% vs Mar" },
    { name: "LDL Cholesterol", val: "138 mg/dL", ref: "< 115 mg/dL", status: "Elevated", color: "text-[#F97360] bg-[#F97360]/10", delta: "-8 mg/dL vs Mar" },
    { name: "Triglycerides (Fasting)", val: "142 mg/dL", ref: "< 150 mg/dL", status: "Optimal", color: "text-[#16A34A] bg-[#16A34A]/10", delta: "-26 mg/dL vs Mar" },
    { name: "Ferritin (Iron Storage)", val: "48 ng/mL", ref: "20–150 ng/mL", status: "Optimal", color: "text-[#16A34A] bg-[#16A34A]/10", delta: "+10 ng/mL vs Mar" },
    { name: "Vitamin D (25-OH)", val: "29 ng/mL", ref: "> 30 ng/mL", status: "Borderline", color: "text-[#F5C76A] bg-[#F5C76A]/20", delta: "+5 ng/mL vs Mar" },
  ];

  return (
    <section className="py-24 sm:py-32 bg-white border-t border-[#0F172A]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#CCFBF1] text-[#0F766E] text-xs font-semibold uppercase tracking-wider">
            Lab & Biomarker Intelligence
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold text-[#0F172A] tracking-tight">
            Your blood tests shouldn&apos;t require a medical degree to understand.
          </h2>
          <p className="text-base sm:text-lg text-[#64748B]">
            Upload a PDF, clinic photo, or screenshot. Norya organizes the results, tracks them over time, explains what the markers mean in plain language, and highlights questions to discuss with your doctor.
          </p>
        </div>

        {/* Interactive Lab Pipeline Simulation */}
        <div className="max-w-5xl mx-auto rounded-3xl p-6 sm:p-10 bg-[#FAFAF8] border border-[#0F172A]/8 shadow-card">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Upload Mock Box */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-white border-2 border-dashed border-[#14B8A6]/40 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-[#CCFBF1] text-[#14B8A6] flex items-center justify-center shadow-xs">
                <UploadCloud className="w-7 h-7" />
              </div>
              <div className="text-sm font-semibold text-[#0F172A]">
                Drag & Drop Lab PDF or Photo
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Supports clinical reports from Echevarne, Synlab, Labco, Quest, or hospital portals.
              </p>
              <div className="pt-2">
                <Link
                  href="/app"
                  className="px-4 py-2 rounded-xl bg-[#0F172A] text-white text-xs font-medium hover:bg-[#1E293B] transition-colors"
                >
                  Test Upload in App
                </Link>
              </div>
            </div>

            {/* Extracted Biomarker Table */}
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-[#64748B] px-1">
                <span>Verified Biomarkers (6 of 7 shown)</span>
                <span className="text-[#0F766E] font-medium">Standardized Reference Ranges</span>
              </div>

              <div className="space-y-2">
                {parsedMarkers.map((marker, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white border border-[#0F172A]/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-[#14B8A6]/30 transition-colors"
                  >
                    <div>
                      <div className="text-xs font-semibold text-[#0F172A]">{marker.name}</div>
                      <div className="text-[11px] text-[#64748B]">
                        Reference: {marker.ref} • {marker.delta}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-[#0F172A] font-mono">{marker.val}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${marker.color}`}>
                        {marker.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Educational interpretation highlight */}
          <div className="mt-8 p-4 rounded-2xl bg-white border border-[#14B8A6]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-[#14B8A6] shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-semibold text-[#0F172A]">
                  AI Educational Synthesis
                </div>
                <div className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
                  &ldquo;ApoB and LDL-C are trending favorably following your 3.7 kg weight reduction. Continue soluble fiber and Mediterranean fats; prepare questions on Lp(a) testing for your physician.&rdquo;
                </div>
              </div>
            </div>

            <Link
              href="/app"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#14B8A6] text-[#0F172A] font-bold text-xs shrink-0 shadow-xs hover:bg-[#0D9488] transition-colors"
            >
              <span>See Lab Analysis Flow</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 pt-4 border-t border-[#0F172A]/5 text-center text-xs text-[#64748B]">
            Norya provides educational organization and health information. We do not diagnose diseases or prescribe pharmaceutical interventions.
          </div>

        </div>

      </div>
    </section>
  );
};
