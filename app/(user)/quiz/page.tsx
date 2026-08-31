"use client";
// import { usePostQuizMutation } from "@/slices/Note";
// import React from "react";
// import HeroSection from "./components/HeroSection";
// import AnalyticsSection from "./components/AnalyticsSection";
// import TailoredAssessments from "./components/TailoredAssessments";
// import UpgradeSection from "./components/UpgradeSection";

// export default function LearningDashboard() {
//   return (
//     <div className="min-h-screen bg-slate-50/50 w-full mx-auto space-y-10">
//       <HeroSection />
//       <AnalyticsSection />
//       <TailoredAssessments />
//       <UpgradeSection />
//     </div>
//   );
// }

import React, { useRef, useState } from "react";
import {
  User,
  Users,
  BookOpen,
  Upload,
  ChevronDown,
  Sparkles,
  Zap,
  TrendingUp,
  Smile,
  Flame,
  Star,
  FileText,
  X,
} from "lucide-react";
import { usePostQuizMutation } from "@/slices/Quiz";
import { useGetNotesQuery } from "@/slices/Note";
import { useRouter } from "next/navigation";

// --- TYPES ---
type Mode = "solo" | "collaborative";
type Difficulty = "beginner" | "intermediate" | "advanced" | "expert";

interface DifficultyOption {
  id: Difficulty;
  label: string;
  points: number;
  icon: React.ReactNode;
}

interface QuizSetupFormProps {
  /** Called with the newly created quiz id once generation succeeds. */
  onQuizCreated?: (quizId: string) => void;
}

export const QuizSetupForm: React.FC<QuizSetupFormProps> = ({
  onQuizCreated,
}) => {
  // --- STATE ---
  const [selectedMode, setSelectedMode] = useState<Mode>("solo");
  const [selectedNotebook, setSelectedNotebook] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty>("intermediate");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [postQuiz, { isLoading }] = usePostQuizMutation();
  const { data, isLoading: noteLoading } = useGetNotesQuery();
  console.log(data, "notedata");
  // --- DIFFICULTY CONFIG ---
  const difficulties: DifficultyOption[] = [
    {
      id: "beginner",
      label: "Beginner",
      points: 10,
      icon: <Smile className="w-5 h-5 text-gray-500" />,
    },
    {
      id: "intermediate",
      label: "Intermediate",
      points: 50,
      icon: <TrendingUp className="w-5 h-5 text-gray-500" />,
    },
    {
      id: "advanced",
      label: "Advanced",
      points: 100,
      icon: <Zap className="w-5 h-5 text-gray-500" />,
    },
    {
      id: "expert",
      label: "Expert",
      points: 250,
      icon: <Flame className="w-5 h-5 text-gray-500" />,
    },
  ];

  // Get active points for section 3 badge
  const currentReward =
    difficulties.find((d) => d.id === selectedDifficulty)?.points || 0;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setSelectedFile(file);
    if (file) {
      // Content source is one-or-the-other on the backend right now.
      setSelectedNotebook("");
    }
  };

  const handleNotebookChange = (value: string) => {
    setSelectedNotebook(value);
    if (value) {
      setSelectedFile(null);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const htmlToText = (html: string): string => {
    if (!html) return "";

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    return doc.body.textContent?.replace(/\s+/g, " ").trim() || "";
  };
  const noteFinder = data?.find(
    (item: any) => item.id === String(selectedNotebook),
  );
  console.log(noteFinder, "notefinder");
  const sourceContent = htmlToText(noteFinder?.content);
  console.log(sourceContent);
  const router = useRouter();
  const handleGenerate = async () => {
    if (!selectedFile && !selectedNotebook) {
      alert("Choose a notebook or upload a file first.");
      return;
    }

    // TODO: backend doesn't resolve notebookId -> note content yet, so this path
    // will fail server-side until that lookup is added. File upload works today.
    // if (selectedNotebook && !selectedFile) {
    //   alert(
    //     "Generating from a saved notebook isn't wired up on the backend yet - please upload a file for now.",
    //   );
    //   return;
    // }
    console.log(selectedNotebook, "selectedNOte");
    console.log(selectedFile, "selectedNOte");
    console.log(selectedDifficulty, "selectedNOte");
    console.log(selectedMode, "selectedNOte");
    try {
      const quiz = await postQuiz({
        file: selectedFile ?? undefined,
        notebookId: selectedNotebook || undefined,
        difficulty: selectedDifficulty,
        noteText: sourceContent,
        mode: selectedMode,
      }).unwrap();
      console.log(quiz, "quizj");

      if (quiz) {
        sessionStorage.setItem("quizPlayId", quiz.id);
        router.push("quiz/play");
      }
    } catch (err) {
      console.error("Failed to generate quiz:", err);
      alert("Something went wrong generating the quiz. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 flex flex-col gap-6 max-w-4xl mx-auto text-slate-800 font-sans">
      {/* SECTION 1: SELECT MODE */}
      <section className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          1. Select Mode
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Solo Mastery */}
          <button
            type="button"
            onClick={() => setSelectedMode("solo")}
            className={`flex items-start gap-4 p-5 rounded-xl border-2 text-left transition-all ${
              selectedMode === "solo"
                ? "border-indigo-600 bg-indigo-50/20"
                : "border-slate-200 hover:border-slate-300 bg-white"
            }`}
          >
            <div className="p-3 bg-indigo-100 rounded-full text-indigo-600 shrink-0 mt-0.5">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">
                Solo Mastery
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Focus intensely on your own progress and track personal
                analytics.
              </p>
            </div>
          </button>

          {/* Collaborative Challenge */}
          <button
            type="button"
            onClick={() => setSelectedMode("collaborative")}
            className={`flex items-start gap-4 p-5 rounded-xl border-2 text-left transition-all ${
              selectedMode === "collaborative"
                ? "border-indigo-600 bg-indigo-50/20"
                : "border-slate-200 hover:border-slate-300 bg-white"
            }`}
          >
            <div className="p-3 bg-amber-100 rounded-full text-amber-700 shrink-0 mt-0.5">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">
                Collaborative Challenge
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Invite peers, compete in real-time, and learn together.
              </p>
            </div>
          </button>
        </div>

        {selectedMode === "collaborative" && (
          <p className="mt-3 text-[11px] text-amber-600">
            Heads up: points are only earned in Solo Mastery. Collaborative
            challenges are for practice and bragging rights only.
          </p>
        )}
      </section>

      {/* SECTION 2: CONTENT SOURCE */}
      <section className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-slate-800">
            2. Content Source
          </h2>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100/70 text-emerald-700 rounded-full text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            AI Enhanced
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Select from Library */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Select from Library
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <BookOpen className="w-4 h-4" />
              </div>
              <select
                value={selectedNotebook}
                onChange={(e) => handleNotebookChange(e.target.value)}
                className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              >
                <option value="" disabled>
                  Choose a notebook...
                </option>
                {data?.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
            <p className="mt-2 text-[11px] text-slate-400">
              Our AI will generate questions based on your notes.
            </p>
          </div>

          {/* Upload Material */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Or Upload Material
            </label>
            <input
              ref={fileRef}
              type="file"
              hidden
              accept=".pdf,.txt"
              onChange={handleFileChange}
            />
            {selectedFile ? (
              <div className="border-2 border-solid border-indigo-200 rounded-lg p-4 flex items-center justify-between bg-indigo-50/40">
                <div className="flex items-center gap-2 min-w-0">
                  <FileText className="w-5 h-5 text-indigo-600 shrink-0" />
                  <span className="text-xs font-semibold text-slate-800 truncate">
                    {selectedFile.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    if (fileRef.current) fileRef.current.value = "";
                  }}
                  className="p-1 text-slate-400 hover:text-slate-600 shrink-0"
                  aria-label="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileRef.current?.click()}
                className="border-2 border-dashed border-slate-300 rounded-lg p-5 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-center"
              >
                <Upload className="w-6 h-6 text-slate-400 mb-2" />
                <p className="text-xs font-bold text-slate-800">
                  Drag & drop files here
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  PDF or TXT (Max 10MB)
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 3: SET DIFFICULTY */}
      <section className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-slate-800">
            3. Set Difficulty
          </h2>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
            <div className="w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span>Est. Rewards:</span>
            <span className="text-indigo-600">
              +{selectedMode === "solo" ? currentReward : 0} pts
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {difficulties.map((diff) => {
            const isSelected = selectedDifficulty === diff.id;
            return (
              <button
                key={diff.id}
                type="button"
                onClick={() => setSelectedDifficulty(diff.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                  isSelected
                    ? "border-indigo-600 bg-indigo-50/10"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="p-2.5 bg-slate-100 rounded-lg mb-2">
                  {diff.icon}
                </div>
                <span className="text-xs font-bold text-slate-800">
                  {diff.label}
                </span>
                <span className="text-[11px] font-medium text-slate-500 mt-0.5">
                  +{diff.points} pts
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <div className="text-end">
        <button
          type="button"
          onClick={handleGenerate}
          disabled={isLoading}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
        >
          {isLoading ? "Generating..." : "Generate Quiz"}
        </button>
      </div>
    </div>
  );
};

export default QuizSetupForm;
