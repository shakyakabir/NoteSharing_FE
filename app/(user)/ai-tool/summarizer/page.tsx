"use client";
import { Sparkles } from "lucide-react";
import TextInputArea from "../components/TextInputArea";
import UploadZone from "../components/UploadZone";
import Breadcrumbs from "../components/Breadcrumbs";
import { useState } from "react";
import { useSummarizeMutation } from "@/slices/Ai";

const Summarizer = () => {
  const [textInput, setTextInput] = useState("");
  const [summary, setSummary] = useState("");
  const [summarize, { isLoading: isProcessing }] = useSummarizeMutation();

  const handleGenerate = async () => {
    const result = await summarize({
      title: "Generated Summary",
      sourceContent: textInput,
      reportType: "SUMMARY",
    }).unwrap();

    setSummary(result?.content || "");
  };

  return (
    <div className="min-h-screen bg-[#F9FAFD] p-6 md:p-10 max-w-4xl mx-auto space-y-6">
      {/* Structural Meta Header Block Row */}
      <div className="space-y-2">
        <Breadcrumbs toolName={""} />
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          AI Tools Hub
        </h1>
        <p className="text-slate-400 text-xs max-w-2xl leading-relaxed">
          Enhance your learning experience with our suite of intelligent note
          processing tools. Use your points to unlock instant insights and
          automated organization.
        </p>
      </div>

      {/* Primary Configuration Panel Interface Card container */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
        {/* Module Subheader row containing pricing tags */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-50 pb-4">
          <div className="space-y-0.5">
            <h2 className="text-base font-bold text-slate-800 tracking-tight">
              Summarize Note
            </h2>
            <p className="text-slate-400 text-xs">
              Upload a document or paste text to generate an AI summary.
            </p>
          </div>

          <div className="self-start sm:self-auto bg-amber-50/60 border border-amber-100 px-3 py-1.5 rounded-xl flex items-center space-x-1.5 text-xs font-bold text-amber-700">
            <span>🪙</span>
            <span>50 pts / use</span>
          </div>
        </div>

        {/* Binary Choice Inputs Blocks: Drag drop zone + Custom textarea entry box formatting */}
        <div className="space-y-6">
          <UploadZone />

          <TextInputArea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
        </div>

        {/* Footer trigger submission action panel row */}
        <div className="flex justify-end pt-2">
          <button
            onClick={handleGenerate}
            disabled={isProcessing}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold text-xs px-5 py-3 rounded-xl transition flex items-center space-x-2 shadow-md shadow-indigo-600/10"
          >
            <span>
              {isProcessing ? "Processing Matrix..." : "Generate Summary"}
            </span>
            <Sparkles
              size={14}
              className={isProcessing ? "animate-spin" : "fill-white/20"}
            />
          </button>
        </div>
      </div>

      {summary && (
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-800 mb-3">
            Generated Summary
          </h2>
          <pre className="whitespace-pre-wrap text-xs leading-relaxed text-slate-600 font-sans">
            {summary}
          </pre>
        </div>
      )}
    </div>
  );
};
export default Summarizer;
