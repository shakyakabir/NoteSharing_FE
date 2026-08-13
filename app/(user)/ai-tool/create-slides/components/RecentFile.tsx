"use client";

import React from "react";
import { useGetPresentationsQuery } from "@/slices/Ai";
import { Clock, Layers, Sparkles, Image as ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RecentCreatedPpt() {
  const {
    data: presentations,
    isLoading,
    isError,
  } = useGetPresentationsQuery();
  const router = useRouter();
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-48 animate-pulse rounded-2xl bg-slate-100 border border-slate-200/60"
          />
        ))}
      </div>
    );
  }

  const handeClick = (presentationId: string) => {
    // Handle click event for the presentation card
    router.push(`/ai-tool/create-slides/${presentationId}`);
    console.log("Clicked presentation ID:", presentationId);
  };
  if (isError || !presentations || presentations.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center">
        <p className="text-sm text-slate-500">No recent presentations found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 w-full">
      {presentations.map((presentation: any) => {
        // Extract preview image from the first slide if available
        const firstSlideImage = presentation.slides?.[0]?.imageUrl;
        const slideCount = presentation.slides?.length || 0;

        return (
          <div
            key={presentation.id}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/10 cursor-pointer"
            onClick={() => handeClick(presentation.id)}
          >
            {/* Thumbnail Preview Header */}
            <div className="relative h-36 w-full overflow-hidden bg-slate-100">
              {firstSlideImage ? (
                <img
                  src={firstSlideImage}
                  alt={presentation.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-indigo-50/50 text-indigo-400">
                  <ImageIcon size={32} />
                </div>
              )}

              {/* Theme Badge */}
              {presentation.theme && (
                <span className="absolute top-3 left-3 rounded-full bg-slate-900/70 px-2.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-md uppercase tracking-wider">
                  {presentation.theme}
                </span>
              )}
            </div>

            {/* Card Content Body */}
            <div className="flex flex-1 flex-col justify-between p-4">
              <div>
                <h3 className="line-clamp-1 text-base font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                  {presentation.title || "Untitled Presentation"}
                </h3>
              </div>

              {/* Card Footer Details */}
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
                <div className="flex items-center space-x-1">
                  <Clock size={13} className="text-slate-400" />
                  <span>
                    {new Date(presentation.createdAt).toLocaleDateString(
                      undefined,
                      { month: "short", day: "numeric", year: "numeric" },
                    )}
                  </span>
                </div>

                <div className="flex items-center space-x-1 font-medium text-slate-600">
                  <Layers size={13} className="text-indigo-500" />
                  <span>{slideCount} slides</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
