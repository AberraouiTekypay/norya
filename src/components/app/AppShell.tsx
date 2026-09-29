"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useHealth } from "@/context/HealthContext";
import {
  LayoutDashboard,
  MessageSquare,
  Activity,
  CalendarCheck,
  FileSpreadsheet,
  TrendingUp,
  History,
  ShieldCheck,
  Stethoscope,
  Settings,
  AlertTriangle,
  Sparkles,
  ExternalLink,
  RotateCcw,
  CheckCircle2,
  Watch,
  X,
} from "lucide-react";
import { BiomarkerModal } from "./BiomarkerModal";
import { BloodPressureModal } from "./BloodPressureModal";

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const {
    user,
    activeTab,
    setActiveTab,
    unitSystem,
    toggleUnitSystem,
    language,
    setLanguage,
    t,
    resetToDemoUser,
    setIsOnboardingOpen,
    emergencyAlert,
    dismissEmergencyAlert,
  } = useHealth();

  const navItems = [
    { id: "home", label: t.nav.home, icon: LayoutDashboard, badge: undefined },
    { id: "coach", label: t.nav.coach, icon: MessageSquare, badge: "AI" },
    { id: "health", label: t.nav.health, icon: Activity, badge: "6 Domains" },
    { id: "plan", label: t.nav.plan, icon: CalendarCheck, badge: undefined },
    { id: "labs", label: t.nav.labs, icon: FileSpreadsheet, badge: "ApoB 105" },
    { id: "progress", label: t.nav.progress, icon: TrendingUp, badge: "Score 31" },
    { id: "timeline", label: t.nav.timeline, icon: History, badge: undefined },
    { id: "prevention", label: t.nav.prevention, icon: ShieldCheck, badge: "6/8" },
    { id: "devices", label: t.nav.devices, icon: Watch, badge: "4 Synced" },
    { id: "doctor", label: t.nav.doctor, icon: Stethoscope, badge: "Brief" },
    { id: "settings", label: t.nav.settings, icon: Settings, badge: undefined },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#0F172A] flex flex-col md:flex-row">
      
      {/* Emergency Alert Banner */}
      {emergencyAlert && (
        <div className="fixed top-0 left-0 right-0 z-50 p-4 bg-[#F97360] text-white shadow-xl flex items-center justify-between gap-4 animate-in slide-in-from-top duration-300 print:hidden">
          <div className="flex items-center gap-3 max-w-4xl mx-auto">
            <AlertTriangle className="w-6 h-6 shrink-0 animate-bounce" />
            <div className="text-xs sm:text-sm font-medium leading-relaxed">
              {emergencyAlert}
            </div>
          </div>
          <button
            onClick={dismissEmergencyAlert}
            className="p-1 rounded-lg bg-black/20 hover:bg-black/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Desktop Left Sidebar */}
      <aside className="hidden md:flex flex-col justify-between w-64 lg:w-72 bg-white border-r border-[#0F172A]/8 h-screen sticky top-0 shrink-0 p-5 overflow-y-auto print:hidden">
        
        {/* Top brand & profile */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-[#0F172A] flex items-center justify-center text-[#14B8A6] font-bold text-lg">
                N
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-[#0F172A]">
                  Norya
                </span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#64748B]">
                  Health OS
                </span>
              </div>
            </Link>

            <button
              onClick={() => setIsOnboardingOpen(true)}
              className="text-[11px] font-semibold text-[#14B8A6] hover:underline flex items-center gap-1"
              title="Restart onboarding flow"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Onboard</span>
            </button>
          </div>

          {/* User Profile Card */}
          <div className="p-3.5 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#14B8A6]/10 text-[#0F766E] font-bold text-sm flex items-center justify-center">
                {user.firstName[0]}
              </div>
              <div>
                <div className="text-xs font-bold text-[#0F172A]">
                  {user.firstName} M.
                </div>
                <div className="text-[11px] text-[#64748B]">
                  Age {user.age} • {user.country}
                </div>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#16A34A]" title="Connected & synced" />
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? "bg-[#0F172A] text-white shadow-xs font-semibold"
                      : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-[#14B8A6]" : "text-[#64748B]"}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        isActive
                          ? "bg-white/20 text-[#CCFBF1]"
                          : "bg-[#F1F5F9] text-[#64748B]"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom controls & EM300 requirement */}
        <div className="pt-6 border-t border-[#0F172A]/5 space-y-4">
          
          {/* Quick preferences toggles */}
          <div className="flex items-center justify-between text-xs text-[#64748B]">
            <button
              onClick={toggleUnitSystem}
              className="px-2 py-1 rounded bg-[#FAFAF8] border border-[#0F172A]/5 hover:border-[#14B8A6]/40 text-[11px] font-semibold"
            >
              Units: {unitSystem === "metric" ? "Metric (kg)" : "Imperial (lbs)"}
            </button>
            <div className="flex items-center gap-1 text-[11px]">
              <button
                onClick={() => setLanguage("en")}
                className={`px-1.5 py-0.5 rounded ${language === "en" ? "font-bold text-[#0F172A] bg-[#F1F5F9]" : "text-[#94A3B8]"}`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("es")}
                className={`px-1.5 py-0.5 rounded ${language === "es" ? "font-bold text-[#0F172A] bg-[#F1F5F9]" : "text-[#94A3B8]"}`}
              >
                ES
              </button>
              <button
                onClick={() => setLanguage("fr")}
                className={`px-1.5 py-0.5 rounded ${language === "fr" ? "font-bold text-[#0F172A] bg-[#F1F5F9]" : "text-[#94A3B8]"}`}
              >
                FR
              </button>
            </div>
          </div>

          {/* Mandatory Brand Company Link */}
          <div className="text-[11px] text-[#94A3B8] text-center pt-2">
            <span>An </span>
            <a
              href="https://em300.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#14B8A6] font-semibold hover:underline"
            >
              EM300.co
            </a>
            <span> Company</span>
          </div>

        </div>

      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 pb-20 md:pb-8 print:p-0 print:m-0">
        
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-[#0F172A]/5 px-4 py-3 flex items-center justify-between sticky top-0 z-30 print:hidden">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#0F172A] flex items-center justify-center text-[#14B8A6] font-bold text-sm">
              N
            </div>
            <span className="font-bold text-sm text-[#0F172A]">Norya</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#0F766E] bg-[#CCFBF1] px-2.5 py-0.5 rounded-full font-medium">
              Sarah (Score: 31)
            </span>
            <button
              onClick={() => setIsOnboardingOpen(true)}
              className="p-1.5 rounded-lg bg-[#F1F5F9] text-xs font-medium text-[#0F172A]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* View Content */}
        <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 print:p-0 print:m-0 print:max-w-none">
          {children}
        </div>

        {/* App Footer for mobile */}
        <div className="md:hidden py-6 text-center text-xs text-[#94A3B8] border-t border-[#0F172A]/5 mt-auto print:hidden">
          <span>An </span>
          <a
            href="https://em300.co"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#14B8A6] font-semibold hover:underline"
          >
            EM300.co
          </a>
          <span> Company • getnorya.com</span>
        </div>

      </main>

      {/* Global Biomarker Detail Modal */}
      <BiomarkerModal />

      {/* Global Blood Pressure Protocol Modal */}
      <BloodPressureModal />

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#0F172A]/10 px-2 py-2 flex items-center justify-around shadow-lg print:hidden">
        {[
          { id: "home", label: t.nav.home, icon: LayoutDashboard },
          { id: "coach", label: t.nav.coach, icon: MessageSquare },
          { id: "health", label: t.nav.health, icon: Activity },
          { id: "plan", label: t.nav.plan, icon: CalendarCheck },
          { id: "labs", label: t.nav.labs, icon: FileSpreadsheet },
          { id: "devices", label: t.nav.devices, icon: Watch },
          { id: "doctor", label: t.nav.doctor, icon: Stethoscope },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 p-1.5 text-[10px] font-medium transition-colors ${
                isActive ? "text-[#14B8A6] font-bold" : "text-[#64748B]"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

    </div>
  );
};
