"use client";
import { useEffect, useState } from "react";
import EmptyPresentationState from "./components/EmptyPresentationState";
import SourceUploadSection from "./components/SourceUploadSection";
import RightSidebarPanels from "./components/RightSidebarPanels";
import GenerationControls from "./components/GenerationControls";
import ThemeCustomization from "./components/ThemeCustomization";
import Button from "@/app/components/ui/Button";
import {
  useCreatePresentationMutation,
  useGetPresentationByIdQuery,
} from "@/slices/Ai";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AiCostNotice from "../../components/AiCostNotice";
import RestrictedFeatureModal from "../../components/RestrictedFeatureModal";
import {
  useAiCredits,
  getInsufficientCredits,
  getFeatureNotAvailable,
} from "@/hooks/ai/useAiCredits";
import { useUserAccess } from "@/hooks/access/useUserAccess";

const CreateSlide = () => {
  const [show, setShow] = useState(false);
  const [sourceContent, setSourceContent] = useState("");
  const [theme, setTheme] = useState("professional");
  const [slideCount, setSlideCount] = useState(10);
  const [includeImages, setIncludeImages] = useState(true);
  const [presentation, setPresentation] = useState<any>(null);
  const [presnt, setPresnt] = useState<any>(null);
  const [createPresentation, { isLoading }] = useCreatePresentationMutation();
  const { canAfford, refetch } = useAiCredits();
  const { isPremium, isPremiumFeature } = useUserAccess();
  const [accessError, setAccessError] = useState<unknown>(null);

  // Premium-only feature on a free plan: lock the action (the backend enforces the same gate).
  const locked = isPremiumFeature("PPT") && !isPremium;

  const router = useRouter();
  const handleGenerate = async () => {
    try {
      const result = await createPresentation({
        title: "Generated Presentation",
        includeImages: true,
        sourceContent,
        theme,
        templateName: `${slideCount} slides${includeImages ? " with images" : ""}`,
      }).unwrap();
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

  return (
    <div>
      {show ? (
        <div className="flex justify-between gap-6">
          <div className="w-full">
            <SourceUploadSection
              value={sourceContent}
              onChange={setSourceContent}
            />
            <div className="mt-10">
              <ThemeCustomization
                selectedTheme={theme}
                onThemeChange={setTheme}
              />
            </div>
            <div className="mt-10">
              <GenerationControls
                slideCount={slideCount}
                includeImages={includeImages}
                onSlideCountChange={setSlideCount}
                onIncludeImagesChange={setIncludeImages}
              />
            </div>
            <div className="flex flex-col justify-center items-center gap-3 h-50">
              <AiCostNotice feature="PPT" />
              <Button
                onClick={handleGenerate}
                disabled={isLoading || !canAfford("PPT") || locked}
              >
                {isLoading ? "Generating..." : "Generate Presentation"}
              </Button>
            </div>
            {/* {presentation?.slides?.length > 0 && (
              <div className="space-y-3 mt-6">
                {presentation.slides.map((slide: any) => (
                  <div
                    key={slide.id}
                    className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm"
                  >
                    <p className="text-xs font-bold text-indigo-600">
                      Slide {slide.slideOrder}
                    </p>
                    <h3 className="text-sm font-bold text-slate-800 mt-1">
                      {slide.title}
                    </h3>
                    <Image src={slide.imageUrl} alt={title} fill unoptimized />
                    <p className="text-xs text-slate-500 mt-2">
                      {slide.content}
                    </p>
                  </div>
                ))}
              </div>
            )} */}
          </div>
          <RightSidebarPanels />
        </div>
      ) : (
        // <div>
        //   {fetchedPresentation?.slides?.length > 0 ? (
        //     <div className="space-y-3 mt-6">
        //       {fetchedPresentation.slides.map((slide: any) => (
        //         <div
        //           key={slide.id}
        //           className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm"
        //         >
        //           <p className="text-xs font-bold text-indigo-600">
        //             Slide {slide.slideOrder}
        //           </p>
        //           <h3 className="text-sm font-bold text-slate-800 mt-1">
        //             {slide.title}
        //           </h3>
        //           <Image
        //             src={slide.imageUrl}
        //             alt={slide.title}
        //             fill
        //             unoptimized
        //           />
        //           <p className="text-xs text-slate-500 mt-2">{slide.content}</p>
        //         </div>
        //       ))}
        //     </div>
        //   ) : null}
        // </div>
        <EmptyPresentationState
          handleOnClick={() => {
            setShow(!show);
          }}
        />
      )}

      <RestrictedFeatureModal
        error={accessError}
        onClose={() => setAccessError(null)}
      />
    </div>
  );
};
export default CreateSlide;
