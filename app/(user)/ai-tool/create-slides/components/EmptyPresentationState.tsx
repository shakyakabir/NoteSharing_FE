"use client";
import React from "react";
import { Plus, Presentation, Lightbulb, Star } from "lucide-react";

export default function EmptyPresentationState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center bg-[#FDFDFE] select-none">
      {/* 1. LAYERED CARDS GRAPHIC */}
      <div className="relative w-40 h-28 mb-6 flex items-center justify-center">
        {/* Back Card (Most Tilted/Faded) */}
        <div className="absolute w-28 h-20 bg-white border border-slate-200 rounded-xl shadow-sm rotate-[-8deg] translate-x-[-12px] translate-y-[-6px] opacity-40" />

        {/* Middle Card */}
        <div className="absolute w-28 h-20 bg-white border border-slate-200 rounded-xl shadow-sm rotate-[-4deg] translate-x-[-4px] translate-y-[-3px] opacity-75" />

        {/* Front Featured Card */}
        <div className="absolute w-28 h-20 bg-white border-2 border-indigo-400 rounded-xl shadow-md flex items-center justify-center transform transition-transform duration-300 hover:scale-105">
          <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Plus size={16} className="stroke-[3]" />
          </div>
        </div>
      </div>

      {/* 2. TEXT HEADINGS CONTAINER */}
      <div className="space-y-3 max-w-sm mb-6">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">
          Your Presentation Library is empty
        </h2>
        <p className="text-slate-400 text-xs leading-relaxed font-medium">
          You haven't generated any AI slide decks yet. Transform your study
          notes into professional presentations in seconds.
        </p>
      </div>

      {/* 3. PRIMARY CTA BUTTON */}
      <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-5 py-3 rounded-xl transition-colors duration-200 shadow-md shadow-indigo-600/10 flex items-center justify-center space-x-2 mb-6">
        <Presentation size={15} />
        <span>Create New Presentation</span>
      </button>

      {/* 4. FOOTER INFORMATIONAL META INFO */}
      <div className="space-y-3">
        {/* Template Quicklink Link text */}
        <button className="flex items-center justify-center space-x-1.5 text-xs text-indigo-500 font-semibold hover:text-indigo-600 hover:underline transition-all">
          <Lightbulb size={13} />
          <span>Need inspiration? Check out our quick-start templates</span>
        </button>

        {/* Tip Badge info text element */}
        <div className="flex items-center justify-center space-x-1.5 text-[11px] text-slate-400 font-medium">
          <Star size={12} className="text-indigo-500 fill-indigo-500/20" />
          <span>
            <strong className="text-slate-500 font-semibold">Tip:</strong> Earn
            more AI points by completing your weekly study goals.
          </span>
        </div>
      </div>
    </div>
  );
}
