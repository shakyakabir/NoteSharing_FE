import React from "react";
import { FileText, HelpCircle, Network } from "lucide-react";
import Link from "next/link";

export default function SmartActions() {
  const actions = [
    {
      label: "Summarize",
      icon: <FileText className="w-5 h-5 text-primary" />,
      link: "ai-tool/summarizer",
    },
    {
      label: "Generate Quiz",
      icon: <HelpCircle className="w-5 h-5 text-primary" />,
      link: "quiz",
    },
    {
      label: "Generate Report",
      icon: <Network className="w-5 h-5 text-primary" />,
      link: "ai-tool/report",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-amber-500 text-lg">✨</span>
        <h2 className="text-md font-semibold text-slate-800">Smart Actions</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {actions.map((action, i) => (
          <button
            key={i}
            className="flex flex-col items-center justify-center p-5 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all gap-2 group"
          >
            <Link href={action.link}>
              <div className="p-2 rounded-lg bg-white shadow-sm border border-slate-50 group-hover:scale-105 transition-transform">
                {action.icon}
              </div>
              <span className="text-xs font-medium text-slate-600">
                {action.label}
              </span>
            </Link>
          </button>
        ))}
      </div>
    </div>
  );
}
