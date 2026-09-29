"use client";

import React from "react";
import { useHealth } from "@/context/HealthContext";
import { AppShell } from "@/components/app/AppShell";
import { HomeView } from "@/components/app/HomeView";
import { CoachView } from "@/components/app/CoachView";
import { HealthView } from "@/components/app/HealthView";
import { PlanView } from "@/components/app/PlanView";
import { LabsView } from "@/components/app/LabsView";
import { ProgressView } from "@/components/app/ProgressView";
import { TimelineView } from "@/components/app/TimelineView";
import { PreventionView } from "@/components/app/PreventionView";
import { DoctorModeView } from "@/components/app/DoctorModeView";
import { DevicesView } from "@/components/app/DevicesView";
import { SettingsView } from "@/components/app/SettingsView";
import { OnboardingModal } from "@/components/app/OnboardingModal";

export default function AppPage() {
  const { activeTab } = useHealth();

  return (
    <AppShell>
      {activeTab === "home" && <HomeView />}
      {activeTab === "coach" && <CoachView />}
      {activeTab === "health" && <HealthView />}
      {activeTab === "plan" && <PlanView />}
      {activeTab === "labs" && <LabsView />}
      {activeTab === "progress" && <ProgressView />}
      {activeTab === "timeline" && <TimelineView />}
      {activeTab === "prevention" && <PreventionView />}
      {activeTab === "devices" && <DevicesView />}
      {activeTab === "doctor" && <DoctorModeView />}
      {activeTab === "settings" && <SettingsView />}

      <OnboardingModal />
    </AppShell>
  );
}
