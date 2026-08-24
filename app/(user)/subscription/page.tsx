"use client";
import React from "react";
import PlanOverview from "./components/PlanOverview";
import PremiumUpgradeCard from "./components/PremiumUpgradeCard";
import CreditUsageHistory from "./components/CreditUsageHistory";

export default function SubscriptionPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFD] w-full space-y-8 relative pb-16">
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Subscription & AI Credits
        </h1>
        <p className="text-slate-400 text-xs max-w-2xl leading-relaxed">
          Track your AI credit balance, see when it refreshes, and unlock
          Premium with the points you have earned.
        </p>
      </div>

      <PlanOverview />
      <PremiumUpgradeCard />
      <CreditUsageHistory />
    </div>
  );
}
