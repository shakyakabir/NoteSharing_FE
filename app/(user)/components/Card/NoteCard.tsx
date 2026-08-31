"use client";
import React from "react";
import {
  ThumbsUp,
  MessageSquare,
  Bookmark,
  BookOpen,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";

export interface NoteCardProps {
  id?: string;
  category?: string;
  title: string;
  content?: string;
  authorName?: string;
  authorImage?: string;
  createdAt?: string;
  likes?: number;
  comments?: number;
  isBookmarked?: boolean;
}

export default function NoteCard({
  id,
  category = "General",
  title,
  content = "",
  authorName = "Anonymous",
  authorImage,
  createdAt,
  likes = 0,
  comments = 0,
  isBookmarked = false,
}: NoteCardProps) {
  const router = useRouter();

  const handleDetail = () => {
    router.push(`/discover/${id}`);
  };

  return (
    <div
      onClick={handleDetail}
      className="w-full max-w-sm bg-white border border-indigo-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all duration-200 group cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Top Header: Category Pill & Top-Right Icon */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-medium border border-indigo-100/50">
            {category}
          </span>

          <div className="w-8 h-8 rounded-full bg-slate-100/80 flex items-center justify-center text-slate-500">
            <BookOpen size={14} />
          </div>
        </div>

        {/* Note Title */}
        <h3 className="font-bold text-slate-900 text-lg leading-tight tracking-tight line-clamp-2 mb-2 group-hover:text-indigo-600 transition-colors">
          {title}
        </h3>

        {/* Note Content Snippet */}
        <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-6">
          {content || "No preview description available for this note..."}
        </p>

        {/* Author Avatar & Metadata */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 overflow-hidden">
            {authorImage ? (
              <img
                src={authorImage}
                alt={authorName}
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={16} />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-800 truncate">
              {authorName}
            </p>
            <p className="text-[11px] text-slate-400">
              {createdAt &&
                new Date(createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Metrics & Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-slate-400 text-xs font-medium">
        <div className="flex items-center space-x-4">
          <button
            onClick={(e) => e.stopPropagation()}
            className="flex items-center space-x-1.5 hover:text-slate-600 transition-colors"
          >
            <ThumbsUp size={14} />
            <span>{likes}</span>
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="flex items-center space-x-1.5 hover:text-slate-600 transition-colors"
          >
            <MessageSquare size={14} />
            <span>{comments}</span>
          </button>
        </div>

        <button
          onClick={(e) => e.stopPropagation()}
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
  );
}
