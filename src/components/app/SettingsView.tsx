"use client";

import React, { useState } from "react";
import { useHealth } from "@/context/HealthContext";
import {
  User,
  Shield,
  Download,
  Trash2,
  RotateCcw,
  Sparkles,
  Watch,
  CheckCircle2,
  Clock,
  HeartHandshake,
} from "lucide-react";

export const SettingsView: React.FC = () => {
  const {
    user,
    updateUserProfile,
    resetToDemoUser,
    setIsOnboardingOpen,
  } = useHealth();

  const [savedMessage, setSavedMessage] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(user, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `norya-health-record-${user.firstName.toLowerCase()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl">
      
      {/* Header */}
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
          Configuration & Sovereignty
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
          Profile & Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
          Manage your personal parameters, coaching preferences, connected wearables, and GDPR data export.
        </p>
      </div>

      {savedMessage && (
        <div className="p-3.5 rounded-2xl bg-[#16A34A]/10 border border-[#16A34A]/20 text-xs font-semibold text-[#16A34A]">
          ✓ Settings saved successfully.
        </div>
      )}

      {/* 1. Coaching Tone & Monthly Health Budget */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#0F172A]/8 shadow-card space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-[#0F172A]/5">
          <HeartHandshake className="w-5 h-5 text-[#14B8A6]" />
          <h2 className="text-base font-bold text-[#0F172A]">
            Coaching & Budget Preferences
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Coach Tone */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
              AI Coach Communication Style
            </label>
            <div className="space-y-2">
              {(["supportive", "direct", "strict"] as const).map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => updateUserProfile({ coachStyle: style })}
                  className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    user.coachStyle === style
                      ? "bg-[#0F172A] text-white border-[#0F172A] shadow-xs"
                      : "bg-[#FAFAF8] text-[#0F172A] border-[#0F172A]/5 hover:border-[#14B8A6]/40"
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold capitalize">{style}</div>
                    <div className={`text-[11px] ${user.coachStyle === style ? "text-[#CCFBF1]" : "text-[#64748B]"}`}>
                      {style === "supportive"
                        ? "Gentle, encouraging guidance focused on steady consistency"
                        : style === "direct"
                        ? "Clear, unambiguous recommendations and regular accountability"
                        : "Very concise, accountability-focused communication without fluff"}
                    </div>
                  </div>
                  {user.coachStyle === style && <CheckCircle2 className="w-4 h-4 text-[#14B8A6]" />}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-[#64748B]">
              Scientific recommendations and safety limits never change—only conversational tone.
            </p>
          </div>

          {/* Monthly Budget */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
              Monthly Health Budget
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[0, 25, 50, 100, 250].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => updateUserProfile({ healthBudgetMonthlyEur: amt })}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    user.healthBudgetMonthlyEur === amt
                      ? "bg-[#14B8A6] text-[#0F172A] font-bold border-[#14B8A6] shadow-xs"
                      : "bg-[#FAFAF8] text-[#0F172A] border-[#0F172A]/5 hover:border-[#14B8A6]/40 text-xs"
                  }`}
                >
                  €{amt} / month
                </button>
              ))}
            </div>
            <p className="text-[11px] text-[#64748B] leading-relaxed pt-1">
              Current budget: <strong>€{user.healthBudgetMonthlyEur}/mo</strong>. Norya filters recommendations to prevent expensive, low-yield gadget subscriptions.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Connected Data Sources */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#0F172A]/8 shadow-card space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-[#0F172A]/5">
          <Watch className="w-5 h-5 text-[#14B8A6]" />
          <h2 className="text-base font-bold text-[#0F172A]">
            Connected Data Sources
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#14B8A6]/30 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-[#0F172A]">Apple Health</div>
              <div className="text-[11px] text-[#64748B]">Steps, Sleep, Resting HR synced</div>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#CCFBF1] text-[#0F766E]">
              Connected
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-[#0F172A]">Google Health Connect</div>
              <div className="text-[11px] text-[#64748B]">Android sensor sync</div>
            </div>
            <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[#64748B]">
              Ready to Sync
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 flex items-center justify-between opacity-60">
            <div>
              <div className="text-xs font-bold text-[#0F172A]">Garmin Connect</div>
              <div className="text-[11px] text-[#64748B]">Direct cloud API</div>
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#F1F5F9] text-[#64748B]">
              Coming Soon
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 flex items-center justify-between opacity-60">
            <div>
              <div className="text-xs font-bold text-[#0F172A]">Oura & Whoop</div>
              <div className="text-[11px] text-[#64748B]">Recovery ring & strap sync</div>
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#F1F5F9] text-[#64748B]">
              Coming Soon
            </span>
          </div>
        </div>
      </div>

      {/* 3. Data Sovereignty & GDPR Actions */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#0F172A]/8 shadow-card space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-[#0F172A]/5">
          <Shield className="w-5 h-5 text-[#14B8A6]" />
          <h2 className="text-base font-bold text-[#0F172A]">
            Data Sovereignty & Controls
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5">
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-[#0F172A]">Export Complete Health Vault</div>
            <div className="text-[11px] text-[#64748B]">
              Download all your biomarkers, BP logs, and habit records in JSON format.
            </div>
          </div>
          <button
            onClick={handleExportData}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#0F172A]/10 text-xs font-semibold text-[#0F172A] hover:bg-[#F1F5F9] shadow-2xs"
          >
            <Download className="w-4 h-4 text-[#14B8A6]" />
            <span>{downloadSuccess ? "Downloaded!" : "Export JSON"}</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5">
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-[#0F172A]">Reset to Sarah Demo Profile</div>
            <div className="text-[11px] text-[#64748B]">
              Restore seeded realistic data for demonstration or investor presentations.
            </div>
          </div>
          <button
            onClick={resetToDemoUser}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F172A] text-white text-xs font-semibold hover:bg-[#1E293B]"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#14B8A6]" />
            <span>Reset Demo Data</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5">
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-[#0F172A]">Run Onboarding Wizard Again</div>
            <div className="text-[11px] text-[#64748B]">
              Walk through the 9-step initial configuration flow.
            </div>
          </div>
          <button
            onClick={() => setIsOnboardingOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#14B8A6] text-[#0F172A] text-xs font-bold hover:bg-[#0D9488]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch Wizard</span>
          </button>
        </div>
      </div>

    </div>
  );
};
