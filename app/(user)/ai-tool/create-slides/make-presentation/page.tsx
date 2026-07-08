"use client";
import React from "react";
import { Sparkles } from "lucide-react";
import SourceUploadSection from "../components/SourceUploadSection";
import ThemeCustomization from "../components/ThemeCustomization";
import GenerationControls from "../components/GenerationControls";
import RightSidebarPanels from "../components/RightSidebarPanels";

export default function MakePresentationPage() {
  return (
    <div className="min-h-screen bg-[#FCFCFE] flex flex-col lg:flex-row justify-between">
      {/* Main Form Fields Workspace Column Viewport */}
      <div className="flex-1 p-6 md:p-10 max-w-4xl mx-auto space-y-8 w-full">
        {/* Workspace Headline Block Row */}
        <div className="space-y-1">
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Make Presentation
          </h1>
          <p className="text-slate-400 text-xs font-medium">
            Transform your notes into professional slide decks in seconds.
          </p>
        </div>

        {/* Input Pipeline Flow Stack */}
        <div className="space-y-8">
          <SourceUploadSection />
          <ThemeCustomization />
          <GenerationControls />
        </div>

        {/* Form Submission Action Trigger row block element */}
        <div className="border-t border-slate-100 pt-6 flex justify-center">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-8 py-3.5 rounded-xl transition shadow-md shadow-indigo-600/15 flex items-center justify-center space-x-2 w-full max-w-sm">
            <Sparkles size={14} className="fill-white/10 animate-pulse" />
            <span>Generate Presentation</span>
          </button>
        </div>
      </div>

      {/* Context Panels Utility Section Right Column */}
      <RightSidebarPanels />
    </div>
  );
}
