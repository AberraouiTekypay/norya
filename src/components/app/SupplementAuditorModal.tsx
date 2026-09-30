"use client";

import React, { useState } from "react";
import { useHealth } from "@/context/HealthContext";
import {
  X,
  ShieldCheck,
  AlertTriangle,
  Info,
  Search,
  Plus,
  Check,
  Sparkles,
} from "lucide-react";

export const SupplementAuditorModal: React.FC = () => {
  const {
    isSupplementModalOpen,
    setIsSupplementModalOpen,
    familyMembers,
    activeFamilyMemberId,
    setActiveFamilyMemberId,
    addDoctorQuestion,
  } = useHealth();

  const [selectedGrade, setSelectedGrade] = useState<"all" | "recommended" | "hype">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [addedNotes, setAddedNotes] = useState<Record<string, boolean>>({});

  if (!isSupplementModalOpen) return null;

  const currentMember =
    familyMembers.find((m) => m.id === activeFamilyMemberId) || familyMembers[0];

  const handleAddDoctorInquiry = (name: string, id: string) => {
    addDoctorQuestion(`Supplement evaluation for ${currentMember.name}: Is there clinical indication for ${name}?`);
    setAddedNotes((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAddedNotes((prev) => ({ ...prev, [id]: false }));
    }, 2500);
  };

  const supplementCatalog = [
    {
      id: "sup-fiber",
      name: "Soluble Viscous Fiber (Psyllium / Beta-Glucan)",
      grade: "A",
      category: "Cardio-Metabolic",
      indication: "Traps luminal bile acids to upregulate hepatic LDL receptor uptake of ApoB",
      clinicalDose: "5g to 10g daily with 250ml water before main meals",
      targetProfile: "Sarah M. (ApoB 105 mg/dL)",
      safetyStatus: "optimal",
      interactionWarning: "Take 2 hours apart from any oral prescription medications to avoid delayed absorption.",
      hypeRating: "Evidence-Backed (Grade A)",
    },
    {
      id: "sup-vitd",
      name: "Vitamin D3 (Cholecalciferol)",
      grade: "B+",
      category: "Metabolic / Immune",
      indication: "Corrects sub-optimal 25-OH Vitamin D (Sarah is currently 29 ng/mL; target >30)",
      clinicalDose: "1,000 to 2,000 IU daily taken with dietary fat during winter months",
      targetProfile: "Sarah M. (Winter Maintenance)",
      safetyStatus: "optimal",
      interactionWarning: "Monitor serum calcium if taking high-dose alongside thiazide diuretics.",
      hypeRating: "Evidence-Backed (Grade B+)",
    },
    {
      id: "sup-omega3",
      name: "Omega-3 Fatty Acids (Purified EPA / DHA)",
      grade: "B",
      category: "Lipids & Triglycerides",
      indication: "Decreases hepatic VLDL synthesis when triglycerides are elevated (>150 mg/dL)",
      clinicalDose: "1,000mg to 2,000mg pure EPA/DHA daily (or 2-3 weekly servings of sardines/mackerel)",
      targetProfile: "Both Sarah & Mohamed",
      safetyStatus: "warning",
      interactionWarning: "Caution: High doses (>3g/day) possess mild antithrombotic properties. Review with cardiologist if co-administering with Aspirin Protect.",
      hypeRating: "Evidence-Backed (Grade B)",
    },
    {
      id: "sup-mag",
      name: "Magnesium Glycinate or Malate",
      grade: "B",
      category: "Recovery & Sleep",
      indication: "Supports NMDA receptor down-regulation and deep slow-wave sleep duration",
      clinicalDose: "200mg to 300mg elemental magnesium 45 minutes before sleep",
      targetProfile: "Sarah M. (Sleep Consistency)",
      safetyStatus: "optimal",
      interactionWarning: "Avoid magnesium oxide (poor bioavailability, laxative effect).",
      hypeRating: "Evidence-Backed (Grade B)",
    },
    {
      id: "sup-coq10",
      name: "Coenzyme Q10 (Ubiquinol)",
      grade: "C",
      category: "Mitochondrial Support",
      indication: "Sometimes evaluated for statin-associated muscle stiffness or fatigue",
      clinicalDose: "100mg daily with breakfast",
      targetProfile: "Mohamed M. (Statin User)",
      safetyStatus: "optimal",
      interactionWarning: "Modest clinical trial evidence. Does not replace prescribed statin therapy.",
      hypeRating: "Mixed Evidence (Grade C)",
    },
    {
      id: "sup-nmn",
      name: "NMN / Resveratrol / NAD+ Boosters",
      grade: "D",
      category: "Longevity Marketing",
      indication: "Heavily promoted by biohackers for sirtuin activation and longevity",
      clinicalDose: "Not recommended by Norya",
      targetProfile: "General",
      safetyStatus: "caution",
      interactionWarning: "Zero robust, multi-year human randomized trials showing clinical cardiovascular or mortality reduction. Expensive and unnecessary.",
      hypeRating: "Biohacking Hype (Grade D)",
    },
    {
      id: "sup-multi",
      name: "High-Dose Multivitamin Megapacks",
      grade: "E",
      category: "Generic Wellness",
      indication: "Promoted as general insurance against nutrient gaps",
      clinicalDose: "Not recommended by Norya",
      targetProfile: "General",
      safetyStatus: "caution",
      interactionWarning: "High-dose synthetic antioxidants (e.g. 500% DV Vitamin E and C) blunt healthy mitochondrial hormesis and exercise adaptations. Whole foods are far superior.",
      hypeRating: "Marketing Hype (Grade E)",
    },
  ];

  // Specific high-risk interactions for Mohamed
  const mohamedInteractions = [
    {
      supplement: "St. John's Wort (Hypericum perforatum)",
      medication: "Atorvastatin 20mg",
      severity: "critical",
      mechanism: "Potent inducer of hepatic CYP3A4 enzymes. Drastically lowers statin blood concentration, nullifying plaque stabilization and secondary prevention.",
    },
    {
      supplement: "High-Dose Vitamin E (>400 IU) or Ginkgo Biloba",
      medication: "Aspirin Protect 100mg",
      severity: "high",
      mechanism: "Additive antiplatelet / anticoagulation inhibition. Substantially elevates risk of gastrointestinal bleeding or hemorrhagic events.",
    },
    {
      supplement: "Potassium Salt Substitutes / High-Dose Potassium",
      medication: "Perindopril 5mg (ACE Inhibitor)",
      severity: "high",
      mechanism: "ACE inhibitors reduce aldosterone secretion, causing renal potassium retention. Supplemental potassium can trigger life-threatening hyperkalemia.",
    },
    {
      supplement: "Grapefruit Extract / Citrus Bergamot (High-Concentration)",
      medication: "Atorvastatin 20mg",
      severity: "warning",
      mechanism: "Inhibits intestinal CYP3A4, causing excessive statin bioaccumulation and elevated risk of myopathy / rhabdomyolysis.",
    },
  ];

  const filteredSupplements = supplementCatalog.filter((item) => {
    if (selectedGrade === "recommended" && !["A", "B+", "B"].includes(item.grade)) {
      return false;
    }
    if (selectedGrade === "hype" && !["D", "E"].includes(item.grade)) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.indication.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full border border-[#0F172A]/10 shadow-2xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-[#0F172A]/8 flex items-center justify-between bg-[#FAFAF8] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#14B8A6]/10 text-[#14B8A6] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#64748B]">
                Independent Clinical Audit • Hype Never. Evidence First.
              </div>
              <h2 className="text-lg font-bold text-[#0F172A]">
                Evidence-Based Supplement &amp; Interaction Auditor
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsSupplementModalOpen(false)}
            className="p-2 rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Member Profile Switcher */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 gap-3">
            <div className="text-xs text-[#64748B]">
              Auditing interactions for:{" "}
              <strong className="text-[#0F172A]">{currentMember.name}</strong> ({currentMember.relationLabel})
            </div>
            <div className="flex items-center gap-1.5">
              {familyMembers.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setActiveFamilyMemberId(m.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                    m.id === currentMember.id
                      ? "bg-[#0F172A] text-white shadow-xs"
                      : "bg-white text-[#64748B] hover:text-[#0F172A] border border-[#0F172A]/5"
                  }`}
                >
                  {m.name.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Active Medication Safety Warning (For Mohamed / Parents on Rx) */}
          {currentMember.medications.length > 0 && (
            <div className="p-5 rounded-3xl bg-[#FEF2F2] border border-[#FCA5A5]/40 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#DC2626]">
                <AlertTriangle className="w-4 h-4 text-[#DC2626]" />
                <span>
                  Active Prescription Interaction Warnings ({currentMember.name} is taking {currentMember.medications.map(m => m.name).join(", ")})
                </span>
              </div>

              <div className="space-y-2">
                {mohamedInteractions.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white border border-[#FCA5A5]/30 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#DC2626]">
                        ⚠️ {item.supplement} + {item.medication}
                      </span>
                      <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-[#DC2626]/10 text-[#DC2626]">
                        {item.severity} interaction
                      </span>
                    </div>
                    <p className="text-[11px] text-[#0F172A] leading-relaxed">
                      {item.mechanism}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 p-1 bg-[#FAFAF8] border border-[#0F172A]/8 rounded-2xl text-xs self-start sm:self-auto">
              <button
                onClick={() => setSelectedGrade("all")}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                  selectedGrade === "all"
                    ? "bg-[#0F172A] text-white shadow-xs"
                    : "text-[#64748B] hover:text-[#0F172A]"
                }`}
              >
                All Supplements
              </button>
              <button
                onClick={() => setSelectedGrade("recommended")}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                  selectedGrade === "recommended"
                    ? "bg-[#16A34A] text-white shadow-xs"
                    : "text-[#64748B] hover:text-[#0F172A]"
                }`}
              >
                Grade A / B (Evidence-Backed)
              </button>
              <button
                onClick={() => setSelectedGrade("hype")}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                  selectedGrade === "hype"
                    ? "bg-[#DC2626] text-white shadow-xs"
                    : "text-[#64748B] hover:text-[#0F172A]"
                }`}
              >
                Grade D / E (Hype / Avoid)
              </button>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search catalog..."
                className="pl-8 pr-3 py-1.5 rounded-xl bg-[#FAFAF8] border border-[#0F172A]/10 text-xs text-[#0F172A] focus:outline-none focus:border-[#14B8A6] w-full sm:w-44"
              />
            </div>
          </div>

          {/* Supplement Cards */}
          <div className="space-y-3">
            {filteredSupplements.map((sup) => {
              const isGradeA = ["A", "B+"].includes(sup.grade);
              const isGradeB = sup.grade === "B";
              const isGradeC = sup.grade === "C";
              const isHype = ["D", "E"].includes(sup.grade);

              const badgeColor = isGradeA
                ? "bg-[#16A34A]/10 text-[#16A34A] border-[#16A34A]/20"
                : isGradeB
                ? "bg-[#14B8A6]/10 text-[#0F766E] border-[#14B8A6]/20"
                : isGradeC
                ? "bg-[#F5C76A]/20 text-[#B45309] border-[#F5C76A]/30"
                : "bg-[#DC2626]/10 text-[#DC2626] border-[#DC2626]/20";

              const isAdded = addedNotes[sup.id];

              return (
                <div
                  key={sup.id}
                  className={`p-5 rounded-2xl border transition-all space-y-2 ${
                    isHype
                      ? "bg-[#FAFAF8] border-[#0F172A]/8 opacity-85"
                      : "bg-white border-[#0F172A]/10 shadow-soft"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md border ${badgeColor}`}>
                        Grade {sup.grade}
                      </span>
                      <h3 className="text-sm font-bold text-[#0F172A]">
                        {sup.name}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F1F5F9] text-[#64748B]">
                        {sup.category}
                      </span>
                    </div>

                    <span className="text-[11px] font-semibold text-[#64748B]">
                      {sup.hypeRating}
                    </span>
                  </div>

                  <p className="text-xs text-[#0F172A] leading-relaxed">
                    <strong>Evidence Indication:</strong> {sup.indication}
                  </p>

                  <div className="text-[11px] text-[#64748B] flex flex-wrap gap-x-4 gap-y-1">
                    <span>
                      <strong>Suggested Dosage:</strong> {sup.clinicalDose}
                    </span>
                  </div>

                  {sup.interactionWarning && (
                    <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#0F172A]/5 text-[11px] text-[#64748B] flex items-start gap-2">
                      <Info className="w-3.5 h-3.5 text-[#14B8A6] shrink-0 mt-0.5" />
                      <span>{sup.interactionWarning}</span>
                    </div>
                  )}

                  <div className="pt-1 flex items-center justify-between">
                    <span className="text-[10px] text-[#0F766E] font-medium">
                      Target Audience: {sup.targetProfile}
                    </span>

                    <button
                      onClick={() => handleAddDoctorInquiry(sup.name, sup.id)}
                      disabled={isAdded}
                      className={`text-xs px-3 py-1 rounded-xl border transition-colors flex items-center gap-1.5 ${
                        isAdded
                          ? "bg-[#16A34A]/10 text-[#16A34A] border-[#16A34A]/20"
                          : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] border-[#0F172A]/10"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added to Doctor Brief</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Ask Clinician About This</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Philosophy Statement */}
          <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 text-xs text-[#64748B] leading-relaxed flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-[#14B8A6] shrink-0 mt-0.5" />
            <div>
              <strong>Norya Independent Position:</strong> We do not sell, distribute, or take affiliate revenue from supplements. 90% of long-term health improvements come from sleep architecture, progressive cardiovascular movement, visceral fat reduction, and whole food fiber. Supplements only fill confirmed biomarker deficiencies.
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-5 border-t border-[#0F172A]/8 bg-[#FAFAF8] flex items-center justify-between shrink-0">
          <button
            onClick={() => setIsSupplementModalOpen(false)}
            className="text-xs text-[#64748B] hover:text-[#0F172A] font-semibold"
          >
            Close Auditor
          </button>

          <button
            onClick={() => setIsSupplementModalOpen(false)}
            className="px-5 py-2.5 rounded-2xl bg-[#0F172A] text-white hover:bg-[#1E293B] text-xs font-semibold transition-colors shadow-soft"
          >
            Done Reviewing
          </button>
        </div>

      </div>
    </div>
  );
};
