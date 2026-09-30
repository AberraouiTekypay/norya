"use client";

import React, { useState } from "react";
import { useHealth } from "@/context/HealthContext";
import { Biomarker } from "@/types/health";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  HelpCircle,
  Stethoscope,
  TrendingDown,
  TrendingUp,
  X,
  Sparkles,
  ArrowRight,
  Filter,
  Clock,
  Dna,
} from "lucide-react";

export const LabsView: React.FC = () => {
  const {
    labReports,
    uploadLabReport,
    setActiveTab,
    setSelectedBiomarker,
    setIsPreLabModalOpen,
    setIsDlcnModalOpen,
  } = useHealth();
  const [unitMode, setUnitMode] = useState<"standard" | "si">("standard"); // mg/dL vs mmol/L
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [ocrStep, setOcrStep] = useState(0);

  const currentReport = labReports[0];

  const handleSimulatedUpload = async (labSource: "echevarne" | "casablanca" = "echevarne") => {
    setIsUploading(true);
    setOcrStep(1); // Scanning document

    await new Promise((r) => setTimeout(r, 600));
    setOcrStep(2); // Extracting tokens

    await new Promise((r) => setTimeout(r, 700));
    setOcrStep(3); // Normalizing units

    await new Promise((r) => setTimeout(r, 600));
    setOcrStep(4); // Clinical matching

    await new Promise((r) => setTimeout(r, 500));

    const title =
      labSource === "echevarne"
        ? "Laboratorios Echevarne Madrid (Lipid Follow-Up)"
        : "Laboratoire d'Analyses Médicales Casablanca (Bilan Cardiovasculaire)";

    uploadLabReport(title);
    setIsUploading(false);
    setOcrStep(0);
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 5000);
  };

  const formatBiomarkerValue = (marker: Biomarker) => {
    if (unitMode === "si") {
      if (marker.canonicalName === "ApoB") return `${(marker.value * 0.01).toFixed(2)} g/L`;
      if (marker.canonicalName === "Triglycerides") return `${(marker.value * 0.0113).toFixed(2)} mmol/L`;
      if (marker.canonicalName === "LDL-C") return `${(marker.value * 0.0259).toFixed(2)} mmol/L`;
      if (marker.canonicalName === "HbA1c") return `${Math.round((marker.value - 2.15) * 10.93)} mmol/mol`;
    }
    return `${marker.value} ${marker.unit}`;
  };

  const formatBiomarkerRef = (marker: Biomarker) => {
    if (unitMode === "si") {
      if (marker.canonicalName === "ApoB") return `0.60–0.90 g/L`;
      if (marker.canonicalName === "Triglycerides") return `<1.70 mmol/L`;
      if (marker.canonicalName === "LDL-C") return `<3.00 mmol/L`;
      if (marker.canonicalName === "HbA1c") return `20–38 mmol/mol`;
    }
    return `${marker.referenceLow}–${marker.referenceHigh} ${marker.unit}`;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
            Laboratory Intelligence
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
            Labs & Biomarkers
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Automatic OCR extraction, longitudinal curves, and plain-language clinical translation.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsPreLabModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F0FDFA] border border-[#14B8A6]/30 text-xs font-semibold text-[#0F766E] hover:bg-[#CCFBF1] transition-colors shadow-2xs"
          >
            <Clock className="w-3.5 h-3.5 text-[#14B8A6]" />
            <span>Pre-Lab Guide (48h)</span>
          </button>

          <button
            onClick={() => setIsDlcnModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#0F172A]/10 text-xs font-semibold text-[#0F172A] hover:bg-[#FAFAF8] transition-colors shadow-2xs"
          >
            <Dna className="w-3.5 h-3.5 text-[#14B8A6]" />
            <span>DLCN FH Score</span>
          </button>

          <button
            onClick={() => setUnitMode(unitMode === "standard" ? "si" : "standard")}
            className="px-3 py-1.5 rounded-xl bg-white border border-[#0F172A]/10 text-xs font-semibold text-[#0F172A] hover:bg-[#FAFAF8] transition-colors"
          >
            Units: {unitMode === "standard" ? "Spain / US (mg/dL)" : "SI / Europe (mmol/L, g/L)"}
          </button>

          <button
            onClick={() => setActiveTab("doctor")}
            className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-[#0F172A] text-white text-xs font-semibold hover:bg-[#1E293B] transition-colors shadow-2xs"
          >
            <Stethoscope className="w-3.5 h-3.5 text-[#14B8A6]" />
            <span>Doctor Brief</span>
          </button>
        </div>
      </div>

      {/* Upload Dropzone */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-dashed border-[#14B8A6]/40 hover:border-[#14B8A6] shadow-soft transition-all text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-[#CCFBF1] text-[#14B8A6] flex items-center justify-center mx-auto shadow-2xs">
          <UploadCloud className="w-7 h-7" />
        </div>

        <div className="max-w-md mx-auto space-y-1">
          <h3 className="text-base font-bold text-[#0F172A]">
            Upload Blood Test Report (PDF, Photo, or Portal Scan)
          </h3>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Drag and drop clinical panels from Spain (Echevarne, Synlab, Megalab) or Morocco (Laboratoires d&apos;Analyses). Norya parses and normalizes your biomarkers automatically.
          </p>
        </div>

        {/* OCR Step-by-Step Animated Indicator */}
        {isUploading && (
          <div className="max-w-sm mx-auto p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/10 space-y-2 animate-in fade-in">
            <div className="flex items-center justify-between text-xs font-semibold text-[#0F172A]">
              <span>OCR Extraction Pipeline</span>
              <span className="font-mono text-[#0F766E]">{ocrStep} / 4</span>
            </div>
            <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#14B8A6] h-full transition-all duration-300"
                style={{ width: `${(ocrStep / 4) * 100}%` }}
              />
            </div>
            <div className="text-[11px] text-[#64748B]">
              {ocrStep === 1 && "🔍 1. Scanning document geometry & laboratory header..."}
              {ocrStep === 2 && "🧪 2. Isolating lipid, glycemic, and renal biomarkers..."}
              {ocrStep === 3 && "🔬 3. Normalizing units against ESC / AHA consensus standards..."}
              {ocrStep === 4 && "✅ 4. Generating longitudinal comparisons & clinical questions..."}
            </div>
          </div>
        )}

        {/* Sample Lab Selectors */}
        {!isUploading && (
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
            <button
              onClick={() => handleSimulatedUpload("echevarne")}
              className="px-4 py-2 rounded-xl bg-[#0F172A] text-white text-xs font-semibold hover:bg-[#1E293B] shadow-xs transition-all flex items-center gap-2"
            >
              <span>🇪🇸 Upload Sample: Laboratorios Echevarne (Madrid)</span>
            </button>
            <button
              onClick={() => handleSimulatedUpload("casablanca")}
              className="px-4 py-2 rounded-xl bg-white border border-[#0F172A]/15 text-[#0F172A] text-xs font-semibold hover:bg-[#FAFAF8] shadow-2xs transition-all flex items-center gap-2"
            >
              <span>🇲🇦 Upload Sample: Laboratoire Casablanca</span>
            </button>
          </div>
        )}

        {uploadSuccess && (
          <div className="p-3.5 rounded-2xl bg-[#16A34A]/10 border border-[#16A34A]/20 text-xs font-semibold text-[#16A34A] max-w-md mx-auto animate-in fade-in">
            ✓ Successfully parsed 7 biomarkers! Longitudinal progression curve and Doctor Brief updated.
          </div>
        )}
      </div>

      {/* Extracted Report Details */}
      {currentReport && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#0F172A]/8 shadow-card space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#0F172A]/8 gap-3">
            <div>
              <div className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider">
                {currentReport.laboratory} • {currentReport.date}
              </div>
              <h2 className="text-xl font-bold text-[#0F172A]">
                {currentReport.title}
              </h2>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#16A34A]/10 text-[#16A34A] self-start sm:self-center">
              ✓ Verified by Patient
            </span>
          </div>

          {/* Educational summary */}
          <div className="p-4 rounded-2xl bg-[#CCFBF1]/30 border border-[#14B8A6]/20 space-y-1.5 text-xs text-[#0F766E] leading-relaxed">
            <div className="font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#14B8A6]" />
              <span>What this report means for your health</span>
            </div>
            <p>{currentReport.whatItMeans}</p>
          </div>

          {/* Biomarkers Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-[#64748B] px-1">
              <span>Biomarker</span>
              <div className="flex gap-12 sm:gap-20">
                <span className="w-20 text-right">Value</span>
                <span className="w-24 text-right">Reference</span>
                <span className="w-20 text-right">Status</span>
              </div>
            </div>

            <div className="space-y-2">
              {currentReport.biomarkers.map((marker) => {
                const isOptimal = marker.status === "optimal";
                const isElevated = marker.status === "elevated";
                const isBorderline = marker.status === "borderline";

                const statusColor = isOptimal
                  ? "bg-[#16A34A]/10 text-[#16A34A]"
                  : isElevated
                  ? "bg-[#F97360]/10 text-[#F97360]"
                  : "bg-[#F5C76A]/20 text-[#B45309]";

                return (
                  <div
                    key={marker.id}
                    onClick={() => setSelectedBiomarker(marker)}
                    className="p-3.5 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 hover:border-[#14B8A6]/40 cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                  >
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-[#0F172A] group-hover:text-[#14B8A6] transition-colors flex items-center gap-1.5">
                        <span>{marker.displayName}</span>
                        <HelpCircle className="w-3.5 h-3.5 text-[#64748B] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="text-[11px] text-[#64748B]">
                        {marker.category} • {marker.canonicalName}
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-12 text-xs">
                      <div className="w-20 text-left sm:text-right font-bold text-[#0F172A] font-mono">
                        {marker.value} {marker.unit}
                      </div>
                      <div className="w-24 text-left sm:text-right text-[#64748B] font-mono text-[11px]">
                        {marker.referenceLow}–{marker.referenceHigh} {marker.unit}
                      </div>
                      <span className={`w-20 text-center text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColor}`}>
                        {marker.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Longitudinal 12-Month Comparison Matrix */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#0F172A]/8 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#0F172A]/8 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
              Multi-Quarter Biological Trends
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-[#0F172A]">
              12-Month Longitudinal Comparison (Sep 2025 – Sep 2026)
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              Comparative biomarker trajectory validating your metabolic and cardiovascular response.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-xl bg-[#FAFAF8] border border-[#0F172A]/10 text-xs font-semibold text-[#0F172A] hover:bg-[#F1F5F9] transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-[#14B8A6]" />
              <span>Export Matrix</span>
            </button>
            <button
              onClick={() => setActiveTab("doctor")}
              className="px-3.5 py-2 rounded-xl bg-[#0F172A] text-white text-xs font-semibold hover:bg-[#1E293B] transition-colors flex items-center gap-1.5"
            >
              <Stethoscope className="w-3.5 h-3.5 text-[#14B8A6]" />
              <span>Add to Doctor Mode</span>
            </button>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#0F172A]/8 text-[#64748B] font-semibold text-[11px] uppercase tracking-wider">
                <th className="pb-3 pr-4">Biomarker</th>
                <th className="pb-3 px-3 font-mono">Sep 2025 (Baseline)</th>
                <th className="pb-3 px-3 font-mono">Mar 2026 (6-Mo)</th>
                <th className="pb-3 px-3 font-mono">Sep 2026 (Current)</th>
                <th className="pb-3 px-3">12-Mo Delta</th>
                <th className="pb-3 pl-3">Clinical Target</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0F172A]/5">
              {[
                {
                  name: "Apolipoprotein B (ApoB)",
                  markerCode: "ApoB",
                  unit: "mg/dL",
                  p1: 121,
                  p2: 112,
                  p3: 105,
                  delta: "-16 mg/dL (-13.2%)",
                  favorable: true,
                  target: "< 80 mg/dL (ESC Mod Risk)",
                },
                {
                  name: "HbA1c (Glycated Hemoglobin)",
                  markerCode: "HbA1c",
                  unit: "%",
                  p1: 6.1,
                  p2: 5.9,
                  p3: 5.7,
                  delta: "-0.4% (-6.5%)",
                  favorable: true,
                  target: "< 5.6% (Optimal Glycemia)",
                },
                {
                  name: "LDL Cholesterol (Calculated)",
                  markerCode: "LDL-C",
                  unit: "mg/dL",
                  p1: 158,
                  p2: 146,
                  p3: 138,
                  delta: "-20 mg/dL (-12.6%)",
                  favorable: true,
                  target: "< 100 mg/dL",
                },
                {
                  name: "Triglycerides",
                  markerCode: "Triglycerides",
                  unit: "mg/dL",
                  p1: 185,
                  p2: 168,
                  p3: 142,
                  delta: "-43 mg/dL (-23.2%)",
                  favorable: true,
                  target: "< 150 mg/dL",
                },
                {
                  name: "High-Sensitivity CRP (hs-CRP)",
                  markerCode: "hs-CRP",
                  unit: "mg/L",
                  p1: 2.4,
                  p2: 1.8,
                  p3: 1.2,
                  delta: "-1.2 mg/L (-50.0%)",
                  favorable: true,
                  target: "< 1.0 mg/L (Low Vascular Risk)",
                },
                {
                  name: "25-OH Vitamin D3",
                  markerCode: "Vitamin D",
                  unit: "ng/mL",
                  p1: 20,
                  p2: 24,
                  p3: 29,
                  delta: "+9 ng/mL (+45.0%)",
                  favorable: true,
                  target: "> 30 ng/mL (Sufficiency)",
                },
              ].map((row, idx) => {
                const targetMarker = currentReport?.biomarkers.find(
                  (b) => b.canonicalName === row.markerCode
                );

                return (
                  <tr
                    key={idx}
                    onClick={() => targetMarker && setSelectedBiomarker(targetMarker)}
                    className="hover:bg-[#FAFAF8] cursor-pointer transition-colors group"
                  >
                    <td className="py-3.5 pr-4 font-bold text-[#0F172A] group-hover:text-[#14B8A6] flex items-center gap-1.5">
                      <span>{row.name}</span>
                    </td>
                    <td className="py-3.5 px-3 font-mono text-[#64748B]">
                      {row.p1} {row.unit}
                    </td>
                    <td className="py-3.5 px-3 font-mono text-[#64748B]">
                      {row.p2} {row.unit}
                    </td>
                    <td className="py-3.5 px-3 font-mono font-bold text-[#0F172A]">
                      {row.p3} {row.unit}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#16A34A] bg-[#16A34A]/10 px-2 py-0.5 rounded-full">
                        <TrendingDown className="w-3 h-3" />
                        <span>{row.delta}</span>
                      </span>
                    </td>
                    <td className="py-3.5 pl-3 text-[#0F766E] font-medium text-[11px]">
                      {row.target}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 text-xs text-[#64748B] flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-[#14B8A6] shrink-0 mt-0.5" />
          <p>
            <strong>Clinical Interpretation:</strong> Consistent 12-month reductions in ApoB (-13.2%), HbA1c (-6.5%), and systemic inflammation (hs-CRP -50.0%) correlate with Sarah's sustained 3.7 kg weight reduction and adherence to the daily walking and protein anchor habits.
          </p>
        </div>
      </div>

    </div>
  );
};
