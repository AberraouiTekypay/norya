"use client";

import React, { useState } from "react";
import { useHealth } from "@/context/HealthContext";
import {
  Watch,
  Scale,
  Activity,
  Heart,
  RotateCw,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Battery,
  Plus,
  Unplug,
  Sparkles,
} from "lucide-react";

export const DevicesView: React.FC = () => {
  const {
    connectedDevices,
    connectDevice,
    disconnectDevice,
    syncDevice,
    syncAllDevices,
    isSyncingAll,
  } = useHealth();

  const [activeSyncId, setActiveSyncId] = useState<string | null>(null);

  const handleSync = async (id: string) => {
    setActiveSyncId(id);
    await syncDevice(id);
    setActiveSyncId(null);
  };

  const getDeviceIcon = (category: string) => {
    switch (category) {
      case "watch":
        return <Watch className="w-5 h-5 text-[#14B8A6]" />;
      case "scale":
        return <Scale className="w-5 h-5 text-[#0F766E]" />;
      case "ring":
        return <Activity className="w-5 h-5 text-[#38BDF8]" />;
      case "bp_cuff":
        return <Heart className="w-5 h-5 text-[#F97360]" />;
      default:
        return <Activity className="w-5 h-5 text-[#64748B]" />;
    }
  };

  const connectedCount = connectedDevices.filter((d) => d.status === "connected").length;

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#0F172A]/8">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
            Hardware Telemetry Hub
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
            Connected Devices & Wearables
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Continuous physiological feeds consolidated into your unified Norya health record.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs text-[#64748B] hidden sm:block">
            <span className="font-bold text-[#0F172A]">{connectedCount} of {connectedDevices.length}</span> active feeds
          </div>
          <button
            onClick={syncAllDevices}
            disabled={isSyncingAll}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F172A] text-white text-xs font-semibold hover:bg-[#1E293B] transition-all shadow-xs disabled:opacity-50"
          >
            <RotateCw className={`w-3.5 h-3.5 text-[#14B8A6] ${isSyncingAll ? "animate-spin" : ""}`} />
            <span>{isSyncingAll ? "Syncing All Feeds..." : "Sync All Sources"}</span>
          </button>
        </div>
      </div>

      {/* Grid of Devices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {connectedDevices.map((device) => {
          const isConnected = device.status === "connected";
          const isSyncing = device.status === "syncing" || activeSyncId === device.id;

          return (
            <div
              key={device.id}
              className={`p-5 rounded-2xl border transition-all space-y-4 ${
                isConnected
                  ? "bg-white border-[#0F172A]/10 shadow-card"
                  : "bg-[#FAFAF8] border-[#0F172A]/5 opacity-80"
              }`}
            >
              {/* Device Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAFAF8] border border-[#0F172A]/5 flex items-center justify-center shrink-0">
                    {getDeviceIcon(device.category)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#0F172A] leading-tight">
                      {device.name}
                    </h3>
                    <div className="flex items-center gap-2 text-[11px] text-[#64748B] mt-0.5">
                      <span className="font-mono">{device.brand}</span>
                      <span>•</span>
                      <span className="capitalize">{device.category.replace("_", " ")}</span>
                      {device.batteryPercent !== undefined && isConnected && (
                        <>
                          <span>•</span>
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#0F766E]">
                            <Battery className="w-3 h-3" /> {device.batteryPercent}%
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-bold shrink-0 ${
                    isSyncing
                      ? "bg-[#CCFBF1] text-[#0F766E] animate-pulse"
                      : isConnected
                      ? "bg-[#16A34A]/10 text-[#16A34A]"
                      : "bg-[#64748B]/10 text-[#64748B]"
                  }`}
                >
                  {isSyncing ? "Syncing..." : isConnected ? "Active" : "Disconnected"}
                </span>
              </div>

              {/* Metrics Ingested */}
              <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#0F172A]/5 space-y-1.5">
                <div className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider">
                  Ingested Metrics
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {device.metricsProvided.map((metric, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white border border-[#0F172A]/5 text-[#0F172A]"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status and Action Row */}
              <div className="flex items-center justify-between pt-1 border-t border-[#0F172A]/5 text-xs">
                <span className="text-[11px] text-[#64748B] font-mono">
                  Last sync: {device.lastSync}
                </span>

                <div className="flex items-center gap-2">
                  {isConnected ? (
                    <>
                      <button
                        onClick={() => handleSync(device.id)}
                        disabled={isSyncing}
                        className="p-1.5 rounded-lg text-[#0F766E] hover:bg-[#CCFBF1] transition-colors"
                        title="Sync now"
                      >
                        <RotateCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin" : ""}`} />
                      </button>
                      <button
                        onClick={() => disconnectDevice(device.id)}
                        className="text-[11px] font-semibold text-[#DC2626] hover:bg-[#F97360]/10 px-2.5 py-1 rounded-lg transition-colors"
                      >
                        Disconnect
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => connectDevice(device.id)}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-white bg-[#0F172A] hover:bg-[#1E293B] px-3 py-1 rounded-lg transition-all"
                    >
                      <Plus className="w-3 h-3" /> Connect
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Scientific Clarification on Hardware Priorities */}
      <div className="p-6 rounded-3xl bg-[#0F172A] text-white space-y-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#14B8A6]" />
          <h3 className="text-sm font-bold tracking-tight">
            Norya Scientific Hardware Philosophy: What We Prioritize vs What We Filter
          </h3>
        </div>
        <p className="text-xs text-white/70 leading-relaxed">
          Norya integrates standard consumer hardware (Apple Watch, Oura, Withings) because they capture long-term baseline trends (RHR, sleep consistency, step volume) with zero friction. We deliberately do <strong>not</strong> require invasive continuous glucose monitors (CGMs) or complex multi-thousand euro kits for non-diabetic users. Our clinical trials indicate that simple blood pressure tracking and daily walking yield over 85% of actionable cardiovascular risk reduction.
        </p>
      </div>

    </div>
  );
};
