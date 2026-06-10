"use client";
import React from "react";
import { Award } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AnalyticsSection() {
  const subjects = [
    {
      name: "Computer Science",
      val: "89%",
      w: "w-[89%]",
      color: "bg-indigo-500",
    },
    { name: "Economics", val: "60%", w: "w-[60%]", color: "bg-slate-400" },
    {
      name: "Discrete Mathematics",
      val: "42%",
      w: "w-[42%]",
      color: "bg-amber-500",
    },
    {
      name: "Organic Chemistry",
      val: "78%",
      w: "w-[78%]",
      color: "bg-emerald-500",
    },
  ];

  const router = useRouter();
  const handleShop = () => {
    router.push("/point-shop");
  };
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Rewards Card */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400">
              Rewards Balance
            </span>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <Award size={18} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-900">
              1,250{" "}
              <span className="text-sm font-medium text-slate-400">pts</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-indigo-600 h-full w-[70%]" />
            </div>
            <div className="flex justify-between text-[11px] font-semibold text-slate-400 mt-2">
              <span>Tier 4 Student</span>
              <span className="text-indigo-600">250 pts to Level 5</span>
            </div>
          </div>
        </div>
        <button
          onClick={handleShop}
          className="w-full bg-slate-50 border border-slate-100 hover:bg-slate-100 text-slate-700 font-bold text-xs py-3 rounded-xl transition mt-6"
        >
          Shop AI Credits
        </button>
      </div>

      {/* Mastery Analysis Card */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm md:col-span-2 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-slate-800 text-base">
            Academic Mastery Analysis
          </h3>
          <span className="flex items-center space-x-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            <span>Active</span>
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 pt-2">
          {subjects.map((subj, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-600">
                <span>{subj.name}</span>
                <span className="font-bold text-slate-800">{subj.val}</span>
              </div>
              <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                <div className={`${subj.color} h-full ${subj.w}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
