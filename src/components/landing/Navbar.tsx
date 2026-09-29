"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X, Shield, Sparkles } from "lucide-react";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#FAFAF8]/90 backdrop-blur-md border-b border-[#0F172A]/5 py-3 shadow-xs"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Wordmark */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-[#0F172A] flex items-center justify-center text-[#14B8A6] font-bold text-lg tracking-tight group-hover:scale-105 transition-transform">
            N
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-semibold tracking-tight text-[#0F172A]">
              Norya
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#64748B]">
          <Link
            href="/#how-it-works"
            className="hover:text-[#0F172A] transition-colors"
          >
            How it works
          </Link>
          <Link
            href="/#coach"
            className="hover:text-[#0F172A] transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" />
            AI Coach
          </Link>
          <Link
            href="/#what-matters"
            className="hover:text-[#0F172A] transition-colors"
          >
            Priorities
          </Link>
          <Link
            href="/science"
            className="hover:text-[#0F172A] transition-colors"
          >
            Science & Evidence
          </Link>
          <Link
            href="/#pricing"
            className="hover:text-[#0F172A] transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/medical-disclaimer"
            className="hover:text-[#0F172A] transition-colors flex items-center gap-1 text-xs text-[#64748B]/80"
          >
            <Shield className="w-3 h-3 text-[#14B8A6]" />
            Safety First
          </Link>
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/app"
            className="px-4 py-2 text-sm font-medium text-[#0F172A] hover:text-[#14B8A6] transition-colors"
          >
            Launch Health OS
          </Link>
          <Link
            href="/#waitlist"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0F172A] text-white text-sm font-medium hover:bg-[#1E293B] shadow-sm hover:shadow transition-all group"
          >
            <span>Get Early Access</span>
            <ArrowRight className="w-4 h-4 text-[#14B8A6] group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <Link
            href="/app"
            className="px-3 py-1.5 text-xs font-semibold text-white bg-[#0F172A] rounded-full"
          >
            App Demo
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#0F172A] hover:bg-[#F1F5F9] rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAFAF8] border-b border-[#0F172A]/10 px-6 py-6 space-y-4">
          <Link
            href="/#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-[#0F172A]"
          >
            How it works
          </Link>
          <Link
            href="/#coach"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-[#0F172A]"
          >
            AI Coach
          </Link>
          <Link
            href="/#what-matters"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-[#0F172A]"
          >
            What matters most
          </Link>
          <Link
            href="/science"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-[#0F172A]"
          >
            Science & Evidence
          </Link>
          <Link
            href="/#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-[#0F172A]"
          >
            Pricing
          </Link>
          <div className="pt-4 border-t border-[#0F172A]/5 flex flex-col gap-2">
            <Link
              href="/app"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-xl bg-[#14B8A6] text-white font-medium text-sm shadow-xs"
            >
              Open Norya Health OS
            </Link>
            <Link
              href="/#waitlist"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-xl bg-[#0F172A] text-white font-medium text-sm"
            >
              Get Early Access
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
