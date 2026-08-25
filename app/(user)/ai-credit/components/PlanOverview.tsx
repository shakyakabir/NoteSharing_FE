"use client";
import React from "react";
import { Info, RotateCw } from "lucide-react";
import { useSubscription } from "@/hooks/subscription/useSubscription";

export default function PlanOverview() {
  const { subscription } = useSubscription();

  const current = subscription?.currentCredits ?? 19;
  const max = subscription?.maxCredits ?? 20;
  const refreshDays = subscription?.refreshDays ?? 21;

  const nextRefreshFormatted = subscription?.nextRefresh
    ? new Date(subscription.nextRefresh).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Nov 15, 2023";

  const pct = max > 0 ? Math.min(Math.round((current / max) * 100), 100) : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Current Balance Card */}
      <div className="lg:col-span-2 bg-white/80 backdrop-blur-xs border border-indigo-100/60 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm">
            <div className="p-1 bg-indigo-50 rounded-lg">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <span>Current Balance</span>
          </div>

          <div className="mt-4 flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-slate-900">
              {current}
            </span>
            <span className="text-sm font-medium text-slate-400">
              / {max} credits available
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 space-y-1.5">
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] font-semibold text-slate-400">
              <span>0</span>
              <span>{max}</span>
            </div>
          </div>
        </div>

        {/* Warning Callout Notice */}
        <div className="bg-indigo-50/60 border border-indigo-100/80 rounded-xl p-3.5 flex items-start gap-3 text-xs">
          <Info size={16} className="text-indigo-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-semibold text-slate-800">
              {current <= 3
                ? "Almost out of credits!"
                : "Credit Balance Active"}
            </p>
            <p className="text-slate-500">
              You have {current} credit{current === 1 ? "" : "s"} remaining for
              this billing cycle.
            </p>
          </div>
        </div>
      </div>

      {/* Next Refresh Card */}
      <div className="bg-white/80 backdrop-blur-xs border border-indigo-100/60 rounded-2xl p-6 shadow-xs flex flex-col items-center justify-center text-center space-y-3">
        <div className="p-3 bg-indigo-50/80 text-indigo-600 rounded-full">
          <RotateCw size={22} />
        </div>

        <div>
          <h3 className="text-xs font-semibold text-slate-600">Next Refresh</h3>
          <p className="text-3xl font-black text-slate-900 mt-1">
            {refreshDays} Days
          </p>
        </div>

        <p className="text-xs text-slate-500 max-w-[200px] leading-relaxed">
          Your credits will automatically reset to{" "}
          <span className="font-bold text-slate-700">{max}</span> on{" "}
          <span className="font-bold text-slate-700">
            {nextRefreshFormatted}
          </span>
          .
        </p>
      </div>
    </div>
  );
}
