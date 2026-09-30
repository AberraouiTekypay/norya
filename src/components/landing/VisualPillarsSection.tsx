"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Stethoscope,
  ShieldCheck,
  Heart,
  Baby,
  Pill,
  ArrowRight,
  Database,
  CheckCircle2,
} from "lucide-react";

export const VisualPillarsSection: React.FC = () => {
  return (
    <section className="py-24 bg-white border-y border-[#0F172A]/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">
        
        {/* Pillar 1: Circle of Care (Family Care across Borders) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Image */}
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden shadow-2xl border border-[#0F172A]/10 aspect-video lg:aspect-[4/3] group">
            <Image
              src="/images/family-care.jpg"
              alt="Three generations sharing laughter and health together at Mediterranean table"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
                Generational Continuity
              </span>
              <p className="text-sm font-semibold text-white/95 mt-1">
                Sarah (44, Madrid), Mohamed (72, Casablanca), and Sofia (11).
              </p>
            </div>
          </div>

          {/* Copy */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#CCFBF1]/60 text-[#0F766E] text-xs font-semibold tracking-wide uppercase">
              <Users className="w-3.5 h-3.5" />
              Circle of Care
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] leading-tight">
              Health isn&apos;t solitary. <br />
              <span className="text-[#0F766E]">Look after the people who matter most.</span>
            </h2>

            <p className="text-base text-[#64748B] leading-relaxed">
              Most health apps treat you like an isolated island. In real life, you are coordinating prescription renewals for your aging parents in Casablanca or Rabat, while scheduling pediatric wellness checks for your daughter in Madrid.
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-[#CCFBF1] text-[#0F766E] flex items-center justify-center shrink-0 mt-0.5">
                  <Pill className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0F172A]">Parent Medication & Interaction Auditing</h4>
                  <p className="text-xs text-[#64748B]">Verify that elder prescriptions (Atorvastatin, Aspirin Protect) don&apos;t clash with over-the-counter supplements or herbal remedies.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-[#FFF1F2] text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Baby className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0F172A]">Pediatric Cardiovascular Roadmap (Ages 9–11)</h4>
                  <p className="text-xs text-[#64748B]">Follow EAS & AAP consensus to establish clean baseline lipid panels before adolescent hormonal surges begin.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/app"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#0F766E] hover:text-[#0F172A] group"
              >
                <span>Explore Family Profiles in the Cockpit</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>

        </div>

        {/* Pillar 2: Doctor Mode (Collaborative Medicine) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Copy (Left on desktop) */}
          <div className="lg:col-span-6 space-y-6 text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F0FDFA] text-[#0F766E] text-xs font-semibold tracking-wide uppercase">
              <Stethoscope className="w-3.5 h-3.5" />
              Doctor Mode
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] leading-tight">
              Prepared for your doctor. <br />
              <span className="text-[#0F766E]">Not replacing them.</span>
            </h2>

            <p className="text-base text-[#64748B] leading-relaxed">
              Physicians have an average of 8 to 12 minutes per consultation. They don&apos;t have time to sift through 20 separate PDF lab printouts or scrolling smartwatch screenshots.
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-[#CCFBF1] text-[#0F766E] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0F172A]">Standardized 7-Day Blood Pressure Protocol (HBPM)</h4>
                  <p className="text-xs text-[#64748B]">Eliminate &ldquo;white-coat hypertension&rdquo; with the clinically validated 3-reading morning and evening protocol mean.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-[#FAFAF8] text-[#0F172A] flex items-center justify-center shrink-0 mt-0.5">
                  <Database className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0F172A]">HL7 FHIR R4 & Mon Espace Santé Export</h4>
                  <p className="text-xs text-[#64748B]">One-click export ready for hospital EHRs (Epic, Cerner) and European national digital health platforms.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/app"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#0F766E] hover:text-[#0F172A] group"
              >
                <span>View Sample Clinical Brief</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>

          {/* Image (Right on desktop) */}
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden shadow-2xl border border-[#0F172A]/10 aspect-video lg:aspect-[4/3] group order-1 lg:order-2">
            <Image
              src="/images/doctor-consultation.jpg"
              alt="Physician and patient calmly reviewing health data on a tablet in bright modern clinic"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
                1-Page Clinical Briefing
              </span>
              <p className="text-sm font-semibold text-white/95 mt-1">
                Standardized data formatted for rapid, respectful clinical collaboration.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
