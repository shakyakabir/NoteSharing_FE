"use client";
import React from "react";
import { MoreVertical } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useGetAnalyticsQuery } from "@/slices/Admin";

// Bar colours stay client-side (not serialisable); assigned by position to whatever
// features the backend reports usage for.
const BAR_COLORS = [
  "bg-indigo-600",
  "bg-emerald-500",
  "bg-amber-600",
  "bg-sky-500",
  "bg-rose-500",
  "bg-violet-500",
];

export const AnalyticsOverview = () => {
  const { data } = useGetAnalyticsQuery();

  // No payment system yet → revenueBreakdown is empty; render an honest empty state.
  const chartData = data?.revenueBreakdown ?? [];
  const aiFeatures = (data?.featureUsage ?? []).map((f, i) => ({
    name: f.name,
    percentage: Math.round(f.percent),
    color: BAR_COLORS[i % BAR_COLORS.length],
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Chart Section */}
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-800">
            Revenue Breakdown
          </h2>
          <button className="text-slate-400 hover:text-slate-600">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        <div className="h-64 w-full">
          {chartData.length === 0 ? (
            <div className="h-full w-full flex items-center justify-center text-sm text-slate-400">
              No revenue data yet
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorSub" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" hide />
                <YAxis hide />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="subscription"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorSub)"
                />
                <Area
                  type="monotone"
                  dataKey="ads"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={0}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="flex items-center gap-6 mt-4 text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
            <span>Subscription</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>Point Shop</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
            <span>Ad Revenue</span>
          </div>
        </div>
      </div>

      {/* Feature Usage Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-6">
          AI Feature Usage
        </h2>
        <div className="space-y-6">
          {aiFeatures.length === 0 ? (
            <p className="text-sm text-slate-400">No usage data yet</p>
          ) : (
            aiFeatures.map((feature) => (
              <div key={feature.name} className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-600">
                  <span>{feature.name}</span>
                  <span className="text-slate-400">{feature.percentage}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${feature.color} rounded-full`}
                    style={{ width: `${feature.percentage}%` }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
