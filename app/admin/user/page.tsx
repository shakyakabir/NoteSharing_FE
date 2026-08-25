"use client";

import React, { useState } from "react";
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

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  initials?: string;
  accountType: "Premium" | "Free" | "Enterprise";
  aiCredits: string;
  joinedDate: string;
  status: "Active" | "Suspended";
}

const USERS_DATA: User[] = [
  {
    id: "USR-8842",
    name: "Sarah Jenkins",
    email: "s.jenkins@university.edu",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    accountType: "Premium",
    aiCredits: "12,500",
    joinedDate: "Oct 12, 2023",
    status: "Active",
  },
  {
    id: "USR-8843",
    name: "Marcus Chen",
    email: "m.chen@university.edu",
    initials: "MC",
    accountType: "Free",
    aiCredits: "500",
    joinedDate: "Nov 04, 2023",
    status: "Suspended",
  },
  {
    id: "USR-7102",
    name: "Dr. Robert Thorne",
    email: "r.thorne@faculty.edu",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    accountType: "Enterprise",
    aiCredits: "Unlimited",
    joinedDate: "Jan 15, 2022",
    status: "Active",
  },
];

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [accountType, setAccountType] = useState("All Types");
  const [status, setStatus] = useState("All Statuses");

  const clearFilters = () => {
    setSearchTerm("");
    setAccountType("All Types");
    setStatus("All Statuses");
  };

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
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition">
              <Download className="w-4 h-4 text-gray-600" />
              Export CSV
            </button>
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
                {USERS_DATA.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50/80 transition-colors"
                  >
                    {/* User Info */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold text-xs">
                            {user.initials}
                          </div>
                        )}
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
                      {user.aiCredits}
                    </td>

                    {/* Joined Date */}
                    <td className="py-4 px-6 text-gray-500">
                      {user.joinedDate}
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
                    <td className="py-4 px-6 text-right">
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer / Pagination */}
          <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <div>Showing 1 to 10 of 2,451 users</div>
            <div className="flex items-center gap-1 font-medium">
              <button className="p-1 hover:bg-gray-100 rounded text-gray-400 transition">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-7 h-7 bg-indigo-600 text-white rounded font-semibold flex items-center justify-center">
                1
              </button>
              <button className="w-7 h-7 hover:bg-gray-100 text-gray-700 rounded flex items-center justify-center transition">
                2
              </button>
              <button className="w-7 h-7 hover:bg-gray-100 text-gray-700 rounded flex items-center justify-center transition">
                3
              </button>
              <span className="px-1 text-gray-400">...</span>
              <button className="w-7 h-7 hover:bg-gray-100 text-gray-700 rounded flex items-center justify-center transition">
                245
              </button>
              <button className="p-1 hover:bg-gray-100 rounded text-gray-700 transition">
                ChevronRight className="w-4 h-4"
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
