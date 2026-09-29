"use client";

import React, { useState, useRef, useEffect } from "react";
import { useHealth } from "@/context/HealthContext";
import {
  Sparkles,
  Send,
  AlertTriangle,
  Stethoscope,
  Activity,
  ShieldCheck,
  Check,
  ArrowRight,
  Info,
} from "lucide-react";

export const CoachView: React.FC = () => {
  const {
    user,
    coachMessages,
    sendCoachMessage,
    setActiveTab,
    emergencyAlert,
  } = useHealth();

  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [coachMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendCoachMessage(input);
    setInput("");
  };

  const handleQuickPrompt = (prompt: string) => {
    sendCoachMessage(prompt);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col animate-in fade-in duration-300">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#0F172A]/8">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A]">
              Norya AI Health Coach
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-[#CCFBF1] text-[#0F766E] text-xs font-semibold">
              Tone: {user.coachStyle}
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">
            Contextual intelligence aware of Sarah&apos;s vitals, lab reports, and current top 3 priorities.
          </p>
        </div>

        <button
          onClick={() => setActiveTab("doctor")}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#0F172A]/10 text-xs font-semibold text-[#0F172A] hover:bg-[#F1F5F9] transition-colors shrink-0 shadow-2xs"
        >
          <Stethoscope className="w-4 h-4 text-[#14B8A6]" />
          <span>Prepare for Doctor</span>
        </button>
      </div>

      {/* Suggested Quick Prompts Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs shrink-0">
        <span className="text-[#64748B] font-semibold shrink-0">Quick prompts:</span>
        {[
          "Why am I more tired today?",
          "Should I buy a continuous glucose monitor (CGM)?",
          "Explain my ApoB blood test",
          "What should I ask my doctor?",
          "I have chest pain and left arm numbness (Emergency Test)",
        ].map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleQuickPrompt(prompt)}
            className="px-3 py-1.5 rounded-xl bg-white border border-[#0F172A]/8 hover:border-[#14B8A6]/40 text-[#0F172A] whitespace-nowrap shadow-2xs text-[11px] transition-all hover:bg-[#FAFAF8]"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 rounded-3xl bg-white border border-[#0F172A]/8 shadow-card">
        {coachMessages.map((msg) => {
          const isUser = msg.sender === "user";
          const isEmergency = msg.safetyMode === "urgent_emergency";
          const isClinician = msg.safetyMode === "clinician_recommended";

          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
            >
              {!isUser && (
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold shadow-xs ${
                    isEmergency
                      ? "bg-[#F97360] text-white"
                      : "bg-[#0F172A] text-[#14B8A6]"
                  }`}
                >
                  {isEmergency ? "!" : "N"}
                </div>
              )}

              <div
                className={`max-w-xl rounded-2xl p-4 text-xs sm:text-sm space-y-3 shadow-2xs leading-relaxed ${
                  isUser
                    ? "bg-[#0F172A] text-white rounded-tr-xs"
                    : isEmergency
                    ? "bg-[#F97360]/10 border-2 border-[#F97360] text-[#0F172A] rounded-tl-xs"
                    : isClinician
                    ? "bg-[#F5C76A]/10 border border-[#F5C76A]/40 text-[#0F172A] rounded-tl-xs"
                    : "bg-[#FAFAF8] border border-[#0F172A]/5 text-[#0F172A] rounded-tl-xs"
                }`}
              >
                <div className="flex items-center justify-between text-[11px] text-[#64748B] pb-1 border-b border-black/5">
                  <span className="font-semibold">
                    {isUser ? user.firstName : "Norya Coach"}
                  </span>
                  <span>{msg.timestamp}</span>
                </div>

                <div className="whitespace-pre-line">
                  {msg.text}
                </div>

                {/* Context Metrics retrieved */}
                {msg.contextMetrics && (
                  <div className="p-3 rounded-xl bg-white border border-[#0F172A]/8 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                      Retrieved Physiological Context:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {msg.contextMetrics.map((cm, cIdx) => (
                        <span
                          key={cIdx}
                          className={`text-xs px-2.5 py-1 rounded-md font-mono ${
                            cm.status === "warning"
                              ? "bg-[#F97360]/10 text-[#F97360] font-semibold"
                              : "bg-[#F1F5F9] text-[#0F172A]"
                          }`}
                        >
                          {cm.label}: <strong>{cm.value}</strong>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                {msg.recommendations && (
                  <div className="p-3 rounded-xl bg-[#CCFBF1]/30 border border-[#14B8A6]/20 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F766E]">
                      Recommended Actions
                    </span>
                    <ul className="text-xs text-[#0F766E] space-y-1">
                      {msg.recommendations.map((rec, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#14B8A6]" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Suggested Action buttons */}
                {msg.suggestedActions && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {msg.suggestedActions.map((act, aIdx) => (
                      <button
                        key={aIdx}
                        onClick={() => {
                          if (act.actionId === "open_doctor_summary") setActiveTab("doctor");
                          if (act.actionId === "view_labs") setActiveTab("labs");
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#0F172A] text-white text-xs font-semibold hover:bg-[#1E293B] flex items-center gap-1.5 transition-colors"
                      >
                        <span>{act.label}</span>
                        <ArrowRight className="w-3 h-3 text-[#14B8A6]" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="relative shrink-0">
        <input
          type="text"
          placeholder="Ask Norya anything about your health, lab tests, or weekly plan..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full pl-5 pr-28 py-3.5 rounded-2xl bg-white border border-[#0F172A]/10 text-xs sm:text-sm text-[#0F172A] shadow-soft focus:outline-hidden focus:border-[#14B8A6]"
        />
        <button
          type="submit"
          className="absolute right-2 top-2 bottom-2 px-5 rounded-xl bg-[#0F172A] text-white font-semibold text-xs hover:bg-[#1E293B] transition-colors flex items-center gap-1.5 shadow-xs"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5 text-[#14B8A6]" />
        </button>
      </form>

      {/* Safety Notice Footer */}
      <div className="text-center text-[11px] text-[#64748B] flex items-center justify-center gap-1.5 shrink-0">
        <ShieldCheck className="w-3.5 h-3.5 text-[#14B8A6]" />
        <span>Norya Coach provides educational health guidance and does not prescribe or diagnose.</span>
      </div>

    </div>
  );
};
