import React from "react";
import { MoreHorizontal } from "lucide-react";

export default function EarningsGrowth() {
  // Height configurations mirroring the user design chart levels
  const barHeights = ["h-10", "h-16", "h-12", "h-24", "h-20", "h-36", "h-18"];

  return (
    <div className="bg-[#eef4ff] p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xs font-bold text-slate-700 tracking-wide">
          Earnings Growth
        </h3>
        <button className="text-slate-400 hover:text-slate-600">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Chart Layout */}
      <div className="flex flex-col justify-end h-40">
        <div className="flex items-end justify-between px-2 gap-2">
          {barHeights.map((height, index) => (
            <div
              key={index}
              className={`w-full rounded-md transition-all duration-300 ${
                index === 5 ? "bg-amber-500" : "bg-slate-200"
              } ${height}`}
            />
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-slate-500 font-medium mt-3 px-1">
          <span>Mon</span>
          <span>Sun</span>
        </div>
      </div>
    </div>
  );
}
