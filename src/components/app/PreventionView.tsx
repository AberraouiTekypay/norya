"use client";

import React from "react";
import { useHealth } from "@/context/HealthContext";
import {
  ShieldCheck,
  Clock,
  MessageSquare,
  CheckCircle2,
  Calendar,
  Info,
} from "lucide-react";

export const PreventionView: React.FC = () => {
  const { preventionItems, user } = useHealth();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
            Proactive Clinical Care
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
            Prevention Checklist
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Age-, sex-, and country-specific screening guidelines tailored for {user.firstName} (Age {user.age}, {user.country}).
          </p>
        </div>

        <div className="p-2.5 rounded-2xl bg-[#CCFBF1]/40 border border-[#14B8A6]/20 text-xs font-semibold text-[#0F766E] flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#14B8A6]" />
          <span>6 of 8 Screenings Current</span>
        </div>
      </div>

      {/* Prevention List */}
      <div className="space-y-3">
        {preventionItems.map((item) => {
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

          return (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-white border border-[#0F172A]/8 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#14B8A6]/40 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[#0F172A]">
                    {item.title}
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F1F5F9] text-[#64748B]">
                    Evidence {item.evidenceGrade}
                  </span>
                </div>

                <div className="text-xs text-[#64748B]">
                  Recommended: {item.recommendedFrequency} • Next Due: <strong>{item.nextDue}</strong>
                </div>

                <p className="text-xs text-[#0F172A] leading-relaxed pt-1">
                  {item.rationalSummary}
                </p>

                <div className="text-[11px] text-[#0F766E] font-medium pt-0.5">
                  📍 {item.localRelevance}
                </div>
              </div>

              <div className="self-start sm:self-center shrink-0">
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl ${statusBadge}`}>
                  <StatusIcon className="w-3.5 h-3.5" />
                  <span>
                    {isDone ? "Completed" : isDue ? "Due Soon" : "Discuss with Doctor"}
                  </span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 flex items-start gap-2.5 text-xs text-[#64748B] leading-relaxed">
        <Info className="w-4 h-4 text-[#14B8A6] shrink-0 mt-0.5" />
        <p>
          Screening intervals are derived from the Spanish Society of Family and Community Medicine (semFYC), European guidelines, and national oncology screening programs. Individuals with positive first-degree family history may require earlier evaluation.
        </p>
      </div>

    </div>
  );
};
