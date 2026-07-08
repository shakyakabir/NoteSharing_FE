import React from "react";
import { Settings } from "lucide-react";

export default function ProcessingStatus(): React.JSX.Element {
  return (
    <div className="bg-indigo-50/40 rounded-2xl p-8 border border-indigo-100/60 relative overflow-hidden flex flex-col items-center text-center">
      <div className="absolute top-0 left-0 w-1/4 h-1 bg-indigo-600 rounded-r-full"></div>

      <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200 mb-4 animate-[spin_4s_linear_infinite]">
        <Settings className="w-6 h-6" />
      </div>

      <h3 className="text-base font-bold text-indigo-950 mb-1">
        Analyzing Note for Key Concepts...
      </h3>
      <p className="text-xs text-indigo-700/70 max-w-sm mb-5 leading-relaxed">
        Identifying definitions, formulas, and structural relationships to build
        your custom challenge.
      </p>

      <div className="flex flex-wrap gap-2 justify-center text-[11px] font-semibold">
        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full border border-indigo-200 animate-pulse">
          Scanning Text
        </span>
        <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full">
          Extracting Definitions
        </span>
        <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full">
          Tagging Context
        </span>
      </div>
    </div>
  );
}
