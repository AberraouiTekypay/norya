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
} from "lucide-react";

export const LabsView: React.FC = () => {
  const { labReports, uploadLabReport, setActiveTab, setSelectedBiomarker } = useHealth();
  const [unitMode, setUnitMode] = useState<"standard" | "si">("standard"); // mg/dL vs mmol/L
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const currentReport = labReports[0];

  const handleSimulatedUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      uploadLabReport("Synlab Madrid Follow-Up Panel (Sep 2026)");
      setIsUploading(false);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 4000);
    }, 1200);
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

        <div className="flex items-center gap-2">
          <button
            onClick={() => setUnitMode(unitMode === "standard" ? "si" : "standard")}
            className="px-3 py-1.5 rounded-xl bg-white border border-[#0F172A]/10 text-xs font-semibold text-[#0F172A] hover:bg-[#FAFAF8] transition-colors"
          >
            Units: {unitMode === "standard" ? "US/Spain (mg/dL)" : "SI (mmol/L)"}
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
            Upload Blood Test Report (PDF, Photo, or Scan)
          </h3>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Drag and drop clinical files from Echevarne, Synlab, Megalab, or hospital lab portals. Norya automatically standardizes biomarkers.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={handleSimulatedUpload}
            disabled={isUploading}
            className="px-6 py-2.5 rounded-xl bg-[#0F172A] text-white font-semibold text-xs hover:bg-[#1E293B] shadow-xs transition-colors flex items-center gap-2"
          >
            {isUploading ? (
              <span>Extracting Biomarkers with OCR...</span>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" />
                <span>Simulate Upload & Verification</span>
              </>
            )}
          </button>
        </div>

        {uploadSuccess && (
          <div className="p-3 rounded-xl bg-[#16A34A]/10 border border-[#16A34A]/20 text-xs font-semibold text-[#16A34A] max-w-md mx-auto animate-in fade-in">
            ✓ Successfully parsed 7 biomarkers! Health timeline and priority matrix updated.
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

    </div>
  );
};
