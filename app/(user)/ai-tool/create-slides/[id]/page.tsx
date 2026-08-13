"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  CheckCircle2,
  Sparkles,
  Quote as QuoteIcon,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Calendar,
  Grid,
  Presentation,
  Check,
} from "lucide-react";
import { useGetPresentationByIdQuery } from "@/slices/Ai";
import { useParams } from "next/navigation";

// ---------------------------------------------------------
// Types
// ---------------------------------------------------------

type VisualElement = {
  type: string;
  title?: string | null;
  content?: string | null;
  position?: string;
  data?: any;
};

type Layout = {
  type?: string;
  alignment?: string;
  contentPosition?: string;
  imagePosition?: "left" | "right" | "top" | "bottom" | "background" | null;
};

export type Slide = {
  id?: string;
  title?: string;
  subtitle?: string | null;
  content?: string | null;
  bullets?: string[];
  slideOrder?: number;
  slideType?: string;
  design?: string;
  layout?: Layout | null;
  visualElements?: VisualElement[] | null;
  imageUrl?: string | null;
  imagePrompt?: string | null;
};

type PresentationData = {
  id?: string;
  title?: string;
  slides?: Slide[];
};

// ---------------------------------------------------------
// Bullets Component
// ---------------------------------------------------------

function Bullets({ bullets }: { bullets?: string[] }) {
  if (!bullets || bullets.length === 0) return null;

  return (
    <ul className="space-y-3 mt-4">
      {bullets.map((bullet, index) => (
        <li
          key={index}
          className="flex items-start gap-3 text-slate-700 text-sm md:text-base leading-relaxed"
        >
          <div className="p-1 rounded-full bg-blue-50 text-blue-600 shrink-0 mt-0.5 border border-blue-200">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span>{bullet}</span>
        </li>
      ))}
    </ul>
  );
}

// ---------------------------------------------------------
// Visual Element Helper
// ---------------------------------------------------------

function firstElement(slide: Slide, type: string): VisualElement | undefined {
  return slide.visualElements?.find((element) => element.type === type);
}

// ---------------------------------------------------------
// PPT Canvas Slide Renderer
// ---------------------------------------------------------

function SlideRenderer({
  slide,
  totalSlides,
  currentIndex,
}: {
  slide: Slide;
  totalSlides?: number;
  currentIndex?: number;
}) {
  const type = slide.slideType || "content";
  const imagePos = slide.layout?.imagePosition;

  // PPT Footer Component
  const SlideFooter = () => (
    <div className="pt-3 mt-auto border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
      <div className="flex items-center gap-1.5 text-blue-600">
        <Sparkles className="w-3.5 h-3.5" />
        <span className="capitalize">{type} Slide</span>
      </div>
      {typeof currentIndex === "number" && typeof totalSlides === "number" && (
        <span className="text-slate-400 font-semibold">{currentIndex + 1}</span>
      )}
    </div>
  );

  // -------------------------------------------------------
  // 1. TITLE / SECTION SLIDE
  // -------------------------------------------------------
  if (type === "title" || type === "section") {
    return (
      <div className="w-full h-full flex flex-col justify-between p-10 md:p-14 bg-gradient-to-br from-slate-50 via-white to-blue-50/40 relative overflow-hidden">
        {/* Subtle Decorative Accents */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider w-fit">
          {type === "title" ? "Presentation" : "Section"}
        </div>

        <div className="my-auto max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {slide.title}
          </h1>

          <div className="w-16 h-1 bg-blue-600 rounded-full my-6" />

          {slide.subtitle && (
            <p className="text-slate-600 text-lg md:text-xl font-normal leading-relaxed">
              {slide.subtitle}
            </p>
          )}

          {slide.content && (
            <p className="text-slate-500 text-sm md:text-base mt-4 leading-relaxed">
              {slide.content}
            </p>
          )}
        </div>

        <SlideFooter />
      </div>
    );
  }

  // -------------------------------------------------------
  // 2. TIMELINE SLIDE
  // -------------------------------------------------------
  if (type === "timeline") {
    const items = firstElement(slide, "timeline")?.data?.items || [];

    return (
      <div className="w-full h-full flex flex-col justify-between p-8 md:p-12 bg-white">
        <div>
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <Calendar className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Timeline
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-8">
            {slide.title}
          </h2>

          <div className="relative mt-6">
            {/* Horizontal Timeline Connector Bar */}
            <div className="hidden md:block absolute top-1/2 left-4 right-4 h-0.5 bg-blue-100 -translate-y-1/2 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              {items.map((item: any, index: number) => (
                <div
                  key={index}
                  className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-blue-300 transition-all flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
                      {index + 1}
                    </span>
                    <span className="text-blue-600 font-extrabold text-lg">
                      {item.year}
                    </span>
                  </div>
                  <p className="text-slate-700 text-xs md:text-sm leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <SlideFooter />
      </div>
    );
  }

  // -------------------------------------------------------
  // 3. QUOTE SLIDE
  // -------------------------------------------------------
  if (type === "quote") {
    return (
      <div className="w-full h-full flex flex-col justify-between p-10 md:p-12 bg-amber-50/30">
        <div className="flex-1 flex flex-col items-center justify-center text-center max-w-3xl mx-auto my-auto">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-6 shadow-sm">
            <QuoteIcon className="w-6 h-6" />
          </div>

          <blockquote className="text-xl md:text-3xl font-serif text-slate-800 leading-snug font-medium italic">
            "{slide.content}"
          </blockquote>

          {slide.subtitle && (
            <div className="mt-6 flex items-center gap-2">
              <span className="h-px w-8 bg-amber-300" />
              <p className="text-slate-600 font-semibold text-sm">
                {slide.subtitle}
              </p>
              <span className="h-px w-8 bg-amber-300" />
            </div>
          )}
        </div>

        <SlideFooter />
      </div>
    );
  }

  // -------------------------------------------------------
  // 4. COMPARISON SLIDE
  // -------------------------------------------------------
  if (type === "comparison") {
    const columns = firstElement(slide, "comparison")?.data?.columns || [];

    return (
      <div className="w-full h-full flex flex-col justify-between p-8 md:p-12 bg-white">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-6">
            {slide.title}
          </h2>

          <div
            className="grid gap-6"
            style={{
              gridTemplateColumns: `repeat(${Math.max(
                columns.length,
                2,
              )}, minmax(0, 1fr))`,
            }}
          >
            {columns.map((column: any, index: number) => (
              <div
                key={index}
                className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col shadow-sm"
              >
                <div className="pb-3 mb-3 border-b border-slate-200 flex items-center justify-between">
                  <h3 className="text-blue-900 font-bold text-sm md:text-base">
                    {column.title || column.name || `Option ${index + 1}`}
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                </div>

                <ul className="space-y-2.5">
                  {(column.items || column.points || []).map(
                    (item: string, itemIndex: number) => (
                      <li
                        key={itemIndex}
                        className="text-xs md:text-sm text-slate-700 flex items-start gap-2 leading-relaxed"
                      >
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <SlideFooter />
      </div>
    );
  }

  // -------------------------------------------------------
  // 5. DEFAULT CONTENT / SPLIT LAYOUT SLIDE
  // -------------------------------------------------------
  const imageOnLeft = imagePos === "left";
  const imageOnTop = imagePos === "top";
  const imageOnBottom = imagePos === "bottom";

  return (
    <div className="w-full h-full flex flex-col justify-between p-8 md:p-12 bg-white">
      <div
        className={`flex-1 flex ${
          imageOnTop
            ? "flex-col"
            : imageOnBottom
              ? "flex-col-reverse"
              : imageOnLeft
                ? "flex-row-reverse"
                : "flex-row"
        } gap-8 items-center min-h-0`}
      >
        <div className="flex-1 flex flex-col justify-center overflow-y-auto min-w-0 pr-2">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-3">
            {slide.title}
          </h2>

          {slide.subtitle && (
            <p className="text-blue-600 font-semibold text-sm mb-3">
              {slide.subtitle}
            </p>
          )}

          {slide.content && (
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">
              {slide.content}
            </p>
          )}

          <Bullets bullets={slide.bullets} />
        </div>

        {slide.imageUrl && (
          <div className="w-full md:w-1/2 h-full max-h-[360px] relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm shrink-0">
            <img
              src={slide.imageUrl}
              alt={slide.title || "Slide visual"}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      <SlideFooter />
    </div>
  );
}

// ---------------------------------------------------------
// Presentation Application Page (PowerPoint UI)
// ---------------------------------------------------------

export default function PresentationPage() {
  const params = useParams();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const presentationId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const {
    data: presentation,
    isLoading,
    isError,
  } = useGetPresentationByIdQuery(presentationId, {
    skip: !presentationId,
  });

  const slides: Slide[] = (presentation?.slides || [])
    .slice()
    .sort((a: Slide, b: Slide) => (a.slideOrder ?? 0) - (b.slideOrder ?? 0));

  // Navigation handlers
  const handleNext = useCallback(() => {
    setActiveSlide((prev) => Math.min(slides.length - 1, prev + 1));
  }, [slides.length]);

  const handlePrev = useCallback(() => {
    setActiveSlide((prev) => Math.max(0, prev - 1));
  }, []);

  // Keyboard arrow controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Space") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  if (!presentationId) {
    return (
      <div className="min-h-screen bg-slate-200 flex items-center justify-center text-slate-700">
        Missing Presentation ID.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-200 flex items-center justify-center text-slate-700">
        <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-xl shadow-sm border border-slate-300">
          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span className="font-medium text-sm">Opening presentation...</span>
        </div>
      </div>
    );
  }

  if (isError || !presentation) {
    return (
      <div className="min-h-screen bg-slate-200 flex items-center justify-center text-slate-700">
        <div className="bg-white px-6 py-4 rounded-xl shadow-sm border border-slate-300 text-red-600 font-medium text-sm">
          Failed to load presentation. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-200/80 text-slate-800 flex flex-col font-sans select-none">
      {/* PPT Application Header Toolbar */}
      <header className="bg-white border-b border-slate-300 px-4 py-2.5 flex items-center justify-between shadow-xs z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-600 text-white rounded-lg shadow-sm">
            <Presentation className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 leading-none">
              {presentation.title || "Untitled Presentation"}
            </h1>
            <p className="text-[11px] text-slate-500 mt-1">
              PowerPoint Web View · {slides.length} Slides
            </p>
          </div>
        </div>

        {/* Presentation Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-300 transition-colors"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5" /> Exit Fullscreen
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5" /> Present
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Workspace Area (Sidebar + Canvas Stage) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Slide Thumbnails Sidebar */}
        <aside className="w-52 md:w-64 bg-slate-100 border-r border-slate-300 p-3 overflow-y-auto hidden sm:flex flex-col gap-3 shrink-0">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-1 flex items-center gap-1.5">
            <Grid className="w-3.5 h-3.5" /> Slides Overview
          </div>

          {slides.map((slide, index) => (
            <div
              key={slide.id || index}
              onClick={() => setActiveSlide(index)}
              className={`group cursor-pointer flex gap-2.5 items-start p-1.5 rounded-lg transition-all ${
                activeSlide === index
                  ? "bg-blue-100/70"
                  : "hover:bg-slate-200/70"
              }`}
            >
              <span
                className={`text-xs font-bold w-4 text-right mt-1.5 ${
                  activeSlide === index ? "text-blue-600" : "text-slate-400"
                }`}
              >
                {index + 1}
              </span>

              {/* Thumbnail Container */}
              <div
                className={`aspect-video w-full bg-white rounded-md overflow-hidden border transition-all ${
                  activeSlide === index
                    ? "border-blue-600 shadow-sm ring-1 ring-blue-500"
                    : "border-slate-300 group-hover:border-slate-400"
                }`}
              >
                <div className="scale-[0.22] origin-top-left w-[454%] h-[454%] pointer-events-none">
                  <SlideRenderer
                    slide={slide}
                    totalSlides={slides.length}
                    currentIndex={index}
                  />
                </div>
              </div>
            </div>
          ))}
        </aside>

        {/* Main Canvas Slide Stage */}
        <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 overflow-y-auto">
          {slides.length === 0 ? (
            <div className="bg-white p-12 rounded-xl border border-slate-300 text-center text-slate-500 shadow-sm">
              No slides available.
            </div>
          ) : (
            <div className="w-full max-w-5xl flex flex-col items-center">
              {/* Slide 16:9 Screen Stage */}
              <div className="aspect-video w-full bg-white rounded-xl border border-slate-300 shadow-2xl overflow-hidden relative">
                <SlideRenderer
                  slide={slides[activeSlide]}
                  totalSlides={slides.length}
                  currentIndex={activeSlide}
                />
              </div>

              {/* Bottom PPT Navigation Bar */}
              <div className="mt-4 bg-white border border-slate-300 shadow-sm rounded-full px-4 py-1.5 flex items-center gap-4">
                <button
                  onClick={handlePrev}
                  disabled={activeSlide === 0}
                  className="p-1.5 hover:bg-slate-100 rounded-full disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                  title="Previous Slide (Left Arrow)"
                >
                  <ChevronLeft className="w-4 h-4 text-slate-700" />
                </button>

                <span className="text-xs font-semibold text-slate-600">
                  Slide {activeSlide + 1} of {slides.length}
                </span>

                <button
                  onClick={handleNext}
                  disabled={activeSlide === slides.length - 1}
                  className="p-1.5 hover:bg-slate-100 rounded-full disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                  title="Next Slide (Right Arrow or Space)"
                >
                  <ChevronRight className="w-4 h-4 text-slate-700" />
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
