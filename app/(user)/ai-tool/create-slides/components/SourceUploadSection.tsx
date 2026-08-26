// "use client";
// import React from "react";
// import { FileUp } from "lucide-react";

// interface SourceUploadSectionProps {
//   value?: string;
//   onChange?: (value: string) => void;
// }

// export default function SourceUploadSection({
//   value = "",
//   onChange,
// }: SourceUploadSectionProps) {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//       {/* File Drop Box zone */}
//       <div className="border-2 border-dashed border-indigo-100 rounded-2xl bg-white p-6 text-center flex flex-col items-center justify-center space-y-3 min-h-[220px]">
//         <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm">
//           <FileUp size={20} />
//         </div>
//         <div className="space-y-1">
//           <h3 className="text-sm font-bold text-slate-800">Upload Source</h3>
//           <p className="text-[11px] text-slate-400">
//             PDF, DOCX, or TXT files up to 25MB
//           </p>
//         </div>
//         <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors shadow-sm">
//           Browse Files
//         </button>
//       </div>

//       {/* Manual Paste Text area Card */}
//       <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col space-y-3 min-h-[220px]">
//         <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xs">
//           <span>📋</span>
//           <span className="text-slate-700">Paste Notes</span>
//         </div>
//         <textarea
//           value={value}
//           onChange={(e) => onChange?.(e.target.value)}
//           placeholder="Paste your research notes, article text, or lecture transcript here..."
//           className="w-full flex-1 bg-slate-50 border border-slate-100/50 rounded-xl p-3.5 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500/30 transition-all resize-none leading-relaxed"
//         />
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useRef } from "react";
import { FileUp, File, X } from "lucide-react";

interface SourceUploadSectionProps {
  value?: string;
  onChange?: (value: string) => void;
  file?: File | null;
  onFileChange?: (file: File | null) => void;
}

export default function SourceUploadSection({
  value = "",
  onChange,
  file = null,
  onFileChange,
}: SourceUploadSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    onFileChange?.(selectedFile);
  };

  const removeFile = () => {
    onFileChange?.(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* FILE UPLOAD */}
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

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.txt,.md"
          onChange={handleFileChange}
          className="hidden"
        />

        {!file ? (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors shadow-sm"
          >
            Browse Files
          </button>
        ) : (
          <div className="w-full flex items-center justify-between gap-3 rounded-xl bg-indigo-50 px-3 py-2">
            <div className="flex items-center gap-2 min-w-0">
              <File size={18} className="text-indigo-600 shrink-0" />

              <div className="text-left min-w-0">
                <p className="text-xs font-semibold text-slate-700 truncate">
                  {file.name}
                </p>

                <p className="text-[10px] text-slate-400">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={removeFile}
              className="shrink-0 text-slate-400 hover:text-red-500"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      {/* MANUAL TEXT */}
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
