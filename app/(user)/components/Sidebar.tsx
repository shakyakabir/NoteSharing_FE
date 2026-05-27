import React from "react";
import {
  Home,
  Compass,
  FileText,
  Users,
  HelpCircle,
  Sparkles,
  Plus,
} from "lucide-react";

export default function Sidebar() {
  const menuItems = [
    { icon: <Home size={18} />, label: "Home", active: true },
    { icon: <Compass size={18} />, label: "Discover" },
    { icon: <FileText size={18} />, label: "My Notes" },
    { icon: <Users size={18} />, label: "Groups" },
    { icon: <HelpCircle size={18} />, label: "Quiz" },
    { icon: <Sparkles size={18} />, label: "All Tools" },
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
                item.active
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
      <button className="w-full bg-indigo-600 text-white font-medium py-2.5 rounded-lg text-sm hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2">
        <Plus size={16} />
        <span>New Note</span>
      </button>
    </aside>
  );
}
