import React from "react";
import { TrendingUp, LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
}

export const StatCard = ({
  title,
  value,
  trend,
  icon: Icon,
  iconColor = "text-indigo-600",
  bgColor = "bg-indigo-50",
}: StatCardProps) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start justify-between">
      <div className="space-y-3">
        <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">
          {title}
        </span>
        <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
          {value}
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>{trend}</span>
          <span className="text-slate-400 font-normal">vs last month</span>
        </div>
      </div>
      <div className={`p-3 rounded-xl ${bgColor}`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
    </div>
  );
};
