"use client";

import { useState } from "react";
import {
  DollarSign,
  Megaphone,
  Wallet,
  Cpu,
  Calendar,
  Download,
  Info,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useGetAnalyticsQuery } from "@/slices/Admin";

// Donut colours stay client-side; assigned by position to whatever features report usage.
const PIE_COLORS = [
  "#6366F1",
  "#10B981",
  "#B45309",
  "#6B7280",
  "#0EA5E9",
  "#F43F5E",
];

// Revenue values are real money (completed eSewa subscriptions + CPM/CPC ad earnings); render as
// currency with at most 2 decimals so accumulated float ad revenue doesn't show a long tail.
const money = (n?: number) =>
  `$${(n ?? 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

export default function AnalyticsDashboard() {
  const [timeframe, setTimeframe] = useState<"7D" | "30D" | "Q3" | "YTD">("Q3");

  // Range is forwarded for future per-window support; the current backend metrics are aggregate.
  const { data, isLoading } = useGetAnalyticsQuery(timeframe);

  const revenueBreakdown = data?.revenueBreakdown ?? [];
  const pieData = (data?.featureUsage ?? []).map((f, i) => ({
    name: f.name,
    value: Math.round(f.percent),
    color: PIE_COLORS[i % PIE_COLORS.length],
  }));

  const subscriptionRevenue = isLoading ? "…" : money(data?.subscriptionRevenue);
  const adsRevenue = isLoading ? "…" : money(data?.adsRevenue);
  const totalRevenue = isLoading ? "…" : money(data?.totalRevenue);
  const creditsConsumed = isLoading
    ? "…"
    : (data?.aiCreditsConsumed ?? 0).toLocaleString();

  return (
    <div className="min-h-screen bg-[#F8F9FD] p-8 text-gray-800 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1E1B4B]">
              Revenue & AI Analytics
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Deep-dive into financial metrics and model performance for Q3.
            </p>
          </div>

          {/* Timeframe Selector */}
          <div className="inline-flex items-center bg-white border border-gray-200 rounded-lg p-1 shadow-sm text-xs font-semibold">
            {(["7D", "30D", "Q3", "YTD"] as const).map((item) => (
              <button
                key={item}
                onClick={() => setTimeframe(item)}
                className={`px-3 py-1.5 rounded-md transition ${
                  timeframe === item
                    ? "bg-[#E0E7FF] text-[#4338CA]"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {item}
              </button>
            ))}
            <div className="h-4 w-[1px] bg-gray-200 mx-1" />
            <button className="p-1.5 text-gray-500 hover:text-gray-900 transition">
              <Calendar className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-gray-400 tracking-wider">
              <span>SUBSCRIPTION REVENUE</span>
              <div className="w-6 h-6 rounded-md bg-emerald-50 flex items-center justify-center text-emerald-500">
                <DollarSign className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {subscriptionRevenue}
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-gray-400 tracking-wider">
              <span>ADS REVENUE</span>
              <div className="w-6 h-6 rounded-md bg-amber-50 flex items-center justify-center text-amber-500">
                <Megaphone className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">{adsRevenue}</div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-gray-400 tracking-wider">
              <span>TOTAL REVENUE</span>
              <div className="w-6 h-6 rounded-md bg-indigo-50 flex items-center justify-center text-indigo-500">
                <Wallet className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {totalRevenue}
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-gray-400 tracking-wider">
              <span>AI CREDITS CONSUMED</span>
              <div className="w-6 h-6 rounded-md bg-sky-50 flex items-center justify-center text-sky-500">
                <Cpu className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {creditsConsumed}
            </div>
          </div>
        </div>

        {/* Main Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Growth (2 cols) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-gray-900">
                Revenue Growth
              </h2>
              <button className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition">
                Export <Download className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Custom Legend */}
            <div className="flex items-center justify-end gap-6 mb-4 text-xs font-medium text-gray-500">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#6366F1]" />
                Subscription ($)
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                Ad Revenue ($)
              </div>
            </div>

            {/* Area Chart */}
            <div className="h-72 w-full">
              {revenueBreakdown.length === 0 ? (
                <div className="h-full w-full flex items-center justify-center text-sm text-gray-400">
                  No revenue data yet
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={revenueBreakdown}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorSub" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorAds" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#F1F5F9"
                    />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#94A3B8", fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#94A3B8", fontSize: 12 }}
                      tickFormatter={(val) =>
                        val >= 1000 ? `$${val / 1000}k` : `$${val}`
                      }
                    />
                    <Tooltip
                      formatter={(value) =>
                        `$${Number(value).toLocaleString()}`
                      }
                      contentStyle={{
                        backgroundColor: "#fff",
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="subscription"
                      stroke="#6366F1"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#colorSub)"
                    />
                    <Area
                      type="monotone"
                      dataKey="ads"
                      stroke="#F59E0B"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorAds)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* AI Feature Usage Donut Chart (1 col) */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-bold text-gray-900">
                AI Feature Usage
              </h2>
              <button className="text-gray-400 hover:text-gray-600 transition">
                <Info className="w-4 h-4" />
              </button>
            </div>

            {/* Pie / Donut Chart */}
            <div className="h-60 w-full relative">
              {pieData.length === 0 ? (
                <div className="h-full w-full flex items-center justify-center text-sm text-gray-400">
                  No usage data yet
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      innerRadius={65}
                      outerRadius={90}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Legend Grid */}
            <div className="grid grid-cols-2 gap-y-3 gap-x-2 pt-2 border-t border-gray-100 text-xs">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-medium text-gray-600 truncate">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
