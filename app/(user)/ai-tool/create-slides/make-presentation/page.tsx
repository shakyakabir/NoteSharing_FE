"use client";
import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import SourceUploadSection from "../components/SourceUploadSection";
import ThemeCustomization from "../components/ThemeCustomization";
import GenerationControls from "../components/GenerationControls";
import RightSidebarPanels from "../components/RightSidebarPanels";
import { useCreatePresentationMutation } from "@/slices/Ai";
import Image from "next/image";
import { toast } from "sonner";

interface Slide {
  id: string;
  slideOrder: number;
  title: string;
  content: string;
  imageUrl?: string | null;
}

interface Presentation {
  id: string;
  title: string;
  theme: string;
  slides: Slide[];
}

export default function MakePresentationPage() {
  const [sourceContent, setSourceContent] = useState("");
  const [theme, setTheme] = useState("professional");
  const [slideCount, setSlideCount] = useState(10);
  const [includeImages, setIncludeImages] = useState(true);
  const [presentation, setPresentation] = useState<Presentation | null>(null);
  const [createPresentation, { isLoading, error }] =
    useCreatePresentationMutation();

  const handleGenerate = async () => {
    if (!sourceContent.trim()) return;

    const result = await createPresentation({
      title: "Generated Presentation",
      sourceContent,
      theme,
      slideCount,
      includeImages,
    }).unwrap();

    setPresentation(result);
  };

  return (
    <div className="min-h-screen bg-[#FCFCFE] flex flex-col lg:flex-row justify-between">
      <div className="flex-1 p-6 md:p-10 max-w-4xl mx-auto space-y-8 w-full">
        <div className="space-y-1">
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Make Presentation
          </h1>
          <p className="text-slate-400 text-xs font-medium">
            Transform your notes into professional slide decks in seconds.
          </p>
        </div>

        <div className="space-y-8">
          <SourceUploadSection
            value={sourceContent}
            onChange={setSourceContent}
          />
          <ThemeCustomization selectedTheme={theme} onThemeChange={setTheme} />
          <GenerationControls
            slideCount={slideCount}
            includeImages={includeImages}
            onSlideCountChange={setSlideCount}
            onIncludeImagesChange={setIncludeImages}
          />
        </div>

        <div className="border-t border-slate-100 pt-6 flex flex-col items-center gap-3">
          <button
            onClick={handleGenerate}
            disabled={isLoading || !sourceContent.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold text-xs px-8 py-3.5 rounded-xl transition shadow-md shadow-indigo-600/15 flex items-center justify-center space-x-2 w-full max-w-sm"
          >
            <Sparkles size={14} className="fill-white/10 animate-pulse" />
            <span>{isLoading ? "Generating..." : "Generate Presentation"}</span>
          </button>

          {error && (
            <p className="text-xs text-red-500 font-medium">
              Something went wrong generating your deck. Please try again.
            </p>
          )}
        </div>

        {(presentation?.slides?.length ?? 0) > 0 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-800">
              {presentation?.title}
            </h2>
            <h4>this is test</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {presentation?.slides.map((slide) => (
                <div
                  key={slide.id}
                  className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm flex flex-col"
                >
                  {/* {!slide.imageUrl && ( */}
                  <div className="w-full aspect-video bg-slate-50 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={
                        slide.imageUrl ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlGd6Q5s9ULcmteHaMHQuP9BkHKkIPiA-hHCo76283YQ&s"
                      }
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* )} */}

                  <div className="p-5 space-y-2">
                    <p className="text-xs font-bold text-indigo-600">
                      Slide {slide.slideOrder}
                    </p>
                    <h3 className="text-sm font-bold text-slate-800">
                      {slide.title}
                    </h3>

                    <div className="text-xs text-slate-500 whitespace-pre-line leading-relaxed">
                      {slide.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <RightSidebarPanels />
    </div>
  );
}
