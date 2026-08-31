"use client";

import React from "react";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { PaymentHistoryItem } from "../type/subscription";

interface Props {
  history: PaymentHistoryItem[];
}

export const PaymentHistoryTable: React.FC<Props> = ({ history }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-50">
        <h2 className="text-lg font-bold text-gray-900">Payment History</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F8F7FD] text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
              <th className="py-3.5 px-6">DATE</th>
              <th className="py-3.5 px-6">INVOICE ID</th>
              <th className="py-3.5 px-6">AMOUNT</th>
              <th className="py-3.5 px-6">PLAN</th>
              <th className="py-3.5 px-6">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs">
            {history.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition">
                <td className="py-4 px-6 text-gray-600 font-medium">
                  {item.date}
                </td>
                <td className="py-4 px-6 text-gray-400 font-mono">
                  {item.invoiceId}
                </td>
                <td className="py-4 px-6 font-semibold text-gray-800">
                  {item.amount}
                </td>
                <td className="py-4 px-6 text-gray-600">{item.plan}</td>
                <td className="py-4 px-6">
                  {item.status === "PAID" && (
                    <span className="inline-flex items-center gap-1 font-bold text-[11px] text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      PAID
                    </span>
                  )}
                  {item.status === "PENDING" && (
                    <span className="inline-flex items-center gap-1 font-bold text-[11px] text-amber-600">
                      <Clock className="w-3.5 h-3.5" />
                      PENDING
                    </span>
                  )}
                  {item.status === "FAILED" && (
                    <span className="inline-flex items-center gap-1 font-bold text-[11px] text-rose-600">
                      <XCircle className="w-3.5 h-3.5" />
                      FAILED
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
