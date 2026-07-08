"use client";
import React from "react";
import { FileText, Lightbulb } from "lucide-react";

export default function RightSidebarPanels() {
  const suggestions = [
    {
      title: "Add a timeline slide?",
      desc: "Based on your potential chronological notes.",
      active: true,
    },
    {
      title: 'Use "Corporate Blue" palette',
      desc: "Highly recommended for professional topics.",
    },
    {
      title: "Focus on key takeaways",
      desc: "Ensure your final slide summarizes main points.",
    },
  ];

  return (
    <aside className="w-full lg:w-72 border-l border-slate-100 p-6 space-y-6 bg-white shrink-0">
      {/* A: AI SUMMARY OF NOTES */}
      <div className="space-y-3">
        <h3 className="text-[10px] font-black tracking-wider uppercase text-slate-400">
          AI Summary of Notes
        </h3>
        <div className="border border-dashed border-slate-200 rounded-2xl bg-slate-50/50 p-5 text-center flex flex-col items-center justify-center space-y-2 min-h-[140px]">
          <FileText size={22} className="text-slate-300" />
          <p className="text-xs font-bold text-slate-700">
            No source provided yet.
          </p>
          <p className="text-[10px] text-slate-400 leading-normal max-w-[180px]">
            Upload a file or paste text to see a summary.
          </p>
        </div>
      </div>

      {/* B: QUICK SUGGESTIONS FEED */}
      <div className="space-y-3">
        <h3 className="text-[10px] font-black tracking-wider uppercase text-slate-400">
          Quick Suggestions
        </h3>
        <div className="space-y-2.5">
          {suggestions.map((item, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border text-left text-xs space-y-0.5 transition-all ${
                item.active
                  ? "bg-indigo-50/50 border-indigo-100 text-indigo-950"
                  : "bg-slate-50/30 border-slate-100 text-slate-700 hover:border-slate-200"
              }`}
            >
              <h4
                className={`font-bold ${item.active ? "text-indigo-600" : "text-slate-800"}`}
              >
                {item.title}
              </h4>
              <p className="text-[11px] text-slate-400 leading-normal">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* C: PRO TIP CALLOUT BOX */}
      <div className="bg-orange-50 border border-orange-100/50 rounded-2xl p-4 text-center space-y-2 relative overflow-hidden shadow-sm shadow-orange-500/[0.02]">
        <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-amber-500 mx-auto shadow-sm">
          <Lightbulb size={14} className="fill-amber-50" />
        </div>
        <p className="text-[11px] text-orange-700/80 font-medium leading-relaxed">
          <strong className="text-orange-800 block font-bold mb-0.5">
            Pro Tip:
          </strong>
          Use academic mode for citations and references auto-formatting.
        </p>
      </div>
    </aside>
  );
}
