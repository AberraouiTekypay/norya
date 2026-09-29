import React from "react";
import Link from "next/link";
import { Shield } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0F172A] text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-[#14B8A6] flex items-center justify-center text-[#0F172A] font-bold text-lg">
                N
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Norya
              </span>
            </Link>

            <p className="text-xs text-[#94A3B8] max-w-sm leading-relaxed">
              Your health. One place. One plan. A science-first personal health operating system bringing wearable data, blood tests, and habits together.
            </p>

            <div className="text-xs font-semibold text-[#CCFBF1]">
              Health first. Longevity follows.
            </div>
          </div>

          {/* Col 1: Product */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Product
            </div>
            <ul className="space-y-2 text-xs text-[#94A3B8]">
              <li>
                <Link href="/app" className="hover:text-white transition-colors">
                  Health OS Demo
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-white transition-colors">
                  How it Works
                </Link>
              </li>
              <li>
                <Link href="/#coach" className="hover:text-white transition-colors">
                  AI Health Coach
                </Link>
              </li>
              <li>
                <Link href="/#what-matters" className="hover:text-white transition-colors">
                  Priorities Engine
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-white transition-colors">
                  Pricing Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Evidence & Company */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Evidence
            </div>
            <ul className="space-y-2 text-xs text-[#94A3B8]">
              <li>
                <Link href="/science" className="hover:text-white transition-colors">
                  Approach to Science
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-white transition-colors">
                  Health Budgeting
                </Link>
              </li>
              <li>
                <span className="text-white/40">Spain & Morocco (Phase 1)</span>
              </li>
              <li>
                <span className="text-white/40">France & Portugal (Phase 2)</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Safety */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Legal & Safety
            </div>
            <ul className="space-y-2 text-xs text-[#94A3B8]">
              <li>
                <Link href="/medical-disclaimer" className="hover:text-white transition-colors flex items-center gap-1">
                  <Shield className="w-3 h-3 text-[#14B8A6]" />
                  Medical Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy (GDPR)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <span className="text-white/40">contact@getnorya.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Regulatory Disclaimer Text */}
        <div className="py-6 border-b border-white/10 text-center">
          <p className="text-[11px] text-[#94A3B8] leading-relaxed max-w-4xl mx-auto">
            <strong>Important Regulatory Notice:</strong> Norya provides health information, lifestyle education, and personal wellness organization. Norya is not a medical device, does not provide medical diagnoses, does not prescribe pharmaceuticals, and is not a substitute for clinical judgment by a licensed medical practitioner. In case of medical emergencies, immediately contact your local emergency service (112 in Spain/Europe, 15 in Morocco).
          </p>
        </div>

        {/* Bottom Bar with mandatory EM300 link */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#94A3B8] gap-4">
          <div>
            © 2026 Norya. All rights reserved.
          </div>

          {/* CRITICAL BRAND PARENT LINK */}
          <div className="text-center sm:text-right">
            <span>An </span>
            <a
              href="https://em300.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#14B8A6] font-semibold hover:underline"
            >
              EM300.co
            </a>
            <span> Company</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
