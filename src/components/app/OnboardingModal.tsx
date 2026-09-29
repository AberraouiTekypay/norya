"use client";

import React, { useState } from "react";
import { useHealth } from "@/context/HealthContext";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Heart,
  Scale,
  Watch,
  FileText,
  X,
} from "lucide-react";

export const OnboardingModal: React.FC = () => {
  const {
    isOnboardingOpen,
    setIsOnboardingOpen,
    updateUserProfile,
    user,
    setActiveTab,
  } = useHealth();

  const [step, setStep] = useState(1);
  const [goals, setGoals] = useState<string[]>(user.goals || []);
  const [firstName, setFirstName] = useState(user.firstName);
  const [age, setAge] = useState(user.age);
  const [sex, setSex] = useState(user.biologicalSex);
  const [country, setCountry] = useState(user.country);
  const [height, setHeight] = useState(user.heightCm);
  const [weight, setWeight] = useState(user.weightKg);
  const [healthBudget, setHealthBudget] = useState(user.healthBudgetMonthlyEur);
  const [coachStyle, setCoachStyle] = useState(user.coachStyle);
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(true);

  if (!isOnboardingOpen) return null;

  const totalSteps = 9;

  const toggleGoal = (g: string) => {
    if (goals.includes(g)) {
      setGoals(goals.filter((item) => item !== g));
    } else {
      setGoals([...goals, g]);
    }
  };

  const handleFinish = () => {
    updateUserProfile({
      firstName: firstName || "User",
      age: Number(age),
      biologicalSex: sex,
      country: country as any,
      heightCm: Number(height),
      weightKg: Number(weight),
      healthBudgetMonthlyEur: healthBudget,
      coachStyle,
      goals,
      isDemoUser: false,
    });
    setIsOnboardingOpen(false);
    setActiveTab("home");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-10 max-w-xl w-full shadow-2xl space-y-6 animate-in zoom-in-95 duration-200 relative max-h-[90vh] overflow-y-auto">
        
        {/* Step indicator & Close button */}
        <div className="flex items-center justify-between pb-3 border-b border-[#0F172A]/5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#0F766E] bg-[#CCFBF1] px-2.5 py-0.5 rounded-full">
              Step {step} of {totalSteps}
            </span>
            <span className="text-xs font-semibold text-[#64748B]">
              Onboarding Flow
            </span>
          </div>
          <button
            onClick={() => setIsOnboardingOpen(false)}
            className="p-1 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: Welcome */}
        {step === 1 && (
          <div className="space-y-4 text-center py-4">
            <div className="w-16 h-16 rounded-2xl bg-[#0F172A] text-[#14B8A6] flex items-center justify-center mx-auto text-2xl font-bold shadow-md">
              N
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
              Let&apos;s build your health picture.
            </h2>
            <p className="text-sm text-[#64748B] leading-relaxed max-w-md mx-auto">
              Norya brings together your wearables, blood tests, and daily habits to help you understand what actually matters.
            </p>
            <div className="pt-4">
              <button
                onClick={() => setStep(2)}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#0F172A] text-white font-semibold text-sm hover:bg-[#1E293B] shadow-sm transition-all"
              >
                Start Onboarding →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Goals */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-[#0F172A]">
                What would you most like to improve?
              </h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                Select your primary goals (select all that apply).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                "Reduce blood pressure naturally",
                "Sustainable weight reduction",
                "Improve daily energy & sleep",
                "Understand blood test trends",
                "Cardiorespiratory aerobic fitness",
                "Reduce long-term health risks",
              ].map((g) => {
                const isSelected = goals.includes(g);
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => toggleGoal(g)}
                    className={`p-3 rounded-2xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-[#0F172A] text-white border-[#0F172A] shadow-xs"
                        : "bg-[#FAFAF8] text-[#0F172A] border-[#0F172A]/5 hover:border-[#14B8A6]/40"
                    }`}
                  >
                    <span>{g}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-[#14B8A6] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: Basic Profile */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-[#0F172A]">
                Basic Parameters
              </h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                Used to calibrate reference intervals and clinical guidelines.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-semibold text-[#64748B]">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full mt-1 p-2.5 rounded-xl border border-[#0F172A]/10 text-[#0F172A]"
                />
              </div>
              <div>
                <label className="font-semibold text-[#64748B]">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full mt-1 p-2.5 rounded-xl border border-[#0F172A]/10 text-[#0F172A]"
                />
              </div>
              <div>
                <label className="font-semibold text-[#64748B]">Biological Sex</label>
                <select
                  value={sex}
                  onChange={(e) => setSex(e.target.value as any)}
                  className="w-full mt-1 p-2.5 rounded-xl border border-[#0F172A]/10 text-[#0F172A]"
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
              </div>
              <div>
                <label className="font-semibold text-[#64748B]">Country</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value as any)}
                  className="w-full mt-1 p-2.5 rounded-xl border border-[#0F172A]/10 text-[#0F172A]"
                >
                  <option value="Spain">Spain 🇪🇸</option>
                  <option value="Morocco">Morocco 🇲🇦</option>
                  <option value="France">France 🇫🇷</option>
                  <option value="Other">Other 🌍</option>
                </select>
              </div>
              <div>
                <label className="font-semibold text-[#64748B]">Height (cm)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full mt-1 p-2.5 rounded-xl border border-[#0F172A]/10 text-[#0F172A]"
                />
              </div>
              <div>
                <label className="font-semibold text-[#64748B]">Weight (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full mt-1 p-2.5 rounded-xl border border-[#0F172A]/10 text-[#0F172A]"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Health Context */}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-[#0F172A]">
                Health Background
              </h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                Helps the prioritization engine detect relevant clinical flags.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 space-y-1">
                <span className="font-bold text-[#0F172A]">Diagnosed Conditions:</span>
                <input
                  type="text"
                  defaultValue="Stage 1 Borderline Hypertension"
                  className="w-full mt-1 p-2 rounded-lg bg-white border border-[#0F172A]/10"
                />
              </div>

              <div className="p-3 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 space-y-1">
                <span className="font-bold text-[#0F172A]">Current Medications:</span>
                <input
                  type="text"
                  defaultValue="None currently prescribed"
                  className="w-full mt-1 p-2 rounded-lg bg-white border border-[#0F172A]/10"
                />
              </div>

              <div className="p-3 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 space-y-1">
                <span className="font-bold text-[#0F172A]">Family History:</span>
                <input
                  type="text"
                  defaultValue="Father: Hypertension & CAD at age 62"
                  className="w-full mt-1 p-2 rounded-lg bg-white border border-[#0F172A]/10"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Connect Health Data */}
        {step === 5 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-[#0F172A]">
                Connect Health Sources
              </h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                Norya synchronizes with wearable APIs to monitor movement and resting metrics.
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#14B8A6]/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Watch className="w-5 h-5 text-[#14B8A6]" />
                  <div>
                    <div className="text-xs font-bold text-[#0F172A]">Apple Health</div>
                    <div className="text-[11px] text-[#64748B]">Steps, Sleep, Resting Pulse</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#0F766E] bg-[#CCFBF1] px-2.5 py-1 rounded-full">
                  Connected
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Watch className="w-5 h-5 text-[#64748B]" />
                  <div>
                    <div className="text-xs font-bold text-[#0F172A]">Google Health Connect</div>
                    <div className="text-[11px] text-[#64748B]">Android sensor stream</div>
                  </div>
                </div>
                <span className="text-xs font-medium text-[#64748B]">Ready</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: Lab Upload preview */}
        {step === 6 && (
          <div className="space-y-4 text-center">
            <div>
              <h2 className="text-xl font-bold text-[#0F172A]">
                Recent Blood Tests (Optional)
              </h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                Have a recent PDF from Echevarne, Synlab, or your doctor?
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAFAF8] border-2 border-dashed border-[#14B8A6]/30 space-y-2">
              <FileText className="w-8 h-8 text-[#14B8A6] mx-auto" />
              <div className="text-xs font-bold text-[#0F172A]">Sample Blood Panel Ready</div>
              <p className="text-[11px] text-[#64748B]">
                We have pre-loaded Sarah&apos;s verified panel (ApoB 105 mg/dL, HbA1c 5.7%). You can upload your own at any time in the Labs tab.
              </p>
            </div>
          </div>
        )}

        {/* STEP 7: Budget & Tone */}
        {step === 7 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-[#0F172A]">
                Budget & Coaching Tone
              </h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                Norya ensures advice respects your budget and communication preference.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-[#0F172A]">Monthly Health Budget</label>
                <div className="grid grid-cols-4 gap-2 mt-1">
                  {[0, 25, 50, 100].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setHealthBudget(amt)}
                      className={`p-2 rounded-xl border text-xs font-semibold ${
                        healthBudget === amt
                          ? "bg-[#0F172A] text-white border-[#0F172A]"
                          : "bg-[#FAFAF8] text-[#0F172A] border-[#0F172A]/5"
                      }`}
                    >
                      €{amt}/mo
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#0F172A]">Coach Communication Style</label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {(["supportive", "direct", "strict"] as const).map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => setCoachStyle(style)}
                      className={`p-2 rounded-xl border text-xs font-semibold capitalize ${
                        coachStyle === style
                          ? "bg-[#14B8A6] text-[#0F172A] border-[#14B8A6]"
                          : "bg-[#FAFAF8] text-[#0F172A] border-[#0F172A]/5"
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 8: Safety & Consent */}
        {step === 8 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-[#0F172A]">
                Safety & Clinical Boundaries
              </h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                Our commitment to evidence-based ethics.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/8 text-xs text-[#64748B] leading-relaxed space-y-2">
              <p>
                • Norya is a software platform designed for health organization, habit tracking, and educational coaching.
              </p>
              <p>
                • Norya is <strong>not a medical doctor</strong>, does not provide medical diagnoses, and does not prescribe prescription treatments.
              </p>
              <p>
                • In the event of an acute emergency, always contact local emergency services (112 in Spain/Europe, 15 in Morocco).
              </p>
            </div>

            <label className="flex items-center gap-2 text-xs font-semibold text-[#0F172A] cursor-pointer">
              <input
                type="checkbox"
                checked={disclaimerAccepted}
                onChange={(e) => setDisclaimerAccepted(e.target.checked)}
                className="w-4 h-4 text-[#14B8A6] rounded"
              />
              <span>I acknowledge and accept the medical and safety boundaries.</span>
            </label>
          </div>
        )}

        {/* STEP 9: First Overview Generation */}
        {step === 9 && (
          <div className="space-y-4 text-center py-4">
            <div className="w-14 h-14 rounded-2xl bg-[#CCFBF1] text-[#14B8A6] flex items-center justify-center mx-auto shadow-xs">
              <Sparkles className="w-7 h-7" />
            </div>

            <h2 className="text-2xl font-bold text-[#0F172A]">
              Your Personal Health OS is Ready!
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] max-w-md mx-auto">
              We have generated your Top 3 Priorities: <strong>Blood Pressure</strong>, <strong>Fitness Base</strong>, and <strong>Weight/Metabolic Health</strong>.
            </p>

            <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 text-xs text-[#0F766E] font-medium max-w-sm mx-auto">
              Initial Opportunity Score: <strong>31</strong> (Favorable Trajectory)
            </div>

            <div className="pt-2">
              <button
                onClick={handleFinish}
                className="w-full py-3.5 rounded-xl bg-[#0F172A] text-white font-bold text-sm hover:bg-[#1E293B] shadow-md transition-all"
              >
                Enter Norya Health OS →
              </button>
            </div>
          </div>
        )}

        {/* Navigation Step Buttons */}
        {step < 9 && (
          <div className="pt-4 border-t border-[#0F172A]/5 flex justify-between items-center">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#64748B] hover:text-[#0F172A]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : <div />}

            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#0F172A] text-white text-xs font-semibold hover:bg-[#1E293B]"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#14B8A6]" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
