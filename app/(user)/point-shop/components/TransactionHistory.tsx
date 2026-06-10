"use client";
import React from "react";
import { ChevronDown, ArrowUpRight, ArrowDownLeft } from "lucide-react";

interface Transaction {
  id: number;
  description: string;
  date: string;
  status: "EARNED" | "REDEEMED";
  amount: number;
}

export default function TransactionHistory() {
  const transactions: Transaction[] = [
    {
      id: 1,
      description: "Quiz: Anatomy 101 Mastery",
      date: "Oct 24, 2023",
      status: "EARNED",
      amount: 150,
    },
    {
      id: 2,
      description: "Unlock 1hr AI access",
      date: "Oct 22, 2023",
      status: "REDEEMED",
      amount: -200,
    },
    {
      id: 3,
      description: "Daily Login Streak (5 Days)",
      date: "Oct 21, 2023",
      status: "EARNED",
      amount: 50,
    },
    {
      id: 4,
      description: "Note Contribution: World History",
      date: "Oct 19, 2023",
      status: "EARNED",
      amount: 300,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-extrabold text-slate-800 tracking-tight">
          Transaction History
        </h2>
        <button className="inline-flex items-center space-x-1.5 border border-slate-200 bg-white px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition">
          <span>All Time</span>
          <ChevronDown size={14} />
        </button>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-4 px-6">Description</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs font-medium text-slate-700">
              {transactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-4 px-6 flex items-center space-x-3">
                    <div
                      className={`p-1.5 rounded-lg shrink-0 ${
                        tx.status === "EARNED"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {tx.status === "EARNED" ? (
                        <ArrowUpRight size={14} />
                      ) : (
                        <ArrowDownLeft size={14} />
                      )}
                    </div>
                    <span className="font-semibold text-slate-800">
                      {tx.description}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-400">{tx.date}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-block text-[9px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-md ${
                        tx.status === "EARNED"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                          : "bg-slate-100 text-slate-500 border border-slate-200"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td
                    className={`py-4 px-6 text-right font-bold text-sm ${
                      tx.status === "EARNED"
                        ? "text-emerald-600"
                        : "text-slate-800"
                    }`}
                  >
                    {tx.amount > 0 ? `+${tx.amount}` : tx.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-50 p-4 text-center">
          <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition">
            Load More Transactions
          </button>
        </div>
      </div>
    </div>
  );
}
