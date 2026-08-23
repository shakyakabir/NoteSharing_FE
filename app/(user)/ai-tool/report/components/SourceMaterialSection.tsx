"use client";
import React from "react";
import { Search, X, Upload, FileText } from "lucide-react";

// ==========================================
// 1. Source Material Section Component
// ==========================================
interface SourceMaterialProps {
  selectedNotes: string[];
  onRemoveNote: (note: string) => void;
  onSelectedNote: (note: string | null) => void;
  onUploadedNote: (file: File | null) => void;
}

export const SourceMaterialSection: React.FC<SourceMaterialProps> = ({
  selectedNotes,
  onRemoveNote,
  onSelectedNote,
  onUploadedNote,
}) => {
  const [file, setFile] = React.useState<File | null>(null);
  const [selectedNote, setSelectedNote] = React.useState<string>("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleNoteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const noteId = e.target.value;

    setSelectedNote(noteId);

    const note = selectedNotes.find((item: any) => item.id === noteId);

    if (note) {
      onSelectedNote(note);
      setFile(null);
      onUploadedNote(null);
    } else {
      onSelectedNote(null);
    }
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // If a file is selected, remove note selection
      setSelectedNote("");
      onSelectedNote(null);
      setFile(selectedFile);
      onUploadedNote(selectedFile);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-6">
      <h2 className="text-xl font-bold text-gray-900">
        Select Source Material
      </h2>

      {/* From My Notes */}
      <div className="space-y-3">
        <label className="text-xs font-bold tracking-wider text-gray-500 uppercase">
          From My Notes
        </label>
        {/* <div> */}
        {/* <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" /> */}
        {/* <input
            type="text"
            placeholder="Search notes to include..."
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          /> */}
        <select
          value={selectedNote}
          onChange={handleNoteChange}
          className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-500 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
        >
          <option value="" className="text-gray-400">
            Select Note
          </option>
          {selectedNotes.map((note, index) => (
            <option key={note.id} value={note.id}>
              {note.title || note}
            </option>
          ))}
        </select>
        {/* </div> */}

        {/* Selected Note Tags */}
        {/* <div className="flex flex-wrap gap-2 pt-1">
          {selectedNotes.map((note, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100"
            >
              <FileText className="w-3.5 h-3.5" />
              {note.title || note}
              <button
                type="button"
                onClick={() => onRemoveNote(note)}
                className="hover:bg-indigo-100 p-0.5 rounded-full transition-colors ml-0.5"
              >
                <X className="w-3 h-3 text-indigo-500" />
              </button>
            </span>
          ))}
        </div> */}
      </div>

      {/* Divider */}
      <div className="relative flex items-center justify-center">
        <div className="border-t border-gray-200 w-full" />
        <span className="bg-white px-3 text-xs font-semibold text-gray-400 uppercase absolute">
          OR
        </span>
      </div>

      {/* Upload Documents Dropzone */}

      <input
        ref={fileInputRef}
        type="file"
        id="fileInput"
        onChange={handleChange}
        className="hidden"
      />
      <div className="space-y-2" onClick={() => fileInputRef.current?.click()}>
        {!file ? (
          <>
            <label className="text-xs font-bold tracking-wider text-gray-500 uppercase">
              Upload Documents
            </label>

            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 hover:border-indigo-300 transition-all cursor-pointer group">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xs border border-gray-100 group-hover:scale-105 transition-transform">
                <Upload className="w-5 h-5 text-indigo-600" />
              </div>
              <p className="mt-3 text-sm text-gray-600">
                Drag and drop files here, or{" "}
                <span className="font-semibold text-indigo-600 hover:underline">
                  browse
                </span>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Supports PDF, DOCX, TXT, Markdown (Max 10MB)
              </p>
            </div>
          </>
        ) : (
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 hover:border-indigo-300 transition-all cursor-pointer group">
            <p className="mt-3 text-sm font-medium text-indigo-600">
              Selected: {file.name}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
