"use client";
import React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface BreadcrumbsProps {
  toolName: string; // Dynamic text value passed from the parent tool page
}

export default function ToolBreadcrumbs({ toolName }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center space-x-1.5 text-[10px] font-black tracking-widest uppercase text-slate-400 select-none">
      {/* Clicking "All Tools" brings them back to the macro overview hub page */}
      <Link
        href="/all-tools"
        className="hover:text-indigo-600 hover:underline transition-all duration-150"
      >
        All Tools
      </Link>

      {/* Separator Chevron Icon Asset */}
      <ChevronRight size={10} className="text-slate-300 stroke-[3]" />

      {/* The current, active dropdown tool name style state */}
      <span className="text-indigo-600 font-extrabold">{toolName}</span>
    </nav>
  );
}
