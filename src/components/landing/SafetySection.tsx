import React from "react";
import { ShieldCheck, Stethoscope, AlertTriangle, PhoneCall } from "lucide-react";
import Link from "next/link";

export const SafetySection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#FAFAF8] border-t border-[#0F172A]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#14B8A6]/10 text-[#0F766E] text-xs font-semibold uppercase tracking-wider">
            Safety & Boundaries
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold text-[#0F172A] tracking-tight">
            AI should know its limits.
          </h2>
          <p className="text-base sm:text-lg text-[#64748B]">
            Norya is engineered for health education, habit coaching, and personal health organization. We maintain strict system-level boundaries to ensure you always know when clinical oversight is required.
          </p>
        </div>

        {/* 3 Boundary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          {/* Card 1: What Norya does */}
          <div className="rounded-3xl p-6 sm:p-8 bg-white border border-[#14B8A6]/30 shadow-soft space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#CCFBF1] text-[#0F766E] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0F172A]">
              Where Norya excels
            </h3>
            <ul className="space-y-2.5 text-xs text-[#64748B]">
              <li className="flex items-start gap-2">
                <span className="text-[#14B8A6] font-bold">✓</span>
                <span>Unifying fragmented wearables & lab reports</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#14B8A6] font-bold">✓</span>
                <span>Identifying your top 3 highest-leverage habits</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#14B8A6] font-bold">✓</span>
                <span>Explaining biological terms in plain language</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#14B8A6] font-bold">✓</span>
                <span>Preparing structured summaries for doctor visits</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Clinician Consultations */}
          <div className="rounded-3xl p-6 sm:p-8 bg-white border border-[#F5C76A]/40 shadow-soft space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#F5C76A]/20 text-[#B45309] flex items-center justify-center">
              <Stethoscope className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0F172A]">
              Consult your doctor for
            </h3>
            <ul className="space-y-2.5 text-xs text-[#64748B]">
              <li className="flex items-start gap-2">
                <span className="text-[#B45309] font-bold">•</span>
                <span>Starting, altering, or stopping medications</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#B45309] font-bold">•</span>
                <span>Diagnosing medical conditions or chronic illnesses</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#B45309] font-bold">•</span>
                <span>Formal treatment protocols and prescription orders</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#B45309] font-bold">•</span>
                <span>Investigating marked biomarker abnormalities</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Emergency Red Flags */}
          <div className="rounded-3xl p-6 sm:p-8 bg-white border border-[#F97360]/30 shadow-soft space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#F97360]/10 text-[#F97360] flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0F172A]">
              Emergency Situations
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Norya is not an emergency care service. If you experience chest pain, sudden numbness, severe breathing difficulty, or confusion, call emergency services immediately:
            </p>
            <div className="p-3 rounded-xl bg-[#F97360]/10 border border-[#F97360]/20 text-xs font-semibold text-[#0F172A] space-y-1">
              <div className="flex items-center justify-between">
                <span>🇪🇸 Spain & Europe:</span>
                <span className="text-[#F97360] font-mono font-bold">112</span>
              </div>
              <div className="flex items-center justify-between">
                <span>🇲🇦 Morocco (SAMU):</span>
                <span className="text-[#F97360] font-mono font-bold">15</span>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-8 text-center">
          <Link
            href="/medical-disclaimer"
            className="text-xs font-semibold text-[#64748B] hover:text-[#0F172A] underline"
          >
            Review our complete Medical & Regulatory Disclaimer →
          </Link>
        </div>

      </div>
    </section>
  );
};
