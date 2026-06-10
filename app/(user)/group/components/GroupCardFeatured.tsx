import React from "react";

interface FeaturedGroupProps {
  group: {
    category: string;
    title: string;
    description: string;
    memberCount: string;
    imageSrc: string;
    isPopular: boolean;
    avatars: string[];
  };
}

export default function GroupCardFeatured({ group }: FeaturedGroupProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6 h-full">
      {/* Group Display Image Box */}
      <div className="relative w-full md:w-56 h-44 rounded-xl overflow-hidden bg-slate-900 flex-shrink-0">
        <img
          src={group.imageSrc}
          alt={group.title}
          className="w-full h-full object-cover opacity-80"
        />
        {group.isPopular && (
          <span className="absolute top-3 right-3 bg-[#4F46E5] text-[10px] tracking-wider font-extrabold text-white px-2 py-0.5 rounded-md uppercase">
            Popular
          </span>
        )}
      </div>

      {/* Group Card Details Content */}
      <div className="flex flex-col justify-between flex-grow py-1">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-[#4F46E5] rounded-lg">
              {group.category}
            </span>
            <div className="flex items-center gap-1 text-gray-400 text-xs font-medium">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              {group.memberCount}
            </div>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
            {group.title}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2 md:line-clamp-3">
            {group.description}
          </p>
        </div>

        {/* Footer info & action inside card */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
          {/* Stacked overlapping avatars */}
          <div className="flex -space-x-2 overflow-hidden">
            {group.avatars.map((av, idx) => (
              <div
                key={idx}
                className={`w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold shadow-sm ${
                  idx === 2
                    ? "bg-gray-100 text-gray-600"
                    : "bg-indigo-100 text-[#4F46E5]"
                }`}
              >
                {av}
              </div>
            ))}
          </div>
          <button className="text-sm font-semibold text-[#4F46E5] hover:text-[#4338CA] transition-colors">
            View Group
          </button>
        </div>
      </div>
    </div>
  );
}
