"use client";

import React, { useState } from "react";
import { useHealth } from "@/context/HealthContext";
import {
  X,
  Dna,
  ShieldCheck,
  AlertTriangle,
  Info,
  CheckCircle2,
  HelpCircle,
  TrendingDown,
  Sparkles,
  ArrowRight,
  Calculator,
} from "lucide-react";

export const DlcnScoreModal: React.FC = () => {
  const { isDlcnModalOpen, setIsDlcnModalOpen, dlcnScore, user } = useHealth();
  const [famCad, setFamCad] = useState<boolean>(true); // Father premature CAD
  const [famXanthoma, setFamXanthoma] = useState<boolean>(false);
  const [personalCad, setPersonalCad] = useState<boolean>(false);
  const [tendonXanthoma, setTendonXanthoma] = useState<boolean>(false);
  const [arcusCornealis, setArcusCornealis] = useState<boolean>(false);
  const [ldlBracket, setLdlBracket] = useState<number>(0); // Sarah is 138 mg/dL (< 155 -> 0 pts)
  const [dnaPositive, setDnaPositive] = useState<boolean>(false);

  if (!isDlcnModalOpen) return null;

  // Compute DLCN Score dynamically
  const famPoints = (famXanthoma ? 2 : (famCad ? 1 : 0));
  const personalPoints = personalCad ? 2 : 0;
  const examPoints = (tendonXanthoma ? 6 : 0) + (arcusCornealis ? 4 : 0);
  const ldlPoints = ldlBracket;
  const genePoints = dnaPositive ? 8 : 0;

  const totalScore = famPoints + personalPoints + examPoints + ldlPoints + genePoints;

  let category: "Definite FH" | "Probable FH" | "Possible FH" | "Unlikely FH" = "Unlikely FH";
  let badgeColor = "bg-emerald-50 text-emerald-700 border-emerald-200";

  if (totalScore > 8) {
    category = "Definite FH";
    badgeColor = "bg-rose-50 text-rose-700 border-rose-200";
  } else if (totalScore >= 6) {
    category = "Probable FH";
    badgeColor = "bg-orange-50 text-orange-700 border-orange-200";
  } else if (totalScore >= 3) {
    category = "Possible FH";
    badgeColor = "bg-amber-50 text-amber-700 border-amber-200";
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-[#0F172A]/10 overflow-hidden text-left">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#0F172A] text-white flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#14B8A6]/20 border border-[#14B8A6]/30 flex items-center justify-center text-[#14B8A6]">
              <Dna className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold tracking-tight">
                  Dutch Lipid Clinic Network (DLCN) Calculator
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#14B8A6]/20 text-[#2DD4BF] border border-[#14B8A6]/30">
                  ESC / EAS Consensus
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Clinical diagnostic algorithm to differentiate Monogenic Familial Hypercholesterolemia (FH) from polygenic dyslipidemia.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsDlcnModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Score Indicator Header */}
        <div className="px-5 sm:px-6 py-4 bg-[#F8FAFC] border-b border-[#0F172A]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#0F172A]">{totalScore}</span>
              <span className="text-xs text-[#64748B] font-semibold">Total Points</span>
            </div>
            <div className={`text-xs font-bold px-3 py-1 rounded-xl border ${badgeColor}`}>
              {category} ({totalScore > 8 ? "> 8 pts" : totalScore >= 6 ? "6–8 pts" : totalScore >= 3 ? "3–5 pts" : "< 3 pts"})
            </div>
          </div>

          <div className="text-xs text-[#64748B]">
            Patient: <strong className="text-[#0F172A]">{user.firstName} (Age 44)</strong> • Current ApoB: 105 mg/dL
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Clinical Interpretation Card */}
          <div className="p-4 rounded-2xl bg-[#F0FDFA] border border-[#14B8A6]/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0F766E]">
              <Sparkles className="w-4 h-4" />
              <span>Personalized Clinical Diagnostic Translation:</span>
            </div>
            <p className="text-xs text-[#134E4A] leading-relaxed">
              {totalScore <= 2 ? (
                <>
                  With a score of <strong>{totalScore} points</strong>, classic autosomal dominant monogenic Familial Hypercholesterolemia (HeFH) is <strong>clinically unlikely</strong>. Sarah&apos;s elevated atherogenic particles (ApoB 105 mg/dL) represent polygenic predisposition compounded by lifestyle and metabolic factors, rather than a single mutated receptor gene. Viscous dietary fiber and Zone 2 training remain the highest-leverage primary tools.
                </>
              ) : totalScore <= 5 ? (
                <>
                  With a score of <strong>{totalScore} points</strong>, <strong>Possible Familial Hypercholesterolemia</strong> is noted. Further evaluation with carotid ultrasound (IMT) and discussion regarding low-dose pharmacotherapy (e.g. Ezetimibe or gentle statin) is warranted if dietary lifestyle measures do not achieve ApoB &lt; 90 mg/dL.
                </>
              ) : (
                <>
                  With a score of <strong>{totalScore} points</strong>, <strong>{category}</strong> is diagnosed. High-intensity lipid-lowering therapy and formal molecular genetic testing for <em>LDLR</em>, <em>APOB</em>, and <em>PCSK9</em> mutations is strongly recommended per ESC/EAS guidelines.
                </>
              )}
            </p>
          </div>

          {/* Interactive DLCN Diagnostic Form */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              1. Family Medical History
            </h3>
            <div className="space-y-2">
              <label className="flex items-center justify-between p-3.5 rounded-2xl border border-[#0F172A]/10 hover:bg-[#FAFAF8] cursor-pointer text-xs">
                <span className="text-[#0F172A] pr-4">
                  First-degree relative with premature cardiovascular disease (Father Mohamed CAD at age 62)
                </span>
                <input
                  type="checkbox"
                  checked={famCad}
                  onChange={(e) => setFamCad(e.target.checked)}
                  className="w-4 h-4 rounded text-[#14B8A6] focus:ring-[#14B8A6]"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl border border-[#0F172A]/10 hover:bg-[#FAFAF8] cursor-pointer text-xs">
                <span className="text-[#0F172A] pr-4">
                  First-degree relative with known tendon xanthoma and/or arcus cornealis before age 45
                </span>
                <input
                  type="checkbox"
                  checked={famXanthoma}
                  onChange={(e) => setFamXanthoma(e.target.checked)}
                  className="w-4 h-4 rounded text-[#14B8A6] focus:ring-[#14B8A6]"
                />
              </label>
            </div>

            <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B] pt-2">
              2. Clinical Examination & Physical Signs
            </h3>
            <div className="space-y-2">
              <label className="flex items-center justify-between p-3.5 rounded-2xl border border-[#0F172A]/10 hover:bg-[#FAFAF8] cursor-pointer text-xs">
                <span className="text-[#0F172A] pr-4">
                  Tendon Xanthomas (Achilles tendon or extensor tendons of the hand)
                </span>
                <input
                  type="checkbox"
                  checked={tendonXanthoma}
                  onChange={(e) => setTendonXanthoma(e.target.checked)}
                  className="w-4 h-4 rounded text-[#14B8A6] focus:ring-[#14B8A6]"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl border border-[#0F172A]/10 hover:bg-[#FAFAF8] cursor-pointer text-xs">
                <span className="text-[#0F172A] pr-4">
                  Arcus Cornealis (White or grey ring around cornea edge prior to age 45)
                </span>
                <input
                  type="checkbox"
                  checked={arcusCornealis}
                  onChange={(e) => setArcusCornealis(e.target.checked)}
                  className="w-4 h-4 rounded text-[#14B8A6] focus:ring-[#14B8A6]"
                />
              </label>
            </div>

            <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B] pt-2">
              3. Plasma LDL-Cholesterol Concentration
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                { label: "< 155 mg/dL (< 4.0 mmol/L) [Sarah: 138 mg/dL]", points: 0 },
                { label: "155–189 mg/dL (4.0–4.9 mmol/L)", points: 1 },
                { label: "190–249 mg/dL (5.0–6.4 mmol/L)", points: 3 },
                { label: "250–329 mg/dL (6.5–8.4 mmol/L)", points: 5 },
                { label: "≥ 330 mg/dL (≥ 8.5 mmol/L)", points: 8 },
              ].map((tier) => (
                <button
                  key={tier.points}
                  onClick={() => setLdlBracket(tier.points)}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    ldlBracket === tier.points
                      ? "border-[#14B8A6] bg-[#F0FDFA] font-bold text-[#0F766E]"
                      : "border-[#0F172A]/10 hover:border-[#0F172A]/20 text-[#334155]"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{tier.label}</span>
                    <span className="font-mono text-[11px] font-bold">+{tier.points} pts</span>
                  </div>
                </button>
              ))}
            </div>

            <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B] pt-2">
              4. Molecular Genetic Analysis
            </h3>
            <label className="flex items-center justify-between p-3.5 rounded-2xl border border-[#0F172A]/10 hover:bg-[#FAFAF8] cursor-pointer text-xs">
              <span className="text-[#0F172A] pr-4">
                Pathogenic causative mutation verified in <em>LDLR</em>, <em>APOB</em>, or <em>PCSK9</em> gene (+8 Points)
              </span>
              <input
                type="checkbox"
                checked={dnaPositive}
                onChange={(e) => setDnaPositive(e.target.checked)}
                className="w-4 h-4 rounded text-[#14B8A6] focus:ring-[#14B8A6]"
              />
            </label>
          </div>

          {/* Action Recommendations */}
          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#0F172A]/10 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Recommended Clinical Action Pathway
            </h4>
            <div className="space-y-2 text-xs text-[#334155]">
              {dlcnScore.recommendations.map((rec, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#14B8A6] shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-[#FAFAF8] border-t border-[#0F172A]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-[#64748B] text-[11px]">
            European Atherosclerosis Society (EAS) Consensus Guideline DLCN Criteria
          </div>

          <button
            onClick={() => setIsDlcnModalOpen(false)}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#0F172A] text-white font-semibold hover:bg-slate-800 transition-colors shadow-xs"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
