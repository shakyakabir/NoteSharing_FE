"use client";
import React from "react";
import { useGetPointBalanceQuery } from "@/slices/Reward";

export default function BalanceBanner() {
  const { data } = useGetPointBalanceQuery();
  const points = data?.pointBalance ?? 2450;

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-sm">
      <div className="space-y-1">
        <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">
          Your Current Balance
        </p>
        <div className="flex items-baseline space-x-2">
          <span className="text-4xl font-black text-[#D97706]">
            {points.toLocaleString()}
          </span>
          <span className="text-base font-bold text-indigo-600">Points</span>
        </div>
        <p className="text-slate-400 text-xs">
          Keep studying to earn more rewards and level up your status.
        </p>
      </div>

      <div>
        <button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition shadow-md shadow-indigo-600/10">
          Earn More
        </button>
      </div>
    </div>
  );
}
