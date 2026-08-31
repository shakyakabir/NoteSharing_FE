"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PaymentHistoryTable } from "../subscription/components/PaymentHistoryTable";
import type { PaymentHistoryItem as PaymentRow } from "../subscription/type/subscription";
import { useGetPaymentsQuery } from "@/slices/Admin";

const PAGE_SIZE = 10;

// ISO date -> "Sep 24, 2026"; null/blank -> "—" (mirrors the subscription page's formatter).
const fmtDate = (iso?: string | null) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? "—"
    : d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
};

// Backend PaymentStatus -> the table's PAID | PENDING | FAILED display status.
const toStatus = (status: string): PaymentRow["status"] =>
  status === "COMPLETED" ? "PAID" : status === "FAILED" ? "FAILED" : "PENDING";

export default function PaymentHistoryPage() {
  const [page, setPage] = useState(0);
  const { data } = useGetPaymentsQuery({ page, size: PAGE_SIZE });

  const totalPages = data?.totalPages ?? 0;
  const totalElements = data?.totalElements ?? 0;

  // eSewa payment rows (all statuses, newest first) mapped into the shared table's shape.
  const history: PaymentRow[] = (data?.content ?? []).map((p) => ({
    id: p.id,
    date: fmtDate(p.createdAt ?? p.completedAt),
    invoiceId: p.transactionUuid,
    amount: `$${p.amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
    plan: p.planName ?? p.paymentMethod,
    status: toStatus(p.status),
  }));

  return (
    <div className="min-h-screen bg-[#F8F9FD] p-8 text-gray-800 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1E1B4B]">Payment History</h1>
          <p className="text-sm text-gray-500 mt-1">
            eSewa subscription payments across all statuses, newest first.
          </p>
        </div>

        <PaymentHistoryTable history={history} />

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            Page {totalPages === 0 ? 0 : page + 1} of {totalPages} ·{" "}
            {totalElements} payments
          </div>
          <div className="flex items-center gap-1 font-medium">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page <= 0}
              className="p-1 hover:bg-gray-100 rounded text-gray-400 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="w-7 h-7 bg-indigo-600 text-white rounded font-semibold flex items-center justify-center">
              {page + 1}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= totalPages - 1}
              className="p-1 hover:bg-gray-100 rounded text-gray-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
