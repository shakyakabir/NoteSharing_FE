"use client";

import React, { useState, useEffect } from "react";
import {
  Home,
  Compass,
  FileText,
  Users,
  HelpCircle,
  Sparkles,
  Plus,
  MessageSquare,
  ChevronDown,
  CreditCard,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUserAccess } from "@/hooks/access/useUserAccess";

export default function Sidebar() {
  const pathname = usePathname();
  const [openTools, setOpenTools] = useState(false);
  const { isPremium, isPremiumFeature } = useUserAccess();

  const menuItems = [
    { icon: <Home size={18} />, label: "Dashboard", link: "/dashboard" },
    { icon: <Compass size={18} />, label: "Discover", link: "/discover" },
    { icon: <FileText size={18} />, label: "My Notes", link: "/note" },
    { icon: <Users size={18} />, label: "Groups", link: "/group" },
    // { icon: <HelpCircle size={18} />, label: "Quiz", link: "/quiz" },
    { icon: <HelpCircle size={18} />, label: "Ai Credit", link: "/ai-credit" },
    {
      icon: <MessageSquare size={18} />,
      label: "Community",
      link: "/community",
    },
    {
      icon: <CreditCard size={18} />,
      label: "Subscription",
      link: "/subscription",
    },
  ];

  const aiTools = [
    { label: "Summarizer", link: "/ai-tool/summarizer", feature: "SUMMARIZE" },
    { label: "Create Slide", link: "/ai-tool/create-slides", feature: "PPT" },
    { label: "Report Generator", link: "/ai-tool/report", feature: "REPORT" },
    { label: "Quiz", link: "/quiz", feature: "QUIZ" },
  ];

  // Auto-expand AI tools dropdown if active route is inside AI tools
  useEffect(() => {
    if (aiTools.some((tool) => pathname === tool.link)) {
      setOpenTools(true);
    }
  }, [pathname]);

  return (
    <aside className="w-64 border-r border-gray-200/80 bg-slate-50/50 backdrop-blur-sm h-screen fixed left-0 top-0 flex flex-col justify-between p-4 z-40 select-none">
      <div>
        {/* Logo Header */}
        <div className="flex items-center space-x-2 px-3 py-3 mb-6">
          <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
            N
          </div>
          <span className="text-lg font-semibold tracking-tight text-slate-900">
            NoteShare
          </span>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.link;
            return (
              <Link
                key={item.link}
                href={item.link}
                className={`group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600 font-semibold"
                    : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span
                    className={`transition-colors ${
                      isActive
                        ? "text-indigo-600"
                        : "text-slate-400 group-hover:text-slate-600"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}

          {/* AI Tools Accent Section */}
          <div className="pt-3">
            <div className="rounded-xl bg-gradient-to-b from-indigo-50/60 to-purple-50/30 p-1.5 border border-indigo-100/60">
              <button
                type="button"
                onClick={() => setOpenTools(!openTools)}
                className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-white/80 transition-all shadow-2xs"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="p-1 rounded-md bg-indigo-600 text-white shadow-xs">
                    <Sparkles size={15} />
                  </div>
                  <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent font-bold">
                    AI Power Tools
                  </span>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-indigo-400 transition-transform duration-200 ${
                    openTools ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openTools && (
                <div className="mt-1 space-y-0.5 pt-1">
                  {aiTools.map((tool) => {
                    const isSubActive = pathname === tool.link;
                    const toolLocked = tool.feature
                      ? isPremiumFeature(tool.feature) && !isPremium
                      : false;
                    return (
                      <Link
                        key={tool.link}
                        href={tool.link}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          isSubActive
                            ? "bg-indigo-600 text-white font-semibold shadow-xs"
                            : "text-slate-600 hover:bg-white/60 hover:text-indigo-600"
                        }`}
                      >
                        <span>{tool.label}</span>
                        {toolLocked ? (
                          <span
                            className="flex items-center text-[10px] opacity-70"
                            title="Premium feature"
                          >
                            <Lock size={11} />
                          </span>
                        ) : (
                          <span className="text-[10px] opacity-70">AI</span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* Primary Action Button */}
      <div className="pt-4 border-t border-gray-100">
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-medium py-2.5 px-4 rounded-xl text-sm transition-all duration-150 shadow-sm hover:shadow flex items-center justify-center space-x-2">
          <Plus size={18} />
          <span>New Note</span>
        </button>
      </div>
    </aside>
  );
}
