"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Cpu,
  Clock,
  Calendar,
  Download,
  Info,
} from "lucide-react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Data for Composed Chart (Bar + Line)
const COMPOSED_DATA = [
  { month: "Jan", mrr: 110000, churn: 3.2 },
  { month: "Feb", mrr: 115000, churn: 3.1 },
  { month: "Mar", mrr: 112000, churn: 3.5 },
  { month: "Apr", mrr: 125000, churn: 2.7 },
  { month: "May", mrr: 130000, churn: 2.6 },
  { month: "Jun", mrr: 132000, churn: 2.8 },
  { month: "Jul", mrr: 138000, churn: 2.4 },
  { month: "Aug", mrr: 140000, churn: 2.4 },
  { month: "Sep", mrr: 142590, churn: 2.6 },
];

// Data for AI Feature Usage Pie Chart
const PIE_DATA = [
  { name: "Summarization", value: 55, color: "#6366F1" },
  { name: "Quiz Gen", value: 22, color: "#10B981" },
  { name: "PPT Gen", value: 13, color: "#B45309" },
  { name: "Key Points", value: 10, color: "#6B7280" },
];

export default function AnalyticsDashboard() {
  const [timeframe, setTimeframe] = useState<"7D" | "30D" | "Q3" | "YTD">("Q3");

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
              <span>MONTHLY RECURRING REVENUE</span>
              <div className="w-6 h-6 rounded-md bg-emerald-50 flex items-center justify-center text-emerald-500">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">$142,590</div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
              <span className="bg-emerald-50 px-1.5 py-0.5 rounded text-emerald-700 font-semibold">
                ↑ 12.4%
              </span>
              <span className="text-gray-400">vs last quarter</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-gray-400 tracking-wider">
              <span>USER CHURN RATE</span>
              <div className="w-6 h-6 rounded-md bg-rose-50 flex items-center justify-center text-rose-500">
                <TrendingDown className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">2.8%</div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-rose-600">
              <span className="bg-rose-50 px-1.5 py-0.5 rounded text-rose-700 font-semibold">
                ↑ 0.3%
              </span>
              <span className="text-gray-400">vs last quarter</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-gray-400 tracking-wider">
              <span>AI CREDITS CONSUMED</span>
              <div className="w-6 h-6 rounded-md bg-indigo-50 flex items-center justify-center text-indigo-500">
                <Cpu className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">4.2M</div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
              <span className="bg-emerald-50 px-1.5 py-0.5 rounded text-emerald-700 font-semibold">
                ↑ 45.1%
              </span>
              <span className="text-gray-400">vs last quarter</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-gray-400 tracking-wider">
              <span>AVG PROCESSING TIME</span>
              <div className="w-6 h-6 rounded-md bg-amber-50 flex items-center justify-center text-amber-500">
                <Clock className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">1.4s</div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
              <span className="bg-emerald-50 px-1.5 py-0.5 rounded text-emerald-700 font-semibold">
                ↓ 0.2s
              </span>
              <span className="text-gray-400">optimization impact</span>
            </div>
          </div>
        </div>

        {/* Main Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Growth & Churn Projection (2 cols) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-gray-900">
                Revenue Growth & Churn Projection
              </h2>
              <button className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition">
                Export <Download className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Custom Legend */}
            <div className="flex items-center justify-end gap-6 mb-4 text-xs font-medium text-gray-500">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#6366F1]" />
                MRR ($)
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full border-2 border-rose-500 bg-white" />
                Churn Rate (%)
              </div>
            </div>

            {/* Composed Chart */}
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={COMPOSED_DATA}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
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
                  {/* Left Y-Axis for MRR */}
                  <YAxis
                    yAxisId="left"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94A3B8", fontSize: 12 }}
                    tickFormatter={(val) => `$${val / 1000}k`}
                    domain={[0, 160000]}
                  />
                  {/* Right Y-Axis for Churn */}
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94A3B8", fontSize: 12 }}
                    tickFormatter={(val) => `${val}%`}
                    domain={[0, 3.5]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="mrr"
                    fill="#6366F1"
                    radius={[4, 4, 0, 0]}
                    barSize={24}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="churn"
                    stroke="#EF4444"
                    strokeWidth={2}
                    dot={{
                      fill: "#FFFFFF",
                      stroke: "#EF4444",
                      strokeWidth: 2,
                      r: 4,
                    }}
                    activeDot={{ r: 6 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
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
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={PIE_DATA}
                    innerRadius={65}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {PIE_DATA.map((entry, index) => (
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
            </div>

            {/* Legend Grid */}
            <div className="grid grid-cols-2 gap-y-3 gap-x-2 pt-2 border-t border-gray-100 text-xs">
              {PIE_DATA.map((item) => (
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
