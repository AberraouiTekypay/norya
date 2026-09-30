"use client";

import React, { useState } from "react";
import { useHealth } from "@/context/HealthContext";
import {
  X,
  Utensils,
  CheckCircle2,
  Sparkles,
  Info,
  Check,
} from "lucide-react";

export const NutritionModal: React.FC = () => {
  const { isNutritionModalOpen, setIsNutritionModalOpen, mealPlates, toggleTaskCompletion, dailyTasks } =
    useHealth();

  const [selectedPlateId, setSelectedPlateId] = useState<string>(mealPlates[0]?.id || "meal-1");
  const [loggedToday, setLoggedToday] = useState(false);

  if (!isNutritionModalOpen) return null;

  const currentPlate = mealPlates.find((p) => p.id === selectedPlateId) || mealPlates[0];

  const handleLogProteinAnchor = () => {
    // Find protein task and mark complete
    const proteinTask = dailyTasks.find((t) => t.title.toLowerCase().includes("protein"));
    if (proteinTask && !proteinTask.completed) {
      toggleTaskCompletion(proteinTask.id);
    }
    setLoggedToday(true);
    setTimeout(() => {
      setLoggedToday(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full border border-[#0F172A]/10 shadow-2xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-[#0F172A]/8 flex items-center justify-between bg-[#FAFAF8] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#14B8A6]/10 text-[#14B8A6] flex items-center justify-center">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#64748B]">
                Cardio-Metabolic Plate Architecture
              </div>
              <h2 className="text-lg font-bold text-[#0F172A]">
                Protein Anchor &amp; Viscous Fiber Blueprint
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsNutritionModalOpen(false)}
            className="p-2 rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Meal Archetype Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {mealPlates.map((plate) => {
              const isSelected = plate.id === currentPlate.id;
              const flag =
                plate.cuisine === "mediterranean_spain"
                  ? "🇪🇸"
                  : plate.cuisine === "maghreb_morocco"
                  ? "🇲🇦"
                  : "🥣";

              return (
                <button
                  key={plate.id}
                  onClick={() => setSelectedPlateId(plate.id)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 border ${
                    isSelected
                      ? "bg-[#0F172A] text-white border-[#0F172A] shadow-xs"
                      : "bg-[#FAFAF8] text-[#64748B] hover:text-[#0F172A] border-[#0F172A]/8"
                  }`}
                >
                  <span>{flag}</span>
                  <span>{plate.mealName.split("&")[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Current Plate Card */}
          <div className="p-6 rounded-3xl bg-[#FAFAF8] border border-[#0F172A]/6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#14B8A6]/10 text-[#0F766E] uppercase font-bold">
                  {currentPlate.category} • {currentPlate.cuisine.replace("_", " ")}
                </span>
                <h3 className="text-base font-bold text-[#0F172A] mt-1">
                  {currentPlate.mealName}
                </h3>
              </div>

              <div className="flex items-center gap-2 text-xs font-medium">
                <span className="px-2.5 py-1 rounded-xl bg-[#16A34A]/10 text-[#16A34A]">
                  ✓ ApoB-Targeting
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-[#38BDF8]/15 text-[#0284C7]">
                  Glycemic: {currentPlate.glycemicImpact}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#64748B] leading-relaxed">
              {currentPlate.description}
            </p>

            {/* 3-Column Macro Composition */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              
              {/* Protein Anchor */}
              <div className="p-4 rounded-2xl bg-white border border-[#0F172A]/5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-[#64748B]">
                    Protein Anchor
                  </span>
                  <span className="text-xs font-bold font-mono text-[#0F766E]">
                    {currentPlate.proteinAnchor.grams}g
                  </span>
                </div>
                <div className="text-xs font-bold text-[#0F172A]">
                  {currentPlate.proteinAnchor.name}
                </div>
                <p className="text-[11px] text-[#64748B] leading-normal">
                  {currentPlate.proteinAnchor.source}
                </p>
              </div>

              {/* Soluble Fiber */}
              <div className="p-4 rounded-2xl bg-white border border-[#0F172A]/5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-[#64748B]">
                    Viscous Soluble Fiber
                  </span>
                  <span className="text-xs font-bold font-mono text-[#14B8A6]">
                    {currentPlate.viscousFiber.grams}g
                  </span>
                </div>
                <div className="text-xs font-bold text-[#0F172A]">
                  {currentPlate.viscousFiber.name}
                </div>
                <p className="text-[11px] text-[#64748B] leading-normal">
                  {currentPlate.viscousFiber.source}
                </p>
              </div>

              {/* Slow Carb & Fat */}
              <div className="p-4 rounded-2xl bg-white border border-[#0F172A]/5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-[#64748B]">
                    Slow Carb &amp; Fat
                  </span>
                  <span className="text-xs font-bold font-mono text-[#64748B]">
                    {currentPlate.slowCarb.grams}g
                  </span>
                </div>
                <div className="text-xs font-bold text-[#0F172A]">
                  {currentPlate.slowCarb.name}
                </div>
                <p className="text-[11px] text-[#64748B] leading-normal">
                  {currentPlate.healthyFat.name}
                </p>
              </div>

            </div>
          </div>

          {/* Scientific Sequence: Order of Eating */}
          <div className="p-5 rounded-3xl bg-white border border-[#0F172A]/8 shadow-soft space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#14B8A6]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                The Science of Sequence (Order of Ingestion)
              </h4>
            </div>
            
            <p className="text-xs text-[#64748B]">
              Consuming food in this chronological order blunts postprandial glucose excursions by up to 38% and stimulates prolonged GLP-1 release:
            </p>

            <div className="space-y-2 pt-1">
              {currentPlate.orderOfEating.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 text-xs text-[#0F172A] flex items-center gap-3"
                >
                  <span className="w-5 h-5 rounded-full bg-[#14B8A6]/10 text-[#0F766E] font-bold text-[11px] flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cultural Adaptation Notice */}
          <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 flex items-start gap-2.5 text-xs text-[#64748B] leading-relaxed">
            <Info className="w-4 h-4 text-[#14B8A6] shrink-0 mt-0.5" />
            <div>
              <strong>Regional Bio-Availability Note:</strong> In Spain, polyphenol-dense Extra Virgin Olive Oil provides oleocanthal (natural anti-inflammatory). In Morocco, substituting refined white bread (khobz) with whole barley (belboula) and reducing table sugar in mint tea to 0–1 cubes cuts postprandial glycemic excursions in half.
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-[#0F172A]/8 bg-[#FAFAF8] flex items-center justify-between shrink-0">
          <button
            onClick={() => setIsNutritionModalOpen(false)}
            className="text-xs text-[#64748B] hover:text-[#0F172A] font-semibold"
          >
            Close Blueprint
          </button>

          <button
            onClick={handleLogProteinAnchor}
            disabled={loggedToday}
            className={`px-5 py-2.5 rounded-2xl text-xs font-semibold flex items-center gap-2 transition-all shadow-soft ${
              loggedToday
                ? "bg-[#16A34A] text-white"
                : "bg-[#0F172A] text-white hover:bg-[#1E293B]"
            }`}
          >
            {loggedToday ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Protein Anchor Confirmed!</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-[#14B8A6]" />
                <span>Log 30g+ Protein Anchor for Today</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
