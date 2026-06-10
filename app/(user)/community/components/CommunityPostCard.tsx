"use client";
import React from "react";
import {
  ThumbsUp,
  MessageSquare,
  MoreHorizontal,
  Share2,
  User,
} from "lucide-react";

interface PostCardProps {
  authorName: string;
  authorImage?: string;
  timeAgo: string;
  tag: string;
  title: string;
  content: string;
  likes: number;
  commentsCount: number;
  hasLiked?: boolean;
}

export default function CommunityPostCard({
  authorName,
  authorImage,
  timeAgo,
  tag,
  title,
  content,
  likes,
  commentsCount,
  hasLiked = false,
}: PostCardProps) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:border-slate-200/80 transition-colors space-y-4">
      {/* Post Identity Header Card Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {authorImage ? (
            <div className="w-9 h-9 rounded-xl bg-slate-100 overflow-hidden shrink-0">
              <img
                src={authorImage}
                alt={authorName}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-500 flex items-center justify-center shrink-0">
              <User size={16} />
            </div>
          )}

          <div className="min-w-0">
            <h4 className="text-xs font-bold text-slate-800 tracking-tight leading-none">
              {authorName}
            </h4>
            <p className="text-[10px] text-slate-400 font-medium mt-1">
              {timeAgo} <span className="mx-1 text-slate-300">•</span> {tag}
            </p>
          </div>
        </div>

        <button className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition">
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Main Content Body Container Block */}
      <div className="space-y-1.5">
        <h3 className="font-extrabold text-slate-800 text-sm leading-snug tracking-tight">
          {title}
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed font-normal">
          {content}
        </p>
      </div>

      {/* Action Metrics Interaction Footer Bar Layout */}
      <div className="flex items-center justify-between border-t border-slate-50 pt-3 text-slate-400 text-xs font-semibold">
        <div className="flex items-center space-x-3">
          {/* Like Interaction Option Button */}
          <button
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl transition ${
              hasLiked
                ? "bg-indigo-50 text-indigo-600 font-bold"
                : "hover:bg-slate-50 text-slate-400 hover:text-slate-600"
            }`}
          >
            <ThumbsUp
              size={13}
              className={hasLiked ? "fill-indigo-600 text-indigo-600" : ""}
            />
            <span>{likes}</span>
          </button>

          {/* Comment Counter Wrapper Trigger */}
          <button className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition">
            <MessageSquare size={13} />
            <span>{commentsCount} Comments</span>
          </button>
        </div>

        {/* Share Utility Control Icon Button */}
        <button className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-50 rounded-xl transition">
          <Share2 size={13} />
        </button>
      </div>
    </div>
  );
}
