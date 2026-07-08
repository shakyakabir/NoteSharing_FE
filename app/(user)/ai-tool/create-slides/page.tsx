"use client";
import { useState } from "react";
import EmptyPresentationState from "./components/EmptyPresentationState";
import SourceUploadSection from "./components/SourceUploadSection";
import RightSidebarPanels from "./components/RightSidebarPanels";
import GenerationControls from "./components/GenerationControls";
import ThemeCustomization from "./components/ThemeCustomization";
import Button from "@/app/components/ui/Button";

const CreateSlide = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      {show ? (
        <div className="flex justify-between gap-6">
          <div className="w-full">
            <SourceUploadSection />
            <div className="mt-10">
              <ThemeCustomization />
            </div>
            <div className="mt-10">
              <GenerationControls />
            </div>
            <div className="flex justify-center items-center h-50">
              <Button>Generate Presentation</Button>
            </div>
          </div>
          <RightSidebarPanels />
        </div>
      ) : (
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
