export type HealthDomainType =
  | "cardiovascular"
  | "metabolic"
  | "physical_capacity"
  | "recovery"
  | "nutrition"
  | "prevention";

export type EvidenceGrade = "A" | "B" | "C" | "D" | "E";

export interface HealthPriority {
  id: string;
  rank: 1 | 2 | 3;
  domain: HealthDomainType;
  title: string;
  subtitle: string;
  status: "Needs attention" | "Worth improving" | "On track";
  why: string;
  impact: "High" | "Medium" | "Moderate";
  evidenceGrade: EvidenceGrade;
  evidenceSummary: string;
  nextStep: string;
  notImportantNow?: string[];
  estimatedBenefit: string;
  costLevel: "Free" | "Low (€)" | "Moderate (€€)";
}

export interface DailyTask {
  id: string;
  title: string;
  category: "movement" | "exercise" | "nutrition" | "recovery" | "measurement" | "prevention";
  target: string;
  current?: string;
  completed: boolean;
  status: "pending" | "completed" | "skipped" | "deferred";
  skipReason?: string;
  impactNote?: string;
}

export interface BiomarkerHistoryPoint {
  date: string;
  value: number;
}

export interface Biomarker {
  id: string;
  canonicalName: string;
  displayName: string;
  value: number;
  unit: string;
  normalizedValue?: number;
  normalizedUnit?: string;
  referenceLow: number;
  referenceHigh: number;
  optimalLow?: number;
  optimalHigh?: number;
  status: "optimal" | "borderline" | "elevated" | "low";
  date: string;
  previousValue?: number;
  previousDate?: string;
  category: HealthDomainType;
  explanation: string;
  doctorQuestions: string[];
  historyPoints?: BiomarkerHistoryPoint[];
  evidenceGrade?: EvidenceGrade;
  keyInterventions?: {
    nutrition?: string;
    movement?: string;
    sleep?: string;
    clinical?: string;
  };
}

export interface LabReport {
  id: string;
  title: string;
  laboratory: string;
  date: string;
  sourceType: "pdf" | "photo" | "manual";
  biomarkers: Biomarker[];
  summary: string;
  whatItMeans: string;
  doctorDiscussionTopics: string[];
}

export interface HealthOpportunityScore {
  totalScore: number; // 0 to 100
  delta90d: number; // e.g. -7 (improvement)
  statusLabel: string;
  domainBreakdown: {
    domain: HealthDomainType;
    label: string;
    score: number;
    maxScore: number;
    opportunityText: string;
  }[];
}

export interface PreventionItem {
  id: string;
  title: string;
  category: string;
  recommendedFrequency: string;
  lastCompleted?: string;
  nextDue: string;
  status: "completed" | "due_soon" | "discuss_with_clinician";
  evidenceGrade: EvidenceGrade;
  rationalSummary: string;
  localRelevance: string; // Spain / Morocco / Europe
}

export interface DoctorSummary {
  generatedAt: string;
  userProfile: {
    fullName: string;
    age: number;
    biologicalSex: "female" | "male";
    country: string;
    currentWeight: number;
    weightTrend: string;
    bloodPressureRecent: string;
  };
  reasonForConsultation: string;
  keyVitalTrends: { metric: string; value: string; trend: string }[];
  latestAbnormalBiomarkers: { marker: string; value: string; refRange: string; note: string }[];
  activeMedications: string[];
  knownConditions: string[];
  lifestyleSummary: string;
  userReportedSymptoms: string[];
  suggestedQuestionsToDiscuss: string[];
}

export interface CoachMessage {
  id: string;
  sender: "user" | "norya";
  timestamp: string;
  text: string;
  contextMetrics?: {
    label: string;
    value: string;
    status?: "normal" | "warning" | "highlight";
  }[];
  recommendations?: string[];
  suggestedActions?: { label: string; actionId: string }[];
  safetyMode?: "wellness" | "health_info" | "clinician_recommended" | "urgent_emergency";
  emergencyHelpline?: string;
}

export interface UserProfile {
  id: string;
  firstName: string;
  age: number;
  biologicalSex: "female" | "male";
  country: "Spain" | "Morocco" | "France" | "Other";
  language: "en" | "es" | "fr";
  unitSystem: "metric" | "imperial";
  heightCm: number;
  weightKg: number;
  baselineWeight6moAgoKg: number;
  restingHeartRateBpm: number;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  averageSteps: number;
  averageSleepHours: number;
  healthBudgetMonthlyEur: number;
  coachStyle: "supportive" | "direct" | "strict";
  goals: string[];
  conditions: string[];
  medications: string[];
  familyHistory: string[];
  isDemoUser: boolean;
}

export interface ConnectedDevice {
  id: string;
  name: string;
  brand: string;
  category: "watch" | "ring" | "band" | "scale" | "cgm" | "bp_cuff";
  status: "connected" | "disconnected" | "syncing";
  lastSync: string;
  metricsProvided: string[];
  batteryPercent?: number;
  syncFrequency: "realtime" | "hourly" | "daily";
}

export interface BloodPressureLog {
  id: string;
  dayIndex: number; // 1 to 7
  date: string;
  timeSlot: "AM" | "PM";
  systolic: number;
  diastolic: number;
  pulseBpm: number;
  restMinutes: number;
  arm: "left" | "right";
  notes?: string;
}

export interface HealthExperiment {
  id: string;
  title: string;
  category: "nutrition" | "movement" | "sleep" | "cardiovascular";
  hypothesis: string;
  durationDays: number;
  currentDay: number;
  status: "active" | "completed" | "upcoming";
  checkins: { day: number; completed: boolean; note?: string }[];
  targetBiomarker?: string;
  expectedDelta?: string;
  scientificRationale: string;
}
