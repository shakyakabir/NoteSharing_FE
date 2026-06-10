import React from "react";

export default function TopContributors() {
  const contributors = [
    { name: "Jane Doe", notes: "42 Notes", avatar: "JD", color: "bg-sky-500" },
    {
      name: "Mark Smith",
      notes: "38 Notes",
      avatar: "MS",
      color: "bg-indigo-400",
    },
    {
      name: "Alex Rivera (You)",
      notes: "31 Notes",
      avatar: "AR",
      color: "bg-amber-600",
      isUser: true,
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      <h3 className="text-md font-semibold text-slate-800 mb-4">
        Top Contributors
      </h3>
      <div className="space-y-4">
        {contributors.map((person, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full ${person.color} flex items-center justify-center text-[11px] font-bold text-white`}
              >
                {person.avatar}
              </div>
              <span
                className={`text-xs font-medium ${person.isUser ? "text-amber-700 font-semibold" : "text-slate-700"}`}
              >
                {person.name}
              </span>
            </div>
            <span className="text-xs text-slate-400">{person.notes}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
