"use client";

import React, { useState } from "react";
import { useHealth } from "@/context/HealthContext";
import { Calendar, Filter, FileText, Activity, Award, Target, Clock } from "lucide-react";

export const TimelineView: React.FC = () => {
  const { timelineEvents } = useHealth();
  const [filter, setFilter] = useState<string>("all");

  const filteredEvents = timelineEvents.filter((ev) => {
    if (filter === "all") return true;
    return ev.category === filter;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
            Longitudinal Health Feed
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
            Health Timeline
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Your continuous chronological health story from initial baseline to today.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white border border-[#0F172A]/10 rounded-2xl shadow-2xs">
          {[
            { id: "all", label: "All Events" },
            { id: "labs", label: "Labs" },
            { id: "metrics", label: "Vitals" },
            { id: "milestone", label: "Milestones" },
            { id: "plan", label: "Plan Changes" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filter === tab.id
                  ? "bg-[#0F172A] text-white shadow-xs"
                  : "text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div className="max-w-3xl mx-auto relative space-y-6">
        
        {/* Continuous line */}
        <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-[#0F172A]/10 hidden sm:block" />

        <div className="space-y-4">
          {filteredEvents.map((ev) => (
            <div key={ev.id} className="flex items-start gap-4 sm:gap-6 relative">
              
              {/* Node Icon */}
              <div className="w-12 h-12 rounded-2xl bg-white border border-[#0F172A]/10 shadow-xs flex items-center justify-center text-[#14B8A6] shrink-0 z-10">
                {ev.category === "labs" ? (
                  <FileText className="w-5 h-5" />
                ) : ev.category === "metrics" ? (
                  <Activity className="w-5 h-5" />
                ) : ev.category === "milestone" ? (
                  <Award className="w-5 h-5" />
                ) : (
                  <Target className="w-5 h-5" />
                )}
              </div>

              {/* Event Body */}
              <div className="flex-1 p-5 rounded-2xl bg-white border border-[#0F172A]/8 shadow-soft space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] font-mono text-[#64748B]">
                    {ev.date}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#F1F5F9] text-[#64748B]">
                    {ev.category}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[#0F172A]">
                  {ev.title}
                </h3>

                <p className="text-xs text-[#64748B] leading-relaxed">
                  {ev.description}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
