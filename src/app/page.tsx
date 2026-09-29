import React from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { SocialTrust } from "@/components/landing/SocialTrust";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { SolutionSection } from "@/components/landing/SolutionSection";
import { AICoachShowcase } from "@/components/landing/AICoachShowcase";
import { WhatMattersSection } from "@/components/landing/WhatMattersSection";
import { HealthOpportunitySection } from "@/components/landing/HealthOpportunitySection";
import { TimelineSection } from "@/components/landing/TimelineSection";
import { LabsSection } from "@/components/landing/LabsSection";
import { PreventionSection } from "@/components/landing/PreventionSection";
import { AffordabilitySection } from "@/components/landing/AffordabilitySection";
import { LocalByDesignSection } from "@/components/landing/LocalByDesignSection";
import { ScienceSection } from "@/components/landing/ScienceSection";
import { SafetySection } from "@/components/landing/SafetySection";
import { DoctorHandoffSection } from "@/components/landing/DoctorHandoffSection";
import { ShowcaseSection } from "@/components/landing/ShowcaseSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { WaitlistSection } from "@/components/landing/WaitlistSection";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#0F172A] selection:bg-[#14B8A6]/20 selection:text-[#0F766E]">
      <Navbar />
      <main>
        <Hero />
        <SocialTrust />
        <ProblemSection />
        <SolutionSection />
        <AICoachShowcase />
        <WhatMattersSection />
        <HealthOpportunitySection />
        <TimelineSection />
        <LabsSection />
        <PreventionSection />
        <AffordabilitySection />
        <LocalByDesignSection />
        <ScienceSection />
        <SafetySection />
        <DoctorHandoffSection />
        <ShowcaseSection />
        <PricingSection />
        <WaitlistSection />
      </main>
      <Footer />
    </div>
  );
}
