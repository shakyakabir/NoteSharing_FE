import React from "react";

interface SimpleGroupProps {
  group: {
    title: string;
    memberCount: string;
    description: string;
    icon: string;
  };
}

export default function GroupCardSimple({ group }: SimpleGroupProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full min-h-[220px]">
      <div>
        {/* Header containing Subject Icon Box & Member status */}
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0 text-[#4F46E5]">
            {group.icon === "microscope" ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            )}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-base leading-tight">
              {group.title}
            </h3>
            <p className="text-[11px] text-gray-400 font-medium mt-0.5">
              {group.memberCount}
            </p>
          </div>
        </div>

        {/* Card Body Description */}
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
          {group.description}
        </p>
      </div>

      {/* Call to action element */}
      <button className="w-full mt-5 border border-gray-100 hover:border-indigo-100 bg-[#FAFAFE] hover:bg-indigo-50/50 text-[#4F46E5] text-xs font-semibold py-2.5 rounded-xl transition-all">
        Join Group
      </button>
    </div>
  );
}
