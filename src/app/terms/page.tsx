import React from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service — Norya",
  description: "Terms of service and user agreements for Norya Health OS.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#0F172A]">
      <Navbar />
      <main className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#CCFBF1] text-[#0F766E] text-xs font-semibold uppercase tracking-wider">
            User Agreement
          </div>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#0F172A]">
            Terms of Service
          </h1>
          <p className="text-sm text-[#64748B]">
            Effective Date: September 2026 • Governing Law: Spain & European Union
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-[#0F172A]/8 shadow-card space-y-6 text-sm text-[#64748B] leading-relaxed">
          <section className="space-y-2">
            <h3 className="text-base font-bold text-[#0F172A]">
              1. Acceptance of Terms
            </h3>
            <p>
              By accessing or using Norya (&ldquo;getnorya.com&rdquo; and &ldquo;app.getnorya.com&rdquo;), you agree to be bound by these Terms of Service. If you do not agree to these terms, you must discontinue use of the platform immediately.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-[#0F172A]">
              2. Eligibility & Age Restriction
            </h3>
            <p>
              You must be at least 18 years of age to register an account and use Norya. Norya is designed for independent adults seeking personal wellness and habit organization.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-[#0F172A]">
              3. Wellness Software, Not Medical Care
            </h3>
            <p>
              You acknowledge that Norya is a technology software platform designed to organize personal health information. You agree that Norya does not practice medicine, nursing, or emergency care, and that all medical treatment decisions remain solely between you and your licensed healthcare providers.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-[#0F172A]">
              4. Subscription & Pricing
            </h3>
            <p>
              Norya provides a core free service alongside an optional &ldquo;Norya Plus&rdquo; subscription. Paid subscriptions are billed in accordance with the selected monthly cycle and can be cancelled at any time without punitive termination fees.
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
