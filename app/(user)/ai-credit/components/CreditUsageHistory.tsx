"use client";
import React from "react";
import { History } from "lucide-react";
import { useSubscription } from "@/hooks/subscription/useSubscription";

export default function CreditUsageHistory() {
  const { usage } = useSubscription();

  // Helper function to render type badges dynamically
  const renderTypeBadge = (type: string) => {
    const formatted = type.toLowerCase();
    switch (formatted) {
      case "consume":
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/60">
            Consume
          </span>
        );
      case "refresh":
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200/60">
            Refresh
          </span>
        );
      case "refund":
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
            Refund
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">
            {type}
          </span>
        );
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xs border border-indigo-100/60 rounded-2xl shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-5 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-2">
          <History size={18} className="text-slate-700" />
          <h2 className="text-sm font-bold text-slate-800">
            Credit Usage History
          </h2>
        </div>
        <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
          View All
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-medium text-slate-400">
              <th className="py-3.5 px-6">Description</th>
              <th className="py-3.5 px-6">Date</th>
              <th className="py-3.5 px-6">Type</th>
              <th className="py-3.5 px-6 text-right">Credits</th>
              <th className="py-3.5 px-6 text-right">Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/60 text-xs text-slate-700 font-medium">
            {!usage || usage.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-8 px-6 text-center text-slate-400"
                >
                  No AI credit activity yet.
                </td>
              </tr>
            ) : (
              usage.map((tx) => (
                <tr
                  key={tx.id}
                  className="hover:bg-slate-50/60 transition-colors"
                >
                  <td className="py-4 px-6 font-semibold text-slate-800">
                    {tx.description}
                  </td>
                  <td className="py-4 px-6 text-slate-500">
                    {new Date(tx.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-4 px-6">{renderTypeBadge(tx.type)}</td>
                  <td
                    className={`py-4 px-6 text-right font-bold ${
                      tx.amount > 0 ? "text-emerald-600" : "text-slate-800"
                    }`}
                  >
                    {tx.amount > 0 ? `+${tx.amount}` : tx.amount}
                  </td>
                  <td className="py-4 px-6 text-right text-slate-500 font-semibold">
                    {tx.balanceAfter}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
