// "use client";
// import { useEffect, useState } from "react";
// import EmptyPresentationState from "./components/EmptyPresentationState";
// import SourceUploadSection from "./components/SourceUploadSection";
// import RightSidebarPanels from "./components/RightSidebarPanels";
// import GenerationControls from "./components/GenerationControls";
// import ThemeCustomization from "./components/ThemeCustomization";
// import Button from "@/app/components/ui/Button";
// import {
//   useCreatePresentationMutation,
//   useGetPresentationByIdQuery,
// } from "@/slices/Ai";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import AiCostNotice from "../../components/AiCostNotice";
// import RestrictedFeatureModal from "../../components/RestrictedFeatureModal";
// import {
//   useAiCredits,
//   getInsufficientCredits,
//   getFeatureNotAvailable,
// } from "@/hooks/ai/useAiCredits";
// import { useUserAccess } from "@/hooks/access/useUserAccess";

// const CreateSlide = () => {
//   const [show, setShow] = useState(false);
//   const [sourceContent, setSourceContent] = useState("");
//   const [sourceFile, setSourceFile] = useState<File | null>(null);
//   const [theme, setTheme] = useState("professional");
//   const [slideCount, setSlideCount] = useState(10);
//   const [includeImages, setIncludeImages] = useState(true);
//   const [presentation, setPresentation] = useState<any>(null);
//   const [presnt, setPresnt] = useState<any>(null);
//   const [createPresentation, { isLoading }] = useCreatePresentationMutation();
//   const { canAfford, refetch } = useAiCredits();
//   const { isPremium, isPremiumFeature } = useUserAccess();
//   const [accessError, setAccessError] = useState<unknown>(null);

//   // Premium-only feature on a free plan: lock the action (the backend enforces the same gate).
//   const locked = isPremiumFeature("PPT") && !isPremium;

//   const router = useRouter();
//   const handleGenerate = async () => {
//     try {
//       const result = await createPresentation({
//         title: "Generated Presentation",
//         includeImages: true,
//         sourceContent,
//         sourceFile,
//         theme,
//         templateName: `${slideCount} slides${includeImages ? " with images" : ""}`,
//       }).unwrap();
//       setPresentation(result);
//       refetch();
//       sessionStorage.setItem(
//         "generatedPresentation",
//         JSON.stringify(result.data),
//       );

//       const presentationId = result?.id;
//       if (presentationId) {
//         router.push(`/ai-tool/create-slides/${presentationId}`);
//       }
//     } catch (err) {
//       if (getInsufficientCredits(err) || getFeatureNotAvailable(err)) {
//         setAccessError(err);
//       } else {
//         toast.error("Failed to generate presentation.");
//       }
//     }
//   };

//   return (
//     <div>
//       {show ? (
//         <div className="flex justify-between gap-6">
//           <div className="w-full">
//             {/* <SourceUploadSection
//               value={sourceContent}
//               onChange={setSourceContent}
//               file={sourceFile}
//               onFileChange={setSourceFile}
//             /> */}
//             <div className="mt-10">
//               <ThemeCustomization
//                 selectedTheme={theme}
//                 onThemeChange={setTheme}
//               />
//             </div>
//             <div className="mt-10">
//               <GenerationControls
//                 slideCount={slideCount}
//                 includeImages={includeImages}
//                 onSlideCountChange={setSlideCount}
//                 onIncludeImagesChange={setIncludeImages}
//               />
//             </div>
//             <div className="flex flex-col justify-center items-center gap-3 h-50">
//               <AiCostNotice feature="PPT" />
//               <Button
//                 onClick={handleGenerate}
//                 disabled={isLoading || !canAfford("PPT") || locked}
//               >
//                 {isLoading ? "Generating..." : "Generate Presentation"}
//               </Button>
//             </div>
//             {/* {presentation?.slides?.length > 0 && (
//               <div className="space-y-3 mt-6">
//                 {presentation.slides.map((slide: any) => (
//                   <div
//                     key={slide.id}
//                     className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm"
//                   >
//                     <p className="text-xs font-bold text-indigo-600">
//                       Slide {slide.slideOrder}
//                     </p>
//                     <h3 className="text-sm font-bold text-slate-800 mt-1">
//                       {slide.title}
//                     </h3>
//                     <Image src={slide.imageUrl} alt={title} fill unoptimized />
//                     <p className="text-xs text-slate-500 mt-2">
//                       {slide.content}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )} */}
//           </div>
//           <RightSidebarPanels />
//         </div>
//       ) : (
//         // <div>
//         //   {fetchedPresentation?.slides?.length > 0 ? (
//         //     <div className="space-y-3 mt-6">
//         //       {fetchedPresentation.slides.map((slide: any) => (
//         //         <div
//         //           key={slide.id}
//         //           className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm"
//         //         >
//         //           <p className="text-xs font-bold text-indigo-600">
//         //             Slide {slide.slideOrder}
//         //           </p>
//         //           <h3 className="text-sm font-bold text-slate-800 mt-1">
//         //             {slide.title}
//         //           </h3>
//         //           <Image
//         //             src={slide.imageUrl}
//         //             alt={slide.title}
//         //             fill
//         //             unoptimized
//         //           />
//         //           <p className="text-xs text-slate-500 mt-2">{slide.content}</p>
//         //         </div>
//         //       ))}
//         //     </div>
//         //   ) : null}
//         // </div>
//         <EmptyPresentationState
//           onCreate={({ content, file }) => {
//             setSourceContent(content);
//             setSourceFile(file);
//             setShow(true);
//           }}
//         />
//       )}

//       <RestrictedFeatureModal
//         error={accessError}
//         onClose={() => setAccessError(null)}
//       />
//     </div>
//   );
// };
// export default CreateSlide;
"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import EmptyPresentationState from "./components/EmptyPresentationState";
import ThemeCustomization from "./components/ThemeCustomization";
import GenerationControls from "./components/GenerationControls";
import RightSidebarPanels from "./components/RightSidebarPanels";
import Button from "@/app/components/ui/Button";
import AiCostNotice from "../../components/AiCostNotice";
import RestrictedFeatureModal from "../../components/RestrictedFeatureModal";
import { useCreatePresentationMutation } from "@/slices/Ai";
import {
  useAiCredits,
  getInsufficientCredits,
  getFeatureNotAvailable,
} from "@/hooks/ai/useAiCredits";
import { useUserAccess } from "@/hooks/access/useUserAccess";

// Visual Theme definition interface
interface ThemePreset {
  id: string;
  name: string;
  cardBg: string;
  innerBg: string;
  titleFont: string;
  titleColor: string;
  bodyColor: string;
  titleText?: string;
  bodyText?: string;
}

// Popular themes matching the visual grid UI
const POPULAR_THEMES: ThemePreset[] = [
  {
    id: "howlite",
    name: "Howlite",
    cardBg: "bg-slate-200/70",
    innerBg: "bg-white",
    titleFont: "font-sans font-extrabold tracking-tight",
    titleColor: "text-slate-900",
    bodyColor: "text-slate-600",
    titleText: "Title",
    bodyText: "Body & link",
  },
  {
    id: "alien",
    name: "Alien",
    cardBg: "bg-neutral-950 relative overflow-hidden",
    innerBg: "bg-neutral-900/90 border border-emerald-500/20 backdrop-blur-sm",
    titleFont: "font-mono font-black tracking-widest uppercase",
    titleColor: "text-emerald-400",
    bodyColor: "text-neutral-300",
    titleText: "TITLE",
    bodyText: "Body & link",
  },
  {
    id: "cigar",
    name: "Cigar",
    cardBg: "bg-zinc-900",
    innerBg: "bg-zinc-800/80 border border-zinc-700/50",
    titleFont: "font-serif font-bold tracking-normal",
    titleColor: "text-amber-100",
    bodyColor: "text-zinc-300",
    titleText: "Title",
    bodyText: "Body & link",
  },
  {
    id: "dune",
    name: "Dune",
    cardBg: "bg-gradient-to-br from-amber-100 via-orange-50 to-stone-200",
    innerBg: "bg-stone-50/90 shadow-xs border border-amber-200/40",
    titleFont: "font-serif font-semibold tracking-wide",
    titleColor: "text-amber-950",
    bodyColor: "text-amber-900/80",
    titleText: "Title",
    bodyText: "Body & link",
  },
  {
    id: "peach",
    name: "Peach",
    cardBg: "bg-gradient-to-tr from-amber-200 via-orange-200 to-rose-300",
    innerBg: "bg-white/95 shadow-xs",
    titleFont: "font-sans font-bold tracking-tight",
    titleColor: "text-slate-800",
    bodyColor: "text-slate-600",
    titleText: "Title",
    bodyText: "Body & link",
  },
  {
    id: "keepsake",
    name: "Keepsake",
    cardBg: "bg-slate-300/80",
    innerBg: "bg-amber-50/90 shadow-xs",
    titleFont: "font-sans font-bold tracking-normal",
    titleColor: "text-slate-800",
    bodyColor: "text-slate-600",
    titleText: "Title",
    bodyText: "Body & link",
  },
];

// Additional themes for the View More dialog
const ADDITIONAL_THEMES: ThemePreset[] = [
  {
    id: "midnight",
    name: "Midnight",
    cardBg: "bg-slate-950",
    innerBg: "bg-slate-900 border border-indigo-500/30",
    titleFont: "font-sans font-bold",
    titleColor: "text-indigo-400",
    bodyColor: "text-slate-300",
    titleText: "Title",
    bodyText: "Body & link",
  },
  {
    id: "emerald-pro",
    name: "Emerald Corporate",
    cardBg: "bg-emerald-950",
    innerBg: "bg-emerald-900/80 border border-emerald-700/40",
    titleFont: "font-sans font-semibold",
    titleColor: "text-emerald-200",
    bodyColor: "text-emerald-100/80",
    titleText: "Title",
    bodyText: "Body & link",
  },
  {
    id: "nordic",
    name: "Nordic Minimal",
    cardBg: "bg-zinc-100",
    innerBg: "bg-white border border-zinc-200",
    titleFont: "font-mono font-medium",
    titleColor: "text-zinc-900",
    bodyColor: "text-zinc-600",
    titleText: "Title",
    bodyText: "Body & link",
  },
];

const CreateSlide = () => {
  const [show, setShow] = useState(false);
  const [sourceContent, setSourceContent] = useState("");
  const [sourceFile, setSourceFile] = useState<File | null>(null);

  // Theme State: 1) AI Text Presets (ThemeCustomization), 2) Visual Layout Style (Cards)
  const [theme, setTheme] = useState("professional");
  const [visualTheme, setVisualTheme] = useState("howlite");

  // Custom theme upload object
  const [customThemeObj, setCustomThemeObj] = useState<{
    name: string;
    file?: File;
    primaryColor: string;
    backgroundColor: string;
    fontFamily: string;
  } | null>(null);

  const [slideCount, setSlideCount] = useState(10);
  const [includeImages, setIncludeImages] = useState(true);
  const [, setPresentation] = useState<any>(null);
  const [accessError, setAccessError] = useState<unknown>(null);

  // Modal dialog states
  const [isViewMoreOpen, setIsViewMoreOpen] = useState(false);
  const [isCustomThemeModalOpen, setIsCustomThemeModalOpen] = useState(false);
  const customFileInputRef = useRef<HTMLInputElement>(null);

  // Custom theme form inputs
  const [customThemeName, setCustomThemeName] = useState("");
  const [customPrimaryColor, setCustomPrimaryColor] = useState("#4f46e5");
  const [customBgColor, setCustomBgColor] = useState("#f8fafc");
  const [customFont, setCustomFont] = useState("sans");
  const [uploadedThemeFile, setUploadedThemeFile] = useState<File | null>(null);

  const [createPresentation, { isLoading }] = useCreatePresentationMutation();
  const { canAfford, refetch } = useAiCredits();
  const { isPremium, isPremiumFeature } = useUserAccess();

  const locked = isPremiumFeature("PPT") && !isPremium;
  const router = useRouter();

  const handleGenerate = async () => {
    try {
      const formData = new FormData();

      formData.append("title", "Generated Presentation");
      formData.append("includeImages", String(includeImages));
      formData.append("sourceContent", sourceContent || "");
      formData.append("theme", theme);
      formData.append("visualTheme", visualTheme);
      formData.append(
        "templateName",
        `${slideCount} slides${includeImages ? " with images" : ""}`,
      );
      formData.append("slideCount", String(slideCount));

      if (sourceFile) {
        formData.append("sourceFile", sourceFile);
      }

      if (customThemeObj) {
        formData.append(
          "customThemeConfig",
          JSON.stringify({
            name: customThemeObj.name,
            primaryColor: customThemeObj.primaryColor,
            backgroundColor: customThemeObj.backgroundColor,
            fontFamily: customThemeObj.fontFamily,
          }),
        );

        if (customThemeObj.file) {
          formData.append("customThemeFile", customThemeObj.file);
        }
      }

      console.log(formData, "formDtdae");

      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
      const result = await createPresentation(formData).unwrap();
      setPresentation(result);
      refetch();

      sessionStorage.setItem(
        "generatedPresentation",
        JSON.stringify(result.data),
      );

      const presentationId = result?.id;

      if (presentationId) {
        router.push(`/ai-tool/create-slides/${presentationId}`);
      }
    } catch (err) {
      if (getInsufficientCredits(err) || getFeatureNotAvailable(err)) {
        setAccessError(err);
      } else {
        toast.error("Failed to generate presentation.");
      }
    }
  };
  const handleCustomThemeFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedThemeFile(file);
      if (!customThemeName) {
        setCustomThemeName(file.name.replace(/\.[^/.]+$/, ""));
      }
      toast.success(`Theme file "${file.name}" attached`);
    }
  };

  const handleApplyCustomTheme = () => {
    if (!customThemeName.trim()) {
      toast.error("Please enter a custom theme name");
      return;
    }

    const newCustomTheme = {
      name: customThemeName.trim(),
      file: uploadedThemeFile || undefined,
      primaryColor: customPrimaryColor,
      backgroundColor: customBgColor,
      fontFamily: customFont,
    };

    setCustomThemeObj(newCustomTheme);
    setVisualTheme(`custom-${newCustomTheme.name}`);
    setIsCustomThemeModalOpen(false);
    toast.success(`Applied custom theme: ${newCustomTheme.name}`);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8">
      {!show ? (
        <div className="mx-auto max-w-5xl">
          <EmptyPresentationState
            onCreate={({ content, file }) => {
              setSourceContent(content);
              setSourceFile(file);
              setShow(true);
            }}
          />
        </div>
      ) : (
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Header Navigation */}
          <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600">
                <span>Step 2 of 2</span>
                <span>•</span>
                <span>Customize & Select</span>
              </div>
              <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
                Presentation Settings
              </h1>
              <p className="text-xs text-slate-500 sm:text-sm">
                Set text tone guidelines, visual layouts, and content volume.
              </p>
            </div>

            <button
              onClick={() => setShow(false)}
              className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors sm:self-auto"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Edit Source Input
            </button>
          </div>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Primary Column */}
            <div className="space-y-6 lg:col-span-8">
              {/* SECTION 1: AI Tone & Text Amount Customization */}
              <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
                <div className="mb-4 flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-slate-800">
                      1. AI Text Preset & Content Density
                    </h2>
                    <p className="text-xs text-slate-500">
                      Select writing tone (e.g. professional, concise, creative)
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <ThemeCustomization
                    selectedTheme={theme}
                    onThemeChange={setTheme}
                  />
                </div>
              </section>

              {/* SECTION 2: Visual Themes Gallery & Upload */}
              <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-base font-semibold text-slate-800">
                        2. Select Visual Theme Collection
                      </h2>
                      <p className="text-xs text-slate-500">
                        Use one of our popular themes below or view more
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsCustomThemeModalOpen(true)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50/70 px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 transition-all"
                    >
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Upload Custom
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsViewMoreOpen(true)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all"
                    >
                      <svg
                        className="h-3.5 w-3.5 text-indigo-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                        />
                      </svg>
                      View more
                    </button>
                  </div>
                </div>

                {/* Custom Theme Indicator */}
                {customThemeObj && (
                  <div className="mb-4 flex items-center justify-between rounded-xl border border-indigo-200 bg-indigo-50/80 p-3 text-xs text-indigo-900">
                    <div className="flex items-center gap-2">
                      <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
                      <span className="font-semibold">
                        Custom Theme Active:
                      </span>
                      <span>{customThemeObj.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setCustomThemeObj(null);
                        setVisualTheme("howlite");
                        toast.info("Switched to default visual themes");
                      }}
                      className="font-medium text-indigo-600 hover:text-indigo-800 underline"
                    >
                      Reset to preset
                    </button>
                  </div>
                )}

                {/* Visual Cards Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {POPULAR_THEMES.map((preset) => {
                    const isSelected =
                      visualTheme === preset.id && !customThemeObj;

                    return (
                      <div
                        key={preset.id}
                        onClick={() => {
                          setCustomThemeObj(null);
                          setVisualTheme(preset.id);
                        }}
                        className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/30"
                            : "border-slate-200 hover:border-slate-300 hover:shadow-md bg-white"
                        }`}
                      >
                        <div
                          className={`p-3 aspect-[16/10] w-full ${preset.cardBg} flex items-center justify-center relative`}
                        >
                          <div
                            className={`w-full h-full rounded-xl ${preset.innerBg} p-3.5 flex flex-col justify-center transition-transform duration-200 group-hover:scale-[1.02]`}
                          >
                            <p
                              className={`text-xl ${preset.titleFont} ${preset.titleColor} mb-1`}
                            >
                              {preset.titleText || "Title"}
                            </p>
                            <p
                              className={`text-xs ${preset.bodyColor} opacity-90`}
                            >
                              {preset.bodyText || "Body & link"}
                            </p>
                          </div>
                        </div>

                        <div
                          className={`flex items-center gap-2 p-3 text-xs font-semibold ${
                            isSelected
                              ? "bg-blue-50 text-blue-600"
                              : "text-slate-700 bg-white"
                          }`}
                        >
                          {isSelected && (
                            <svg
                              className="h-4 w-4 text-blue-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                          <span>{preset.name}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* SECTION 3: Slide Controls */}
              <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
                <div className="mb-4 flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-slate-800">
                      3. Configuration & Content Controls
                    </h2>
                    <p className="text-xs text-slate-500">
                      Slide counts and image attachments
                    </p>
                  </div>
                </div>
                <GenerationControls
                  slideCount={slideCount}
                  includeImages={includeImages}
                  onSlideCountChange={setSlideCount}
                  onIncludeImagesChange={setIncludeImages}
                />
              </section>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-6 lg:col-span-4">
              <div className="sticky top-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
                <h3 className="text-sm font-semibold text-slate-800 mb-1">
                  Generation
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  AI will analyze your selected presets and generate
                  presentation slides.
                </p>

                <div className="flex flex-col items-center gap-4 rounded-xl bg-slate-50/80 p-4 border border-slate-100">
                  <AiCostNotice feature="PPT" />

                  <Button
                    onClick={handleGenerate}
                    disabled={isLoading || !canAfford("PPT") || locked}
                    className="w-full justify-center py-2.5 font-medium shadow-xs transition-all"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4 animate-spin text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Generating Deck...
                      </span>
                    ) : (
                      "Generate Presentation"
                    )}
                  </Button>

                  {locked && (
                    <p className="text-center text-[11px] font-medium text-amber-600 bg-amber-50 rounded-lg px-2.5 py-1.5 w-full border border-amber-100">
                      Upgrade to Premium to unlock AI Presentation creation.
                    </p>
                  )}
                </div>

                {/* <div className="mt-6 border-t border-slate-100 pt-6">
                  <RightSidebarPanels />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View More Modal */}
      {isViewMoreOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Visual Theme Library
                </h3>
                <p className="text-xs text-slate-500">
                  Select a layout template
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsViewMoreOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {[...POPULAR_THEMES, ...ADDITIONAL_THEMES].map((preset) => {
                const isSelected = visualTheme === preset.id && !customThemeObj;

                return (
                  <div
                    key={preset.id}
                    onClick={() => {
                      setCustomThemeObj(null);
                      setVisualTheme(preset.id);
                      setIsViewMoreOpen(false);
                      toast.success(`Selected layout: ${preset.name}`);
                    }}
                    className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/30"
                        : "border-slate-200 hover:border-slate-300 hover:shadow-md bg-white"
                    }`}
                  >
                    <div
                      className={`p-3 aspect-[16/10] w-full ${preset.cardBg} flex items-center justify-center relative`}
                    >
                      <div
                        className={`w-full h-full rounded-xl ${preset.innerBg} p-3 flex flex-col justify-center`}
                      >
                        <p
                          className={`text-lg ${preset.titleFont} ${preset.titleColor} mb-0.5`}
                        >
                          {preset.titleText || "Title"}
                        </p>
                        <p className={`text-[11px] ${preset.bodyColor}`}>
                          {preset.bodyText || "Body & link"}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`flex items-center gap-2 p-2.5 text-xs font-semibold ${
                        isSelected
                          ? "bg-blue-50 text-blue-600"
                          : "text-slate-700 bg-white"
                      }`}
                    >
                      {isSelected && (
                        <svg
                          className="h-3.5 w-3.5 text-blue-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                      <span>{preset.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsViewMoreOpen(false)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
              >
                Close Library
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Custom Theme Modal */}
      {isCustomThemeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Upload Custom Theme
                  </h3>
                  <p className="text-xs text-slate-500">
                    Provide brand guidelines or master files
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCustomThemeModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Upload Master File (.pptx, .json, .pdf)
              </label>
              <input
                ref={customFileInputRef}
                type="file"
                accept=".pptx,.json,.pdf,.png,.jpg"
                onChange={handleCustomThemeFileUpload}
                className="hidden"
              />
              <div
                onClick={() => customFileInputRef.current?.click()}
                className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-4 text-center cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/20 transition-all"
              >
                <svg
                  className="h-8 w-8 text-slate-400 mb-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                {uploadedThemeFile ? (
                  <p className="text-xs font-medium text-indigo-600">
                    Selected: {uploadedThemeFile.name}
                  </p>
                ) : (
                  <>
                    <p className="text-xs font-medium text-slate-600">
                      Click to upload theme file or brand master slide
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      PPTX templates or JSON theme files
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                Theme Label
              </label>
              <input
                type="text"
                placeholder="e.g., Company Brand Theme"
                value={customThemeName}
                onChange={(e) => setCustomThemeName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Primary Accent Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={customPrimaryColor}
                    onChange={(e) => setCustomPrimaryColor(e.target.value)}
                    className="h-8 w-10 cursor-pointer rounded border border-slate-200 bg-white p-0.5"
                  />
                  <input
                    type="text"
                    value={customPrimaryColor}
                    onChange={(e) => setCustomPrimaryColor(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-2 py-1 text-xs font-mono uppercase"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Background Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={customBgColor}
                    onChange={(e) => setCustomBgColor(e.target.value)}
                    className="h-8 w-10 cursor-pointer rounded border border-slate-200 bg-white p-0.5"
                  />
                  <input
                    type="text"
                    value={customBgColor}
                    onChange={(e) => setCustomBgColor(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-2 py-1 text-xs font-mono uppercase"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsCustomThemeModalOpen(false)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApplyCustomTheme}
                className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700 transition-colors"
              >
                Apply Custom Theme
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Access Restriction Modal */}
      <RestrictedFeatureModal
        error={accessError}
        onClose={() => setAccessError(null)}
      />
    </div>
  );
};

export default CreateSlide;
