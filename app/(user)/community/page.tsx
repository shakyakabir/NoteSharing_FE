"use client";
import React, { useState } from "react";
import CreatePostInput from "./components/CreatePostInput";
import CommunityPostCard from "./components/CommunityPostCard";

export default function CommunityFeedPage() {
  const [activeFilter, setActiveFilter] = useState<"Newest" | "Popular">(
    "Newest",
  );

  const samplePosts = [
    {
      id: 1,
      authorName: "Sarah Jenkins",
      authorImage:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      timeAgo: "2 hours ago",
      tag: "Computer Science",
      title: "Struggling with Dijkstra's Algorithm Complexity",
      content:
        "Does anyone have a good visualization or a simpler way to understand why the time complexity is O((V+E) log V) when using a binary heap? I'm preparing for the midterms and this specific part is tripping me up. Any help or recommended notes would be amazing!",
      likes: 24,
      commentsCount: 8,
      hasLiked: false,
    },
    {
      id: 2,
      authorName: "Marcus Knight",
      authorImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      timeAgo: "5 hours ago",
      tag: "Economics",
      title: "Discussion: Impact of Fintech on Traditional Banking",
      content:
        "I just uploaded my summary of the latest lecture on decentralised finance. I'm curious—do you think the curriculum is keeping up with how fast the industry is moving? Let's discuss in the comments!",
      likes: 112,
      commentsCount: 45,
      hasLiked: true,
    },
    {
      id: 3,
      authorName: "Alex Rivera",
      authorImage: "", // Empty path triggers custom placeholder system design variant
      timeAgo: "Yesterday",
      tag: "Biochemistry",
      title: "Help needed for Lab Report #4",
      content:
        "Looking for someone who attended the Thursday afternoon lab session. I missed the part about titration results for sample C. Can anyone share their data points? Happy to trade for my Bio-Chem flashcards!",
      likes: 5,
      commentsCount: 2,
      hasLiked: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFD] p-4 md:p-8 max-w-2xl mx-auto space-y-6">
      {/* Create Help Request Post Header Wrapper */}
      <CreatePostInput />

      {/* Filter Options Nav Header Line */}
      <div className="flex items-center justify-between pt-2">
        <h2 className="text-base font-extrabold text-slate-800 tracking-tight">
          Community Feed
        </h2>
        <div className="bg-[#EFEFFA]/50 p-1 rounded-xl flex items-center space-x-1">
          {(["Newest", "Popular"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                activeFilter === filter
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Chronological Posts Loop List Stack Container */}
      <div className="space-y-4">
        {samplePosts.map((post) => (
          <CommunityPostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}
