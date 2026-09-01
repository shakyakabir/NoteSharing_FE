// app/(user)/layout.tsx
// "use client";

// import React, { useState, useEffect } from "react";
// import { usePathname, useRouter } from "next/navigation";

// import { Menu, X } from "lucide-react";
// import { Sidebar } from "./components/Nav/AdminSidebar";
// import { Header } from "./components/Nav/Header";
// import { useGetAdminMeQuery } from "@/slices/Admin";
// export default function UserLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const pathname = usePathname();
//   const router = useRouter();

//   // Admin gate: /api/admin/me is ROLE_ADMIN-only, so a non-admin (or logged-out) request
//   // fails and we bounce to the app root. Backend stays the real guard; this is just UX.
//   const { data: admin, isLoading, isError } = useGetAdminMeQuery();

//   useEffect(() => {
//     if (isError) router.replace("/");
//   }, [isError, router]);

//   // Automatically close mobile sidebar when the route changes
//   useEffect(() => {
//     setIsSidebarOpen(false);
//   }, [pathname]);
//   // Lock body scroll and listen for 'Escape' key when mobile drawer is open
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "Escape") setIsSidebarOpen(false);
//     };

//     if (isSidebarOpen) {
//       document.body.style.overflow = "hidden";
//       window.addEventListener("keydown", handleKeyDown);
//     } else {
//       document.body.style.overflow = "";
//     }

//     return () => {
//       document.body.style.overflow = "";
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [isSidebarOpen]);

//   //While verifying, or once a non-admin has been bounced, render nothing (no admin chrome flash).
//   if (isLoading || isError || !admin) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-slate-50/50 text-sm text-slate-400">
//         Loading…
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen bg-slate-50/50 text-slate-900 antialiased">
//       {/* --- DESKTOP SIDEBAR --- */}
//       <aside className="hidden md:block w-64 shrink-0 border-r border-slate-200/80 bg-white">
//         <Sidebar />
//       </aside>

//       {/* --- MOBILE SIDEBAR (Drawer Overlay) --- */}
//       {isSidebarOpen && (
//         <div className="fixed inset-0 z-40 md:hidden flex">
//           {/* Backdrop */}
//           <div
//             className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
//             onClick={() => setIsSidebarOpen(false)}
//             aria-hidden="true"
//           />

//           {/* Drawer Container */}
//           <div className="relative w-64 bg-white h-full z-50 flex flex-col shadow-2xl animate-in slide-in-from-left duration-200">
//             {/* Close Trigger inside drawer header context */}
//             <button
//               onClick={() => setIsSidebarOpen(false)}
//               className="absolute top-4 right-3 z-50 text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-1.5 rounded-lg transition-colors"
//               aria-label="Close navigation menu"
//             >
//               <X size={18} />
//             </button>

//             <Sidebar />
//           </div>
//         </div>
//       )}

//       {/* --- MAIN WORKSPACE --- */}
//       <div className="flex flex-col flex-1 min-w-0">
//         {/* --- STICKY HEADER --- */}
//         <header className="h-16 border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-30 flex items-center px-4 md:px-8 justify-between gap-4">
//           {/* Mobile Menu Trigger */}
//           <button
//             onClick={() => setIsSidebarOpen(true)}
//             className="md:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
//             aria-label="Open Navigation Menu"
//           >
//             <Menu size={20} />
//           </button>

//           {/* Core Header Content */}
//           <div className="flex-1">
//             <Header admin={admin} />
//           </div>
//         </header>

//         {/* --- SCROLLABLE CONTAINER --- */}
//         <main className="flex-1 p-4 md:p-8 max-w-[1400px] w-full mx-auto">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

import { Sidebar } from "./components/Nav/AdminSidebar";
import { Header } from "./components/Nav/Header";
import { useGetAdminMeQuery } from "@/slices/Admin";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { data: admin, isLoading, isError } = useGetAdminMeQuery();

  // Protect admin pages
  useEffect(() => {
    if (isError) {
      router.replace("/");
    }
  }, [isError, router]);

  // Close mobile sidebar when navigating
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSidebarOpen]);

  // Don't flash admin UI before authentication is verified
  if (isLoading || isError || !admin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-sm text-slate-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      {/* Desktop sidebar */}
      <aside className="hidden md:block w-64 shrink-0">
        <Sidebar />
      </aside>

      {/* Mobile sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />

          {/* Drawer */}
          <aside className="relative z-10 h-full w-64 bg-white shadow-2xl">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="absolute right-3 top-4 z-20 rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <X size={18} />
            </button>

            <Sidebar />
          </aside>
        </div>
      )}

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 h-[100vh] overflow-hidden">
        <header className="h-16 border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-30 flex items-center px-4 md:px-8 justify-between gap-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Open Navigation Menu"
          >
            <Menu size={20} />
          </button>
          <div className="flex-1">
            <Header />
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 max-w-[1400px] overflow-y-auto w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

//   return (
//     <div className="flex min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-slate-200">
//       {/* --- DESKTOP SIDEBAR --- */}
//       <aside className="hidden md:block w-64 shrink-0 border-r border-slate-200/80 bg-white">
//         <Sidebar />
//       </aside>

//       {/* --- MOBILE SIDEBAR DRAWER --- */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 z-50 md:hidden flex"
//           role="dialog"
//           aria-modal="true"
//         >
//           {/* Backdrop */}
//           <div
//             className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-200 ease-out animate-in fade-in"
//             onClick={() => setIsSidebarOpen(false)}
//             aria-hidden="true"
//           />

//           {/* Drawer Sheet */}
//           <div className="relative w-64 bg-white h-full z-10 flex flex-col shadow-xl border-r border-slate-200/60 animate-in slide-in-from-left duration-200 ease-out">
//             <button
//               onClick={() => setIsSidebarOpen(false)}
//               className="absolute top-3.5 right-3 z-20 text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
//               aria-label="Close navigation menu"
//             >
//               <X size={18} />
//             </button>

//             <Sidebar />
//           </div>
//         </div>
//       )}

//       {/* --- MAIN WORKSPACE --- */}
//       <div className="flex flex-col flex-1 min-w-0 h-[95vh] overflow-hidden ">
//         {/* --- STICKY HEADER --- */}
//         <header className="h-16 border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-30 flex items-center px-4 md:px-8 justify-between gap-4">
//           <button
//             onClick={() => setIsSidebarOpen(true)}
//             className="md:hidden p-2 -ml-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
//             aria-label="Open Navigation Menu"
//           >
//             <Menu size={20} />
//           </button>

//           <div className="flex-1">
//             <Header admin={admin} />
//           </div>
//         </header>

//         {/* --- MAIN CONTENT AREA --- */}
//         <main className="flex-1 w-full max-w-[1400px] p-4 md:p-8 overflow-y-auto">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }
