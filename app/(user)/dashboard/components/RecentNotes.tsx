import React from "react";
import { FileCode, Layers, Users } from "lucide-react";

export default function RecentNotes() {
  const notes = [
    {
      title: "Advanced Quantum Computing Basics",
      time: "Last edited 2 hours ago",
      views: "15.4k views",
      tags: [
        { name: "Science", color: "bg-indigo-50 text-indigo-600" },
        { name: "Premium", color: "bg-amber-50 text-amber-700" },
      ],
      icon: <Layers className="w-5 h-5 text-slate-400" />,
    },
    {
      title: "Strategic Marketing Playbook 2024",
      time: "Last edited 5 hours ago",
      views: "3.2k views",
      tags: [{ name: "Business", color: "bg-indigo-50 text-indigo-600" }],
      icon: <FileCode className="w-5 h-5 text-slate-400" />,
    },
    {
      title: "Team Onboarding Document",
      time: "Last edited yesterday",
      views: "840 views",
      tags: [{ name: "Internal", color: "bg-slate-100 text-slate-600" }],
      icon: <Users className="w-5 h-5 text-slate-400" />,
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-md font-semibold text-slate-800">Recent Notes</h2>
        <button className="text-xs font-medium text-amber-600 hover:underline">
          View All
        </button>
      </div>
      <div className="divide-y divide-slate-100">
        {notes.map((note, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-4 first:pt-0 last:pb-0 gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
                {note.icon}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-800 hover:text-amber-600 cursor-pointer">
                  {note.title}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  {note.time} • {note.views}
                </p>
              </div>
            </div>
            <div className="flex gap-1.5 flex-shrink-0">
              {note.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${tag.color}`}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
