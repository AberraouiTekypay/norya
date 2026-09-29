"use client";

import React, { createContext, useContext, useState } from "react";
import {
  UserProfile,
  HealthPriority,
  DailyTask,
  LabReport,
  HealthOpportunityScore,
  PreventionItem,
  DoctorSummary,
  CoachMessage,
  Biomarker,
} from "@/types/health";
import {
  initialSarahProfile,
  initialPriorities,
  initialDailyTasks,
  initialLabReport,
  initialHealthOpportunityScore,
  initialPreventionItems,
  initialCoachMessages,
  initialDoctorSummary,
  sampleTimelineEvents,
} from "@/data/mockHealthData";

interface HealthContextType {
  user: UserProfile;
  priorities: HealthPriority[];
  dailyTasks: DailyTask[];
  labReports: LabReport[];
  opportunityScore: HealthOpportunityScore;
  preventionItems: PreventionItem[];
  coachMessages: CoachMessage[];
  doctorSummary: DoctorSummary;
  timelineEvents: typeof sampleTimelineEvents;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: "en" | "es" | "fr";
  setLanguage: (lang: "en" | "es" | "fr") => void;
  unitSystem: "metric" | "imperial";
  toggleUnitSystem: () => void;
  toggleTaskCompletion: (taskId: string) => void;
  skipTask: (taskId: string, reason: string) => void;
  deferTask: (taskId: string) => void;
  addNewTask: (task: Omit<DailyTask, "id" | "completed" | "status">) => void;
  sendCoachMessage: (text: string) => void;
  uploadLabReport: (reportName: string, biomarkers?: Partial<Biomarker>[]) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  resetToDemoUser: () => void;
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (open: boolean) => void;
  emergencyAlert: string | null;
  dismissEmergencyAlert: () => void;
}

const HealthContext = createContext<HealthContextType | undefined>(undefined);

export const HealthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(initialSarahProfile);
  const [priorities, setPriorities] = useState<HealthPriority[]>(initialPriorities);
  const [dailyTasks, setDailyTasks] = useState<DailyTask[]>(initialDailyTasks);
  const [labReports, setLabReports] = useState<LabReport[]>([initialLabReport]);
  const [opportunityScore, setOpportunityScore] = useState<HealthOpportunityScore>(initialHealthOpportunityScore);
  const [preventionItems, setPreventionItems] = useState<PreventionItem[]>(initialPreventionItems);
  const [coachMessages, setCoachMessages] = useState<CoachMessage[]>(initialCoachMessages);
  const [doctorSummary, setDoctorSummary] = useState<DoctorSummary>(initialDoctorSummary);
  const [timelineEvents, setTimelineEvents] = useState(sampleTimelineEvents);
  const [activeTab, setActiveTab] = useState<string>("home");
  const [language, setLanguage] = useState<"en" | "es" | "fr">("en");
  const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">("metric");
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [emergencyAlert, setEmergencyAlert] = useState<string | null>(null);

  const toggleUnitSystem = () => {
    setUnitSystem((prev) => (prev === "metric" ? "imperial" : "metric"));
  };

  const toggleTaskCompletion = (taskId: string) => {
    setDailyTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const newStatus = t.status === "completed" ? "pending" : "completed";
          return {
            ...t,
            completed: newStatus === "completed",
            status: newStatus,
          };
        }
        return t;
      })
    );
  };

  const skipTask = (taskId: string, reason: string) => {
    setDailyTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: "skipped", skipReason: reason } : t))
    );
  };

  const deferTask = (taskId: string) => {
    setDailyTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: "deferred" } : t))
    );
  };

  const addNewTask = (task: Omit<DailyTask, "id" | "completed" | "status">) => {
    const newTask: DailyTask = {
      ...task,
      id: `task-${Date.now()}`,
      completed: false,
      status: "pending",
    };
    setDailyTasks((prev) => [newTask, ...prev]);
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  const resetToDemoUser = () => {
    setUser(initialSarahProfile);
    setPriorities(initialPriorities);
    setDailyTasks(initialDailyTasks);
    setLabReports([initialLabReport]);
    setOpportunityScore(initialHealthOpportunityScore);
    setPreventionItems(initialPreventionItems);
    setCoachMessages(initialCoachMessages);
    setDoctorSummary(initialDoctorSummary);
    setTimelineEvents(sampleTimelineEvents);
  };

  const dismissEmergencyAlert = () => setEmergencyAlert(null);

  const uploadLabReport = (reportName: string, customBiomarkers?: Partial<Biomarker>[]) => {
    const newReport: LabReport = {
      id: `lab-report-${Date.now()}`,
      title: reportName || "Follow-up Lipid & Metabolic Screen",
      laboratory: "Laboratorios Echevarne / Synlab",
      date: new Date().toISOString().split("T")[0],
      sourceType: "pdf",
      summary: "Newly verified panel successfully matched against Norya clinical reference models.",
      whatItMeans: "ApoB particle distribution continues on an encouraging trajectory. Consistent aerobic movement and moderate caloric balance are demonstrating tangible biological impact.",
      doctorDiscussionTopics: [
        "How do these updated markers compare with baseline objectives?",
        "Should we maintain current lifestyle protocol for 6 more months?",
      ],
      biomarkers: (customBiomarkers && customBiomarkers.length > 0)
        ? (customBiomarkers as Biomarker[])
        : initialLabReport.biomarkers.map((b) => ({
            ...b,
            id: `bio-${Date.now()}-${b.canonicalName}`,
            date: new Date().toISOString().split("T")[0],
            previousValue: b.value,
            value: b.canonicalName === "ApoB" ? 101 : b.canonicalName === "HbA1c" ? 5.6 : b.value,
            status: b.canonicalName === "HbA1c" ? "optimal" : b.status,
          })),
    };

    setLabReports((prev) => [newReport, ...prev]);
    setTimelineEvents((prev) => [
      {
        id: `tl-${Date.now()}`,
        date: "Today",
        category: "labs",
        title: `Lab Report Uploaded: ${newReport.title}`,
        description: `Verified ${newReport.biomarkers.length} biomarkers. Health picture updated.`,
        status: "positive",
      },
      ...prev,
    ]);
  };

  const sendCoachMessage = (text: string) => {
    const userMsg: CoachMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      text,
    };

    setCoachMessages((prev) => [...prev, userMsg]);

    // Contextual AI Intelligence logic
    setTimeout(() => {
      const lower = text.toLowerCase();
      let responseText = "";
      let recommendations: string[] = [];
      let contextMetrics: CoachMessage["contextMetrics"] = undefined;
      let suggestedActions: CoachMessage["suggestedActions"] = undefined;
      let safetyMode: CoachMessage["safetyMode"] = "wellness";
      let emergencyHelpline: string | undefined = undefined;

      // 1. Red Flag / Emergency Detection
      if (
        lower.includes("chest pain") ||
        lower.includes("shortness of breath") ||
        lower.includes("numbness") ||
        lower.includes("fainting") ||
        lower.includes("stroke")
      ) {
        safetyMode = "urgent_emergency";
        emergencyHelpline = user.country === "Morocco" ? "SAMU 15 / Police 19" : "Europe Emergency: 112";
        setEmergencyAlert(
          `Urgent Clinical Warning: Your message mentioned symptoms (${text}) that require immediate emergency evaluation. Norya is an educational wellness OS, not emergency care. Please contact ${emergencyHelpline} or go to the nearest emergency department immediately.`
        );
        responseText = `⚠️ **URGENT SAFETY PROTOCOL ACTIVATED**\n\nSymptoms such as chest discomfort, severe shortness of breath, sudden numbness, or loss of consciousness may signal an acute cardiovascular or neurological emergency.\n\n**Do not wait, monitor, or attempt lifestyle interventions.**\n\n• In Spain / Europe: Call **112**\n• In Morocco: Call **15** (SAMU) or **141**\n• Go directly to the nearest hospital emergency room.`;
      }
      // 2. Medication alteration attempt
      else if (
        lower.includes("stop taking") ||
        lower.includes("change my dose") ||
        lower.includes("start taking statin") ||
        lower.includes("blood pressure medication")
      ) {
        safetyMode = "clinician_recommended";
        responseText = `I cannot recommend altering, starting, or discontinuing prescription medication. Such decisions require comprehensive clinical assessment with your prescribing physician.\n\nHowever, I can prepare a structured summary of your home blood pressure logs (average 134/84 mmHg) and ApoB readings so you can review them collaboratively with your doctor.`;
        suggestedActions = [
          { label: "Generate Doctor Appointment Summary", actionId: "open_doctor_summary" },
        ];
      }
      // 3. "Why am I tired today?"
      else if (lower.includes("tired") || lower.includes("fatigue") || lower.includes("sleep")) {
        responseText = `Your recent sleep data reveals why you feel fatigued: you averaged 5h 54m over the past 3 nights, compared with your stable 7h 02m baseline. In addition, your resting heart rate is elevated by 5 bpm above baseline.\n\nInstead of a high-stress workout that could spike systemic cortisol, today is ideally suited to active recovery.`;
        contextMetrics = [
          { label: "3-Night Sleep Avg", value: "5h 54m (Target: 7h+)", status: "warning" },
          { label: "Resting Heart Rate", value: "72 bpm (+5 bpm)", status: "warning" },
        ];
        recommendations = [
          "Choose a gentle 35-minute outdoor walk rather than strenuous exercise",
          "Ensure adequate hydration (500ml water + pinch of salt/electrolytes)",
          "Aim for lights-out by 22:15 tonight to begin sleep debt payback",
        ];
        suggestedActions = [
          { label: "Switch today's plan to Recovery", actionId: "switch_recovery" },
        ];
      }
      // 4. "Should I buy a CGM?" or "supplements"
      else if (lower.includes("cgm") || lower.includes("glucose monitor") || lower.includes("supplement")) {
        responseText = `**Not recommended right now.**\n\nYour top three priorities are blood pressure reduction, cardiorespiratory movement, and steady weight loss. A continuous glucose monitor (€70–€100/mo) or expensive longevity supplements will not change those priorities. Your HbA1c is already improving (5.7% from 5.9%), and your €${user.healthBudgetMonthlyEur}/mo health budget is far better allocated toward a validated home blood pressure cuff, quality groceries, or comfortable walking shoes.`;
        recommendations = [
          "Focus on proven fundamentals: 7,000 steps daily",
          "Maintain your 120g daily protein anchor",
          "Ignore biohacking theater and high-cost gadgets",
        ];
      }
      // 5. "Explain my blood test" / "ApoB"
      else if (lower.includes("blood test") || lower.includes("apob") || lower.includes("cholesterol") || lower.includes("lab")) {
        safetyMode = "health_info";
        responseText = `Here is the science behind your recent panel:\n\n• **ApoB (105 mg/dL)**: Apolipoprotein B measures the exact number of atherogenic cholesterol-carrying particles. Because your father had coronary artery disease at 62, managing particle count (<80-90 mg/dL) is more protective than watching standard total cholesterol alone.\n• **HbA1c (5.7%)**: Down from 5.9%, indicating that your 3.7 kg weight reduction has already improved cellular insulin sensitivity.\n• **Kidneys & Liver**: eGFR (94) and Triglycerides (142 mg/dL) are optimal.`;
        contextMetrics = [
          { label: "ApoB", value: "105 mg/dL (Target <90)", status: "warning" },
          { label: "HbA1c", value: "5.7% (Improved)", status: "normal" },
          { label: "Triglycerides", value: "142 mg/dL (Normal)", status: "normal" },
        ];
        suggestedActions = [
          { label: "View Complete Lab Extraction", actionId: "view_labs" },
          { label: "Prepare Questions for Doctor", actionId: "open_doctor_summary" },
        ];
      }
      // 6. "What should I focus on this week?"
      else if (lower.includes("focus") || lower.includes("priority") || lower.includes("plan")) {
        responseText = `For this week, ignore all distractions and execute on your **Top 3 Priorities**:\n\n1. **Blood Pressure Protocol**: Complete your 7-day AM/PM log (currently Day 3). This provides clinical-grade data for your next check-up.\n2. **Movement Anchor**: Hit 7,000 daily steps. A 35-minute brisk walk covers almost half of this target.\n3. **Metabolic Consistency**: Sustain your 120g protein target to support muscle maintenance while your weight drops smoothly.`;
        recommendations = [
          "Complete morning and evening BP checks",
          "Take an afternoon brisk walk",
          "Consolidate hydration and protein",
        ];
      }
      // 7. General inquiry
      else {
        responseText = `Understood. Looking across your health context (Weight: ${user.weightKg} kg, BP: ${user.bloodPressureSystolic}/${user.bloodPressureDiastolic} mmHg, Avg steps: ${user.averageSteps}), the most impactful lever remains steady cardiovascular habit consistency rather than complex interventions.\n\nHow else can I assist with your plan or lab results today?`;
      }

      const botMsg: CoachMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: "norya",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        text: responseText,
        recommendations: recommendations.length > 0 ? recommendations : undefined,
        contextMetrics,
        suggestedActions,
        safetyMode,
        emergencyHelpline,
      };

      setCoachMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  return (
    <HealthContext.Provider
      value={{
        user,
        priorities,
        dailyTasks,
        labReports,
        opportunityScore,
        preventionItems,
        coachMessages,
        doctorSummary,
        timelineEvents,
        activeTab,
        setActiveTab,
        language,
        setLanguage,
        unitSystem,
        toggleUnitSystem,
        toggleTaskCompletion,
        skipTask,
        deferTask,
        addNewTask,
        sendCoachMessage,
        uploadLabReport,
        updateUserProfile,
        resetToDemoUser,
        isOnboardingOpen,
        setIsOnboardingOpen,
        emergencyAlert,
        dismissEmergencyAlert,
      }}
    >
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => {
  const context = useContext(HealthContext);
  if (!context) {
    throw new Error("useHealth must be used within a HealthProvider");
  }
  return context;
};
