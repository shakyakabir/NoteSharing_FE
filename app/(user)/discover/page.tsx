"use client";
import React from "react";
import { SlidersHorizontal, Sliders } from "lucide-react";
import NoteCard, { NoteCardProps } from "../components/Card/NoteCard";
import { useGetPublicNotesQuery } from "@/slices/Note";

export default function DiscoverNotesPage() {
  const notesMockData: NoteCardProps[] = [
    {
      category: "Computer Science",
      categoryBg: "bg-indigo-50",
      categoryText: "text-indigo-600",
      hasAiSummary: true,
      title: "Mastering Data Structures: Comprehensive Guide to Linked Lists",
      authorName: "Alex Chen",
      authorImage:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80",
      timeAgo: "2 hours ago",
      likes: 124,
      comments: 18,
    },
    {
      category: "Biology",
      categoryBg: "bg-emerald-50",
      categoryText: "text-emerald-600",
      hasAiSummary: true,
      title:
        "Cellular Respiration: The Krebs Cycle and Electron Transport Chain Processes",
      authorName: "Sarah Jenkins",
      authorImage:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
      timeAgo: "3 hours ago",
      likes: 89,
      comments: 12,
    },
    {
      category: "Psychology",
      categoryBg: "bg-purple-50",
      categoryText: "text-purple-600",
      hasAiSummary: false,
      title:
        "Introduction to Cognitive Behavioral Therapy: History & Structural Frameworks",
      authorName: "Marcus Thorne",
      authorImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
      timeAgo: "5 hours ago",
      likes: 210,
      comments: 42,
      isBookmarked: true,
    },
    {
      category: "Economics",
      categoryBg: "bg-amber-50",
      categoryText: "text-amber-600",
      hasAiSummary: true,
      title:
        "Global Trade Policies: Impact of Modern Tariffs on GDP Growth Dynamics",
      authorName: "Elena Rossi",
      authorImage:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
      timeAgo: "6 hours ago",
      likes: 56,
      comments: 4,
    },
    {
      category: "Chemistry",
      categoryBg: "bg-sky-50",
      categoryText: "text-sky-600",
      hasAiSummary: false,
      title:
        "Organic Chemistry: Synthesis Mechanisms of Alcohols and Carbonyl Derivates",
      authorName: "Liam O'Brien",
      authorImage:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
      timeAgo: "8 hours ago",
      likes: 342,
      comments: 51,
    },
    {
      category: "Art History",
      categoryBg: "bg-rose-50",
      categoryText: "text-rose-600",
      hasAiSummary: true,
      title:
        "The Renaissance Revolution: Analysis of Light & Linear Perspective Shifts",
      authorName: "Isabella Gomez",
      authorImage:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80",
      timeAgo: "9 hours ago",
      likes: 178,
      comments: 29,
    },
  ];

  const { data } = useGetPublicNotesQuery();

  return (
    <div className="space-y-8">
      {/* Header section with Filter controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Discover Notes
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Explore high-quality study materials shared by the community.
          </p>
        </div>

        {/* Desktop Filtering UI Group buttons */}
        <div className="flex items-center space-x-3 text-xs font-semibold text-slate-600 self-start sm:self-auto">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-100 rounded-xl hover:bg-slate-50 shadow-sm transition-colors">
            <SlidersHorizontal size={14} className="text-slate-400" />
            <span>Filters</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-100 rounded-xl hover:bg-slate-50 shadow-sm transition-colors">
            <Sliders size={14} className="text-slate-400" />
            <span>Latest</span>
          </button>
        </div>
      </div>

      {/* Main Grid Framework layout stream */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((note, index) => (
          <NoteCard key={index} {...note} />
        ))}
      </div>

      {/* End Infinite Scroll Indicator Loader element */}
      <div className="flex flex-col items-center justify-center pt-8 pb-4 space-y-3">
        <div className="w-48 h-1 bg-slate-100 rounded-full overflow-hidden relative">
          <div className="absolute top-0 left-0 h-full w-20 bg-indigo-600 rounded-full animate-infinite-loading" />
        </div>
        <p className="text-xs text-slate-400 font-medium">
          Loading more community insights...
        </p>
      </div>
    </div>
  );
}
