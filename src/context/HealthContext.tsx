"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
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
  ConnectedDevice,
  BloodPressureLog,
  HealthExperiment,
  FamilyMember,
  Score2RiskProfile,
  MealPlate,
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
  initialConnectedDevices,
  initialBloodPressureLogs,
  initialHealthExperiments,
  initialFamilyMembers,
  initialMealPlates,
  initialScore2Profile,
} from "@/data/mockHealthData";
import { translations, Language, Translations } from "@/data/translations";

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
  connectedDevices: ConnectedDevice[];
  isSyncingAll: boolean;
  selectedBiomarker: Biomarker | null;
  setSelectedBiomarker: (bio: Biomarker | null) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  unitSystem: "metric" | "imperial";
  toggleUnitSystem: () => void;
  toggleTaskCompletion: (taskId: string) => void;
  skipTask: (taskId: string, reason: string) => void;
  deferTask: (taskId: string) => void;
  addNewTask: (task: Omit<DailyTask, "id" | "completed" | "status">) => void;
  sendCoachMessage: (text: string) => Promise<void>;
  isCoachThinking: boolean;
  uploadLabReport: (reportName: string, biomarkers?: Partial<Biomarker>[]) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  resetToDemoUser: () => void;
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (open: boolean) => void;
  emergencyAlert: string | null;
  dismissEmergencyAlert: () => void;
  connectDevice: (deviceId: string) => void;
  disconnectDevice: (deviceId: string) => void;
  syncDevice: (deviceId: string) => Promise<void>;
  syncAllDevices: () => Promise<void>;
  addDoctorQuestion: (question: string) => void;
  bloodPressureLogs: BloodPressureLog[];
  addBloodPressureLog: (log: Omit<BloodPressureLog, "id">) => void;
  isBPModalOpen: boolean;
  setIsBPModalOpen: (open: boolean) => void;
  experiments: HealthExperiment[];
  checkinExperiment: (experimentId: string, day: number, note?: string) => void;
  startNewExperiment: (exp: Omit<HealthExperiment, "id" | "currentDay" | "checkins" | "status">) => void;
  togglePreventionItem: (id: string) => void;
  familyMembers: FamilyMember[];
  activeFamilyMemberId: string;
  setActiveFamilyMemberId: (id: string) => void;
  toggleFamilyMedication: (memberId: string, medId: string) => void;
  addFamilyDoctorQuestion: (memberId: string, question: string) => void;
  isNutritionModalOpen: boolean;
  setIsNutritionModalOpen: (open: boolean) => void;
  isSupplementModalOpen: boolean;
  setIsSupplementModalOpen: (open: boolean) => void;
  score2Profile: Score2RiskProfile;
  updateScore2Profile: (updates: Partial<Score2RiskProfile>) => void;
  mealPlates: MealPlate[];
}

const HealthContext = createContext<HealthContextType | undefined>(undefined);

const STORAGE_KEY = "norya_state_v4";

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
  const [connectedDevices, setConnectedDevices] = useState<ConnectedDevice[]>(initialConnectedDevices);
  const [bloodPressureLogs, setBloodPressureLogs] = useState<BloodPressureLog[]>(initialBloodPressureLogs);
  const [isBPModalOpen, setIsBPModalOpen] = useState<boolean>(false);
  const [experiments, setExperiments] = useState<HealthExperiment[]>(initialHealthExperiments);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(initialFamilyMembers);
  const [activeFamilyMemberId, setActiveFamilyMemberId] = useState<string>("fam-sarah");
  const [isNutritionModalOpen, setIsNutritionModalOpen] = useState<boolean>(false);
  const [isSupplementModalOpen, setIsSupplementModalOpen] = useState<boolean>(false);
  const [score2Profile, setScore2Profile] = useState<Score2RiskProfile>(initialScore2Profile);
  const [mealPlates] = useState<MealPlate[]>(initialMealPlates);
  const [isSyncingAll, setIsSyncingAll] = useState<boolean>(false);
  const [selectedBiomarker, setSelectedBiomarker] = useState<Biomarker | null>(null);
  const [activeTab, setActiveTab] = useState<string>("home");
  const [language, setLanguage] = useState<Language>("en");
  const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">("metric");
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [emergencyAlert, setEmergencyAlert] = useState<string | null>(null);
  const [isCoachThinking, setIsCoachThinking] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.user) setUser(parsed.user);
          if (parsed.priorities) setPriorities(parsed.priorities);
          if (parsed.dailyTasks) setDailyTasks(parsed.dailyTasks);
          if (parsed.labReports) setLabReports(parsed.labReports);
          if (parsed.coachMessages) setCoachMessages(parsed.coachMessages);
          if (parsed.connectedDevices) setConnectedDevices(parsed.connectedDevices);
          if (parsed.bloodPressureLogs) setBloodPressureLogs(parsed.bloodPressureLogs);
          if (parsed.experiments) setExperiments(parsed.experiments);
          if (parsed.preventionItems) setPreventionItems(parsed.preventionItems);
          if (parsed.familyMembers) setFamilyMembers(parsed.familyMembers);
          if (parsed.activeFamilyMemberId) setActiveFamilyMemberId(parsed.activeFamilyMemberId);
          if (parsed.score2Profile) setScore2Profile(parsed.score2Profile);
          if (parsed.doctorSummary) setDoctorSummary(parsed.doctorSummary);
          if (parsed.language) setLanguage(parsed.language);
          if (parsed.unitSystem) setUnitSystem(parsed.unitSystem);
        }
      }
    } catch (e) {
      console.error("Failed to load local storage state:", e);
    }
  }, []);

  // Save to localStorage whenever critical state changes
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const stateToSave = {
          user,
          priorities,
          dailyTasks,
          labReports,
          coachMessages,
          connectedDevices,
          bloodPressureLogs,
          experiments,
          preventionItems,
          familyMembers,
          activeFamilyMemberId,
          score2Profile,
          doctorSummary,
          language,
          unitSystem,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
      }
    } catch (e) {
      console.error("Failed to save local storage state:", e);
    }
  }, [user, priorities, dailyTasks, labReports, coachMessages, connectedDevices, bloodPressureLogs, experiments, preventionItems, familyMembers, activeFamilyMemberId, score2Profile, doctorSummary, language, unitSystem]);

  const t = translations[language] || translations.en;

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

  const addDoctorQuestion = (question: string) => {
    if (!question.trim()) return;
    setDoctorSummary((prev) => ({
      ...prev,
      suggestedQuestionsToDiscuss: [...prev.suggestedQuestionsToDiscuss, question.trim()],
    }));
  };

  const addBloodPressureLog = (log: Omit<BloodPressureLog, "id">) => {
    const newLog: BloodPressureLog = {
      ...log,
      id: `bp-log-${Date.now()}`,
    };
    setBloodPressureLogs((prev) => [newLog, ...prev]);

    // Update user profile latest vitals
    setUser((prev) => ({
      ...prev,
      bloodPressureSystolic: log.systolic,
      bloodPressureDiastolic: log.diastolic,
      restingHeartRateBpm: log.pulseBpm || prev.restingHeartRateBpm,
    }));

    // Update daily tasks check-off
    setDailyTasks((prev) =>
      prev.map((t) => {
        if (t.category === "measurement" && t.title.toLowerCase().includes("blood pressure")) {
          return {
            ...t,
            completed: true,
            status: "completed",
            current: `${log.systolic}/${log.diastolic} mmHg (${log.timeSlot})`,
          };
        }
        return t;
      })
    );

    // Append to timeline
    setTimelineEvents((prev) => [
      {
        id: `tl-bp-${Date.now()}`,
        date: "Today",
        category: "metrics",
        title: `Blood Pressure Logged: ${log.systolic}/${log.diastolic} mmHg`,
        description: `Day ${log.dayIndex} ${log.timeSlot} measurement recorded. Pulse: ${log.pulseBpm} bpm.`,
        status: log.systolic >= 140 || log.diastolic >= 90 ? "warning" : "positive",
      },
      ...prev,
    ]);
  };

  const checkinExperiment = (experimentId: string, day: number, note?: string) => {
    setExperiments((prev) =>
      prev.map((exp) => {
        if (exp.id === experimentId) {
          const existingIndex = exp.checkins.findIndex((c) => c.day === day);
          const updatedCheckins = [...exp.checkins];
          if (existingIndex >= 0) {
            updatedCheckins[existingIndex] = {
              ...updatedCheckins[existingIndex],
              completed: !updatedCheckins[existingIndex].completed,
              note: note || updatedCheckins[existingIndex].note,
            };
          } else {
            updatedCheckins.push({ day, completed: true, note });
          }
          return {
            ...exp,
            checkins: updatedCheckins,
            currentDay: Math.max(exp.currentDay, day),
          };
        }
        return exp;
      })
    );
  };

  const startNewExperiment = (exp: Omit<HealthExperiment, "id" | "currentDay" | "checkins" | "status">) => {
    const newExp: HealthExperiment = {
      ...exp,
      id: `exp-${Date.now()}`,
      currentDay: 1,
      status: "active",
      checkins: [{ day: 1, completed: true, note: "Protocol initiated" }],
    };
    setExperiments((prev) => [newExp, ...prev]);
  };

  const togglePreventionItem = (id: string) => {
    setPreventionItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const isDone = item.status === "completed";
        return {
          ...item,
          status: isDone ? "due_soon" : "completed",
          lastCompleted: isDone ? item.lastCompleted : new Date().toISOString().split("T")[0],
          nextDue: isDone ? "Action needed" : "Completed today",
        };
      })
    );
  };

  const toggleFamilyMedication = (memberId: string, medId: string) => {
    setFamilyMembers((prev) =>
      prev.map((m) => {
        if (m.id !== memberId) return m;
        return {
          ...m,
          medications: m.medications.map((med) =>
            med.id === medId ? { ...med, takenToday: !med.takenToday } : med
          ),
        };
      })
    );
  };

  const addFamilyDoctorQuestion = (memberId: string, question: string) => {
    setFamilyMembers((prev) =>
      prev.map((m) => {
        if (m.id !== memberId) return m;
        return {
          ...m,
          doctorQuestions: [...m.doctorQuestions, question],
        };
      })
    );
  };

  const updateScore2Profile = (updates: Partial<Score2RiskProfile>) => {
    setScore2Profile((prev) => {
      const updated = { ...prev, ...updates };
      const bpFactor = Math.pow(1.025, updated.systolicBP - 134);
      const lipidFactor = Math.pow(1.018, updated.nonHdlOrApoB - 105);
      const smokeMultiplier = updated.isSmoker ? 1.85 : 1.0;
      let calculated = 3.8 * bpFactor * lipidFactor * smokeMultiplier;
      calculated = Math.max(0.6, Math.min(28.0, parseFloat(calculated.toFixed(1))));

      let category: "Low" | "Moderate" | "High" | "Very High" = "Low";
      if (calculated >= 10.0) category = "Very High";
      else if (calculated >= 7.5) category = "High";
      else if (calculated >= 2.5) category = "Moderate";
      else category = "Low";

      const rrr = parseFloat((((3.8 - calculated) / 3.8) * 100).toFixed(1));

      return {
        ...updated,
        baselineRiskPercent: calculated,
        riskCategory: category,
        relativeRiskReduction: rrr > 0 ? rrr : 0,
      };
    });
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
    setConnectedDevices(initialConnectedDevices);
    setBloodPressureLogs(initialBloodPressureLogs);
    setExperiments(initialHealthExperiments);
    setFamilyMembers(initialFamilyMembers);
    setActiveFamilyMemberId("fam-sarah");
    setScore2Profile(initialScore2Profile);
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const dismissEmergencyAlert = () => setEmergencyAlert(null);

  const connectDevice = (deviceId: string) => {
    setConnectedDevices((prev) =>
      prev.map((d) => (d.id === deviceId ? { ...d, status: "connected", lastSync: "Just now" } : d))
    );
    setTimelineEvents((prev) => [
      {
        id: `tl-dev-${Date.now()}`,
        date: "Today",
        category: "metrics",
        title: `Hardware Connected`,
        description: `Successfully linked telemetry feed for ${deviceId}.`,
        status: "positive",
      },
      ...prev,
    ]);
  };

  const disconnectDevice = (deviceId: string) => {
    setConnectedDevices((prev) =>
      prev.map((d) => (d.id === deviceId ? { ...d, status: "disconnected" } : d))
    );
  };

  const syncDevice = async (deviceId: string) => {
    setConnectedDevices((prev) =>
      prev.map((d) => (d.id === deviceId ? { ...d, status: "syncing" } : d))
    );

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setConnectedDevices((prev) =>
      prev.map((d) => (d.id === deviceId ? { ...d, status: "connected", lastSync: "Just now" } : d))
    );
  };

  const syncAllDevices = async () => {
    setIsSyncingAll(true);
    setConnectedDevices((prev) =>
      prev.map((d) => (d.status === "connected" ? { ...d, status: "syncing" } : d))
    );

    await new Promise((resolve) => setTimeout(resolve, 1400));

    setConnectedDevices((prev) =>
      prev.map((d) => (d.status === "syncing" ? { ...d, status: "connected", lastSync: "Just now" } : d))
    );
    setIsSyncingAll(false);

    setTimelineEvents((prev) => [
      {
        id: `tl-sync-${Date.now()}`,
        date: "Today",
        category: "metrics",
        title: "All Health Sources Synchronized",
        description: "Wearables, smart scale, and BP cuff feeds consolidated.",
        status: "positive",
      },
      ...prev,
    ]);
  };

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

  const sendCoachMessage = async (text: string) => {
    const userMsg: CoachMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      text,
    };

    setCoachMessages((prev) => [...prev, userMsg]);
    setIsCoachThinking(true);

    try {
      // Attempt serverless /api/coach route call
      const res = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          userProfile: user,
          biomarkers: labReports[0]?.biomarkers,
          language,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const botMsg: CoachMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: "norya",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          text: data.text,
          recommendations: data.recommendations,
          contextMetrics: data.contextMetrics,
          suggestedActions: data.suggestedActions,
          safetyMode: data.safetyMode || "wellness",
          emergencyHelpline: data.emergencyHelpline,
        };

        setCoachMessages((prev) => [...prev, botMsg]);

        if (data.safetyMode === "urgent_emergency") {
          setEmergencyAlert(
            `Urgent Clinical Warning: Your message mentioned symptoms requiring immediate emergency medical evaluation. In Spain / Europe: Call 112. In Morocco: Call 15 (SAMU).`
          );
        }
        setIsCoachThinking(false);
        return;
      }
    } catch (e) {
      console.warn("Falling back to local clinical context evaluation", e);
    }

    // Local deterministic clinical fallback
    setTimeout(() => {
      const lower = text.toLowerCase();
      let responseText = "";
      let recommendations: string[] = [];
      let contextMetrics: CoachMessage["contextMetrics"] = undefined;
      let suggestedActions: CoachMessage["suggestedActions"] = undefined;
      let safetyMode: CoachMessage["safetyMode"] = "wellness";

      if (lower.includes("chest pain") || lower.includes("shortness of breath") || lower.includes("dolor en el pecho")) {
        safetyMode = "urgent_emergency";
        setEmergencyAlert("Urgent Clinical Warning: Acute cardiovascular symptoms detected. Call 112 or 15 immediately.");
        responseText = `⚠️ **URGENT CLINICAL WARNING**\n\nSymptoms such as chest discomfort or shortness of breath require immediate medical evaluation. Please call **112** (Spain/Europe) or **15** (Morocco SAMU) right now.`;
      } else if (lower.includes("tired") || lower.includes("fatigue") || lower.includes("sleep")) {
        responseText = `Your recent 3-night sleep average (5h 54m) is below your 7h 02m baseline, and resting heart rate is up 5 bpm. Opt for active recovery and lights out by 22:15 tonight.`;
        contextMetrics = [
          { label: "3-Night Sleep Avg", value: "5h 54m (Target: 7h+)", status: "warning" },
          { label: "Resting HR", value: "72 bpm (+5 bpm)", status: "warning" },
        ];
        recommendations = ["Gentle 35-min walk", "Hydrate with pinch of salt", "Lights out by 22:15"];
      } else {
        responseText = `Understood. Looking at your biomarkers (ApoB 105 mg/dL, BP 134/84 mmHg), daily cardiovascular habit consistency remains your most protective lever.`;
      }

      const botMsg: CoachMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: "norya",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        text: responseText,
        recommendations,
        contextMetrics,
        suggestedActions,
        safetyMode,
      };

      setCoachMessages((prev) => [...prev, botMsg]);
      setIsCoachThinking(false);
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
        connectedDevices,
        isSyncingAll,
        selectedBiomarker,
        setSelectedBiomarker,
        activeTab,
        setActiveTab,
        language,
        setLanguage,
        t,
        unitSystem,
        toggleUnitSystem,
        toggleTaskCompletion,
        skipTask,
        deferTask,
        addNewTask,
        sendCoachMessage,
        isCoachThinking,
        uploadLabReport,
        updateUserProfile,
        resetToDemoUser,
        isOnboardingOpen,
        setIsOnboardingOpen,
        emergencyAlert,
        dismissEmergencyAlert,
        connectDevice,
        disconnectDevice,
        syncDevice,
        syncAllDevices,
        addDoctorQuestion,
        bloodPressureLogs,
        addBloodPressureLog,
        isBPModalOpen,
        setIsBPModalOpen,
        experiments,
        checkinExperiment,
        startNewExperiment,
        togglePreventionItem,
        familyMembers,
        activeFamilyMemberId,
        setActiveFamilyMemberId,
        toggleFamilyMedication,
        addFamilyDoctorQuestion,
        isNutritionModalOpen,
        setIsNutritionModalOpen,
        isSupplementModalOpen,
        setIsSupplementModalOpen,
        score2Profile,
        updateScore2Profile,
        mealPlates,
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
