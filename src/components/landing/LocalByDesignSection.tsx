import React from "react";
import { Globe, MapPin, CheckCircle, Utensils, Building2 } from "lucide-react";

export const LocalByDesignSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#FAFAF8] border-t border-[#0F172A]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#CCFBF1] text-[#0F766E] text-xs font-semibold uppercase tracking-wider">
            Contextual Health
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold text-[#0F172A] tracking-tight">
            Health advice should work where you live.
          </h2>
          <p className="text-base sm:text-lg text-[#64748B]">
            Silicon Valley wellness apps assume California lifestyles, US grocery stores, and out-of-pocket insurance. Norya is built from the ground up for Southern Europe, North Africa, and the Middle East.
          </p>
        </div>

        {/* 2 Regional Launch Cards: Spain & Morocco */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Spain Card */}
          <div className="rounded-3xl p-6 sm:p-8 bg-white border border-[#0F172A]/8 shadow-card space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-[#0F172A]/5">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🇪🇸</span>
                <div>
                  <h3 className="text-lg font-bold text-[#0F172A]">Spain & Southern Europe</h3>
                  <span className="text-xs text-[#0F766E] font-medium">Phase 1 Launch Market</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#14B8A6]/10 text-[#0F766E] text-[11px] font-bold">
                Active
              </span>
            </div>

            <div className="space-y-3.5 text-xs text-[#64748B]">
              <div className="flex items-start gap-2.5">
                <Building2 className="w-4 h-4 text-[#14B8A6] shrink-0 mt-0.5" />
                <span>
                  <strong>System Integration:</strong> Synchronizes with Sistema Nacional de Salud (SNS) preventive milestones & accredited private labs (Echevarne, Synlab, Megalab).
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Utensils className="w-4 h-4 text-[#14B8A6] shrink-0 mt-0.5" />
                <span>
                  <strong>Real Food Culture:</strong> Mediterranean diet anchors (extra virgin olive oil, wild fish, seasonal legumes, produce) instead of synthetic meal replacement shakes.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <span>
                  <strong>Languages:</strong> Castilian Spanish and English native support.
                </span>
              </div>
            </div>
          </div>

          {/* Morocco Card */}
          <div className="rounded-3xl p-6 sm:p-8 bg-white border border-[#0F172A]/8 shadow-card space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-[#0F172A]/5">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🇲🇦</span>
                <div>
                  <h3 className="text-lg font-bold text-[#0F172A]">Morocco & North Africa</h3>
                  <span className="text-xs text-[#0F766E] font-medium">Phase 1 Launch Market</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#14B8A6]/10 text-[#0F766E] text-[11px] font-bold">
                Active
              </span>
            </div>

            <div className="space-y-3.5 text-xs text-[#64748B]">
              <div className="flex items-start gap-2.5">
                <Building2 className="w-4 h-4 text-[#14B8A6] shrink-0 mt-0.5" />
                <span>
                  <strong>Healthcare Ecosystem:</strong> Aligned with AMO / CNSS coverage frameworks, local private polyclinics, and trusted Moroccan biology laboratory networks.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Utensils className="w-4 h-4 text-[#14B8A6] shrink-0 mt-0.5" />
                <span>
                  <strong>Cultural Adaptation:</strong> Practical nutrition incorporating whole tagines, lentils, sardines, and Ramadan metabolic adjustments.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <span>
                  <strong>Languages:</strong> French, English, and architecture prepared for Darija/Arabic.
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Phase 2 Expansion Note */}
        <div className="mt-8 text-center text-xs text-[#64748B]">
          Phase 2 Expansion: France 🇫🇷, Portugal 🇵🇹, and the United Arab Emirates 🇦🇪.
        </div>

      </div>
    </section>
  );
};
