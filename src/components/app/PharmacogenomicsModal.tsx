"use client";

import React, { useState } from "react";
import { useHealth } from "@/context/HealthContext";
import {
  X,
  Dna,
  ShieldAlert,
  ShieldCheck,
  Pill,
  AlertCircle,
  CheckCircle2,
  Share2,
  Printer,
  Sparkles,
  ArrowRight,
  Info,
} from "lucide-react";

export const PharmacogenomicsModal: React.FC = () => {
  const { isPgxModalOpen, setIsPgxModalOpen, pgxProfiles, familyMembers, activeFamilyMemberId, setActiveFamilyMemberId } =
    useHealth();
  const [selectedMember, setSelectedMember] = useState<"Sarah" | "Mohamed" | "Sofia">("Sarah");

  if (!isPgxModalOpen) return null;

  const filteredProfiles = pgxProfiles.filter((p) => p.affectedFamilyMember === selectedMember);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-[#0F172A]/10 overflow-hidden text-left">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#0F172A] text-white flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#14B8A6]/20 border border-[#14B8A6]/30 flex items-center justify-center text-[#14B8A6]">
              <Dna className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold tracking-tight">
                  Pharmacogenomics (PGx) Drug-Gene Intelligence
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#14B8A6]/20 text-[#2DD4BF] border border-[#14B8A6]/30">
                  CPIC Level 1A Consensus
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Precision medicine profiling to prevent adverse drug reactions (ADRs) and predict therapeutic efficacy.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsPgxModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Member Selector */}
        <div className="px-5 sm:px-6 py-3.5 bg-[#F8FAFC] border-b border-[#0F172A]/10 flex items-center justify-between gap-4 overflow-x-auto">
          <div className="text-xs text-[#64748B] whitespace-nowrap">
            Select Individual PGx Profile:
          </div>

          <div className="flex items-center gap-2">
            {[
              { id: "Sarah", label: "Sarah M. (Self, 44)", role: "Statin Transporter Focus" },
              { id: "Mohamed", label: "Mohamed (Father, 72)", role: "Antiplatelet & Statin Focus" },
              { id: "Sofia", label: "Sofia (Daughter, 11)", role: "Pediatric Baseline" },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMember(m.id as typeof selectedMember)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedMember === m.id
                    ? "bg-[#0F172A] text-white shadow-xs font-bold"
                    : "bg-white text-[#64748B] hover:text-[#0F172A] border border-[#0F172A]/10"
                }`}
              >
                <span>{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {selectedMember === "Sarah" && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#FFFBEB] border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-bold">SLCO1B1 Transporter Variant Detected (*1/*5):</div>
                  <div className="leading-relaxed">
                    Carries the rs4149056 (521T&gt;C) minor allele, resulting in decreased hepatic OATP1B1 transporter function. If Sarah is ever prescribed statin therapy in the future, standard high-dose simvastatin or atorvastatin poses an elevated risk of Statin-Associated Muscle Symptoms (SAMS).
                  </div>
                </div>
              </div>

              {filteredProfiles.map((prof) => (
                <div key={prof.id} className="p-5 rounded-2xl bg-white border border-[#0F172A]/10 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#0F172A]/5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-[#0F172A] text-white">
                        {prof.gene}
                      </span>
                      <span className="text-xs font-mono text-[#64748B]">
                        Diplotype: {prof.diplotype}
                      </span>
                    </div>

                    <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                      {prof.phenotype}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="font-bold text-[#0F172A]">Target Drug Class: </span>
                      <span className="text-[#475569]">{prof.drugCategory}</span>
                    </div>

                    <div>
                      <span className="font-bold text-[#0F172A]">Biological Mechanism: </span>
                      <p className="text-[#475569] leading-relaxed mt-0.5">{prof.clinicalImplication}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-[#F0FDFA] border border-[#14B8A6]/20 text-[#0F766E] space-y-1">
                      <div className="font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>CPIC Guideline Clinical Recommendation:</span>
                      </div>
                      <p className="leading-relaxed">{prof.cpicGuidelineRecommendation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedMember === "Mohamed" && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-bold">CYP2C19 Poor Metabolizer (*2/*2) — Clopidogrel Resistance:</div>
                  <div className="leading-relaxed">
                    Mohamed possesses complete loss of CYP2C19 bioactivation capacity. Standard clopidogrel (Plavix) would fail to prevent coronary stent thrombosis or re-infarction. This confirms why his attending cardiologist correctly placed him on <strong>Aspirin Protect (acetylsalicylic acid 100mg)</strong>.
                  </div>
                </div>
              </div>

              {filteredProfiles.map((prof) => (
                <div key={prof.id} className="p-5 rounded-2xl bg-white border border-[#0F172A]/10 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#0F172A]/5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-[#0F172A] text-white">
                        {prof.gene}
                      </span>
                      <span className="text-xs font-mono text-[#64748B]">
                        Diplotype: {prof.diplotype}
                      </span>
                    </div>

                    <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                      {prof.phenotype}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="font-bold text-[#0F172A]">Target Drug Class: </span>
                      <span className="text-[#475569]">{prof.drugCategory}</span>
                    </div>

                    <div>
                      <span className="font-bold text-[#0F172A]">Biological Mechanism: </span>
                      <p className="text-[#475569] leading-relaxed mt-0.5">{prof.clinicalImplication}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-[#F0FDFA] border border-[#14B8A6]/20 text-[#0F766E] space-y-1">
                      <div className="font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>CPIC Guideline Clinical Recommendation:</span>
                      </div>
                      <p className="leading-relaxed">{prof.cpicGuidelineRecommendation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedMember === "Sofia" && (
            <div className="p-6 rounded-3xl bg-[#FAFAF8] border border-[#0F172A]/10 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#CCFBF1] text-[#0F766E] flex items-center justify-center mx-auto">
                <Dna className="w-6 h-6" />
              </div>
              <div className="max-w-md mx-auto space-y-1">
                <h3 className="text-base font-bold text-[#0F172A]">
                  Pediatric Genetic Baseline (Sofia, Age 11)
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Genetic sequencing is not clinically indicated for healthy asymptomatic minors unless LDL-C &gt; 190 mg/dL or definitive parental HeFH is diagnosed. Focus is entirely on universal baseline lipid screening.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-[#FAFAF8] border-t border-[#0F172A]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-[#64748B] text-[11px]">
            Clinical Pharmacogenetics Implementation Consortium (CPIC) & Dutch Pharmacogenetics Working Group (DPWG)
          </div>

          <button
            onClick={() => setIsPgxModalOpen(false)}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#0F172A] text-white font-semibold hover:bg-slate-800 transition-colors shadow-xs"
          >
            Close PGx Viewer
          </button>
        </div>

      </div>
    </div>
  );
};
