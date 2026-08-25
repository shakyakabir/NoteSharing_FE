"use client";
import React from "react";

import { FileText, Eye, DollarSign, Cpu } from "lucide-react";
import StatCard from "../components/Card/StatCard";
import SmartActions from "./components/SmartActions";
import RecentNotes from "./components/RecentNotes";
import QuizPointsCard from "./components/QuizPointsCard";
import TopContributors from "./components/TopContributors";
import EarningsGrowth from "./components/EarningsGrowth";
import { useGetNotesQuery } from "@/slices/Note";
import { useGetPointBalanceQuery } from "@/slices/Reward";
import { useAiCredits } from "@/hooks/ai/useAiCredits";

export default function Dashboard() {
  const { data: notes = [], isLoading } = useGetNotesQuery();
  const { data: balance, isLoading: isBalanceLoading } =
    useGetPointBalanceQuery();
  const { credits } = useAiCredits();
  console.log(balance, "balance");
  const totalNotes = notes.length;
  return (
    <div className="min-h-screen bg-[#fcfcfd] p-6 text-slate-800 font-sans">
      {/* Top Row: Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={<FileText className="w-5 h-5 text-amber-600" />}
          iconBg="bg-amber-50"
          title="Total Notes"
          value={totalNotes.toString()}
          badge="+12% vs last week"
          badgeColor="text-emerald-600"
        />
        <StatCard
          icon={<Eye className="w-5 h-5 text-sky-600" />}
          iconBg="bg-sky-50"
          title="Quizz"
          value={balance?.pointBalance.toString() || "0"}
          badge="+5.4k"
          badgeColor="text-sky-600"
        />
        <StatCard
          icon={<DollarSign className="w-5 h-5 text-amber-700" />}
          iconBg="bg-amber-100"
          title="Learning Streak"
          value={balance?.streakDays.toString() || "0"}
          badge="Active Rewards"
          badgeColor="text-slate-500 font-normal"
        />
        <StatCard
          icon={<Cpu className="w-5 h-5 text-amber-800" />}
          iconBg="bg-amber-100"
          title="AI Credits"
          value={credits ? `${credits.currentCredits}/${credits.maxCredits}` : "0"}
          badge={credits ? `Refreshes in ${credits.daysUntilRefresh}d` : ""}
          badgeColor="text-slate-500 font-normal"
          progressBar={
            credits
              ? { current: credits.currentCredits, total: credits.maxCredits }
              : undefined
          }
        />
      </div>
      <div className="max-w-7xl mt-5 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT & CENTER COLUMNS */}
        <div className="lg:col-span-2 space-y-6">
          {/* Middle Row: Smart Actions */}
          <SmartActions />

          {/* Bottom Row: Recent Notes */}
          <RecentNotes notes={notes} />
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          <QuizPointsCard />
          {/* <TopContributors /> */}
          <EarningsGrowth />
        </div>
      </div>
    </div>
  );
}
