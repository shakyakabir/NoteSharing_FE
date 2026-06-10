"use client";
import React from "react";

interface InputAreaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextInputArea({ value, onChange }: InputAreaProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-extrabold text-slate-700 tracking-tight block">
        Or paste your notes here
      </label>
      <div className="relative">
        <textarea
          value={value}
          onChange={onChange}
          placeholder="Paste your lecture notes or text here..."
          rows={7}
          className="w-full bg-[#F8FAFC] border border-slate-100 rounded-2xl p-4 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500/30 focus:ring-1 focus:ring-indigo-500/20 transition-all resize-y min-h-[140px]"
        />
        {/* Corner text character limit counting asset metric indicator element */}
        <div className="absolute bottom-3 right-3 text-[9px] font-bold text-slate-300 pointer-events-none tracking-wider">
          {value.length} CHARS
        </div>
      </div>
    </div>
  );
}
