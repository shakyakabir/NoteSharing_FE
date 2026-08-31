"use client";
import { RootState } from "@/lib/store";
import { Upload } from "lucide-react";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
interface ReferenceProps {
  referenceFile: (file: File | null) => void;
}
export const ReferenceReportSection: React.FC<ReferenceProps> = ({
  referenceFile,
}) => {
  const profile = useSelector((state: RootState) => state.profile.profile);
  const [enabled, setEnabled] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  console.log(profile, "profile");
  const handleToggle = () => {
    // If user is trying to enable it
    if (!enabled && profile?.subscriptionTier !== "PREMIUM") {
      toast.error("You need a Premium subscription to use a reference report.");
      return;
    }

    setEnabled((prev) => !prev);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileValue = e.target.files?.[0];
    if (!fileValue) return;
    setFile(fileValue);
    referenceFile(fileValue);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-gray-900">
          Use a Reference Report{" "}
          <span className="text-gray-400 font-normal">(Optional)</span>
        </h3>
        <button
          type="button"
          onClick={handleToggle}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            enabled ? "bg-indigo-600" : "bg-gray-200"
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
              enabled ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>
      <p className="text-xs text-gray-500">
        Select an existing report to mimic its style and structure.
      </p>
      {enabled ? (
        <>
          <input
            ref={fileInputRef}
            type="file"
            id="fileInput"
            onChange={handleChange}
            className="hidden"
          />
          <div
            className="space-y-2"
            onClick={() => fileInputRef.current?.click()}
          >
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
        </>
      ) : null}
    </div>
  );
};
