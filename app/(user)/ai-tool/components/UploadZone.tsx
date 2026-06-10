"use client";
import React, { useState } from "react";
import { FileUp } from "lucide-react";

export default function UploadZone() {
  const [isDragActive, setIsDragActive] = useState(false);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragActive(true);
      }}
      onDragLeave={() => setIsDragActive(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragActive(false);
      }}
      className={`border-2 border-dashed rounded-2xl p-8 text-center flex flex-col items-center justify-center space-y-3 transition-all ${
        isDragActive
          ? "border-indigo-500 bg-indigo-50/30 text-indigo-600"
          : "border-slate-200 bg-white hover:bg-slate-50/50 text-slate-400 hover:border-slate-300"
      }`}
    >
      <div className="w-12 h-12 rounded-2xl bg-indigo-50/70 border border-indigo-100/40 flex items-center justify-center text-indigo-500 shadow-sm">
        <FileUp size={20} />
      </div>

      <div className="space-y-1">
        <p className="text-xs font-bold text-slate-700">
          Click to upload or drag and drop
        </p>
        <p className="text-[10px] text-slate-400 font-medium">
          PDF, DOCX, or TXT (Max 10MB)
        </p>
      </div>

      <input type="file" className="hidden" id="file-uploader-hidden" />
    </div>
  );
}
