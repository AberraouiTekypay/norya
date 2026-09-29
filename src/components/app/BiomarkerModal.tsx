"use client";

import React, { useState } from "react";
import { useHealth } from "@/context/HealthContext";
import {
  X,
  TrendingDown,
  TrendingUp,
  ShieldCheck,
  Stethoscope,
  Sparkles,
  Check,
  HelpCircle,
  Activity,
  Flame,
  Utensils,
  Moon,
} from "lucide-react";

export const BiomarkerModal: React.FC = () => {
  const { selectedBiomarker, setSelectedBiomarker, addDoctorQuestion, setActiveTab } = useHealth();
  const [questionAdded, setQuestionAdded] = useState(false);

  if (!selectedBiomarker) return null;

  const b = selectedBiomarker;
  const history = b.historyPoints || [
    { date: b.previousDate || "2026-03-12", value: b.previousValue || b.value },
    { date: b.date, value: b.value },
  ];

  const handleAddQuestion = (q: string) => {
    addDoctorQuestion(q);
    setQuestionAdded(true);
    setTimeout(() => setQuestionAdded(false), 2500);
  };

  // SVG Chart Calculations
  const values = history.map((h) => h.value);
  const minVal = Math.min(...values, b.referenceLow, b.optimalLow || b.referenceLow) * 0.9;
  const maxVal = Math.max(...values, b.referenceHigh, b.optimalHigh || b.referenceHigh) * 1.1;
  const range = maxVal - minVal || 1;

  const width = 360;
  const height = 120;
  const paddingX = 30;
  const paddingY = 20;

  const getX = (idx: number) => paddingX + (idx / (history.length - 1 || 1)) * (width - 2 * paddingX);
  const getY = (val: number) => height - paddingY - ((val - minVal) / range) * (height - 2 * paddingY);

  const pointsString = history.map((h, i) => `${getX(i)},${getY(h.value)}`).join(" ");

  const optimalYHigh = getY(b.optimalHigh || b.referenceHigh);
  const optimalYLow = getY(b.optimalLow || b.referenceLow);
  const optimalRectHeight = Math.abs(optimalYLow - optimalYHigh);
  const optimalRectY = Math.min(optimalYLow, optimalYHigh);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 animate-in zoom-in-95 duration-200 relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#0F172A]/8">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F766E] bg-[#CCFBF1] px-2.5 py-0.5 rounded-full">
                {b.category}
              </span>
              {b.evidenceGrade && (
                <span className="text-xs font-mono font-bold bg-[#0F172A] text-white px-2 py-0.5 rounded-full">
                  Evidence Grade {b.evidenceGrade}
                </span>
              )}
            </div>
            <h2 className="text-2xl font-bold text-[#0F172A] mt-1">
              {b.displayName} ({b.canonicalName})
            </h2>
          </div>
          <button
            onClick={() => setSelectedBiomarker(null)}
            className="p-1.5 rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Status Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 space-y-1">
            <span className="text-[11px] font-semibold text-[#64748B] uppercase">Current Level</span>
            <div className="text-2xl font-bold font-mono text-[#0F172A]">
              {b.value} <span className="text-xs font-normal text-[#64748B]">{b.unit}</span>
            </div>
            <span
              className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                b.status === "optimal"
                  ? "bg-[#16A34A]/10 text-[#16A34A]"
                  : b.status === "borderline"
                  ? "bg-[#F5C76A]/20 text-[#B45309]"
                  : "bg-[#F97360]/15 text-[#DC2626]"
              }`}
            >
              {b.status.toUpperCase()}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 space-y-1">
            <span className="text-[11px] font-semibold text-[#64748B] uppercase">Evidence Target</span>
            <div className="text-xl font-bold font-mono text-[#0F766E]">
              {b.optimalLow || b.referenceLow}–{b.optimalHigh || b.referenceHigh} <span className="text-xs font-normal text-[#64748B]">{b.unit}</span>
            </div>
            <span className="text-[11px] text-[#64748B] block">
              Optimal functional target
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 space-y-1">
            <span className="text-[11px] font-semibold text-[#64748B] uppercase">Standard Lab Normal</span>
            <div className="text-xl font-bold font-mono text-[#64748B]">
              {b.referenceLow}–{b.referenceHigh} <span className="text-xs font-normal text-[#64748B]">{b.unit}</span>
            </div>
            <span className="text-[11px] text-[#64748B] block">
              Population 95th percentile
            </span>
          </div>
        </div>

        {/* Longitudinal History SVG Sparkline */}
        <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#0F172A]">Historical Progression</span>
            <span className="text-[11px] text-[#0F766E] font-medium">
              Shaded zone = Evidence Target
            </span>
          </div>

          <div className="w-full overflow-x-auto flex justify-center py-2">
            <svg width={width} height={height} className="overflow-visible">
              {/* Shaded Optimal Zone */}
              <rect
                x={paddingX}
                y={optimalRectY}
                width={width - 2 * paddingX}
                height={Math.max(optimalRectHeight, 8)}
                fill="#14B8A6"
                fillOpacity="0.1"
                rx={4}
              />

              {/* Connecting Line */}
              <polyline
                fill="none"
                stroke="#0F172A"
                strokeWidth="2.5"
                points={pointsString}
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data Points */}
              {history.map((h, i) => {
                const cx = getX(i);
                const cy = getY(h.value);
                const isLatest = i === history.length - 1;
                return (
                  <g key={i}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isLatest ? 5.5 : 4}
                      fill={isLatest ? "#14B8A6" : "#0F172A"}
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />
                    <text
                      x={cx}
                      y={cy - 10}
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="bold"
                      fill="#0F172A"
                      className="font-mono"
                    >
                      {h.value}
                    </text>
                    <text
                      x={cx}
                      y={height - 2}
                      textAnchor="middle"
                      fontSize="9"
                      fill="#64748B"
                      className="font-sans"
                    >
                      {h.date.split("-").slice(1).join("/")}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Mechanism Explanation */}
        <div className="space-y-1.5 text-xs sm:text-sm">
          <h4 className="font-bold text-[#0F172A]">What does this mean for your body?</h4>
          <p className="text-[#64748B] leading-relaxed">
            {b.explanation}
          </p>
        </div>

        {/* Evidence-Based Levers */}
        {b.keyInterventions && (
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-[#0F172A] uppercase tracking-wider text-[11px]">
              Evidence-Based Lifestyle Levers
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {b.keyInterventions.nutrition && (
                <div className="p-3 rounded-xl bg-white border border-[#0F172A]/8 flex items-start gap-2.5">
                  <Utensils className="w-4 h-4 text-[#14B8A6] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#0F172A] block text-xs">Nutrition Lever:</strong>
                    <span className="text-[#64748B] text-[11px] leading-relaxed">{b.keyInterventions.nutrition}</span>
                  </div>
                </div>
              )}
              {b.keyInterventions.movement && (
                <div className="p-3 rounded-xl bg-white border border-[#0F172A]/8 flex items-start gap-2.5">
                  <Flame className="w-4 h-4 text-[#F97360] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#0F172A] block text-xs">Physical Activity Lever:</strong>
                    <span className="text-[#64748B] text-[11px] leading-relaxed">{b.keyInterventions.movement}</span>
                  </div>
                </div>
              )}
              {b.keyInterventions.sleep && (
                <div className="p-3 rounded-xl bg-white border border-[#0F172A]/8 flex items-start gap-2.5">
                  <Moon className="w-4 h-4 text-[#6366F1] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#0F172A] block text-xs">Sleep & Circadian Lever:</strong>
                    <span className="text-[#64748B] text-[11px] leading-relaxed">{b.keyInterventions.sleep}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Doctor Questions & Handoff */}
        {b.doctorQuestions && b.doctorQuestions.length > 0 && (
          <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/8 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
                <Stethoscope className="w-4 h-4 text-[#14B8A6]" />
                Recommended Discussion Topics for Your Doctor
              </span>
              {questionAdded && (
                <span className="text-[11px] font-semibold text-[#16A34A] flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Added to Consultation Brief
                </span>
              )}
            </div>

            <div className="space-y-2">
              {b.doctorQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#0F172A]/5 text-xs text-[#0F172A]"
                >
                  <span className="pr-3 leading-relaxed">{q}</span>
                  <button
                    onClick={() => handleAddQuestion(q)}
                    className="shrink-0 text-[11px] font-semibold text-[#0F766E] hover:text-[#0F172A] bg-[#CCFBF1] hover:bg-[#99F6E4] px-2.5 py-1 rounded-lg transition-colors"
                  >
                    + Add to Doctor Brief
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => {
              setSelectedBiomarker(null);
              setActiveTab("doctor");
            }}
            className="text-xs font-semibold text-[#0F766E] hover:underline flex items-center gap-1"
          >
            <Stethoscope className="w-4 h-4" />
            <span>View Full Doctor Consultation Brief →</span>
          </button>
          <button
            onClick={() => setSelectedBiomarker(null)}
            className="px-5 py-2.5 rounded-xl bg-[#0F172A] text-white text-xs font-semibold hover:bg-[#1E293B] transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
