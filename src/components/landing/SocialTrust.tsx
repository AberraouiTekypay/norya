import React from "react";
import { Smartphone, Watch, FileText, Activity, Heart, Scale } from "lucide-react";

export const SocialTrust: React.FC = () => {
  const sources = [
    { label: "Smartphones", icon: Smartphone, detail: "Apple & Google Health" },
    { label: "Smartwatches", icon: Watch, detail: "Garmin, Oura, Whoop, Apple" },
    { label: "Blood Tests", icon: FileText, detail: "PDFs, clinic photos & labs" },
    { label: "Medical Reports", icon: Activity, detail: "Doctor summaries & visits" },
    { label: "Lifestyle & Sleep", icon: Heart, detail: "Daily habits & rest rhythm" },
    { label: "Body Metrics", icon: Scale, detail: "Weight, waist, resting HR, BP" },
  ];

  return (
    <section className="py-16 border-y border-[#0F172A]/5 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-[#0F172A] mb-3">
          Your health data is everywhere. Your understanding shouldn&apos;t be.
        </h3>
        <p className="text-sm text-[#64748B] max-w-xl mx-auto mb-10">
          Norya unifies disconnected numbers from your daily life into one coherent, science-backed picture.
        </p>

        {/* Source Badges Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 max-w-5xl mx-auto">
          {sources.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#0F172A]/5 flex flex-col items-center justify-center text-center hover:border-[#14B8A6]/40 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-[#0F172A]/5 flex items-center justify-center text-[#14B8A6] mb-2.5 shadow-2xs group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-[#0F172A] mb-0.5">
                  {item.label}
                </span>
                <span className="text-[11px] text-[#64748B]">
                  {item.detail}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-xs font-semibold tracking-wider uppercase text-[#14B8A6]">
          Norya brings it all together into 3 clear priorities
        </div>
      </div>
    </section>
  );
};
