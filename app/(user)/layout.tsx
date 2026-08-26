// app/(user)/layout.tsx
"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { Menu, X } from "lucide-react";
import { useGetUserProfileQuery } from "@/slices/Auth";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Session gate: this endpoint relies on the httpOnly accessToken cookie set at login.
  // If it fails (no/expired session), bounce to login. Backend is the real guard; this is UX only.
  const { data: user, isLoading, isError } = useGetUserProfileQuery();

  useEffect(() => {
    if (isError) router.replace("/login");
  }, [isError, router]);

  // Automatically close mobile sidebar when the route changes
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  // Lock body scroll and listen for 'Escape' key when mobile drawer is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSidebarOpen(false);
    };

    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSidebarOpen]);

  // While verifying, or once an unauthenticated user has been bounced, render nothing
  if (isLoading || isError || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50/50 text-sm text-slate-400">
        Loading…
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50/50 text-slate-900 antialiased">
      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="hidden md:block w-64 shrink-0 border-r border-slate-200/80 bg-white">
        <Sidebar />
      </aside>

      {/* --- MOBILE SIDEBAR (Drawer Overlay) --- */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => setIsSidebarOpen(false)}
            aria-hidden="true"
          />
          <div className="relative w-64 bg-white h-full z-50 flex flex-col shadow-2xl animate-in slide-in-from-left duration-200">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="absolute top-4 right-3 z-50 text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-1.5 rounded-lg transition-colors"
              aria-label="Close navigation menu"
            >
              <X size={18} />
            </button>
            <Sidebar />
          </div>
        </div>
      )}

      {/* --- MAIN WORKSPACE --- */}
      <div className="flex flex-col flex-1 min-w-0">
        <header className="h-16 border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-30 flex items-center px-4 md:px-8 justify-between gap-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Open Navigation Menu"
          >
            <Menu size={20} />
          </button>
          <div className="flex-1">
            <Header user={user} />
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 max-w-[1400px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
