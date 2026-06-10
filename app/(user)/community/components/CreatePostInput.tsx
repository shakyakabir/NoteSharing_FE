"use client";
import React from "react";
import { Plus } from "lucide-react";

export default function CreatePostInput() {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center space-x-4 shadow-sm">
      {/* Current User Avatar Placeholder */}
      <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
          alt="My Avatar"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Inline Text Input Area Container */}
      <div className="flex-1">
        <input
          type="text"
          placeholder="What's on your mind? Post a help request..."
          className="w-full bg-[#F5F6FA] border-0 rounded-xl px-4 py-2.5 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all"
        />
      </div>

      {/* Trigger Post Control Accent Button */}
      <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center space-x-1.5 shadow-sm">
        <Plus size={14} className="stroke-[3]" />
        <span>Post</span>
      </button>
    </div>
  );
}
