import React from "react";
import { ThumbsUp, MessageSquare, Bookmark, Sparkles } from "lucide-react";

export interface NoteCardProps {
  category: string;
  categoryBg: string;
  categoryText: string;
  hasAiSummary: boolean;
  title: string;
  authorName: string;
  authorImage: string;
  timeAgo: string;
  likes: number;
  comments: number;
  isBookmarked?: boolean;
}

export default function NoteCard({
  category,
  categoryBg,
  categoryText,
  hasAiSummary,
  title,
  authorName,
  authorImage,
  timeAgo,
  likes,
  comments,
  isBookmarked = false,
}: NoteCardProps) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
      {/* Thumbnail Header Background Banner */}
      <div className="h-32 bg-slate-100 relative p-4 flex flex-col justify-between overflow-hidden">
        {/* Absolute placeholder abstract lines to mimic card preview art */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]" />

        {/* Category Badge */}
        <div>
          <span
            className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${categoryBg} ${categoryText}`}
          >
            {category}
          </span>
        </div>

        {/* AI Summary Badge */}
        {hasAiSummary && (
          <div className="self-end bg-white/80 backdrop-blur-sm border border-emerald-500/20 px-2 py-1 rounded-lg flex items-center space-x-1 text-[10px] font-bold text-emerald-700 shadow-sm">
            <Sparkles size={10} className="fill-emerald-600 text-emerald-600" />
            <span>AI Summary Available</span>
          </div>
        )}
      </div>

      {/* Main Metadata Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-slate-800 text-base leading-snug line-clamp-2 tracking-tight group-hover:text-indigo-600 transition-colors">
            {title}
          </h3>

          {/* Author Block */}
          <div className="flex items-center space-x-2.5 mt-4">
            <div className="w-7 h-7 rounded-full bg-slate-200 overflow-hidden shrink-0">
              <img
                src={authorImage}
                alt={authorName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-700 line-clamp-1">
                {authorName}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">{timeAgo}</p>
            </div>
          </div>
        </div>

        {/* Action Metrics Footer bar */}
        <div className="flex items-center justify-between border-t border-slate-50 mt-5 pt-3 text-slate-400 text-xs font-medium">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 hover:text-slate-600 transition-colors">
              <ThumbsUp size={14} />
              <span>{likes}</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-slate-600 transition-colors">
              <MessageSquare size={14} />
              <span>{comments}</span>
            </button>
          </div>
          <button
            className={`transition-colors p-1 rounded-md hover:bg-slate-50 ${
              isBookmarked
                ? "text-indigo-600 fill-indigo-600"
                : "hover:text-slate-600"
            }`}
          >
            <Bookmark size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
