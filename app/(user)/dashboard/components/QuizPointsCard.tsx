import React from "react";
import { Award } from "lucide-react";

export default function QuizPointsCard() {
  return (
    <div className="bg-[#232936] text-white p-6 rounded-2xl shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[220px]">
      {/* Background Star Badge Effect */}
      <div className="absolute right-[-20px] bottom-[-20px] text-slate-700 opacity-20 pointer-events-none">
        <Award size={160} strokeWidth={1} />
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-amber-400" />
          <h3 className="text-xs font-semibold tracking-wider text-slate-300">
            Quiz Points
          </h3>
        </div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">12,450 XP</h2>
        <p className="text-xs text-slate-400 max-w-[200px] leading-relaxed">
          You're in the{" "}
          <span className="text-amber-400 font-medium">Top 5%</span> of NoteHive
          scholars this month!
        </p>
      </div>

      <button className="w-full bg-primary hover:bg-primary text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-colors mt-4 relative z-10">
        Redeem Rewards
      </button>
    </div>
  );
}
