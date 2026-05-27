import React from "react";
export interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  iconBg: string;
}

export default function StatCard({
  title,
  value,
  icon,
  iconBg,
}: StatCardProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 flex items-center justify-between shadow-sm">
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          {title}
        </p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBg}`}
      >
        <span className="text-lg">{icon}</span>
      </div>
    </div>
  );
}
