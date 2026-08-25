import React from "react";
import { Search, Bell, User } from "lucide-react";
import type { AdminMe } from "@/slices/Admin";

export const Header = ({ admin }: { admin?: AdminMe }) => {
  return (
    <header className="h-16 border-b border-slate-100 px-8 flex items-center justify-between bg-white/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-slate-50 text-sm text-slate-700 pl-9 pr-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 border border-transparent focus:border-indigo-200 transition-all placeholder:text-slate-400"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        {admin && (
          <div className="hidden sm:flex flex-col items-end leading-tight">
            <span className="text-sm font-semibold text-slate-700">
              {admin.name}
            </span>
            <span className="text-xs text-slate-400">{admin.email}</span>
          </div>
        )}
        <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition-colors">
          <User className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
