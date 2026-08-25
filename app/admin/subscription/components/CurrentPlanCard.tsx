"use client";

import React from "react";

interface Props {
  currentPlanName: string;
  price: string;
  nextBillingDate: string;
  usedCredits: number;
  totalCredits: number;
  resetDays: number;
  onUpgrade: () => void;
  onCancel: () => void;
}

export const CurrentPlanCard: React.FC<Props> = ({
  currentPlanName,
  price,
  nextBillingDate,
  usedCredits,
  totalCredits,
  resetDays,
  onUpgrade,
  onCancel,
}) => {
  const percentage = Math.min(100, (usedCredits / totalCredits) * 100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Current Plan Overview */}
      <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-gray-900">
                {currentPlanName}
              </h2>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-100">
                CURRENT PLAN
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              You are currently on the {currentPlanName} tier. Billed monthly.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-2">
            <button
              onClick={onUpgrade}
              className="px-5 py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-lg text-xs font-semibold shadow-sm transition"
            >
              Upgrade Plan
            </button>
            <button
              onClick={onCancel}
              className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold transition"
            >
              Cancel Subscription
            </button>
          </div>
        </div>

        <div className="flex items-center gap-12 mt-6 pt-4 border-t border-gray-50">
          <div>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
              PRICE
            </span>
            <span className="text-sm font-bold text-gray-900">{price}</span>
          </div>
          <div>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
              NEXT BILLING
            </span>
            <span className="text-sm font-bold text-gray-900">
              {nextBillingDate}
            </span>
          </div>
        </div>
      </div>

      {/* Credit Usage */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-gray-900">Credit Usage</h3>
          <p className="text-xs text-gray-400 mt-0.5">AI Generation Credits</p>

          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-[#4F46E5]">
              {usedCredits}
            </span>
            <span className="text-xs text-gray-400 font-medium">
              / {totalCredits} used
            </span>
          </div>

          <div className="w-full bg-gray-100 h-2.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-[#4F46E5] h-full rounded-full transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <div className="mt-4 bg-[#FFFBEB] border border-[#FDE68A] rounded-lg p-2.5 flex items-center gap-2 text-[11px] text-[#B45309] font-medium">
          <svg
            className="w-4 h-4 shrink-0 stroke-[2]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h45-3 3"
            />
          </svg>
          <span>Next Reset in {resetDays} days</span>
        </div>
      </div>
    </div>
  );
};
