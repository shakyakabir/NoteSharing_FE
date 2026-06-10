"use client";
import React from "react";
import { Plus } from "lucide-react";

export default function UpgradeSection() {
  return (
    <section className="bg-slate-950 rounded-3xl p-8 text-white flex flex-col lg:flex-row items-stretch justify-between gap-8 relative overflow-hidden shadow-xl">
      <div className="flex flex-col justify-between items-start space-y-6 max-w-md z-10">
        <div className="space-y-3">
          <span className="text-[10px] font-black tracking-widest uppercase px-2.5 py-1 bg-white/10 rounded-md border border-white/10">
            Premium Features
          </span>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-none">
            Upgrade Your
            <br />
            Learning Engine
          </h2>
          <p className="text-slate-400 text-xs leading-relaxed">
            Unlock sophisticated AI features, in-depth analytical reports, and
            exclusive academic tools to accelerate your progress.
          </p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-3.5 rounded-xl transition">
          Shop All Premium Tools
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:w-3/5 z-10">
        {/* Analytics Card */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <span className="text-[9px] font-bold text-indigo-400 tracking-wider uppercase">
              Advanced
            </span>
            <h4 className="font-bold text-sm text-slate-100">
              Deep-Dive Analytics
            </h4>
            <p className="text-slate-400 text-[11px]">
              Full performance breakdown with AI-driven improvement suggestions.
            </p>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-xs font-black text-slate-200">
              400{" "}
              <span className="text-[10px] text-slate-500 font-medium">
                PTS
              </span>
            </span>
            <button className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-slate-300 transition">
              <Plus size={14} />
            </button>
          </div>
        </div>

        {/* Synthesis Card */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <span className="text-[9px] font-bold text-purple-400 tracking-wider uppercase">
              Professional
            </span>
            <h4 className="font-bold text-sm text-slate-100">
              Unlimited Synthesis
            </h4>
            <p className="text-slate-400 text-[11px]">
              AI-powered note merging and cross-subject knowledge mapping.
            </p>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-xs font-black text-slate-200">
              800{" "}
              <span className="text-[10px] text-slate-500 font-medium">
                PTS
              </span>
            </span>
            <button className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-slate-300 transition">
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
