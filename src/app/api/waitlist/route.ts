import { NextResponse } from "next/server";

interface WaitlistEntry {
  email: string;
  name?: string;
  country?: string;
  goals?: string[];
  createdAt: string;
}

// In-memory registry for edge runtime / serverless instance
const waitlistSubmissions: WaitlistEntry[] = [
  { email: "ana.garcia@madrid.es", name: "Ana G.", country: "Spain", createdAt: "2026-09-28T14:20:00Z" },
  { email: "youssef.b@casablanca.ma", name: "Youssef B.", country: "Morocco", createdAt: "2026-09-28T16:10:00Z" },
  { email: "carlos.m@barcelona.es", name: "Carlos M.", country: "Spain", createdAt: "2026-09-28T18:45:00Z" },
];

const BASE_WAITLIST_NUMBER = 842;

export async function GET() {
  return NextResponse.json({
    totalSignups: BASE_WAITLIST_NUMBER + waitlistSubmissions.length,
    activePhase: "Phase 1: Spain & Morocco Priority Access",
    nextPhase: "France, Portugal, UAE",
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, country = "Spain", goals = [] } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check duplicate
    const existing = waitlistSubmissions.find((e) => e.email === cleanEmail);
    if (!existing) {
      waitlistSubmissions.push({
        email: cleanEmail,
        name: name?.trim() || "Health Pioneer",
        country,
        goals,
        createdAt: new Date().toISOString(),
      });
    }

    const queuePosition = BASE_WAITLIST_NUMBER + waitlistSubmissions.length;

    return NextResponse.json({
      success: true,
      message: `Welcome to Norya Early Access! You are #${queuePosition} in line.`,
      queuePosition,
      country,
      referralLink: `https://getnorya.com?ref=${encodeURIComponent(cleanEmail.split("@")[0])}`,
      phase: country === "Spain" || country === "Morocco" ? "Phase 1 Priority" : "Global Rollout",
    });
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json(
      { error: "An error occurred while reserving your priority access." },
      { status: 500 }
    );
  }
}
