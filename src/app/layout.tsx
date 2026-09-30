import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Norya — Your Health. One Place. One Plan.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Norya",
  },
  description:
    "Bring your health data, wearables, blood tests and habits together. Norya helps you understand what matters and build a practical, science-backed plan. An EM300.co Company.",
  keywords: [
    "personal health OS",
    "health data",
    "AI health coach",
    "blood test interpretation",
    "ApoB",
    "blood pressure protocol",
    "longevity",
    "preventive health",
  ],
  authors: [{ name: "Norya (An EM300.co Company)", url: "https://em300.co" }],
  metadataBase: new URL("https://getnorya.com"),
  openGraph: {
    title: "Norya — Your Health. One Place. One Plan.",
    description:
      "A science-first personal health operating system designed for ordinary people. Health first. Longevity follows.",
    url: "https://getnorya.com",
    siteName: "Norya",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Norya — Your Health. One Place. One Plan.",
    description:
      "A science-first personal health operating system. Connect your phone, wearables, and blood tests.",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FAFAF8] text-[#0F172A]`}
      >
        {children}
      </body>
    </html>
  );
}
