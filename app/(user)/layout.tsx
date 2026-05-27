// app/(user)/layout.tsx
"use client";

import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { Menu, X } from "lucide-react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50/50 text-slate-900 antialiased">
      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="hidden md:block w-64 border-r border-slate-100 bg-white sticky top-0 h-screen shrink-0">
        <Sidebar />
      </aside>

      {/* --- MOBILE SIDEBAR (Drawer Overlay) --- */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div
            className="w-64 bg-white h-full relative p-1 animate-in slide-in-from-left duration-200"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
          >
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X size={18} />
            </button>
            <Sidebar />
          </div>
        </div>
      )}

      {/* --- MAIN WORKSPACE --- */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* --- STICKY HEADER --- */}
        <header className="h-16 border-b border-slate-100 bg-white sticky top-0 z-30 flex items-center px-4 md:px-8 justify-between gap-4">
          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            <Menu size={20} />
          </button>

          {/* Core Header Content */}
          <div className="flex-1">
            <Header />
          </div>
        </header>

        {/* --- SCROLLABLE CONTAINER --- */}
        <main className="flex-1 p-4 md:p-8 max-w-[1400px] w-full mx-auto overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
