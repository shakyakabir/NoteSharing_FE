"use client";
import React, { useState } from "react";
import {
  Home,
  Compass,
  FileText,
  Users,
  HelpCircle,
  Sparkles,
  Plus,
  MessageSquare,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/app/components/ui/Button";

export default function Sidebar() {
  const pathname = usePathname();
  const [openTools, setOpenTools] = useState(false);
  const menuItems = [
    {
      icon: <Home size={18} />,
      label: "Dashboard",

      link: "/dashboard",
    },
    { icon: <Compass size={18} />, label: "Discover", link: "/discover" },
    { icon: <FileText size={18} />, label: "My Notes", link: "/note" },
    { icon: <Users size={18} />, label: "Groups", link: "/group" },
    { icon: <HelpCircle size={18} />, label: "Quiz", link: "/quiz" },

    {
      icon: <MessageSquare size={18} />,
      label: "Community",
      link: "/community",
    },
  ];

  const AiTool = [
    { label: "Summarizer", link: "/ai-tool/summarizer" },
    { label: "Create Slide", link: "/ai-tool/create-slides" },
    { label: "Notes Writer", link: "/all-tools/writer" },
    { label: "Flashcards", link: "/all-tools/flashcards" },
  ];

  return (
    <aside className="w-64 border-r border-gray-100 bg-white h-screen fixed left-0 top-0 flex flex-col justify-between p-6">
      <div>
        <div className="text-xl font-bold text-indigo-600 mb-8 px-2">
          NoteShare
        </div>
        <nav className="space-y-1">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === item.link
                  ? "bg-indigo-50 text-indigo-600 "
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Link
                href={item.link}
                className="flex items-center text-sm space-x-3"
              >
                {item.icon}
                <span className="text-[13px]">{item.label}</span>
              </Link>
            </button>
          ))}

          <div>
            <Button
              variant="primary"
              size="sm"
              className="w-full mt-2"
              onClick={() => setOpenTools(!openTools)}
            >
              <div className="flex justify-between item-center pt-1 pb-1">
                <div className="flex items-center space-x-3">
                  <Sparkles size={18} />
                  <span className="text-[13px]">AI Tools</span>
                </div>

                {openTools ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </div>
            </Button>

            {openTools && (
              <div className="mt-2 space-y-1 pl-8">
                {AiTool.map((tool, idx) => (
                  <Link
                    key={idx}
                    href={tool.link}
                    className={`block px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-900 ${
                      pathname === tool.link
                        ? "text-indigo-600 bg-indigo-50"
                        : ""
                    }`}
                  >
                    {tool.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>
      <button className="w-full bg-indigo-600 text-white font-medium py-2.5 rounded-lg text-sm hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2">
        <Plus size={16} />
        <span>New Note</span>
      </button>
    </aside>
  );
}
