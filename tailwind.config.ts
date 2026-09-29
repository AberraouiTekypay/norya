import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        midnight: {
          DEFAULT: "#0F172A",
          50: "#1E293B",
          100: "#0F172A",
          900: "#020617",
        },
        norya: {
          teal: "#14B8A6",
          "teal-hover": "#0D9488",
          "teal-dark": "#0F766E",
          seaglass: "#CCFBF1",
          canvas: "#FAFAF8",
          cloud: "#F1F5F9",
          slate: "#64748B",
          positive: "#16A34A",
          gold: "#F5C76A",
          coral: "#F97360",
          sky: "#38BDF8",
          lavender: "#E9D5FF",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(15, 23, 42, 0.05), 0 4px 6px -4px rgba(15, 23, 42, 0.03)",
        card: "0 4px 20px -2px rgba(15, 23, 42, 0.06), 0 2px 8px -2px rgba(15, 23, 42, 0.04)",
        float: "0 12px 36px -4px rgba(15, 23, 42, 0.09), 0 4px 12px -2px rgba(15, 23, 42, 0.04)",
        glow: "0 0 40px -10px rgba(20, 184, 166, 0.25)",
      },
    },
  },
  plugins: [],
} satisfies Config;
