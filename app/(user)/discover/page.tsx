"use client";
import React from "react";
import { SlidersHorizontal, Sliders, FileText } from "lucide-react";
import NoteCard, { NoteCardProps } from "../components/Card/NoteCard";
import { useGetPublicNotesQuery } from "@/slices/Note";

// Backend response model
interface ApiNote {
  id: string;
  title: string;
  content: string;
  visibility: "PUBLIC" | "PRIVATE";
  shareCode: string | null;
  userEmail: string;
  createdAt: string;
  updatedAt: string;
}

export default function DiscoverNotesPage() {
  const { data: rawNotes, isLoading, isError } = useGetPublicNotesQuery();

  // Helper to extract a display name from email (e.g., "xiregev461")
  const formatAuthorName = (email: string) => {
    if (!email) return "Anonymous";
    return email.split("@")[0];
  };

  const stripHtml = (html: string) => {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, "").trim();
  };
  // Maps backend API response to match the new NoteCardProps structure
  const transformNoteData = (note: ApiNote): NoteCardProps => {
    return {
      id: note.id,
      title: note.title || "Untitled Note",
      content: stripHtml(note.content), // Passed to render the snippet preview text
      category: "General",
      authorName: formatAuthorName(note.userEmail),
      authorImage: `https://api.dicebear.com/7.x/identicon/svg?seed=${note.userEmail}`,
      createdAt: note.createdAt,
      likes: 0,
      comments: 0,
      isBookmarked: false,
    };
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header section with Filter controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Discover Notes
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Explore high-quality study materials shared by the community.
          </p>
        </div>

        {/* Desktop Filtering UI Group buttons */}
        <div className="flex items-center space-x-3 text-xs font-semibold text-slate-600 self-start sm:self-auto">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-xs transition-colors">
            <SlidersHorizontal size={14} className="text-slate-400" />
            <span>Filters</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-xs transition-colors">
            <Sliders size={14} className="text-slate-400" />
            <span>Latest</span>
          </button>
        </div>
      </div>

      {/* Main Grid Workspace */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-64 bg-slate-100 animate-pulse rounded-2xl border border-slate-200/60"
            />
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-12 bg-rose-50/50 rounded-2xl border border-rose-100">
          <p className="text-sm font-semibold text-rose-600">
            Failed to load public notes. Please try refreshing.
          </p>
        </div>
      ) : rawNotes?.length === 0 ? (
        <div className="text-center py-16 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
          <FileText className="mx-auto text-slate-300 mb-2" size={32} />
          <p className="text-sm font-semibold text-slate-600">
            No public notes found yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {rawNotes?.map((note: ApiNote) => (
            <NoteCard key={note.id} {...transformNoteData(note)} />
          ))}
        </div>
      )}
    </div>
  );
}
