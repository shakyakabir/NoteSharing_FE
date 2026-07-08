import React from "react";
import {
  Settings,
  Smile,
  Activity,
  Flame,
  DollarSign,
  Zap,
  LucideIcon,
} from "lucide-react";

interface DifficultyMode {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface QuizSettingsProps {
  difficulty: string;
  setDifficulty: (value: string) => void;
  questionCount: number;
  setQuestionCount: (value: number) => void;
  handleClick: () => void;
}

export default function QuizSettings({
  difficulty,
  setDifficulty,
  questionCount,
  setQuestionCount,
  handleClick,
}: QuizSettingsProps) {
  const calculatedPoints = questionCount * 30;

  const difficultyModes: DifficultyMode[] = [
    { id: "easy", label: "Easy", icon: Smile },
    { id: "medium", label: "Medium", icon: Activity },
    { id: "hard", label: "Hard", icon: Flame },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between h-full">
      <div>
        <h2 className="text-base font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Settings className="w-4 h-4 text-indigo-600" /> 2. Quiz Settings
        </h2>

        {/* Difficulty Selectors */}
        <div className="mb-6">
          <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase block mb-3">
            Difficulty Level
          </span>
          <div className="grid grid-cols-3 gap-2">
            {difficultyModes.map((mode) => {
              const IconComponent = mode.icon;
              const isSelected = difficulty === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => setDifficulty(mode.id)}
                  className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
                    isSelected
                      ? "border-indigo-600 text-indigo-600 bg-indigo-50/20 font-bold"
                      : "border-slate-100 hover:border-slate-200 text-slate-400 font-medium"
                  }`}
                >
                  <IconComponent className="w-4 h-4 mb-1" />
                  <span className="text-xs text-slate-800 font-semibold">
                    {mode.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Slider Input */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              Question Count
            </span>
            <span className="px-2 py-0.5 text-xs font-bold text-indigo-600 bg-indigo-50 rounded-md">
              {questionCount} Questions
            </span>
          </div>
          <input
            type="range"
            min="5"
            max="50"
            value={questionCount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuestionCount(Number(e.target.value))
            }
            className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between items-center text-[10px] font-medium text-slate-400 mt-2">
            <span>5 (Quick Review)</span>
            <span>50 (Final Prep)</span>
          </div>
        </div>

        {/* Rewards Graphic Display Card */}
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl p-5 text-white relative overflow-hidden shadow-md mb-6">
          <div className="absolute right-[-10px] bottom-[-20px] w-32 h-32 bg-white/5 rounded-full flex items-center justify-center">
            <DollarSign className="w-20 h-20 text-white/5" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-200/80 block">
            Potential Completion Rewards
          </span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-3xl font-black tracking-tight">
              {calculatedPoints}
            </span>
            <span className="text-sm font-bold text-indigo-200">Points</span>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-emerald-300">
            <Zap className="w-3.5 h-3.5 fill-emerald-300 stroke-none" /> +15%
            Streak Multiplier Active
          </div>
        </div>
      </div>

      <button
        onClick={handleClick}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm group"
      >
        Generate Study Quiz
        <Zap className="w-4 h-4 fill-white transition-transform group-hover:scale-110" />
      </button>
    </div>
  );
}
