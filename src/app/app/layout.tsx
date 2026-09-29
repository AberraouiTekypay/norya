import React from "react";
import { HealthProvider } from "@/context/HealthContext";

export const metadata = {
  title: "Norya — Personal Health Operating System",
  description: "Your health. One place. One plan. An EM300.co Company.",
};

export default function AppLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HealthProvider>{children}</HealthProvider>;
}
