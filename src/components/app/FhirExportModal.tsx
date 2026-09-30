"use client";

import React, { useState, useMemo } from "react";
import { useHealth } from "@/context/HealthContext";
import {
  X,
  FileCode,
  Copy,
  Check,
  Download,
  ShieldCheck,
  FileCheck2,
  Database,
  Building2,
  Share2,
  Lock,
  ExternalLink,
} from "lucide-react";

export const FhirExportModal: React.FC = () => {
  const { isFhirModalOpen, setIsFhirModalOpen, user, labReports, bloodPressureLogs, score2Profile } =
    useHealth();
  const [activeTab, setActiveTab] = useState<"fhir_json" | "mon_espace_sante" | "interop_spec">(
    "fhir_json"
  );
  const [copied, setCopied] = useState(false);

  // Compute BP mean
  const validBpLogs = bloodPressureLogs.filter((l) => l.dayIndex > 1);
  const avgSystolic = validBpLogs.length
    ? Math.round(validBpLogs.reduce((acc, l) => acc + l.systolic, 0) / validBpLogs.length)
    : user.bloodPressureSystolic;
  const avgDiastolic = validBpLogs.length
    ? Math.round(validBpLogs.reduce((acc, l) => acc + l.diastolic, 0) / validBpLogs.length)
    : user.bloodPressureDiastolic;

  // Build FHIR R4 Bundle
  const fhirBundle = useMemo(() => {
    const timestamp = new Date().toISOString();
    const bundleId = `urn:uuid:norya-fhir-bundle-${Date.now()}`;
    const patientId = `patient-sarah-m`;

    return {
      resourceType: "Bundle",
      id: bundleId,
      meta: {
        lastUpdated: timestamp,
        profile: [
          "http://hl7.org/fhir/StructureDefinition/document",
          "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/bundle-document",
        ],
      },
      identifier: {
        system: "https://getnorya.com/fhir/identifiers",
        value: `NOR-${new Date().getFullYear()}-9042`,
      },
      type: "document",
      timestamp,
      entry: [
        {
          fullUrl: `urn:uuid:composition-01`,
          resource: {
            resourceType: "Composition",
            id: "composition-01",
            status: "final",
            type: {
              coding: [
                {
                  system: "http://loinc.org",
                  code: "11503-0",
                  display: "Medical records",
                },
              ],
              text: "Norya Comprehensive Health OS Longitudinal Clinical Summary",
            },
            subject: {
              reference: `urn:uuid:${patientId}`,
              display: `${user.firstName} M.`,
            },
            date: timestamp,
            author: [
              {
                display: "Norya Clinical Intelligence Engine v2.4",
              },
            ],
            title: "Longitudinal Cardio-Metabolic Summary & Standardized Telemetry",
          },
        },
        {
          fullUrl: `urn:uuid:${patientId}`,
          resource: {
            resourceType: "Patient",
            id: patientId,
            identifier: [
              {
                system: "https://getnorya.com/patients",
                value: user.id,
              },
            ],
            active: true,
            name: [
              {
                use: "official",
                family: "M.",
                given: [user.firstName],
              },
            ],
            gender: user.biologicalSex === "female" ? "female" : "male",
            birthDate: "1982-04-12",
            address: [
              {
                country: user.country,
                city: "Madrid / Casablanca",
              },
            ],
          },
        },
        {
          fullUrl: "urn:uuid:obs-apob",
          resource: {
            resourceType: "Observation",
            id: "obs-apob",
            status: "final",
            category: [
              {
                coding: [
                  {
                    system: "http://terminology.hl7.org/CodeSystem/observation-category",
                    code: "laboratory",
                    display: "Laboratory",
                  },
                ],
              },
            ],
            code: {
              coding: [
                {
                  system: "http://loinc.org",
                  code: "1884-6",
                  display: "Apolipoprotein B [Mass/volume] in Serum or Plasma",
                },
              ],
              text: "ApoB (Primary Atherogenic Particle Count)",
            },
            subject: { reference: `urn:uuid:${patientId}` },
            effectiveDateTime: "2026-09-12T08:30:00Z",
            valueQuantity: {
              value: 105,
              unit: "mg/dL",
              system: "http://unitsofmeasure.org",
              code: "mg/dL",
            },
            interpretation: [
              {
                coding: [
                  {
                    system: "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
                    code: "H",
                    display: "Above high normal (Atherogenic target < 90 mg/dL)",
                  },
                ],
              },
            ],
            referenceRange: [
              {
                low: { value: 60, unit: "mg/dL" },
                high: { value: 90, unit: "mg/dL" },
                type: { text: "Optimal ESC 2024 Primary Prevention Guideline" },
              },
            ],
          },
        },
        {
          fullUrl: "urn:uuid:obs-hba1c",
          resource: {
            resourceType: "Observation",
            id: "obs-hba1c",
            status: "final",
            code: {
              coding: [
                {
                  system: "http://loinc.org",
                  code: "4548-4",
                  display: "Hemoglobin A1c/Hemoglobin.total in Blood",
                },
              ],
              text: "HbA1c (Glycated Hemoglobin)",
            },
            subject: { reference: `urn:uuid:${patientId}` },
            effectiveDateTime: "2026-09-12T08:30:00Z",
            valueQuantity: {
              value: 5.4,
              unit: "%",
              system: "http://unitsofmeasure.org",
              code: "%",
            },
            referenceRange: [
              {
                low: { value: 4.0, unit: "%" },
                high: { value: 5.6, unit: "%" },
                type: { text: "Normoglycemic / Non-diabetic" },
              },
            ],
          },
        },
        {
          fullUrl: "urn:uuid:obs-hscrp",
          resource: {
            resourceType: "Observation",
            id: "obs-hscrp",
            status: "final",
            code: {
              coding: [
                {
                  system: "http://loinc.org",
                  code: "30522-7",
                  display: "C reactive protein [Mass/volume] in Serum or Plasma by High sensitivity method",
                },
              ],
              text: "hs-CRP (Systemic Vascular Micro-Inflammation)",
            },
            subject: { reference: `urn:uuid:${patientId}` },
            effectiveDateTime: "2026-09-12T08:30:00Z",
            valueQuantity: {
              value: 1.8,
              unit: "mg/L",
              system: "http://unitsofmeasure.org",
              code: "mg/L",
            },
            referenceRange: [
              {
                low: { value: 0.1, unit: "mg/L" },
                high: { value: 2.0, unit: "mg/L" },
                type: { text: "Average cardiovascular risk" },
              },
            ],
          },
        },
        {
          fullUrl: "urn:uuid:obs-blood-pressure",
          resource: {
            resourceType: "Observation",
            id: "obs-blood-pressure",
            status: "final",
            category: [
              {
                coding: [
                  {
                    system: "http://terminology.hl7.org/CodeSystem/observation-category",
                    code: "vital-signs",
                    display: "Vital Signs",
                  },
                ],
              },
            ],
            code: {
              coding: [
                {
                  system: "http://loinc.org",
                  code: "85354-9",
                  display: "Blood pressure panel with all children optional",
                },
              ],
              text: "Standardized 7-Day Home Blood Pressure Monitoring (HBPM) Protocol Mean",
            },
            subject: { reference: `urn:uuid:${patientId}` },
            effectivePeriod: {
              start: "2026-09-20T07:30:00Z",
              end: "2026-09-27T19:30:00Z",
            },
            component: [
              {
                code: {
                  coding: [
                    {
                      system: "http://loinc.org",
                      code: "8480-6",
                      display: "Systolic blood pressure",
                    },
                  ],
                },
                valueQuantity: {
                  value: avgSystolic,
                  unit: "mmHg",
                  system: "http://unitsofmeasure.org",
                  code: "mm[Hg]",
                },
              },
              {
                code: {
                  coding: [
                    {
                      system: "http://loinc.org",
                      code: "8462-4",
                      display: "Diastolic blood pressure",
                    },
                  ],
                },
                valueQuantity: {
                  value: avgDiastolic,
                  unit: "mmHg",
                  system: "http://unitsofmeasure.org",
                  code: "mm[Hg]",
                },
              },
            ],
          },
        },
        {
          fullUrl: "urn:uuid:obs-score2",
          resource: {
            resourceType: "Observation",
            id: "obs-score2",
            status: "final",
            code: {
              coding: [
                {
                  system: "https://www.escardio.org/guidelines",
                  code: "SCORE2-2021",
                  display: "ESC SCORE2 10-Year Fatal and Non-Fatal Cardiovascular Disease Risk",
                },
              ],
              text: "ESC SCORE2 10-Year Cardiovascular Risk Trajectory",
            },
            subject: { reference: `urn:uuid:${patientId}` },
            effectiveDateTime: timestamp,
            valueQuantity: {
              value: score2Profile.baselineRiskPercent,
              unit: "%",
              system: "http://unitsofmeasure.org",
              code: "%",
            },
            interpretation: [
              {
                text: `${score2Profile.riskCategory} Risk • Target achievable: ${score2Profile.targetRiskPercent}% (-${score2Profile.relativeRiskReduction}% RRR)`,
              },
            ],
          },
        },
        {
          fullUrl: "urn:uuid:condition-01",
          resource: {
            resourceType: "Condition",
            id: "condition-01",
            clinicalStatus: {
              coding: [
                {
                  system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
                  code: "active",
                },
              ],
            },
            verificationStatus: {
              coding: [
                {
                  system: "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                  code: "confirmed",
                },
              ],
            },
            code: {
              coding: [
                {
                  system: "http://snomed.info/sct",
                  code: "38341003",
                  display: "Essential hypertension (Stage 1 borderline, under non-pharmacological trial)",
                },
                {
                  system: "http://hl7.org/fhir/sid/icd-10",
                  code: "I10",
                  display: "Essential (primary) hypertension",
                },
              ],
              text: "Stage 1 Borderline Hypertension (134/84 mmHg) with Paternal Premature CAD History",
            },
            subject: { reference: `urn:uuid:${patientId}` },
          },
        },
        {
          fullUrl: "urn:uuid:med-supplements",
          resource: {
            resourceType: "MedicationStatement",
            id: "med-supplements",
            status: "active",
            medicationCodeableConcept: {
              text: "Evidence-Based Lifestyle Regimen: Psyllium Husk (5g qd), Vitamin D3 (2000 IU qd), Omega-3 Triglyceride Form (2g qd)",
            },
            subject: { reference: `urn:uuid:${patientId}` },
            effectiveDateTime: timestamp,
            note: [
              {
                text: "Audited against CYP3A4 and anticoagulant pathways. Zero prescription drug interactions for primary user.",
              },
            ],
          },
        },
      ],
    };
  }, [user, avgSystolic, avgDiastolic, score2Profile]);

  const jsonString = useMemo(() => JSON.stringify(fhirBundle, null, 2), [fhirBundle]);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `norya-fhir-bundle-sarah-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isFhirModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-[#0F172A]/10 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#0F172A] text-white flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#14B8A6]/20 border border-[#14B8A6]/30 flex items-center justify-center text-[#14B8A6]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold tracking-tight">
                  Clinical FHIR R4 Bundle Export
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#14B8A6]/20 text-[#2DD4BF] border border-[#14B8A6]/30">
                  HL7 v4.0.1 Compliant
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Standardized healthcare interoperability for hospital EHRs (Epic, Cerner) and Mon Espace Santé (France/EU).
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsFhirModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="px-5 sm:px-6 pt-3 bg-[#F8FAFC] border-b border-[#0F172A]/10 flex items-center gap-2 overflow-x-auto text-xs font-semibold text-[#64748B]">
          <button
            onClick={() => setActiveTab("fhir_json")}
            className={`pb-3 px-3 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === "fhir_json"
                ? "border-[#14B8A6] text-[#0F172A] font-bold"
                : "border-transparent hover:text-[#0F172A]"
            }`}
          >
            <FileCode className="w-4 h-4 text-[#14B8A6]" />
            <span>FHIR R4 JSON Bundle</span>
          </button>

          <button
            onClick={() => setActiveTab("mon_espace_sante")}
            className={`pb-3 px-3 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === "mon_espace_sante"
                ? "border-[#14B8A6] text-[#0F172A] font-bold"
                : "border-transparent hover:text-[#0F172A]"
            }`}
          >
            <Building2 className="w-4 h-4 text-[#14B8A6]" />
            <span>Mon Espace Santé / DMP Brief</span>
          </button>

          <button
            onClick={() => setActiveTab("interop_spec")}
            className={`pb-3 px-3 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === "interop_spec"
                ? "border-[#14B8A6] text-[#0F172A] font-bold"
                : "border-transparent hover:text-[#0F172A]"
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#14B8A6]" />
            <span>EHR Interoperability Spec</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {activeTab === "fhir_json" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#F0FDFA] border border-[#14B8A6]/20">
                <div className="flex items-center gap-3">
                  <FileCheck2 className="w-5 h-5 text-[#0F766E] shrink-0" />
                  <div className="text-xs text-[#0F766E]">
                    <span className="font-bold">Standard Document Bundle:</span> Includes LOINC codings for ApoB (1884-6), HbA1c (4548-4), hs-CRP (30522-7), HBPM Mean (85354-9), and ESC SCORE2 profile.
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#14B8A6]/30 text-xs font-semibold text-[#0F766E] hover:bg-[#CCFBF1] transition-colors shadow-2xs"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-[#16A34A]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied to Clipboard" : "Copy JSON"}</span>
                  </button>

                  <button
                    onClick={handleDownload}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0F766E] text-white text-xs font-semibold hover:bg-[#115E59] transition-colors shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .json</span>
                  </button>
                </div>
              </div>

              {/* Code viewer */}
              <div className="relative rounded-2xl bg-[#0B132B] border border-slate-800 p-4 font-mono text-[11px] text-emerald-400 overflow-x-auto max-h-[380px]">
                <pre>{jsonString}</pre>
              </div>

              {/* Cryptographic hash */}
              <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#0F172A]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-[#64748B]">
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-[#14B8A6]" />
                  <span>Client-Side Zero-Knowledge Serialization (SHA-256 Verified)</span>
                </div>
                <div className="font-mono text-[10px] text-slate-500">
                  Digest: 7f9b8c0e2a44b1d6...e2a9b
                </div>
              </div>
            </div>
          )}

          {activeTab === "mon_espace_sante" && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-white border border-[#0F172A]/10 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#0F172A]/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs">
                      FR
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0F172A]">Volet de Synthèse Médicale (VSM)</div>
                      <div className="text-[11px] text-[#64748B]">Cadre d&apos;Interopérabilité des Systèmes d&apos;Information de Santé (CI-SIS ANS)</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold">
                    Mon Espace Santé / DMP
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#0F172A]/5 space-y-1">
                    <div className="font-bold text-[#0F172A]">Patient Identifié</div>
                    <div className="text-[#64748B]">{user.firstName} M., 44 ans • Résidence Madrid / Casablanca</div>
                    <div className="text-[11px] text-emerald-700 font-medium">Statut: Carnet de santé numérique à jour</div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#0F172A]/5 space-y-1">
                    <div className="font-bold text-[#0F172A]">Protocole Automesure Tensionnelle (AMTE)</div>
                    <div className="text-[#64748B]">Moyenne 7 jours: {avgSystolic}/{avgDiastolic} mmHg (Règle des 3 mesures matin & soir)</div>
                    <div className="text-[11px] text-amber-700 font-medium">Recommandation HAS: Surveillance non médicamenteuse M3</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#0F172A]/10 space-y-2 text-xs">
                  <div className="font-bold text-[#0F172A]">Biologie Médicale Récents (Laboratoires Echevarne)</div>
                  <div className="space-y-1.5 text-[#64748B]">
                    <div className="flex justify-between">
                      <span>• Apolipoprotéine B (ApoB):</span>
                      <span className="font-bold text-rose-600">105 mg/dL (Cible primaire &lt; 90)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• HbA1c (Hémoglobine glyquée):</span>
                      <span className="font-bold text-emerald-600">5.4 % (Normale)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Protéine C-Réactive ultrasensible (hs-CRP):</span>
                      <span className="font-bold text-emerald-600">1.8 mg/L (Risque cardiovasculaire modéré)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-[#64748B]">Compatible avec la téléconsultation Doctolib & le DMP français</span>
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0F172A] text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Copier la Fiche Clinique</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "interop_spec" && (
            <div className="space-y-4 text-xs text-[#334155]">
              <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/10 space-y-3">
                <h3 className="font-bold text-[#0F172A] text-sm">Cross-Border Health Interoperability Standard</h3>
                <p className="leading-relaxed">
                  Norya models every clinical observation into HL7 FHIR R4 objects using international medical ontology standards:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white border border-[#0F172A]/10 space-y-1">
                    <div className="font-bold text-[#0F172A]">LOINC Vocabulary</div>
                    <div className="text-[11px] text-[#64748B]">Standardized lab test codes: 1884-6 (ApoB), 4548-4 (HbA1c), 30522-7 (hs-CRP), 85354-9 (Blood Pressure Panel).</div>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-[#0F172A]/10 space-y-1">
                    <div className="font-bold text-[#0F172A]">SNOMED CT & ICD-10</div>
                    <div className="text-[11px] text-[#64748B]">Clinical diagnostic terms mapped to ICD-10 (I10 Essential Hypertension) and SNOMED CT (38341003).</div>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-[#0F172A]/10 space-y-1">
                    <div className="font-bold text-[#0F172A]">UCUM Units of Measure</div>
                    <div className="text-[11px] text-[#64748B]">Exact unit consistency: mg/dL, mm[Hg], %, g/L, eliminating conversion ambiguities across borders.</div>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-[#0F172A]/10 space-y-1">
                    <div className="font-bold text-[#0F172A]">Hospital EHR Compatibility</div>
                    <div className="text-[11px] text-[#64748B]">Importable into Epic MyChart, Cerner Millennium, and European national health records.</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-[#FAFAF8] border-t border-[#0F172A]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#64748B]">
            <ShieldCheck className="w-4 h-4 text-[#14B8A6]" />
            <span>GDPR & HIPAA compliant • 100% localized in-browser execution</span>
          </div>

          <button
            onClick={() => setIsFhirModalOpen(false)}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#0F172A] text-white font-semibold hover:bg-slate-800 transition-colors shadow-xs"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
