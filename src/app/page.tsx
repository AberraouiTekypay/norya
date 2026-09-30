import React from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { SocialTrust } from "@/components/landing/SocialTrust";
import { SolutionSection } from "@/components/landing/SolutionSection";
import { VisualPillarsSection } from "@/components/landing/VisualPillarsSection";
import { AICoachShowcase } from "@/components/landing/AICoachShowcase";
import { PricingSection } from "@/components/landing/PricingSection";
import { WaitlistSection } from "@/components/landing/WaitlistSection";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#0F172A] selection:bg-[#14B8A6]/20 selection:text-[#0F766E]">
      <Navbar />
      <main className="space-y-4">
        <Hero />
        <SocialTrust />
        <SolutionSection />
        <VisualPillarsSection />
        <AICoachShowcase />
        <PricingSection />
        <WaitlistSection />
      </main>
      <Footer />
    </div>
  );
}
