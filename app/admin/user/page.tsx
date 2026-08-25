"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Download,
  UserPlus,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Star,
  Building2,
  X,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";
import {
  useGetUsersQuery,
  useSetUserStatusMutation,
  useAdjustUserCreditsMutation,
  useChangeUserPlanMutation,
  useGetPlansQuery,
  type UserAdmin,
} from "@/slices/Admin";

const errMsg = (err: unknown, fallback: string) =>
  (err as { data?: { message?: string } })?.data?.message || fallback;

const initialsOf = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

const fmtDate = (iso: string) => {
  const d = new Date(iso);
  return isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });
};

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [accountType, setAccountType] = useState("All Types");
  const [status, setStatus] = useState("All Statuses");
  const [page, setPage] = useState(0);
  const size = 10;

  // Row action menu + modal state
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [creditUser, setCreditUser] = useState<UserAdmin | null>(null);
  const [creditAmount, setCreditAmount] = useState("");
  const [creditReason, setCreditReason] = useState("");
  const [planUser, setPlanUser] = useState<UserAdmin | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState("");

  // Debounce the search box so we don't fire a request per keystroke.
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm), 400);
    return () => clearTimeout(t);
  }, [searchTerm]);

  // Any filter change resets to the first page.
  useEffect(() => {
    setPage(0);
  }, [debouncedSearch, accountType, status]);

  const { data, isLoading, isError } = useGetUsersQuery({
    search: debouncedSearch || undefined,
    accountType: accountType === "All Types" ? undefined : accountType,
    status: status === "All Statuses" ? undefined : status,
    page,
    size,
  });

  const { data: plans } = useGetPlansQuery();
  const [setUserStatus] = useSetUserStatusMutation();
  const [adjustCredits] = useAdjustUserCreditsMutation();
  const [changeUserPlan] = useChangeUserPlanMutation();

  const users = data?.content ?? [];
  const totalElements = data?.totalElements ?? 0;
  const totalPages = data?.totalPages ?? 0;

  const clearFilters = () => {
    setSearchTerm("");
    setAccountType("All Types");
    setStatus("All Statuses");
  };

  const handleToggleStatus = async (u: UserAdmin) => {
    const next = u.status === "Active" ? "Suspended" : "Active";
    setOpenMenuId(null);
    try {
      await setUserStatus({ id: u.id, status: next }).unwrap();
      toast.success(`User ${next === "Active" ? "activated" : "suspended"}`);
    } catch (err) {
      toast.error(errMsg(err, "Failed to update status"));
    }
  };

  const submitCredits = async () => {
    if (!creditUser) return;
    const amt = parseInt(creditAmount, 10);
    if (isNaN(amt) || amt === 0) {
      toast.error("Enter a non-zero amount");
      return;
    }
    try {
      await adjustCredits({
        id: creditUser.id,
        amount: amt,
        reason: creditReason || undefined,
      }).unwrap();
      toast.success("Credits updated");
      setCreditUser(null);
      setCreditAmount("");
      setCreditReason("");
    } catch (err) {
      toast.error(errMsg(err, "Failed to adjust credits"));
    }
  };

  const submitPlan = async () => {
    if (!planUser || !selectedPlanId) return;
    try {
      await changeUserPlan({
        id: planUser.id,
        planConfigId: selectedPlanId,
      }).unwrap();
      toast.success("Plan updated");
      setPlanUser(null);
      setSelectedPlanId("");
    } catch (err) {
      toast.error(errMsg(err, "Failed to change plan"));
    }
  };

  const exportCsv = () => {
    const rows = [
      ["ID", "Name", "Email", "Account Type", "AI Credits", "Joined", "Status"],
      ...users.map((u) => [
        u.id,
        u.name,
        u.email,
        u.accountType,
        String(u.aiCredits),
        u.joinedDate,
        u.status,
      ]),
    ];
    const csv = rows
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Windowed page numbers (keeps the current page in view), matching the mock's "1 2 3 … 245".
  let windowStart = Math.max(0, page - 1);
  const windowEnd = Math.min(totalPages - 1, windowStart + 2);
  windowStart = Math.max(0, windowEnd - 2);
  const pageWindow: number[] = [];
  for (let i = windowStart; i <= windowEnd; i++) pageWindow.push(i);

  const from = totalElements === 0 ? 0 : page * size + 1;
  const to = Math.min((page + 1) * size, totalElements);

  return (
    <div className="min-h-screen bg-[#F8F9FD] p-8 text-gray-800 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1E1B4B]">
              User Management
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage and monitor institutional user accounts and AI allocations.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={exportCsv}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition"
            >
              <Download className="w-4 h-4 text-gray-600" />
              Export CSV
            </button>
            {/* Invite User has no backend counterpart yet - left inert intentionally. */}
            <button className="flex items-center gap-2 px-4 py-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-lg text-sm font-medium shadow-sm transition">
              <UserPlus className="w-4 h-4" />
              Invite User
            </button>
          </div>
        </div>

        {/* Filters Box */}
        <div className="bg-[#F1F0FB] p-4 rounded-xl flex flex-wrap items-center gap-4">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400"
            />
          </div>

          {/* Account Type Dropdown */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-medium whitespace-nowrap">Account Type:</span>
            <div className="relative">
              <select
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm text-gray-800 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>All Types</option>
                <option>Premium</option>
                <option>Free</option>
                <option>Enterprise</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Status Dropdown */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-medium whitespace-nowrap">Status:</span>
            <div className="relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm text-gray-800 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>All Statuses</option>
                <option>Active</option>
                <option>Suspended</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Clear Filters Button */}
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-800 ml-auto transition"
          >
            <X className="w-4 h-4" />
            Clear Filters
          </button>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#EEECF9] text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  <th className="py-3 px-6">USER</th>
                  <th className="py-3 px-6">EMAIL</th>
                  <th className="py-3 px-6">ACCOUNT TYPE</th>
                  <th className="py-3 px-6">AI CREDITS</th>
                  <th className="py-3 px-6">JOINED DATE</th>
                  <th className="py-3 px-6">STATUS</th>
                  <th className="py-3 px-6 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-gray-400">
                      Loading users…
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-rose-500">
                      Failed to load users
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-gray-400">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50/80 transition-colors"
                    >
                      {/* User Info */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold text-xs">
                            {initialsOf(user.name)}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">
                              {user.name}
                            </div>
                            <div className="text-xs text-gray-400">
                              ID: {user.id}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="py-4 px-6 text-gray-600">{user.email}</td>

                      {/* Account Type Badge */}
                      <td className="py-4 px-6">
                        {user.accountType === "Premium" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                            <Star className="w-3 h-3 fill-indigo-600 text-indigo-600" />
                            Premium
                          </span>
                        )}
                        {user.accountType === "Free" && (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200">
                            Free
                          </span>
                        )}
                        {user.accountType === "Enterprise" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                            <Building2 className="w-3 h-3 text-amber-700" />
                            Enterprise
                          </span>
                        )}
                      </td>

                      {/* AI Credits */}
                      <td className="py-4 px-6 font-medium text-gray-700">
                        {user.aiCredits.toLocaleString()}
                      </td>

                      {/* Joined Date */}
                      <td className="py-4 px-6 text-gray-500">
                        {fmtDate(user.joinedDate)}
                      </td>

                      {/* Status Badge */}
                      <td className="py-4 px-6">
                        {user.status === "Active" ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                            Suspended
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right relative">
                        <button
                          onClick={() =>
                            setOpenMenuId(
                              openMenuId === user.id ? null : user.id
                            )
                          }
                          className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        {openMenuId === user.id && (
                          <>
                            <button
                              className="fixed inset-0 z-10 cursor-default"
                              onClick={() => setOpenMenuId(null)}
                              aria-hidden="true"
                              tabIndex={-1}
                            />
                            <div className="absolute right-6 top-12 z-20 w-44 bg-white border border-gray-200 rounded-lg shadow-lg py-1 text-sm text-left">
                              <button
                                onClick={() => handleToggleStatus(user)}
                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                              >
                                {user.status === "Active"
                                  ? "Suspend User"
                                  : "Activate User"}
                              </button>
                              <button
                                onClick={() => {
                                  setCreditUser(user);
                                  setCreditAmount("");
                                  setCreditReason("");
                                  setOpenMenuId(null);
                                }}
                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                              >
                                Adjust Credits
                              </button>
                              <button
                                onClick={() => {
                                  setPlanUser(user);
                                  setSelectedPlanId("");
                                  setOpenMenuId(null);
                                }}
                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                              >
                                Change Plan
                              </button>
                            </div>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer / Pagination */}
          <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <div>
              Showing {from} to {to} of {totalElements.toLocaleString()} users
            </div>
            <div className="flex items-center gap-1 font-medium">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="p-1 hover:bg-gray-100 rounded text-gray-400 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {pageWindow.map((p) =>
                p === page ? (
                  <button
                    key={p}
                    className="w-7 h-7 bg-indigo-600 text-white rounded font-semibold flex items-center justify-center"
                  >
                    {p + 1}
                  </button>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className="w-7 h-7 hover:bg-gray-100 text-gray-700 rounded flex items-center justify-center transition"
                  >
                    {p + 1}
                  </button>
                )
              )}
              {windowEnd < totalPages - 1 && (
                <>
                  <span className="px-1 text-gray-400">...</span>
                  <button
                    onClick={() => setPage(totalPages - 1)}
                    className="w-7 h-7 hover:bg-gray-100 text-gray-700 rounded flex items-center justify-center transition"
                  >
                    {totalPages}
                  </button>
                </>
              )}
              <button
                onClick={() =>
                  setPage((p) => Math.min(totalPages - 1, p + 1))
                }
                disabled={totalPages === 0 || page >= totalPages - 1}
                className="p-1 hover:bg-gray-100 rounded text-gray-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Adjust Credits Modal */}
      {creditUser && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800">
                Adjust AI Credits
              </h2>
              <button
                onClick={() => setCreditUser(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-slate-500">
              {creditUser.name} — current balance{" "}
              <span className="font-semibold text-slate-700">
                {creditUser.aiCredits.toLocaleString()}
              </span>
              . Use a negative amount to deduct (balance never goes below zero).
            </p>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Amount
              </label>
              <input
                type="number"
                value={creditAmount}
                onChange={(e) => setCreditAmount(e.target.value)}
                placeholder="e.g. 100 or -50"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Reason (optional)
              </label>
              <input
                type="text"
                value={creditReason}
                onChange={(e) => setCreditReason(e.target.value)}
                placeholder="Reason for adjustment"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setCreditUser(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={submitCredits}
                className="px-4 py-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-lg text-sm font-medium shadow-sm transition"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Plan Modal */}
      {planUser && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800">Change Plan</h2>
              <button
                onClick={() => setPlanUser(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-slate-500">
              Move {planUser.name} onto a plan. Their balance resets to the
              plan&apos;s credit allowance.
            </p>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Plan
              </label>
              <div className="relative">
                <select
                  value={selectedPlanId}
                  onChange={(e) => setSelectedPlanId(e.target.value)}
                  className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm text-gray-800 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select a plan…</option>
                  {(plans ?? []).map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name} ({plan.creditAllowance} credits)
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setPlanUser(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={submitPlan}
                disabled={!selectedPlanId}
                className="px-4 py-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-lg text-sm font-medium shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Change Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
