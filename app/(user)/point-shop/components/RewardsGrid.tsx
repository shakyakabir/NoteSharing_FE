"use client";
import React from "react";
import { Sparkles, Clock, ShieldCheck } from "lucide-react";

interface RewardItem {
  id: number;
  icon: React.ReactNode;
  title: string;
  cost: number;
  description: string;
  isPopular?: boolean;
}

export default function RewardsGrid() {
  const rewards: RewardItem[] = [
    {
      id: 1,
      icon: <Clock size={18} className="text-amber-600" />,
      title: "Unlock 1hr AI access",
      cost: 200,
      description:
        "Get unlimited smart summarization and AI tutoring for 60 minutes.",
    },
    {
      id: 2,
      icon: <Sparkles size={18} className="text-amber-600" />,
      title: "Unlock 1 day AI access",
      cost: 500,
      description:
        "Full 24-hour access to all premium AI tools, perfect for intense exam prep.",
      isPopular: true,
    },
    {
      id: 3,
      icon: <ShieldCheck size={18} className="text-amber-600" />,
      title: "Premium Badge",
      cost: 1000,
      description:
        "A permanent decorative badge displayed next to your name in all groups.",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-extrabold text-slate-800 tracking-tight">
          Available Rewards
        </h2>
        <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition">
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rewards.map((reward) => (
          <div
            key={reward.id}
            className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between relative hover:shadow-md transition-shadow"
          >
            {reward.isPopular && (
              <span className="absolute top-4 right-4 bg-indigo-50 border border-indigo-100 text-indigo-600 font-extrabold text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full">
                Popular
              </span>
            )}

            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
                {reward.icon}
              </div>

              <div className="space-y-1">
                <h3 className="font-bold text-slate-800 text-sm leading-tight">
                  {reward.title}
                </h3>
                <div className="flex items-center space-x-1 text-xs font-bold text-amber-600">
                  <span>🪙</span>
                  <span>{reward.cost}pts</span>
                </div>
              </div>

              <p className="text-slate-400 text-xs leading-relaxed min-h-[40px]">
                {reward.description}
              </p>
            </div>

            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 rounded-xl transition mt-6">
              Redeem
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
