"use client";
import React from "react";
import BalanceBanner from "./components/BalanceBanner";
import RewardsGrid from "./components/RewardsGrid";
import TransactionHistory from "./components/TransactionHistory";

export default function RewardsDashboard() {
  return (
    <div className="min-h-screen bg-[#F9FAFD] w-full  space-y-8 relative pb-24">
      {/* Balance Top Header */}
      <BalanceBanner />

      {/* Available Rewards Grid */}
      <RewardsGrid />

      {/* Transaction Ledger Table */}
      <TransactionHistory />

      {/* Next Reward Floating Indicator Badge */}
      <div className="fixed bottom-6 right-6 bg-white border border-slate-100 shadow-xl rounded-2xl p-3 flex items-center space-x-3 z-50 animate-fade-in max-w-xs">
        <div className="w-10 h-10 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-amber-500/20 relative flex items-center justify-center">
          <span className="text-lg">🥇</span>
        </div>
        <div className="min-w-0 pr-2">
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
            Next Reward
          </p>
          <p className="text-xs font-extrabold text-slate-800 truncate">
            Gold Tier Status
          </p>
          <div className="w-24 bg-slate-100 h-1 rounded-full mt-1.5 overflow-hidden">
            <div className="bg-indigo-600 h-full w-[75%]" />
          </div>
        </div>
      </div>
    </div>
  );
}
