"use client";
import React from "react";
import HeroSection from "./components/HeroSection";
import AnalyticsSection from "./components/AnalyticsSection";
import TailoredAssessments from "./components/TailoredAssessments";
import UpgradeSection from "./components/UpgradeSection";

export default function LearningDashboard() {
  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-10 max-w-6xl mx-auto space-y-10">
      <HeroSection />
      <AnalyticsSection />
      <TailoredAssessments />
      <UpgradeSection />
    </div>
  );
}
