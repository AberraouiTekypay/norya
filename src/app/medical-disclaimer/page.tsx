import React from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { ShieldAlert, PhoneCall, AlertTriangle } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Medical & Regulatory Disclaimer — Norya",
  description: "Comprehensive medical disclaimer, clinical safety boundaries, and emergency contact procedures for Norya Health OS.",
};

export default function MedicalDisclaimerPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#0F172A]">
      <Navbar />
      <main className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F97360]/10 text-[#F97360] text-xs font-semibold uppercase tracking-wider">
            Clinical Safety & Transparency
          </div>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#0F172A]">
            Medical & Regulatory Disclaimer
          </h1>
          <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto">
            Please read this information carefully before using Norya (getnorya.com and app.getnorya.com).
          </p>
        </div>

        {/* Emergency Notice Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#F97360]/10 border border-[#F97360]/30 space-y-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-[#F97360]" />
            <h2 className="text-lg font-bold text-[#0F172A]">
              Not for Medical Emergencies
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#0F172A] leading-relaxed">
            If you believe you may be experiencing a medical emergency (such as severe chest pain, radiating left arm pain, difficulty speaking or facial drooping, severe shortness of breath, sudden numbness, or loss of consciousness), <strong>do not use Norya</strong>. Immediately contact your local emergency medical service:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-white text-xs font-semibold text-[#0F172A] flex justify-between items-center shadow-2xs">
              <span>🇪🇸 Spain & Europe:</span>
              <span className="text-[#F97360] font-mono text-base font-bold">112</span>
            </div>
            <div className="p-3 rounded-xl bg-white text-xs font-semibold text-[#0F172A] flex justify-between items-center shadow-2xs">
              <span>🇲🇦 Morocco (SAMU):</span>
              <span className="text-[#F97360] font-mono text-base font-bold">15</span>
            </div>
          </div>
        </div>

        {/* Main Terms of Medical Use */}
        <div className="p-8 rounded-3xl bg-white border border-[#0F172A]/8 shadow-card space-y-6 text-sm text-[#64748B] leading-relaxed">
          <section className="space-y-2">
            <h3 className="text-base font-bold text-[#0F172A]">
              1. Informational & Wellness Nature Only
            </h3>
            <p>
              Norya is a software application designed solely for personal health organization, lifestyle habit tracking, educational interpretation of consumer biomarkers, and wellness coaching. Norya is <strong>not a medical device</strong> under EU MDR (Regulation (EU) 2017/745) or equivalent jurisdictions and does not perform autonomous medical diagnosis, clinical prognosis, or clinical treatment.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-[#0F172A]">
              2. No Doctor-Patient Relationship
            </h3>
            <p>
              Use of Norya, including interactions with the Norya AI Health Coach, does not establish a physician-patient, clinician-patient, or any other healthcare provider relationship. The outputs provided by the software should never be interpreted as clinical advice or medical instructions.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-[#0F172A]">
              3. Medications and Treatments
            </h3>
            <p>
              Never alter, discontinue, adjust dosage, or begin any prescription medication based on information, trends, or coaching interactions in Norya. Any changes to pharmacotherapy must be conducted under the direct supervision of a licensed physician.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-[#0F172A]">
              4. Accuracy of Consumer Devices & OCR
            </h3>
            <p>
              Smartphones, consumer smartwatches, and optical character recognition (OCR) tools are subject to measurement variance and reading errors. Norya does not guarantee the absolute clinical precision of wearable sensor data or laboratory extraction. Always verify extracted values against original clinical lab printouts before making health decisions.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-[#0F172A]">
              5. The Health Opportunity Score
            </h3>
            <p>
              The &ldquo;Health Opportunity Score&rdquo; is a proprietary software metric intended to illustrate lifestyle focus areas. It is not an officially validated medical risk algorithm (such as SCORE2, ASCVD, or QRISK3) and must not be used to calculate clinical cardiovascular morbidity or mortality risk.
            </p>
          </section>
        </div>

        <div className="text-center pt-4">
          <Link
            href="/"
            className="text-xs font-semibold text-[#14B8A6] hover:underline"
          >
            ← Return to Norya Home
          </Link>
        </div>

      </main>
      <Footer />
    </div>
  );
}
