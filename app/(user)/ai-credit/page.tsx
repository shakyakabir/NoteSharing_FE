"use client";
import React from "react";
import { ShoppingCart } from "lucide-react";
import PlanOverview from "./components/PlanOverview";

import CreditUsageHistory from "./components/CreditUsageHistory";

export default function SubscriptionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/40 via-purple-50/20 to-slate-50 w-full space-y-6 p-6 sm:p-8 relative pb-16">
      {/* Top Bar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            AI Credits
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Manage your AI credits for premium tools and generations.
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto">
          <ShoppingCart size={14} />
          <span>Buy More Credits</span>
        </button>
      </div>

      <PlanOverview />
      <CreditUsageHistory />
    </div>
  );
}
