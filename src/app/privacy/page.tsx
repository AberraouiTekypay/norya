import React from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Lock, Shield, Eye } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy (GDPR) — Norya",
  description: "Privacy policy, data encryption standards, and GDPR compliance for Norya Health OS.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#0F172A]">
      <Navbar />
      <main className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#CCFBF1] text-[#0F766E] text-xs font-semibold uppercase tracking-wider">
            Data Sovereignity
          </div>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#0F172A]">
            Privacy Policy
          </h1>
          <p className="text-sm text-[#64748B]">
            Last updated: September 2026 • Compliant with EU General Data Protection Regulation (GDPR)
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-[#0F172A]/8 shadow-card space-y-6 text-sm text-[#64748B] leading-relaxed">
          <section className="space-y-2">
            <h3 className="text-base font-bold text-[#0F172A]">
              1. Our Foundational Privacy Promise
            </h3>
            <p>
              Health data is sacred. <strong>Norya does not sell, broker, or monetize your health data, blood test records, or biometric metrics to third-party advertisers, insurance corporations, or pharmaceutical brokers.</strong>
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-[#0F172A]">
              2. Special Category Health Data (Article 9 GDPR)
            </h3>
            <p>
              Under Article 9 of the EU GDPR, physiological biomarkers, blood test files, heart rate measurements, and medical history constitute special category data. We process this information exclusively based on your explicit, affirmative consent to provide personalized health organization and coaching features.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-[#0F172A]">
              3. Data Encryption & Storage
            </h3>
            <p>
              All data transmitted to Norya is encrypted in transit using TLS 1.3 and encrypted at rest with AES-256. Database instances and file storage buckets are hosted in sovereign European data centers adhering to ISO 27001 and SOC 2 Type II compliance.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-[#0F172A]">
              4. Your Rights: Export & Account Deletion
            </h3>
            <p>
              You maintain total ownership of your health record. At any time in your Norya Profile Settings, you can:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Export all metrics, biomarker trends, and task logs in structured JSON/CSV format.</li>
              <li>Instantly trigger complete account deletion, which permanently purges all uploaded lab PDFs and associated records.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-[#0F172A]">
              5. Contacting the Data Protection Officer
            </h3>
            <p>
              For any inquiries regarding data protection or to exercise your GDPR rights, please contact our Data Protection Officer at <strong>privacy@getnorya.com</strong>.
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
