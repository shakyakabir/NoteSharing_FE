"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import NoteCard from "../../components/Card/NoteCard";

export default function TailoredAssessments() {
  const assessmentNotes = [
    {
      category: "Advanced React Patterns",
      categoryBg: "bg-indigo-50",
      categoryText: "text-indigo-600",
      hasAiSummary: true,
      title: "Source: Modern Physics Lec 4",
      authorName: "12 Items Available",
      authorImage:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
      timeAgo: "+80 PTS Reward",
      likes: 142,
      comments: 24,
      isBookmarked: true,
    },
    {
      category: "Python Data Structures",
      categoryBg: "bg-emerald-50",
      categoryText: "text-emerald-600",
      hasAiSummary: true,
      title: "Source: Semester Summary",
      authorName: "8 Items Available",
      authorImage:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      timeAgo: "+30 PTS Reward",
      likes: 98,
      comments: 12,
    },
    {
      category: "Cloud Infrastructure",
      categoryBg: "bg-amber-50",
      categoryText: "text-amber-600",
      hasAiSummary: false,
      title: "Source: Heap vs Stack",
      authorName: "20 Items Available",
      authorImage:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150",
      timeAgo: "+50 PTS Reward",
      likes: 215,
      comments: 43,
    },
  ];

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-xl font-extrabold text-slate-800">
            Tailored Assessments
          </h2>
          <p className="text-slate-400 text-xs mt-0.5">
            Refining weak points based on recent analysis.
          </p>
        </div>
        <button className="inline-flex items-center space-x-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition">
          <span>View Full Library</span>
          <ArrowRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {assessmentNotes.map((note, index) => (
          <NoteCard key={index} {...note} />
        ))}
      </div>
    </section>
  );
}
