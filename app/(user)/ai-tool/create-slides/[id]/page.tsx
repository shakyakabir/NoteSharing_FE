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
  userEmail?: string;
  sourceContent?: string;
  theme?: string;
  templateName?: string;
  exportFilePath?: string | null;
  createdAt?: string;
  updatedAt?: string;
  visualTheme?: string;
  slides?: Slide[];
};

// ---------------------------------------------------------
// Visual Theme
// ---------------------------------------------------------

type VisualTheme = {
  page: string;
  surface: string;
  card: string;
  border: string;
  heading: string;
  text: string;
  muted: string;
  accent: string;
  accentBg: string;
  accentBorder: string;
  accentText: string;
  soft: string;
  connector: string;
};

const VISUAL_THEMES: Record<string, VisualTheme> = {
  // -------------------------------------------------------
  // Academic
  // -------------------------------------------------------
  academic: {
    page: "bg-white",
    surface: "bg-white",
    card: "bg-slate-50",
    border: "border-slate-200",
    heading: "text-slate-900",
    text: "text-slate-700",
    muted: "text-slate-500",
    accent: "text-blue-600",
    accentBg: "bg-blue-600",
    accentBorder: "border-blue-200",
    accentText: "text-blue-700",
    soft: "bg-blue-50",
    connector: "bg-blue-100",
  },

  peach: {
    page: "bg-[#FFF5F0]",
    surface: "bg-[#FFF5F0]",
    card: "bg-[#FFE8DD]",
    border: "border-[#F3C7B5]",
    heading: "text-[#4A2C25]",
    text: "text-[#6B453A]",
    muted: "text-[#9A7164]",
    accent: "text-[#E58B6F]",
    accentBg: "bg-[#E58B6F]",
    accentBorder: "border-[#F0B8A4]",
    accentText: "text-[#C96F54]",
    soft: "bg-[#FFEDE6]",
    connector: "bg-[#F2C9BA]",
  },

  // -------------------------------------------------------
  // Dune
  // -------------------------------------------------------
  dune: {
    page: "bg-[#F5EFE6]",
    surface: "bg-[#F5EFE6]",
    card: "bg-[#E9DDCC]",
    border: "border-[#CDBB9F]",
    heading: "text-[#3F3328]",
    text: "text-[#5C4A3A]",
    muted: "text-[#8A7662]",
    accent: "text-[#A65F3F]",
    accentBg: "bg-[#A65F3F]",
    accentBorder: "border-[#D8B79F]",
    accentText: "text-[#8D4F35]",
    soft: "bg-[#F0E4D5]",
    connector: "bg-[#D8C5AA]",
  },

  // -------------------------------------------------------
  // Ocean
  // -------------------------------------------------------
  ocean: {
    page: "bg-[#EFF8FA]",
    surface: "bg-[#EFF8FA]",
    card: "bg-[#D9EEF2]",
    border: "border-[#A9D4DC]",
    heading: "text-[#12343B]",
    text: "text-[#315B64]",
    muted: "text-[#66858C]",
    accent: "text-[#087F8C]",
    accentBg: "bg-[#087F8C]",
    accentBorder: "border-[#A9D4DC]",
    accentText: "text-[#076B76]",
    soft: "bg-[#E1F3F5]",
    connector: "bg-[#B8DDE2]",
  },

  // -------------------------------------------------------
  // Forest
  // -------------------------------------------------------
  forest: {
    page: "bg-[#F1F5EF]",
    surface: "bg-[#F1F5EF]",
    card: "bg-[#DEE9DA]",
    border: "border-[#B9CDB2]",
    heading: "text-[#263B28]",
    text: "text-[#425945]",
    muted: "text-[#70806D]",
    accent: "text-[#4F754F]",
    accentBg: "bg-[#4F754F]",
    accentBorder: "border-[#B9CDB2]",
    accentText: "text-[#426442]",
    soft: "bg-[#E7F0E3]",
    connector: "bg-[#C9D9C3]",
  },

  // -------------------------------------------------------
  // Midnight
  // -------------------------------------------------------
  midnight: {
    page: "bg-[#111827]",
    surface: "bg-[#111827]",
    card: "bg-[#1F2937]",
    border: "border-[#374151]",
    heading: "text-white",
    text: "text-[#D1D5DB]",
    muted: "text-[#9CA3AF]",
    accent: "text-[#60A5FA]",
    accentBg: "bg-[#2563EB]",
    accentBorder: "border-[#3B82F6]",
    accentText: "text-[#60A5FA]",
    soft: "bg-[#1E3A5F]",
    connector: "bg-[#374151]",
  },

  // -------------------------------------------------------
  // Minimal
  // -------------------------------------------------------
  minimal: {
    page: "bg-white",
    surface: "bg-white",
    card: "bg-gray-50",
    border: "border-gray-200",
    heading: "text-gray-900",
    text: "text-gray-700",
    muted: "text-gray-500",
    accent: "text-gray-900",
    accentBg: "bg-gray-900",
    accentBorder: "border-gray-300",
    accentText: "text-gray-800",
    soft: "bg-gray-100",
    connector: "bg-gray-200",
  },
};

function getVisualTheme(theme?: string): VisualTheme {
  const themeName = theme?.toLowerCase() || "academic";

  return VISUAL_THEMES[themeName] || VISUAL_THEMES.academic;
}

// ---------------------------------------------------------
// Bullets Component
// ---------------------------------------------------------

function Bullets({
  bullets,
  theme,
}: {
  bullets?: string[];
  theme: VisualTheme;
}) {
  if (!bullets || bullets.length === 0) return null;

  return (
    <ul className="space-y-3 mt-4">
      {bullets.map((bullet, index) => (
        <li
          key={index}
          className={`flex items-start gap-3 ${theme.text} text-sm md:text-base leading-relaxed`}
        >
          <div
            className={`p-1 rounded-full ${theme.soft} ${theme.accent} shrink-0 mt-0.5 border ${theme.accentBorder}`}
          >
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
  visualTheme,
}: {
  slide: Slide;
  totalSlides?: number;
  currentIndex?: number;
  visualTheme?: string;
}) {
  const theme = getVisualTheme(visualTheme);

  const type = slide.slideType || "content";
  const imagePos = slide.layout?.imagePosition;

  // -------------------------------------------------------
  // PPT Footer Component
  // -------------------------------------------------------

  const SlideFooter = () => (
    <div
      className={`pt-3 mt-auto border-t ${theme.border} flex items-center justify-between text-[11px] ${theme.muted} font-medium`}
    >
      <div className={`flex items-center gap-1.5 ${theme.accent}`}>
        <Sparkles className="w-3.5 h-3.5" />

        <span className="capitalize">{type} Slide</span>
      </div>

      {typeof currentIndex === "number" && typeof totalSlides === "number" && (
        <span className={`${theme.muted} font-semibold`}>
          {currentIndex + 1}
        </span>
      )}
    </div>
  );

  // -------------------------------------------------------
  // 1. TITLE / SECTION SLIDE
  // -------------------------------------------------------

  if (type === "title" || type === "section") {
    return (
      <div
        className={`w-full h-full flex flex-col justify-between p-10 md:p-14 ${theme.page} relative overflow-hidden`}
      >
        {/* Decorative accents */}
        <div
          className={`absolute -top-20 -right-20 w-80 h-80 ${theme.soft} rounded-full blur-3xl pointer-events-none`}
        />

        <div
          className={`absolute -bottom-20 -left-20 w-80 h-80 ${theme.soft} rounded-full blur-3xl pointer-events-none`}
        />

        {/* Presentation / Section Badge */}
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${theme.soft} border ${theme.accentBorder} ${theme.accentText} text-xs font-semibold uppercase tracking-wider w-fit relative z-10`}
        >
          {type === "title" ? "Presentation" : "Section"}
        </div>

        {/* Main Content */}
        <div className="my-auto max-w-3xl relative z-10">
          <h1
            className={`text-3xl md:text-5xl font-black ${theme.heading} tracking-tight leading-tight`}
          >
            {slide.title}
          </h1>

          <div className={`w-16 h-1 ${theme.accentBg} rounded-full my-6`} />

          {slide.subtitle && (
            <p
              className={`${theme.text} text-lg md:text-xl font-normal leading-relaxed`}
            >
              {slide.subtitle}
            </p>
          )}

          {slide.content && (
            <p
              className={`${theme.muted} text-sm md:text-base mt-4 leading-relaxed`}
            >
              {slide.content}
            </p>
          )}
        </div>

        {/* <SlideFooter /> */}
      </div>
    );
  }

  // -------------------------------------------------------
  // 2. TIMELINE SLIDE
  // -------------------------------------------------------

  if (type === "timeline") {
    const items = firstElement(slide, "timeline")?.data?.items || [];

    return (
      <div
        className={`w-full h-full flex flex-col justify-between p-8 md:p-12 ${theme.surface}`}
      >
        <div>
          <div className={`flex items-center gap-2 ${theme.accent} mb-1`}>
            <Calendar className="w-4 h-4" />

            <span className="text-xs font-bold uppercase tracking-wider">
              Timeline
            </span>
          </div>

          <h2
            className={`text-2xl md:text-3xl font-bold ${theme.heading} tracking-tight mb-8`}
          >
            {slide.title}
          </h2>

          <div className="relative mt-6">
            {/* Horizontal Timeline Connector */}
            <div
              className={`hidden md:block absolute top-1/2 left-4 right-4 h-0.5 ${theme.connector} -translate-y-1/2 z-0`}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              {items.map((item: any, index: number) => (
                <div
                  key={index}
                  className={`${theme.card} border ${theme.border} rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`w-7 h-7 rounded-full ${theme.accentBg} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm`}
                    >
                      {index + 1}
                    </span>

                    <span className={`${theme.accent} font-extrabold text-lg`}>
                      {item.year}
                    </span>
                  </div>

                  <p
                    className={`${theme.text} text-xs md:text-sm leading-relaxed`}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* <SlideFooter /> */}
      </div>
    );
  }

  // -------------------------------------------------------
  // 3. QUOTE SLIDE
  // -------------------------------------------------------

  if (type === "quote") {
    return (
      <div
        className={`w-full h-full flex flex-col justify-between p-10 md:p-12 ${theme.page}`}
      >
        <div className="flex-1 flex flex-col items-center justify-center text-center max-w-3xl mx-auto my-auto">
          <div
            className={`w-12 h-12 rounded-full ${theme.soft} ${theme.accent} flex items-center justify-center mb-6 shadow-sm border ${theme.accentBorder}`}
          >
            <QuoteIcon className="w-6 h-6" />
          </div>

          <blockquote
            className={`text-xl md:text-3xl font-serif ${theme.heading} leading-snug font-medium italic`}
          >
            {slide.content}
          </blockquote>

          {slide.subtitle && (
            <div className="mt-6 flex items-center gap-2">
              <span className={`h-px w-8 ${theme.accentBg}`} />

              <p className={`${theme.text} font-semibold text-sm`}>
                {slide.subtitle}
              </p>

              <span className={`h-px w-8 ${theme.accentBg}`} />
            </div>
          )}
        </div>

        {/* <SlideFooter /> */}
      </div>
    );
  }

  // -------------------------------------------------------
  // 4. COMPARISON SLIDE
  // -------------------------------------------------------

  if (type === "comparison") {
    const columns = firstElement(slide, "comparison")?.data?.columns || [];

    return (
      <div
        className={`w-full h-full flex flex-col justify-between p-8 md:p-12 ${theme.surface}`}
      >
        <div>
          <h2
            className={`text-2xl md:text-3xl font-bold ${theme.heading} tracking-tight mb-6`}
          >
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
                className={`${theme.card} border ${theme.border} rounded-xl p-5 flex flex-col shadow-sm`}
              >
                <div
                  className={`pb-3 mb-3 border-b ${theme.border} flex items-center justify-between`}
                >
                  <h3
                    className={`${theme.heading} font-bold text-sm md:text-base`}
                  >
                    {column.title || column.name || `Option ${index + 1}`}
                  </h3>

                  <span className={`w-2 h-2 rounded-full ${theme.accentBg}`} />
                </div>

                <ul className="space-y-2.5">
                  {(column.items || column.points || []).map(
                    (item: string, itemIndex: number) => (
                      <li
                        key={itemIndex}
                        className={`${theme.text} text-xs md:text-sm flex items-start gap-2 leading-relaxed`}
                      >
                        <CheckCircle2
                          className={`w-4 h-4 ${theme.accent} shrink-0 mt-0.5`}
                        />

                        <span>{item}</span>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* <SlideFooter /> */}
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
    <div
      className={`w-full h-full flex flex-col justify-between p-8 md:p-12 ${theme.surface}`}
    >
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
        {/* Text Content */}
        <div className="flex-1 flex flex-col justify-center overflow-y-auto min-w-0 pr-2">
          <h2
            className={`text-2xl md:text-3xl font-bold ${theme.heading} tracking-tight mb-3`}
          >
            {slide.title}
          </h2>

          {slide.subtitle && (
            <p className={`${theme.accent} font-semibold text-sm mb-3`}>
              {slide.subtitle}
            </p>
          )}

          {slide.content && (
            <p
              className={`${theme.text} text-sm md:text-base leading-relaxed mb-4`}
            >
              {slide.content}
            </p>
          )}

          <Bullets bullets={slide.bullets} theme={theme} />
        </div>

        {/* Image */}
        {slide.imageUrl && (
          <div
            className={`w-full md:w-1/2 h-full max-h-[360px] relative rounded-xl overflow-hidden border ${theme.border} ${theme.card} shadow-sm shrink-0`}
          >
            <img
              src={slide.imageUrl}
              alt={slide.title || "Slide visual"}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* <SlideFooter /> */}
    </div>
  );
}

// ---------------------------------------------------------
// Presentation Application Page
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

  // -------------------------------------------------------
  // Slides
  // -------------------------------------------------------

  const slides: Slide[] = (presentation?.slides || [])
    .slice()
    .sort((a: Slide, b: Slide) => (a.slideOrder ?? 0) - (b.slideOrder ?? 0));

  // -------------------------------------------------------
  // Visual Theme
  // -------------------------------------------------------

  const visualTheme =
    (presentation as PresentationData | undefined)?.visualTheme || "academic";

  console.log(visualTheme, "visualTheme");
  // -------------------------------------------------------
  // Navigation
  // -------------------------------------------------------

  const handleNext = useCallback(() => {
    setActiveSlide((prev) => Math.min(slides.length - 1, prev + 1));
  }, [slides.length]);

  const handlePrev = useCallback(() => {
    setActiveSlide((prev) => Math.max(0, prev - 1));
  }, []);

  // -------------------------------------------------------
  // Keyboard Controls
  // -------------------------------------------------------

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // -------------------------------------------------------
  // Keep Active Slide Valid
  // -------------------------------------------------------

  useEffect(() => {
    if (slides.length > 0 && activeSlide >= slides.length) {
      setActiveSlide(slides.length - 1);
    }
  }, [slides.length, activeSlide]);

  // -------------------------------------------------------
  // Fullscreen
  // -------------------------------------------------------

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  };

  // Keep fullscreen state synced with browser
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // -------------------------------------------------------
  // Missing ID
  // -------------------------------------------------------

  if (!presentationId) {
    return (
      <div className="min-h-screen bg-slate-200 flex items-center justify-center text-slate-700">
        Missing Presentation ID.
      </div>
    );
  }

  // -------------------------------------------------------
  // Loading
  // -------------------------------------------------------

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

  // -------------------------------------------------------
  // Error
  // -------------------------------------------------------

  if (isError || !presentation) {
    return (
      <div className="min-h-screen bg-slate-200 flex items-center justify-center text-slate-700">
        <div className="bg-white px-6 py-4 rounded-xl shadow-sm border border-slate-300 text-red-600 font-medium text-sm">
          Failed to load presentation. Please try again.
        </div>
      </div>
    );
  }

  // -------------------------------------------------------
  // Get Theme
  // -------------------------------------------------------

  const currentTheme = getVisualTheme(visualTheme);

  // -------------------------------------------------------
  // Main UI
  // -------------------------------------------------------

  return (
    <div
      className={`min-h-screen ${currentTheme.page} ${currentTheme.heading} flex flex-col font-sans select-none`}
    >
      {/* ---------------------------------------------------
          PPT Application Header
      --------------------------------------------------- */}

      <header
        className={`bg-white border-b border-slate-300 px-4 py-2.5 flex items-center justify-between shadow-sm z-10`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`p-2 ${currentTheme.accentBg} text-white rounded-lg shadow-sm`}
          >
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
          {/* Theme Indicator */}
          <div
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${currentTheme.soft} border ${currentTheme.accentBorder}`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${currentTheme.accent}`} />

            <span
              className={`text-xs font-semibold capitalize ${currentTheme.accentText}`}
            >
              {visualTheme}
            </span>
          </div>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-300 transition-colors"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5" />
                Exit Fullscreen
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                Present
              </>
            )}
          </button>
        </div>
      </header>

      {/* ---------------------------------------------------
          Main Workspace
      --------------------------------------------------- */}

      <div className="flex-1 flex overflow-hidden">
        {/* -------------------------------------------------
            Left Slide Thumbnails Sidebar
        ------------------------------------------------- */}

        <aside className="w-52 md:w-64 bg-slate-100 border-r border-slate-300 p-3 overflow-y-auto hidden sm:flex flex-col gap-3 shrink-0">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-1 flex items-center gap-1.5">
            <Grid className="w-3.5 h-3.5" />
            Slides Overview
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
              {/* Slide Number */}
              <span
                className={`text-xs font-bold w-4 text-right mt-1.5 ${
                  activeSlide === index ? "text-blue-600" : "text-slate-400"
                }`}
              >
                {index + 1}
              </span>

              {/* Thumbnail */}
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
                    visualTheme={visualTheme}
                  />
                </div>
              </div>
            </div>
          ))}
        </aside>

        {/* -------------------------------------------------
            Main Canvas Slide Stage
        ------------------------------------------------- */}

        <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 overflow-y-auto">
          {slides.length === 0 ? (
            <div className="bg-white p-12 rounded-xl border border-slate-300 text-center text-slate-500 shadow-sm">
              No slides available.
            </div>
          ) : (
            <div className="w-full max-w-5xl flex flex-col items-center">
              {/* -------------------------------------------------
                  Slide 16:9 Screen Stage
              ------------------------------------------------- */}

              <div className="aspect-video w-full bg-white rounded-xl border border-slate-300 shadow-2xl overflow-hidden relative">
                <SlideRenderer
                  slide={slides[activeSlide]}
                  totalSlides={slides.length}
                  currentIndex={activeSlide}
                  visualTheme={visualTheme}
                />
              </div>

              {/* -------------------------------------------------
                  Bottom PPT Navigation
              ------------------------------------------------- */}

              <div className="mt-4 bg-white border border-slate-300 shadow-sm rounded-full px-4 py-1.5 flex items-center gap-4">
                {/* Previous */}
                <button
                  onClick={handlePrev}
                  disabled={activeSlide === 0}
                  className="p-1.5 hover:bg-slate-100 rounded-full disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                  title="Previous Slide (Left Arrow)"
                >
                  <ChevronLeft className="w-4 h-4 text-slate-700" />
                </button>

                {/* Slide Counter */}
                <span className="text-xs font-semibold text-slate-600">
                  Slide {activeSlide + 1} of {slides.length}
                </span>

                {/* Next */}
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
