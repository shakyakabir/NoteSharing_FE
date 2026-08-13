"use client";

import React, { useRef } from "react";
import {
  Lightbulb,
  Star,
  Sparkles,
  ArrowRight,
  Presentation,
} from "lucide-react";
import RecentCreatedPpt from "./RecentFile";

interface EmptyPresentationProps {
  handleOnClick: () => void;
}

export default function EmptyPresentationState({
  handleOnClick,
}: EmptyPresentationProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 300)}px`;
    textarea.style.overflowY = textarea.scrollHeight > 300 ? "auto" : "hidden";
  };

  return (
    <div className="flex min-h-[85vh] w-full flex-col items-center justify-center bg-gradient-to-b from-slate-50/50 via-white to-indigo-50/30 px-4 py-12 select-none">
      {/* 1. AI BADGE */}
      <div className="mb-6 flex items-center space-x-2 rounded-full border border-indigo-100 bg-indigo-50/80 px-3 py-1 text-xs font-medium text-indigo-700 shadow-sm backdrop-blur-sm">
        <Sparkles size={14} className="animate-pulse text-indigo-600" />
        <span>AI Presentation Generator</span>
      </div>

      {/* 2. TEXT HEADINGS CONTAINER */}
      <div className="mb-8 max-w-xl text-center space-y-3">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
          What would you like to present?
        </h2>
        <p className="mx-auto max-w-md text-sm sm:text-base text-slate-500 leading-relaxed">
          Type a topic or paste rough notes, and our AI will instantly structure
          an outline and generate styled slides.
        </p>
      </div>

      {/* 3. PRIMARY INPUT & CTA CARD */}
      <div className="mb-8 w-full max-w-2xl rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-xl shadow-indigo-500/5 transition-all focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/10">
        <textarea
          ref={textareaRef}
          onInput={handleInput}
          placeholder="Enter your topic, outline, or paste notes here..."
          className="w-full min-h-[100px] max-h-[300px] resize-none border-0 bg-transparent p-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-0 text-sm sm:text-base leading-relaxed overflow-hidden"
        />

        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
          <span className="text-xs text-slate-400 font-medium hidden sm:inline-block">
            Press Shift + Enter for new lines
          </span>
          <button
            onClick={handleOnClick}
            className="ml-auto inline-flex items-center space-x-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-[0.98] transition-all duration-150 cursor-pointer"
          >
            <span>Create Presentation</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* 4. FOOTER META INFO */}
      <div className="flex flex-col items-center space-y-3 text-center">
        <button className="group inline-flex items-center space-x-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-600 transition-all duration-200 cursor-pointer">
          <Lightbulb
            size={14}
            className="text-amber-500 group-hover:scale-110 transition-transform"
          />
          <span>Need inspiration? Check out our quick-start templates</span>
        </button>

        <div className="inline-flex items-center space-x-1.5 rounded-lg bg-slate-100/80 px-3 py-1 text-[11px] font-medium text-slate-500 border border-slate-200/50">
          <Star size={12} className="text-indigo-500 fill-indigo-500" />
          <span>
            <strong className="font-semibold text-slate-700">Tip:</strong> Earn
            more AI points by completing your weekly study goals.
          </span>
        </div>
      </div>

      {/* 5. RECENT PRESENTATIONS SECTION */}
      <div className="mt-16 w-full max-w-4xl border-t border-slate-200/60 pt-10">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Presentation size={20} className="text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-800">
              Recent Presentations
            </h3>
          </div>
        </div>

        <RecentCreatedPpt />
      </div>
    </div>
  );
}
