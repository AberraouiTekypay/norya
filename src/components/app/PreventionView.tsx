"use client";

import React, { useState } from "react";
import { useHealth } from "@/context/HealthContext";
import {
  ShieldCheck,
  Clock,
  MessageSquare,
  CheckCircle2,
  Calendar,
  Info,
  Building2,
  Filter,
  Check,
  Plus,
  Stethoscope,
} from "lucide-react";

type RegionCode = "spain" | "morocco" | "europe";
type CategoryFilter = "all" | "Cardiovascular" | "Metabolic" | "Oncology" | "Vision & Microvasculature" | "Systemic Inflammation";

export const PreventionView: React.FC = () => {
  const { preventionItems, togglePreventionItem, addDoctorQuestion, setActiveTab, user } = useHealth();

  // Initial region defaulted to user's country or Spain
  const [selectedRegion, setSelectedRegion] = useState<RegionCode>(
    user.country === "Morocco" ? "morocco" : "spain"
  );
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");
  const [activeAgeBracket, setActiveAgeBracket] = useState<string>("40-49");
  const [addedQuestions, setAddedQuestions] = useState<Record<string, boolean>>({});

  const completedCount = preventionItems.filter((i) => i.status === "completed").length;
  const totalCount = preventionItems.length;

  const filteredItems = preventionItems.filter((item) => {
    if (selectedCategory === "all") return true;
    return item.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  const handleAddDoctorQuestion = (title: string, id: string) => {
    addDoctorQuestion(`Clinical recommendation & interval for screening: ${title}`);
    setAddedQuestions((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAddedQuestions((prev) => ({ ...prev, [id]: false }));
    }, 2500);
  };

  const ageBrackets = [
    {
      range: "20-39",
      label: "Young Adult Baseline",
      focus: "Baseline lipid panel (ApoB/LDL-C), baseline blood pressure check, HPV cervical screening (every 3-5y), dental hygiene twice yearly.",
    },
    {
      range: "40-49",
      label: "Metabolic & Microvascular",
      focus: "Semi-annual blood pressure tracking, annual HbA1c & fasting glycemia, biennial retinal examination & intraocular pressure, assess coronary calcium score (CAC) if strong family history.",
    },
    {
      range: "50-64",
      label: "Active Cancer & Cardiovascular",
      focus: "Biennial fecal immunochemical test (FIT) or colonoscopy, mammography (biennial age 50-69), cardiovascular 10-year SCORE2 assessment, lipid optimization.",
    },
    {
      range: "65+",
      label: "Functional Independence & Longevity",
      focus: "Annual abdominal aortic aneurysm (AAA) ultrasound in men who smoked, bone mineral density (DEXA) for osteoporosis, hearing and visual acuity testing, influenza and pneumococcal vaccination.",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
            Proactive Clinical Care & Guidelines
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
            Prevention Checklist
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Age-, sex-, and evidence-based screening roadmap tailored for {user.firstName} (Age {user.age}).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-[#CCFBF1]/50 border border-[#14B8A6]/20 text-xs font-semibold text-[#0F766E] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#14B8A6]" />
            <span>{completedCount} of {totalCount} Screenings Current</span>
          </div>

          <button
            onClick={() => setActiveTab("doctor")}
            className="px-3.5 py-2.5 rounded-2xl bg-[#0F172A] text-white hover:bg-[#1E293B] text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-soft"
          >
            <Stethoscope className="w-3.5 h-3.5 text-[#14B8A6]" />
            <span className="hidden sm:inline">Doctor Mode</span>
          </button>
        </div>
      </div>

      {/* Regional Healthcare Navigation Guide */}
      <div className="p-6 rounded-3xl bg-white border border-[#0F172A]/8 shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#0F172A]/5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#14B8A6]/10 flex items-center justify-center text-[#14B8A6]">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#0F172A]">
                Local Healthcare System & Diagnostic Navigation
              </h2>
              <p className="text-xs text-[#64748B]">
                Public coverage, direct access laboratories, and emergency protocols.
              </p>
            </div>
          </div>

          {/* Region Tabs */}
          <div className="flex items-center p-1 rounded-xl bg-[#F1F5F9] text-xs font-medium self-start sm:self-auto">
            <button
              onClick={() => setSelectedRegion("spain")}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                selectedRegion === "spain"
                  ? "bg-white text-[#0F172A] shadow-xs font-semibold"
                  : "text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              <span>🇪🇸</span>
              <span>Spain (SNS)</span>
            </button>
            <button
              onClick={() => setSelectedRegion("morocco")}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                selectedRegion === "morocco"
                  ? "bg-white text-[#0F172A] shadow-xs font-semibold"
                  : "text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              <span>🇲🇦</span>
              <span>Morocco (AMO)</span>
            </button>
            <button
              onClick={() => setSelectedRegion("europe")}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                selectedRegion === "europe"
                  ? "bg-white text-[#0F172A] shadow-xs font-semibold"
                  : "text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              <span>🌐</span>
              <span>ESC / Europe</span>
            </button>
          </div>
        </div>

        {/* Region Content */}
        {selectedRegion === "spain" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#64748B]">
            <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 space-y-2">
              <div className="font-bold text-[#0F172A] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#14B8A6]" />
                Atención Primaria & Centros de Salud
              </div>
              <p className="leading-relaxed">
                Book with your assigned <strong>Médico de Familia</strong> via your regional health portal (e.g., <em>La Meva Salut</em> in Catalonia, <em>ClicSalud+</em> in Andalusia, <em>Cita SERMAS</em> in Madrid). Primary preventive visits are 100% public covered with your TSI card.
              </p>
              <div className="text-[11px] text-[#0F766E] font-medium pt-1">
                ✓ Free annual routine blood tests with physician order
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 space-y-2">
              <div className="font-bold text-[#0F172A] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                Direct Private Laboratories
              </div>
              <p className="leading-relaxed">
                If you prefer rapid testing without waiting times: walk into <strong>Echevarne</strong>, <strong>Synlab</strong>, or <strong>Eurofins Megalab</strong>. Direct cash blood panels (ApoB, HbA1c, Vitamin D) range between €35 and €95.
              </p>
              <div className="text-[11px] text-[#0284C7] font-medium pt-1">
                ✓ Results typically delivered online within 24–48 hours
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 space-y-2">
              <div className="font-bold text-[#0F172A] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F97360]" />
                Emergency & Acute Escalation
              </div>
              <p className="leading-relaxed">
                For acute chest pain, neurological deficit, or severe hypertensive urgency (&gt;180/120 mmHg), do not wait. Dial emergency dispatch directly.
              </p>
              <div className="flex items-center gap-2 pt-1 font-mono font-bold text-[#0F172A]">
                <span className="px-2 py-1 rounded-lg bg-[#F97360]/15 text-[#DC2626]">112 (General)</span>
                <span className="px-2 py-1 rounded-lg bg-[#0F172A]/5 text-[#0F172A]">061 (Sanitarias)</span>
              </div>
            </div>
          </div>
        )}

        {selectedRegion === "morocco" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#64748B]">
            <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 space-y-2">
              <div className="font-bold text-[#0F172A] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#14B8A6]" />
                Assurance Maladie (AMO / CNSS / CNOPS)
              </div>
              <p className="leading-relaxed">
                Under Moroccan AMO (CNSS &amp; CNOPS), preventive consultations and laboratory analyses are reimbursed at <strong>70% to 80%</strong> based on the <em>Tarif National de Référence (TNR)</em>. Have your doctor stamp your <em>Feuille de Soins</em>.
              </p>
              <div className="text-[11px] text-[#0F766E] font-medium pt-1">
                ✓ Attach stamped lab receipt + barcode for CNSS filing
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 space-y-2">
              <div className="font-bold text-[#0F172A] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                Laboratoires d'Analyses Médicales
              </div>
              <p className="leading-relaxed">
                Accredited private biology laboratories in Casablanca, Rabat, Marrakech, Tangier, and Fès offer immediate walk-in sampling without appointment. Comprehensive preventive profiles (glycémie, bilan lipidique complet, créatinine, NFS) range from 250 to 600 MAD.
              </p>
              <div className="text-[11px] text-[#0284C7] font-medium pt-1">
                ✓ Available without prior prescription for self-check
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 space-y-2">
              <div className="font-bold text-[#0F172A] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F97360]" />
                Urgences & Assistance Médicale
              </div>
              <p className="leading-relaxed">
                For life-threatening symptoms, contact medical emergency dispatch immediately or proceed to the nearest Polyclinique / CHU emergency department.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 pt-1 font-mono font-bold text-[#0F172A]">
                <span className="px-2 py-1 rounded-lg bg-[#F97360]/15 text-[#DC2626]">15 (SAMU)</span>
                <span className="px-2 py-1 rounded-lg bg-[#0F172A]/5 text-[#0F172A]">150 (Protection Civile)</span>
                <span className="px-2 py-1 rounded-lg bg-[#0F172A]/5 text-[#0F172A]">190 (Police)</span>
              </div>
            </div>
          </div>
        )}

        {selectedRegion === "europe" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#64748B]">
            <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 space-y-2">
              <div className="font-bold text-[#0F172A] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#14B8A6]" />
                ESC Cardiovascular Guidelines
              </div>
              <p className="leading-relaxed">
                The European Society of Cardiology recommends comprehensive SCORE2 cardiovascular risk assessment every 5 years starting at age 40, prioritizing ApoB, standardized home blood pressure, and smoking cessation.
              </p>
              <div className="text-[11px] text-[#0F766E] font-medium pt-1">
                ✓ Target ApoB &lt; 80 mg/dL for intermediate risk
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 space-y-2">
              <div className="font-bold text-[#0F172A] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                USPSTF Grade A & B Screenings
              </div>
              <p className="leading-relaxed">
                Screenings with high certainty of substantial net benefit: colorectal cancer screening (age 45–75), cervical cancer (age 21–65), diabetes screening (age 35–70 with BMI ≥ 25), and hypertension screening in all adults.
              </p>
              <div className="text-[11px] text-[#0284C7] font-medium pt-1">
                ✓ Evidence-backed population interventions
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 space-y-2">
              <div className="font-bold text-[#0F172A] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F97360]" />
                Pan-European Emergency Dispatch
              </div>
              <p className="leading-relaxed">
                Universal European emergency number operational in all 27 EU member states, operating free of charge from any fixed or mobile phone.
              </p>
              <div className="flex items-center gap-2 pt-1 font-mono font-bold text-[#0F172A]">
                <span className="px-2 py-1 rounded-lg bg-[#F97360]/15 text-[#DC2626]">112 (Universal EU Emergency)</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Screenings by Age Guide */}
      <div className="p-6 rounded-3xl bg-[#FAFAF8] border border-[#0F172A]/8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#14B8A6]" />
            <h3 className="text-sm font-bold text-[#0F172A]">
              Screening Priorities by Age Bracket
            </h3>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {ageBrackets.map((b) => (
              <button
                key={b.range}
                onClick={() => setActiveAgeBracket(b.range)}
                className={`px-3 py-1 text-xs rounded-xl transition-all ${
                  activeAgeBracket === b.range
                    ? "bg-[#0F172A] text-white font-semibold shadow-xs"
                    : "bg-white text-[#64748B] hover:text-[#0F172A] border border-[#0F172A]/5"
                }`}
              >
                {b.range}
              </button>
            ))}
          </div>
        </div>

        {ageBrackets
          .filter((b) => b.range === activeAgeBracket)
          .map((b) => (
            <div key={b.range} className="p-4 rounded-2xl bg-white border border-[#0F172A]/5 space-y-1">
              <div className="text-xs font-bold text-[#0F766E] uppercase tracking-wider">
                {b.label} (Ages {b.range})
              </div>
              <p className="text-xs text-[#0F172A] leading-relaxed">
                {b.focus}
              </p>
            </div>
          ))}
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          <span className="text-xs text-[#64748B] font-medium flex items-center gap-1 pl-1 pr-2 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            Category:
          </span>
          {(
            [
              { id: "all", label: "All Items" },
              { id: "Cardiovascular", label: "Cardiovascular" },
              { id: "Metabolic", label: "Metabolic" },
              { id: "Oncology", label: "Oncology" },
              { id: "Vision & Microvasculature", label: "Vision & Eyes" },
              { id: "Systemic Inflammation", label: "Dental & Systemic" },
            ] as const
          ).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? "bg-[#14B8A6] text-white font-semibold shadow-xs"
                  : "bg-white text-[#64748B] hover:bg-[#F1F5F9] border border-[#0F172A]/6"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Prevention Items List */}
      <div className="space-y-3">
        {filteredItems.map((item) => {
          const isDone = item.status === "completed";
          const isDue = item.status === "due_soon";
          const isClinician = item.status === "discuss_with_clinician";

          const statusBadge = isDone
            ? "bg-[#16A34A]/10 text-[#16A34A]"
            : isDue
            ? "bg-[#F5C76A]/20 text-[#B45309]"
            : "bg-[#38BDF8]/15 text-[#0284C7]";

          const StatusIcon = isDone
            ? CheckCircle2
            : isDue
            ? Clock
            : MessageSquare;

          const isAdded = addedQuestions[item.id];

          return (
            <div
              key={item.id}
              className={`p-5 rounded-2xl bg-white border transition-all ${
                isDone
                  ? "border-[#0F172A]/5 opacity-90"
                  : "border-[#0F172A]/10 shadow-soft hover:border-[#14B8A6]/40"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                
                {/* Left details */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => togglePreventionItem(item.id)}
                      className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors shrink-0 ${
                        isDone
                          ? "bg-[#16A34A] text-white"
                          : "border-2 border-[#CBD5E1] hover:border-[#14B8A6]"
                      }`}
                      title={isDone ? "Mark as pending" : "Mark as completed"}
                    >
                      {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>

                    <h3 className={`text-sm font-bold ${isDone ? "text-[#64748B] line-through" : "text-[#0F172A]"}`}>
                      {item.title}
                    </h3>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F1F5F9] text-[#64748B]">
                      Evidence {item.evidenceGrade}
                    </span>

                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FAFAF8] border border-[#0F172A]/5 text-[#64748B]">
                      {item.category}
                    </span>
                  </div>

                  <div className="text-xs text-[#64748B] pl-7">
                    Frequency: <strong>{item.recommendedFrequency}</strong>
                    {item.lastCompleted && (
                      <span className="ml-2 text-[#0F766E]">
                        (Last: {item.lastCompleted})
                      </span>
                    )}
                    {" • "}
                    <span>Next Due: <strong>{item.nextDue}</strong></span>
                  </div>

                  <p className="text-xs text-[#0F172A] leading-relaxed pt-0.5 pl-7">
                    {item.rationalSummary}
                  </p>

                  <div className="text-[11px] text-[#0F766E] font-medium pt-1 pl-7 flex items-center gap-1">
                    <span>📍</span>
                    <span>{item.localRelevance}</span>
                  </div>
                </div>

                {/* Right actions */}
                <div className="flex sm:flex-col items-center sm:items-end gap-2.5 shrink-0 pl-7 sm:pl-0">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl ${statusBadge}`}>
                    <StatusIcon className="w-3.5 h-3.5" />
                    <span>
                      {isDone ? "Completed" : isDue ? "Due Soon" : "Discuss with Doctor"}
                    </span>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAddDoctorQuestion(item.title, item.id)}
                      disabled={isAdded}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-colors flex items-center gap-1 ${
                        isAdded
                          ? "bg-[#16A34A]/10 text-[#16A34A] border-[#16A34A]/20"
                          : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] border-[#0F172A]/10"
                      }`}
                      title="Add to Doctor Discussion Brief"
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Added to Doctor Mode</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3 h-3" />
                          <span>Ask Doctor</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => togglePreventionItem(item.id)}
                      className="text-xs text-[#0F766E] hover:underline font-medium"
                    >
                      {isDone ? "Reopen" : "Mark Done"}
                    </button>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="p-5 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 flex items-start gap-3 text-xs text-[#64748B] leading-relaxed">
        <Info className="w-4 h-4 text-[#14B8A6] shrink-0 mt-0.5" />
        <div>
          <strong className="text-[#0F172A]">Clinical Evidence Basis:</strong> Screening intervals are derived from the Spanish Society of Family and Community Medicine (semFYC), European Society of Cardiology (ESC), and regional health screening initiatives in Spain and Morocco. Individuals with confirmed first-degree familial cardiovascular disease or cancer may require personalized earlier screening intervals.
        </div>
      </div>

    </div>
  );
};
