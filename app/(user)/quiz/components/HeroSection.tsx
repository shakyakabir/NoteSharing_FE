"use client";
import React from "react";
import { GraduationCap, Layers, Zap } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
      <div className="space-y-4 max-w-xl">
        <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100/50 px-3 py-1 rounded-full text-indigo-600 text-xs font-bold uppercase tracking-wider">
          <GraduationCap size={14} />
          <span>Academic Excellence</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          Level Up Your Knowledge
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed">
          Transform static notes into professional-grade assessments. Master
          complex subjects through systematic testing and data-driven insights.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <button className="bg-indigo-600 text-white font-semibold text-sm px-5 py-3 rounded-xl shadow-md hover:bg-indigo-700 transition flex items-center space-x-2">
            <Zap size={16} className="fill-white" />
            <span>Generate Assessment</span>
          </button>
          <button className="bg-white text-slate-700 border border-slate-200 font-semibold text-sm px-5 py-3 rounded-xl hover:bg-slate-50 transition flex items-center space-x-2">
            <Layers size={16} />
            <span>Open Library</span>
          </button>
        </div>
      </div>
      <div className="hidden md:block w-48 h-48 bg-gradient-to-tr from-indigo-100 to-slate-50 rounded-2xl opacity-60 relative overflow-hidden" />
    </section>
  );
}
