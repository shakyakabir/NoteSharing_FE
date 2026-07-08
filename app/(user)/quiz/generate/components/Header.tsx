import React from "react";
import { Zap } from "lucide-react";

export default function Header() {
  return (
    <div className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs tracking-wider uppercase mb-1">
          <Zap className="w-4 h-4 fill-indigo-600" /> AI Quiz Generator
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Transform Notes into Knowledge
        </h1>
        <p className="text-sm md:text-base text-slate-500 mt-1 max-w-xl">
          Deepen your understanding by converting any learning material into an
          interactive challenge.
        </p>
      </div>
      <div className="text-xs text-slate-400 self-end md:self-auto flex items-center gap-1.5 font-medium">
        Powered by{" "}
        <span className="text-emerald-600 font-semibold">NoteShare AI</span>
        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
      </div>
    </div>
  );
}
