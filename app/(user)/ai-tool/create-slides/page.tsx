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

const CreateSlide = () => {
  const [show, setShow] = useState(false);
  const [sourceContent, setSourceContent] = useState("");
  const [theme, setTheme] = useState("professional");
  const [slideCount, setSlideCount] = useState(10);
  const [includeImages, setIncludeImages] = useState(true);
  const [presentation, setPresentation] = useState<any>(null);
  const [presnt, setPresnt] = useState<any>(null);
  const [createPresentation, { isLoading }] = useCreatePresentationMutation();

  const router = useRouter();
  const handleGenerate = async () => {
    const result = await createPresentation({
      title: "Generated Presentation",
      includeImages: true,
      sourceContent,
      theme,
      templateName: `${slideCount} slides${includeImages ? " with images" : ""}`,
    }).unwrap();
    setPresentation(result);
    sessionStorage.setItem(
      "generatedPresentation",
      JSON.stringify(result.data),
    );

    const presentationId = result?.id;
    if (presentationId) {
      // router.push(`/ai-tool/create-slides/${presentationId}`);
      router.push(`/ai-tool/create-slides/${presentationId}`);
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
            <div className="flex justify-center items-center h-50">
              <Button onClick={handleGenerate}>
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
    </div>
  );
};
export default CreateSlide;
