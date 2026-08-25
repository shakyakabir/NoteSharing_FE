"use client";
import React, { useState } from "react";
import Header from "./components/Header";
import SourceSelection from "./components/SourceSelection";
import ProcessingStatus from "./components/ProcessingStatus";
import QuizSettings from "./components/QuizSettings";
import StudyTip from "./components/StudyTip";
import { usePostQuizMutation } from "@/slices/Note";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AiCostNotice from "../../components/AiCostNotice";
import { useAiCredits, getInsufficientCredits } from "@/hooks/ai/useAiCredits";

export type SourceType = "upload" | "link" | "existing";

export default function AIQuizGenerator() {
  const [sourceType, setSourceType] = useState<SourceType>("upload");
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  const [difficulty, setDifficulty] = useState<string>("easy");
  const [questionCount, setQuestionCount] = useState<number>(15);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleSelectSource = (
    type: SourceType,
    id: number | null = null,
  ): void => {
    setSourceType(type);
    setSelectedNoteId(id);
  };
  console.log(selectedFile);
  const [postQuiz, { isLoading: loading }] = usePostQuizMutation();
  const { canAfford, refetch } = useAiCredits();
  const routes = useRouter();
  const onHandleGeneraate = async () => {
    if (!canAfford("QUIZ")) {
      toast.error("Not enough AI credits to generate a quiz.");
      return;
    }
    try {
      const res = await postQuiz(selectedFile).unwrap();
      refetch();
      if (res) {
        routes.push("/quiz/play");
      }
    } catch (err) {
      const insufficient = getInsufficientCredits(err);
      if (insufficient) {
        toast.error(
          `Not enough AI credits - needs ${insufficient.requiredCredits}, you have ${insufficient.availableCredits}.`,
        );
      } else {
        toast.error("Failed to generate quiz.");
      }
    }
  };
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans text-slate-800">
      <Header />

      {/* Main Grid Workspace */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Sources */}
        <div className="lg:col-span-7 space-y-6">
          <SourceSelection
            sourceType={sourceType}
            selectedNoteId={selectedNoteId}
            onSelectSource={handleSelectSource}
            onFileSelect={(file) => setSelectedFile(file)}
          />
          <ProcessingStatus />
        </div>

        {/* RIGHT COLUMN: Configurations */}
        <div className="lg:col-span-5 space-y-4">
          <AiCostNotice feature="QUIZ" />
          <QuizSettings
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            questionCount={questionCount}
            setQuestionCount={setQuestionCount}
            handleClick={onHandleGeneraate}
          />
          <StudyTip />
        </div>
      </div>
    </div>
  );
}
