"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Activity,
  Heart,
  TrendingDown,
  CheckCircle2,
  Lock,
  Calendar,
} from "lucide-react";

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Ambient decorative glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-[#14B8A6]/15 via-[#CCFBF1]/25 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Editorial Text Core */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          {/* Category Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#CCFBF1]/60 border border-[#14B8A6]/30 text-[#0F766E] text-xs font-semibold tracking-wide uppercase shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] animate-pulse" />
            Science-First Personal Health OS
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#0F172A] leading-[1.08]">
            Health first. <br />
            <span className="text-[#0F766E] bg-gradient-to-r from-[#0F766E] to-[#14B8A6] bg-clip-text text-transparent">
              Longevity follows.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-[#64748B] leading-relaxed max-w-2xl mx-auto font-normal">
            Connect your wearables, upload your blood tests, and let Norya turn the noise into a calm, evidence-based plan focused on the 3 things that actually matter for you and your family.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              href="#waitlist"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#0F172A] text-white text-base font-semibold hover:bg-[#1E293B] shadow-md hover:shadow-xl transition-all group"
            >
              <span>Get Early Access</span>
              <ArrowRight className="w-4 h-4 text-[#14B8A6] group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/app"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white border border-[#0F172A]/10 text-[#0F172A] text-base font-semibold hover:bg-[#F8FAFC] hover:border-[#14B8A6]/40 shadow-xs transition-all"
            >
              <Activity className="w-4 h-4 text-[#14B8A6]" />
              <span>Explore Interactive App</span>
            </Link>
          </div>

          {/* Reassurance Badge */}
          <div className="flex items-center justify-center gap-4 text-xs font-medium text-[#64748B] pt-2 flex-wrap">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#14B8A6]" />
              Grade A Clinical Evidence
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-[#14B8A6]" />
              100% Zero-Knowledge Privacy
            </span>
            <span>•</span>
            <span>No Biohacking Hype</span>
          </div>

        </div>

        {/* Visual Showcase: Lifestyle Photography + Cockpit UI Duo */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Column: Mediterranean Morning Lifestyle Photo */}
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden shadow-2xl border border-[#0F172A]/10 aspect-video lg:aspect-[4/3] group">
            <Image
              src="/images/hero-morning.jpg"
              alt="Healthy woman enjoying morning light and calm health routine"
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            
            <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
                Sarah M., Age 44 • Madrid
              </span>
              <p className="text-sm font-semibold text-white/95">
                &ldquo;For the first time, my blood tests, blood pressure, and habits feel connected in one calm picture.&rdquo;
              </p>
            </div>
          </div>

          {/* Right Column: Floating Glassmorphic Health Cockpit Preview */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-[#0F172A]/10 shadow-xl space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#0F172A]/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#14B8A6]/10 text-[#0F766E] font-bold text-sm flex items-center justify-center">
                  S
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A]">Sarah&apos;s Health Picture</h3>
                  <p className="text-xs text-[#64748B]">Updated 20 min ago • Standardized HBPM Mean</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-mono font-bold text-[#64748B]">PhenoAge</span>
                <div className="text-sm font-bold text-[#0F766E]">
                  42.6 <span className="text-xs font-normal text-[#16A34A]">(-1.4 yrs)</span>
                </div>
              </div>
            </div>

            {/* Top 3 Priorities Preview */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#64748B]">
                <span>Today&apos;s Top 3 Priorities</span>
                <span className="text-[#0F766E]">Maximum 3 Rule</span>
              </div>

              {/* Priority 1 */}
              <div className="p-3.5 rounded-2xl bg-[#FFF5F3] border border-[#F97360]/20 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#F97360] shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-[#0F172A]">Blood Pressure Regulation</div>
                    <div className="text-[11px] text-[#64748B]">Home average 126/82 mmHg • AM/PM protocol active</div>
                  </div>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#F97360]/10 text-[#F97360] shrink-0">
                  Needs Attention
                </span>
              </div>

              {/* Priority 2 */}
              <div className="p-3.5 rounded-2xl bg-[#F0FDFA] border border-[#14B8A6]/20 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#14B8A6] shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-[#0F172A]">ApoB & Atherogenic Clearance</div>
                    <div className="text-[11px] text-[#64748B]">105 mg/dL • 5g Psyllium viscous fiber preload</div>
                  </div>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#CCFBF1] text-[#0F766E] shrink-0">
                  Worth Improving
                </span>
              </div>

              {/* Priority 3 */}
              <div className="p-3.5 rounded-2xl bg-[#F0FDF4] border border-[#16A34A]/20 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#16A34A] shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-[#0F172A]">Zone 2 Aerobic Base</div>
                    <div className="text-[11px] text-[#64748B]">35 min walking completed • RHR 67 bpm</div>
                  </div>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#DCFCE7] text-[#16A34A] shrink-0">
                  On Track
                </span>
              </div>
            </div>

            {/* Interactive Link */}
            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-[#64748B]">Ready for upcoming primary care visit</span>
              <Link
                href="/app"
                className="font-bold text-[#0F766E] hover:text-[#0F172A] flex items-center gap-1"
              >
                <span>Launch Live Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
