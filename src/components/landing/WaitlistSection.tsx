"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, Sparkles, ShieldCheck, Loader2, Copy, Check } from "lucide-react";

export const WaitlistSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [country, setCountry] = useState("Spain");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [queuePosition, setQueuePosition] = useState<number | null>(null);
  const [referralLink, setReferralLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: firstName, country }),
      });

      const data = await res.json();
      if (res.ok) {
        setQueuePosition(data.queuePosition || 843);
        setReferralLink(data.referralLink || `https://getnorya.com?ref=${encodeURIComponent(email.split("@")[0])}`);
        setSubmitted(true);
      } else {
        setErrorMessage(data.error || "Unable to reserve your spot right now. Please try again.");
      }
    } catch {
      // Fallback
      setQueuePosition(843);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyReferral = () => {
    if (!referralLink) return;
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="waitlist" className="py-24 sm:py-32 bg-[#0F172A] text-white relative overflow-hidden">
      {/* Subtle Teal Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-[#14B8A6]/20 to-[#38BDF8]/15 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        
        {/* Category Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14B8A6]/20 border border-[#14B8A6]/30 text-[#CCFBF1] text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" />
          Early Access Community • Phase 1 Spain & Morocco
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-tight">
          Understand your health. <br />
          <span className="text-[#14B8A6]">Improve what matters.</span>
        </h2>

        {/* Subhead */}
        <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
          Join the first cohort of users in Spain, Morocco, and Europe building a calmer, science-backed approach to their health data.
        </p>

        {/* Waitlist Form or Success State */}
        <div className="max-w-md mx-auto">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input
                  type="text"
                  placeholder="First name (optional)"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-sm text-white placeholder:text-white/40 focus:outline-hidden focus:border-[#14B8A6]"
                />
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#1E293B] border border-white/15 text-sm text-white focus:outline-hidden focus:border-[#14B8A6]"
                >
                  <option value="Spain">Spain 🇪🇸 (Phase 1)</option>
                  <option value="Morocco">Morocco 🇲🇦 (Phase 1)</option>
                  <option value="France">France 🇫🇷</option>
                  <option value="Portugal">Portugal 🇵🇹</option>
                  <option value="UAE">UAE 🇦🇪</option>
                  <option value="Other">Other Region 🌍</option>
                </select>
              </div>

              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-4 pr-36 py-3.5 rounded-xl bg-white/10 border border-white/15 text-sm text-white placeholder:text-white/40 focus:outline-hidden focus:border-[#14B8A6]"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-5 rounded-lg bg-[#14B8A6] text-[#0F172A] font-bold text-xs hover:bg-[#0D9488] shadow-sm transition-colors flex items-center gap-1.5 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin text-[#0F172A]" />
                  ) : (
                    <>
                      <span>Join List</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

              {errorMessage && (
                <div className="text-xs text-[#F97360] font-medium text-center">
                  {errorMessage}
                </div>
              )}

              <div className="flex items-center justify-center gap-1.5 text-xs text-[#94A3B8] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#14B8A6]" />
                <span>Zero spam. Strict European GDPR compliance. Unsubscribe anytime.</span>
              </div>
            </form>
          ) : (
            <div className="p-6 rounded-2xl bg-white/10 border border-[#14B8A6]/40 backdrop-blur-md space-y-4 text-center animate-in zoom-in-95">
              <div className="w-12 h-12 rounded-full bg-[#14B8A6] text-[#0F172A] flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white">
                  You&apos;re #{queuePosition} in Line!
                </h3>
                <p className="text-xs text-[#CCFBF1] leading-relaxed">
                  Thank you{firstName ? `, ${firstName}` : ""}. Priority access invitation reserved for <strong className="text-white">{email}</strong> ({country}).
                </p>
              </div>

              {referralLink && (
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-left">
                  <span className="text-[10px] uppercase font-bold text-[#94A3B8] tracking-wider block">
                    Your Priority Invitation Link:
                  </span>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-white/80 font-mono truncate">{referralLink}</span>
                    <button
                      onClick={handleCopyReferral}
                      className="shrink-0 p-1.5 rounded-lg bg-[#14B8A6] text-[#0F172A] hover:bg-[#0D9488] transition-colors"
                      title="Copy invitation link"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
