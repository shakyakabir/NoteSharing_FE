"use client";
import React, { useState } from "react";

interface GenerationControlsProps {
  slideCount?: number;
  includeImages?: boolean;
  onSlideCountChange?: (count: number) => void;
  onIncludeImagesChange?: (includeImages: boolean) => void;
}

export default function GenerationControls({
  slideCount: controlledSlideCount,
  includeImages: controlledIncludeImages,
  onSlideCountChange,
  onIncludeImagesChange,
}: GenerationControlsProps) {
  const [localSlideCount, setLocalSlideCount] = useState(10);
  const [localIncludeImages, setLocalIncludeImages] = useState(true);
  const slideCount = controlledSlideCount ?? localSlideCount;
  const includeImages = controlledIncludeImages ?? localIncludeImages;

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
      {/* Slide Count Selectors */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-600 block">
          Slide Count
        </label>
        <div className="flex items-center space-x-2 bg-white border border-slate-100 p-1 rounded-xl w-max">
          {[5, 10, 15].map((count) => (
            <button
              key={count}
              type="button"
              onClick={() => {
                setLocalSlideCount(count);
                onSlideCountChange?.(count);
              }}
              className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all ${
                slideCount === count
                  ? "bg-indigo-50 text-indigo-600 font-bold border border-indigo-100/50"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {count} slides
            </button>
          ))}
        </div>
      </div>

      {/* AI Image Generation Toggle Element */}
      <div className="bg-indigo-50/40 border border-indigo-50/70 p-4 rounded-2xl flex items-center justify-between min-w-[260px]">
        <div className="space-y-0.5">
          <h4 className="text-xs font-bold text-slate-800">
            Include AI Images
          </h4>
          <p className="text-[10px] text-slate-400">
            Auto-generate relevant visuals
          </p>
        </div>

        {/* Toggle Switch */}
        <button
          type="button"
          onClick={() => {
            setLocalIncludeImages(!includeImages);
            onIncludeImagesChange?.(!includeImages);
          }}
          className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors duration-200 focus:outline-none ${
            includeImages ? "bg-indigo-600" : "bg-slate-200"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-200 ${
              includeImages ? "translate-x-4" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
