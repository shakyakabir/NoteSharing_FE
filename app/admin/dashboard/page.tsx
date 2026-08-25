"use client";
import { Users, Box, Banknote } from "lucide-react";
import { StatCard } from "../components/stats/StatCard";
import { AnalyticsOverview } from "../components/stats/AnalyticsOverview";

export default function DashboardPage() {
  return (
    <div className="flex-1 flex flex-col">
      <main className="p-8 space-y-8 max-w-7xl">
        <h1 className="text-2xl font-bold text-slate-800">
          Dashboard Overview
        </h1>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Users"
            value="124.5k"
            trend="+12%"
            icon={Users}
            iconColor="text-indigo-600"
            bgColor="bg-indigo-50"
          />
          <StatCard
            title="AI Credits Used"
            value="452M"
            trend="+24%"
            icon={Box}
            iconColor="text-indigo-600"
            bgColor="bg-indigo-50"
          />
          <StatCard
            title="Total Revenue"
            value="$84,250"
            trend="+8%"
            icon={Banknote}
            iconColor="text-indigo-600"
            bgColor="bg-indigo-50"
          />
        </div>

        {/* Analytics Components */}
        <AnalyticsOverview />
      </main>
    </div>
  );
}
