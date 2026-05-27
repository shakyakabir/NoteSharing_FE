import React from "react";

import { Edit2, MessageSquare, Award } from "lucide-react";

export interface ActivityItemProps {
  type: "edit" | "comment" | "badge";
  text: React.ReactNode;
  time: string;
}

export default function ActivityItem({ type, text, time }: ActivityItemProps) {
  const getIcon = () => {
    switch (type) {
      case "edit":
        return (
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-full">
            <Edit2 size={16} />
          </div>
        );
      case "comment":
        return (
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-full">
            <MessageSquare size={16} />
          </div>
        );
      case "badge":
        return (
          <div className="p-2 bg-amber-50 text-amber-500 rounded-full">
            <Award size={16} />
          </div>
        );
    }
  };

  return (
    <div className="flex items-start space-x-4 py-3.5 border-b border-gray-50 last:border-0">
      {getIcon()}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-700 font-medium leading-relaxed">
          {text}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">{time}</p>
      </div>
    </div>
  );
}
