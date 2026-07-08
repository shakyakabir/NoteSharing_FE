// import React, { useRef, useState } from "react";
// import { FileUp, Link2, FileText } from "lucide-react";
// import { SourceType } from "../page";

// interface ExistingNote {
//   id: number;
//   title: string;
//   meta: string;
// }

// interface SourceSelectionProps {
//   sourceType: SourceType;
//   selectedNoteId: number | null;
//   onSelectSource: (type: SourceType, id?: number | null) => void;
//   onFileSelect?: (file: File) => void
// }

// const EXISTING_NOTES: ExistingNote[] = [
//   {
//     id: 1,
//     title: "Organic Chemistry - Molecular Orbitals",
//     meta: "Edited 2 hours ago • 4 pages",
//   },
//   {
//     id: 2,
//     title: "Macroeconomics: IS-LM Model Overview",
//     meta: "Edited yesterday • 12 pages",
//   },
// ];

// export default function SourceSelection({
//   sourceType,
//   selectedNoteId,
//   onSelectSource,
//   onFileSelect,
// }: SourceSelectionProps) {
//     const [uploadFile,setUploadFile]=useState<File | null>(null);
//     const fileInpoutRef=useRef<HTMLInputElement>(null)

//     const handleFileChnage=(file:File | null)=>{
//         if(!file) return;
//         if(file.type!=="application/pdf"){
//             alert("Only support pdf file")
//             return;
//         }
// if(file.size>10*1024*1024){
//     alert("File Size exceed the limit")
// }
// setUploadFile(file)
// onSelectSource("upload")
// onFileSelect?.(file)

//     }
//   return (
//     <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
//       <h2 className="text-base font-bold text-slate-900 mb-5">
//         1. Choose Your Source
//       </h2>

//       {/* Dynamic Action Buttons */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//         <button
//           onClick={() => onSelectSource("upload")}
//           className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed transition-all ${
//             sourceType === "upload"
//               ? "border-indigo-500 bg-indigo-50/30 text-indigo-600"
//               : "border-slate-200 hover:border-slate-300 text-slate-500"
//           }`}
//         >
//           <div
//             className={`p-3 rounded-xl mb-3 ${sourceType === "upload" ? "bg-indigo-100" : "bg-slate-50"}`}
//           >
//             <FileUp className="w-6 h-6" />
//           </div>
//           <span className="font-bold text-sm text-slate-900">
//             Upload PDF / Doc
//           </span>
//           <span className="text-xs text-slate-400 mt-1">Maximum 50MB</span>
//         </button>

//         <button
//           onClick={() => onSelectSource("link")}
//           className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed transition-all ${
//             sourceType === "link"
//               ? "border-indigo-500 bg-indigo-50/30 text-indigo-600"
//               : "border-slate-200 hover:border-slate-300 text-slate-500"
//           }`}
//         >
//           <div
//             className={`p-3 rounded-xl mb-3 ${sourceType === "link" ? "bg-indigo-100" : "bg-slate-50"}`}
//           >
//             <Link2 className="w-6 h-6" />
//           </div>
//           <span className="font-bold text-sm text-slate-900">
//             Paste Note Link
//           </span>
//           <span className="text-xs text-slate-400 mt-1">
//             Notion, Docs, etc.
//           </span>
//         </button>
//       </div>

//       {/* Existing Notes Sub-List */}
//       <div>
//         <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase block mb-3">
//           Select From Existing Notes
//         </span>
//         <div className="space-y-3">
//           {EXISTING_NOTES.map((note) => {
//             const isSelected =
//               sourceType === "existing" && selectedNoteId === note.id;
//             return (
//               <div
//                 key={note.id}
//                 onClick={() => onSelectSource("existing", note.id)}
//                 className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
//                   isSelected
//                     ? "border-indigo-500 bg-indigo-50/20"
//                     : "border-slate-100 bg-slate-50/50 hover:bg-slate-50"
//                 }`}
//               >
//                 <div className="flex items-center gap-4">
//                   <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm text-slate-400">
//                     <FileText className="w-5 h-5" />
//                   </div>
//                   <div>
//                     <h4 className="text-sm font-bold text-slate-800">
//                       {note.title}
//                     </h4>
//                     <p className="text-xs text-slate-400 mt-0.5">{note.meta}</p>
//                   </div>
//                 </div>
//                 <div
//                   className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
//                     isSelected
//                       ? "border-indigo-600 bg-indigo-600"
//                       : "border-slate-300"
//                   }`}
//                 >
//                   {isSelected && (
//                     <div className="w-2 h-2 rounded-full bg-white" />
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useRef, useState } from "react";
import { FileUp, Link2, FileText, X, CheckCircle } from "lucide-react";
import { SourceType } from "../page";

interface ExistingNote {
  id: number;
  title: string;
  meta: string;
}

interface SourceSelectionProps {
  sourceType: SourceType;
  selectedNoteId: number | null;
  onSelectSource: (type: SourceType, id?: number | null) => void;
  onFileSelect?: (file: File) => void; // ← new prop
}

const EXISTING_NOTES: ExistingNote[] = [
  {
    id: 1,
    title: "Organic Chemistry - Molecular Orbitals",
    meta: "Edited 2 hours ago • 4 pages",
  },
  {
    id: 2,
    title: "Macroeconomics: IS-LM Model Overview",
    meta: "Edited yesterday • 12 pages",
  },
];

export default function SourceSelection({
  sourceType,
  selectedNoteId,
  onSelectSource,
  onFileSelect,
}: SourceSelectionProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File | null) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      alert("Only PDF files are supported.");
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      alert("File exceeds 50MB limit.");
      return;
    }
    setUploadedFile(file);
    onSelectSource("upload");
    onFileSelect?.(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
      <h2 className="text-base font-bold text-slate-900 mb-5">
        1. Choose Your Source
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Upload Button / Drop Zone */}
        <div
          onClick={() => !uploadedFile && fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed transition-all cursor-pointer ${
            isDragging
              ? "border-indigo-400 bg-indigo-50/50"
              : sourceType === "upload"
                ? "border-indigo-500 bg-indigo-50/30 text-indigo-600"
                : "border-slate-200 hover:border-slate-300 text-slate-500"
          }`}
        >
          {uploadedFile ? (
            /* Uploaded state */
            <div className="flex flex-col items-center gap-2 w-full">
              <CheckCircle className="w-6 h-6 text-emerald-500" />
              <span className="text-xs font-bold text-slate-800 text-center truncate w-full text-center">
                {uploadedFile.name}
              </span>
              <span className="text-xs text-slate-400">
                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setUploadedFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="mt-1 flex items-center gap-1 text-xs text-red-400 hover:text-red-600 transition"
              >
                <X className="w-3 h-3" /> Remove
              </button>
            </div>
          ) : (
            /* Default upload state */
            <>
              <div
                className={`p-3 rounded-xl mb-3 ${sourceType === "upload" ? "bg-indigo-100" : "bg-slate-50"}`}
              >
                <FileUp className="w-6 h-6" />
              </div>
              <span className="font-bold text-sm text-slate-900">
                Upload PDF
              </span>
              <span className="text-xs text-slate-400 mt-1">
                {isDragging
                  ? "Drop it here!"
                  : "Click or drag & drop • Max 50MB"}
              </span>
            </>
          )}
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          className="hidden"
          onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
        />

        {/* Link Button */}
        <button
          onClick={() => onSelectSource("link")}
          className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed transition-all ${
            sourceType === "link"
              ? "border-indigo-500 bg-indigo-50/30 text-indigo-600"
              : "border-slate-200 hover:border-slate-300 text-slate-500"
          }`}
        >
          <div
            className={`p-3 rounded-xl mb-3 ${sourceType === "link" ? "bg-indigo-100" : "bg-slate-50"}`}
          >
            <Link2 className="w-6 h-6" />
          </div>
          <span className="font-bold text-sm text-slate-900">
            Paste Note Link
          </span>
          <span className="text-xs text-slate-400 mt-1">
            Notion, Docs, etc.
          </span>
        </button>
      </div>

      {/* Existing Notes */}
      <div>
        <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase block mb-3">
          Select From Existing Notes
        </span>
        <div className="space-y-3">
          {EXISTING_NOTES.map((note) => {
            const isSelected =
              sourceType === "existing" && selectedNoteId === note.id;
            return (
              <div
                key={note.id}
                onClick={() => onSelectSource("existing", note.id)}
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? "border-indigo-500 bg-indigo-50/20"
                    : "border-slate-100 bg-slate-50/50 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm text-slate-400">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">
                      {note.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">{note.meta}</p>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected
                      ? "border-indigo-600 bg-indigo-600"
                      : "border-slate-300"
                  }`}
                >
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
