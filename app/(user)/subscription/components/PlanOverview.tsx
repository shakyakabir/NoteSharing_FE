"use client";
import React from "react";
import { Sparkles } from "lucide-react";
import { useSubscription } from "@/hooks/subscription/useSubscription";

/**
 * Current plan + AI credit balance + refresh schedule. All values are server-computed (read-only);
 * this component never mutates the balance.
 */
export default function PlanOverview() {
  const { subscription } = useSubscription();

  const plan = subscription?.plan ?? "FREE";
  const current = subscription?.currentCredits ?? 0;
  const max = subscription?.maxCredits ?? 0;
  const refreshDays = subscription?.refreshDays ?? 0;
  const nextRefresh = subscription?.nextRefresh
    ? new Date(subscription.nextRefresh).toLocaleDateString()
    : "-";
  const pct = max > 0 ? Math.round((current / max) * 100) : 0;
  const isPremium = plan === "PREMIUM";

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-5">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">
            Current Plan
          </p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-slate-800">{plan}</span>
            <span
              className={`text-[9px] font-extrabold tracking-widest uppercase px-2 py-0.5 rounded-full border ${
                isPremium
                  ? "bg-indigo-50 border-indigo-100 text-indigo-600"
                  : "bg-slate-100 border-slate-200 text-slate-500"
              }`}
            >
              {subscription?.status ?? "ACTIVE"}
            </span>
          </div>
        </div>
        <div className="p-2 rounded-xl bg-amber-50 border border-amber-100">
          <Sparkles size={18} className="text-amber-600" />
        </div>
      </div>

      {/* Credit balance + progress */}
      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <span className="text-sm font-semibold text-slate-600">
            AI Credits
          </span>
          <span className="text-sm font-black text-slate-800">
            {current}{" "}
            <span className="text-slate-400 font-medium">/ {max}</span>
          </span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-amber-500 h-2 rounded-full transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Refresh info */}
      <div className="grid grid-cols-2 gap-4 pt-2">
        <div className="bg-slate-50/70 rounded-xl p-3">
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
            Refresh Cadence
          </p>
          <p className="text-sm font-bold text-slate-700 mt-0.5">
            Every {refreshDays} days
          </p>
        </div>
        <div className="bg-slate-50/70 rounded-xl p-3">
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
            Next Refresh
          </p>
          <p className="text-sm font-bold text-slate-700 mt-0.5">
            {nextRefresh}
          </p>
        </div>
      </div>
    </div>
  );
}
