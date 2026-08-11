"use client";
import React from "react";
import { FileUp } from "lucide-react";

interface SourceUploadSectionProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default function SourceUploadSection({
  value = "",
  onChange,
}: SourceUploadSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* File Drop Box zone */}
      <div className="border-2 border-dashed border-indigo-100 rounded-2xl bg-white p-6 text-center flex flex-col items-center justify-center space-y-3 min-h-[220px]">
        <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm">
          <FileUp size={20} />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-slate-800">Upload Source</h3>
          <p className="text-[11px] text-slate-400">
            PDF, DOCX, or TXT files up to 25MB
          </p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors shadow-sm">
          Browse Files
        </button>
      </div>

      {/* Manual Paste Text area Card */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col space-y-3 min-h-[220px]">
        <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xs">
          <span>📋</span>
          <span className="text-slate-700">Paste Notes</span>
        </div>
        <textarea
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder="Paste your research notes, article text, or lecture transcript here..."
          className="w-full flex-1 bg-slate-50 border border-slate-100/50 rounded-xl p-3.5 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500/30 transition-all resize-none leading-relaxed"
        />
      </div>
    </div>
  );
}
