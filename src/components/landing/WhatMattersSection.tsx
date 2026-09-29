import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";

export const WhatMattersSection: React.FC = () => {
  const focusNow = [
    { title: "Standardized blood pressure control", reason: "Single greatest modifiable driver of stroke and cardiovascular events." },
    { title: "7,000–8,000 daily movement baseline", reason: "Associated with a ~24% reduction in all-cause mortality." },
    { title: "Sustainable body weight & waist trend", reason: "Normalizes visceral adiposity, triglycerides, and hepatic liver fat." },
    { title: "Cardiorespiratory aerobic base (Zone 2)", reason: "Enhances mitochondrial density, insulin uptake, and RHR." },
    { title: "Consistent 7-hour sleep window", reason: "Clears neurovascular waste products and stabilizes morning blood pressure." },
    { title: "Adequate protein & dietary fiber", reason: "Preserves lean muscle mass and fuels healthy gut microbiome." },
    { title: "Age-appropriate preventive screenings", reason: "Catches polyps, hypertension, and prediabetes decades early." },
  ];

  const notYet = [
    { title: "Expensive 20-pill supplement stacks", reason: "Most have minimal randomized human evidence and high monthly costs." },
    { title: "Continuous glucose monitors (CGMs) for healthy non-diabetics", reason: "Adds anxiety without altering the primary need for whole foods and movement." },
    { title: "Ice baths & speculative biohacking gadgets", reason: "High hype, negligible proven impact on 10-year major clinical endpoints." },
    { title: "Bi-weekly private blood testing", reason: "Biological biomarkers require 90–180 days to reflect meaningful habit change." },
    { title: "Speculative longevity infusions & peptide therapies", reason: "Unregulated safety profiles; distracts from everyday fundamentals." },
    { title: "Obsessive calorie-counting apps", reason: "Promotes burnout and unsustainable hyper-fixation on arbitrary numbers." },
  ];

  return (
    <section id="what-matters" className="py-24 sm:py-32 bg-[#FAFAF8] border-t border-[#0F172A]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#14B8A6]/10 text-[#0F766E] text-xs font-semibold uppercase tracking-wider">
            Norya Philosophy
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold text-[#0F172A] tracking-tight leading-tight">
            We help you focus on what matters — <br />
            <span className="text-[#64748B]">and ignore what doesn&apos;t.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
            The wellness industry wants to sell you infinite products. Norya filters the noise through clinical consensus: the goal isn&apos;t to optimize everything, it&apos;s to improve the few things most likely to change your health.
          </p>
        </div>

        {/* 2-Column Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Column 1: Focus Now */}
          <div className="rounded-3xl p-6 sm:p-8 bg-white border border-[#16A34A]/25 shadow-card relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#0F172A]/5 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#16A34A]/10 text-[#16A34A] flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0F172A]">Focus Now</h3>
                  <span className="text-xs text-[#16A34A] font-medium">Proven Grade A & B Impact</span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-[#16A34A] bg-[#16A34A]/10 px-2.5 py-1 rounded-full">
                High Leverage
              </span>
            </div>

            <div className="space-y-4">
              {focusNow.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-[#0F172A]">{item.title}</div>
                    <div className="text-xs text-[#64748B] mt-0.5 leading-relaxed">{item.reason}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-[#0F172A]/5 text-xs text-[#16A34A] font-medium text-center">
              Simple, accessible, and largely free of charge.
            </div>
          </div>

          {/* Column 2: Maybe Not Yet */}
          <div className="rounded-3xl p-6 sm:p-8 bg-white border border-[#64748B]/20 shadow-soft relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#0F172A]/5 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#F1F5F9] text-[#64748B] flex items-center justify-center font-bold">
                  ✕
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0F172A]">Maybe Not Yet</h3>
                  <span className="text-xs text-[#64748B] font-medium">Low leverage, high noise or cost</span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-[#64748B] bg-[#F1F5F9] px-2.5 py-1 rounded-full">
                Safe to Ignore
              </span>
            </div>

            <div className="space-y-4">
              {notYet.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-[#94A3B8] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-[#64748B]">{item.title}</div>
                    <div className="text-xs text-[#94A3B8] mt-0.5 leading-relaxed">{item.reason}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-[#0F172A]/5 text-xs text-[#64748B] font-medium text-center">
              Save your mental bandwidth and budget for actions that move the needle.
            </div>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="mt-12 max-w-3xl mx-auto p-4 rounded-2xl bg-[#CCFBF1]/40 border border-[#14B8A6]/20 text-center text-xs sm:text-sm text-[#0F766E] font-medium">
          💡 <strong>Norya Principle:</strong> We will never sell you supplements, sponsor untested gadgets, or push expensive tests you don&apos;t clinically need.
        </div>

      </div>
    </section>
  );
};
