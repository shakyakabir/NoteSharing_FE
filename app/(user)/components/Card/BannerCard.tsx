import React from "react";

export default function Banner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-2xl p-8 text-white flex flex-col md:flex-row justify-between items-center gap-6 mt-6">
      <div className="max-w-md z-10">
        <span className="bg-indigo-400/50 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
          New Feature
        </span>
        <h2 className="text-2xl font-bold mt-3 mb-2 leading-tight">
          Collaborative Study Sessions are here!
        </h2>
        <p className="text-sm text-indigo-100 leading-relaxed">
          Study with friends in real-time, share live annotations, and quiz each
          other on the go. Level up your learning experience together.
        </p>
        <button className="mt-5 bg-white text-indigo-600 font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-indigo-50 transition-colors shadow-sm">
          Try Session Live
        </button>
      </div>

      {/* Decorative Mockup Graphics from the Image */}
      <div className="relative w-full max-w-[280px] aspect-[16/9] bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 shadow-lg">
        <div className="flex items-center -space-x-2">
          <div className="w-7 h-7 rounded-full bg-amber-400 border-2 border-indigo-500" />
          <div className="w-7 h-7 rounded-full bg-sky-400 border-2 border-indigo-500" />
          <div className="w-7 h-7 rounded-full bg-emerald-400 border-2 border-indigo-500" />
          <span className="text-[10px] text-indigo-100 font-medium ml-4">
            +12 others online
          </span>
        </div>
        <div className="w-4/5 h-2 bg-white/20 rounded mt-4" />
        <div className="w-1/2 h-2 bg-white/20 rounded mt-2" />
      </div>
    </div>
  );
}
