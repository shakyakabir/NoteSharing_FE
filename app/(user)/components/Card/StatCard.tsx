import React from "react";

interface StatCardProps {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  value: string;
  badge: string;
  badgeColor: string;
  progressBar?: { current: number; total: number };
}

export default function StatCard({
  icon,
  iconBg,
  title,
  value,
  badge,
  badgeColor,
  progressBar,
}: StatCardProps) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between min-h-[140px] relative overflow-hidden">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-medium text-slate-400 mb-1">{title}</p>
          <h3 className="text-2xl font-semibold text-slate-800 tracking-tight">
            {value}
          </h3>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className={`p-2 rounded-xl ${iconBg}`}>{icon}</div>
          <span
            className={`text-[10px] font-semibold tracking-wide mt-1 ${badgeColor}`}
          >
            {badge}
          </span>
        </div>
      </div>

      {progressBar && (
        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-4 overflow-hidden">
          <div
            className="bg-amber-500 h-1.5 rounded-full"
            style={{
              width: `${(progressBar.current / progressBar.total) * 100}%`,
            }}
          />
        </div>
      )}
    </div>
  );
}
