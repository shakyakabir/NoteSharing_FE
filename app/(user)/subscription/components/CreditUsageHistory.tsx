"use client";
import React from "react";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { useSubscription } from "@/hooks/subscription/useSubscription";

/**
 * Read-only view of the current user's AI credit ledger (consume / refund / refresh / grant),
 * mirroring the point-shop TransactionHistory table.
 */
export default function CreditUsageHistory() {
  const { usage } = useSubscription();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-extrabold text-slate-800 tracking-tight">
          Credit Usage History
        </h2>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-4 px-6">Description</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Type</th>
                <th className="py-4 px-6 text-right">Credits</th>
                <th className="py-4 px-6 text-right">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs font-medium text-slate-700">
              {usage.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-8 px-6 text-center text-slate-400"
                  >
                    No AI credit activity yet.
                  </td>
                </tr>
              ) : (
                usage.map((tx) => {
                  const isDebit = tx.amount < 0;
                  return (
                    <tr
                      key={tx.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="py-4 px-6 flex items-center space-x-3">
                        <div
                          className={`p-1.5 rounded-lg shrink-0 ${
                            isDebit
                              ? "bg-slate-100 text-slate-500"
                              : "bg-emerald-50 text-emerald-600"
                          }`}
                        >
                          {isDebit ? (
                            <ArrowDownLeft size={14} />
                          ) : (
                            <ArrowUpRight size={14} />
                          )}
                        </div>
                        <span className="font-semibold text-slate-800">
                          {tx.description}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-400">
                        {new Date(tx.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-block text-[9px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 border border-slate-200">
                          {tx.type}
                        </span>
                      </td>
                      <td
                        className={`py-4 px-6 text-right font-bold text-sm ${
                          isDebit ? "text-slate-800" : "text-emerald-600"
                        }`}
                      >
                        {tx.amount > 0 ? `+${tx.amount}` : tx.amount}
                      </td>
                      <td className="py-4 px-6 text-right text-slate-400">
                        {tx.balanceAfter}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
