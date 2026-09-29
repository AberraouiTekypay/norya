"use client";

import React, { useState } from "react";
import { useHealth } from "@/context/HealthContext";
import {
  X,
  Heart,
  Calendar,
  CheckCircle2,
  Clock,
  Plus,
  Stethoscope,
  Info,
  Check,
  TrendingDown,
  AlertCircle,
  Activity,
} from "lucide-react";

export const BloodPressureModal: React.FC = () => {
  const {
    isBPModalOpen,
    setIsBPModalOpen,
    bloodPressureLogs,
    addBloodPressureLog,
    addDoctorQuestion,
    setActiveTab,
  } = useHealth();

  const [systolic, setSystolic] = useState("132");
  const [diastolic, setDiastolic] = useState("83");
  const [pulse, setPulse] = useState("68");
  const [timeSlot, setTimeSlot] = useState<"AM" | "PM">("PM");
  const [dayIndex, setDayIndex] = useState(3);
  const [notes, setNotes] = useState("Seated quietly for 5 min, arm supported");
  const [addedToast, setAddedToast] = useState(false);
  const [doctorAddedToast, setDoctorAddedToast] = useState(false);

  if (!isBPModalOpen) return null;

  // Calculate protocol metrics
  const totalReadings = bloodPressureLogs.length;
  const avgSystolic = Math.round(
    bloodPressureLogs.reduce((acc, l) => acc + l.systolic, 0) / (totalReadings || 1)
  );
  const avgDiastolic = Math.round(
    bloodPressureLogs.reduce((acc, l) => acc + l.diastolic, 0) / (totalReadings || 1)
  );
  const avgPulse = Math.round(
    bloodPressureLogs.reduce((acc, l) => acc + l.pulseBpm, 0) / (totalReadings || 1)
  );

  // ESC / ESH Home Blood Pressure Categories (Home thresholds: Normal is <130/80)
  const getEscCategory = (sys: number, dia: number) => {
    if (sys < 120 && dia < 80) return { label: "Optimal (<120/80)", color: "text-[#16A34A] bg-[#16A34A]/10" };
    if (sys < 130 && dia < 80) return { label: "Normal (<130/80)", color: "text-[#16A34A] bg-[#16A34A]/10" };
    if (sys < 135 && dia < 85) return { label: "High Normal (130-134/80-84)", color: "text-[#B45309] bg-[#F5C76A]/20" };
    return { label: "Mildly Elevated Home BP (≥135/85)", color: "text-[#DC2626] bg-[#F97360]/15" };
  };

  const category = getEscCategory(avgSystolic, avgDiastolic);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBloodPressureLog({
      dayIndex: Number(dayIndex),
      date: new Date().toISOString().split("T")[0],
      timeSlot,
      systolic: Number(systolic),
      diastolic: Number(diastolic),
      pulseBpm: Number(pulse),
      restMinutes: 5,
      arm: "left",
      notes,
    });
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleExportToDoctor = () => {
    const summaryText = `Home BP 7-Day Protocol Average: ${avgSystolic}/${avgDiastolic} mmHg (Pulse: ${avgPulse} bpm) across ${totalReadings} validated readings. Baseline: High Normal / Stage 1 Borderline.`;
    addDoctorQuestion(summaryText);
    setDoctorAddedToast(true);
    setTimeout(() => setDoctorAddedToast(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl space-y-6 animate-in zoom-in-95 duration-200 relative max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#0F172A]/8">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F766E] bg-[#CCFBF1] px-2.5 py-0.5 rounded-full">
                Priority #1 Protocol
              </span>
              <span className="text-xs font-semibold text-[#64748B]">
                Day {Math.max(...bloodPressureLogs.map((l) => l.dayIndex), 3)} of 7
              </span>
            </div>
            <h2 className="text-2xl font-bold text-[#0F172A] mt-1">
              7-Day Out-of-Office Blood Pressure Protocol
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              Standardized European Society of Cardiology (ESC) home monitoring protocol.
            </p>
          </div>
          <button
            onClick={() => setIsBPModalOpen(false)}
            className="p-1.5 rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Protocol Average Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 space-y-1">
            <span className="text-[11px] font-semibold text-[#64748B] uppercase">Protocol Average</span>
            <div className="text-2xl font-bold font-mono text-[#0F172A]">
              {avgSystolic}/{avgDiastolic} <span className="text-xs font-normal text-[#64748B]">mmHg</span>
            </div>
            <span className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ${category.color}`}>
              {category.label}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 space-y-1">
            <span className="text-[11px] font-semibold text-[#64748B] uppercase">Home Normal Target</span>
            <div className="text-xl font-bold font-mono text-[#0F766E]">
              &lt;130/80 <span className="text-xs font-normal text-[#64748B]">mmHg</span>
            </div>
            <span className="text-[11px] text-[#64748B] block">
              ESC out-of-office diagnostic standard
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 space-y-1">
            <span className="text-[11px] font-semibold text-[#64748B] uppercase">Protocol Compliance</span>
            <div className="text-xl font-bold font-mono text-[#0F172A]">
              {totalReadings} of 14 <span className="text-xs font-normal text-[#64748B]">readings</span>
            </div>
            <span className="text-[11px] text-[#16A34A] font-semibold block">
              On track for doctor review
            </span>
          </div>
        </div>

        {/* 7-Day AM / PM Timeline Visualizer */}
        <div className="p-5 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/8 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#0F172A] flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-[#14B8A6]" />
              7-Day Reading Matrix (AM & PM Pairs)
            </span>
            <span className="text-[11px] text-[#0F766E]">
              Green zone = &lt;130/80 mmHg Home Target
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs">
            {[1, 2, 3, 4, 5, 6, 7].map((day) => {
              const dayLogs = bloodPressureLogs.filter((l) => l.dayIndex === day);
              const amLog = dayLogs.find((l) => l.timeSlot === "AM");
              const pmLog = dayLogs.find((l) => l.timeSlot === "PM");
              const isToday = day === 3;

              return (
                <div
                  key={day}
                  className={`p-2.5 rounded-xl border space-y-1.5 ${
                    isToday
                      ? "bg-white border-[#14B8A6] shadow-xs"
                      : dayLogs.length > 0
                      ? "bg-white border-[#0F172A]/10"
                      : "bg-white/50 border-dashed border-[#0F172A]/10 opacity-60"
                  }`}
                >
                  <div className="text-[10px] font-bold uppercase text-[#64748B]">
                    Day {day}
                  </div>

                  {/* AM Slot */}
                  <div className="text-[11px] font-mono leading-tight">
                    <span className="text-[9px] text-[#64748B] block">AM</span>
                    {amLog ? (
                      <span className={amLog.systolic >= 135 ? "text-[#DC2626] font-bold" : "text-[#0F172A] font-semibold"}>
                        {amLog.systolic}/{amLog.diastolic}
                      </span>
                    ) : (
                      <span className="text-[#94A3B8]">—</span>
                    )}
                  </div>

                  {/* PM Slot */}
                  <div className="text-[11px] font-mono leading-tight pt-0.5 border-t border-[#0F172A]/5">
                    <span className="text-[9px] text-[#64748B] block">PM</span>
                    {pmLog ? (
                      <span className={pmLog.systolic >= 135 ? "text-[#DC2626] font-bold" : "text-[#0F172A] font-semibold"}>
                        {pmLog.systolic}/{pmLog.diastolic}
                      </span>
                    ) : (
                      <span className="text-[#94A3B8]">—</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Log Reading Form */}
        <div className="p-5 rounded-2xl bg-white border border-[#0F172A]/10 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0F172A] flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-[#14B8A6]" />
              Log Cuff Reading
            </h3>
            {addedToast && (
              <span className="text-xs font-semibold text-[#16A34A] flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Reading saved!
              </span>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
              <div>
                <label className="text-[10px] font-bold uppercase text-[#64748B] block mb-1">
                  Protocol Day
                </label>
                <select
                  value={dayIndex}
                  onChange={(e) => setDayIndex(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAFAF8] border border-[#0F172A]/10 font-mono font-semibold text-[#0F172A]"
                >
                  {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                    <option key={d} value={d}>
                      Day {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-[#64748B] block mb-1">
                  Time Slot
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value as "AM" | "PM")}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAFAF8] border border-[#0F172A]/10 font-semibold text-[#0F172A]"
                >
                  <option value="AM">Morning (AM)</option>
                  <option value="PM">Evening (PM)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-[#64748B] block mb-1">
                  Systolic (mmHg)
                </label>
                <input
                  type="number"
                  min="80"
                  max="240"
                  value={systolic}
                  onChange={(e) => setSystolic(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAFAF8] border border-[#0F172A]/10 font-mono font-bold text-[#0F172A]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-[#64748B] block mb-1">
                  Diastolic (mmHg)
                </label>
                <input
                  type="number"
                  min="40"
                  max="140"
                  value={diastolic}
                  onChange={(e) => setDiastolic(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAFAF8] border border-[#0F172A]/10 font-mono font-bold text-[#0F172A]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-[#64748B] block mb-1">
                  Pulse (bpm)
                </label>
                <input
                  type="number"
                  min="40"
                  max="180"
                  value={pulse}
                  onChange={(e) => setPulse(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAFAF8] border border-[#0F172A]/10 font-mono font-bold text-[#0F172A]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-1">
              <input
                type="text"
                placeholder="Measurement notes (e.g. seated 5 min, empty bladder)..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-[#FAFAF8] border border-[#0F172A]/10 text-xs text-[#0F172A]"
              />
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#0F172A] text-white text-xs font-semibold hover:bg-[#1E293B] transition-colors shrink-0 shadow-xs"
              >
                Save Reading
              </button>
            </div>
          </form>
        </div>

        {/* Clinical Measurement Rules */}
        <div className="p-4 rounded-2xl bg-[#CCFBF1]/20 border border-[#14B8A6]/20 space-y-1.5 text-xs text-[#0F766E] leading-relaxed">
          <div className="font-bold flex items-center gap-1.5">
            <Info className="w-4 h-4 text-[#14B8A6]" />
            <span>Why 7 Days of Morning and Evening Logs Matter</span>
          </div>
          <p>
            Up to 30% of clinic hypertension diagnoses are artifacts of the &ldquo;White-Coat Effect&rdquo; (stress-induced clinic spikes). Conversely, home logs eliminate white-coat spikes and reveal true nocturnal and waking blood pressure. Completing this 7-day protocol gives your physician gold-standard diagnostic evidence.
          </p>
        </div>

        {/* Modal Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportToDoctor}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-[#0F172A]/15 text-xs font-semibold text-[#0F172A] hover:bg-[#FAFAF8] transition-colors shadow-2xs"
            >
              <Stethoscope className="w-4 h-4 text-[#14B8A6]" />
              <span>{doctorAddedToast ? "Added to Doctor Brief!" : "Add Protocol to Doctor Brief"}</span>
            </button>
            <button
              onClick={() => {
                setIsBPModalOpen(false);
                setActiveTab("doctor");
              }}
              className="text-xs font-semibold text-[#0F766E] hover:underline"
            >
              View Consultation Brief →
            </button>
          </div>

          <button
            onClick={() => setIsBPModalOpen(false)}
            className="px-5 py-2.5 rounded-xl bg-[#0F172A] text-white text-xs font-semibold hover:bg-[#1E293B] transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
