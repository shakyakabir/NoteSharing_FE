"use client";

import { useEffect, useState } from "react";

import Config from "@/config/Index";
import { QuizResultDTO } from "@/Type/QuizType";
import { useGetQuizIDQuery, usePlayQuizMutation } from "@/slices/Quiz";

interface Question {
  question: string;
  options: string[];
}

interface QuizPlayProps {
  quizId: string;
  /** Defaults to Config.defaultEmail if not provided by the caller/session. */
  playerEmail?: string;
}

export default function QuizPlay({ quizId, playerEmail }: QuizPlayProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResultDTO | null>(null);
  const [playQuiz] = usePlayQuizMutation();

  const { data, isLoading, error } = useGetQuizIDQuery(
    "f6c2b159-783f-4a6b-83f0-2084a78a3dcc",
  );

  useEffect(() => {
    if (data?.questionsJson) {
      try {
        const parsed = JSON.parse(data.questionsJson);
        setQuestions(parsed);
      } catch (e) {
        console.error("Invalid JSON:", e);
      }
    }
  }, [data]);

  const selectAnswer = (index: number, optionIndex: number) => {
    const letter = ["A", "B", "C", "D"][optionIndex];
    setAnswers((prev) => ({
      ...prev,
      [index]: letter,
    }));
  };

  const submitQuiz = async () => {
    if (Object.keys(answers).length < questions.length) {
      alert("Please answer all questions before submitting!");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = Object.keys(answers).map((key) => ({
        questionIndex: parseInt(key),
        answer: answers[parseInt(key)],
      }));

      const result = await playQuiz({
        quizId,
        playerEmail: playerEmail || Config.defaultEmail,
        answers: payload,
      }).unwrap();

      setQuizResult(result);
    } catch (err) {
      console.error("Submission failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading)
    return (
      <div className="text-center py-12 text-slate-500 font-medium">
        Loading your quiz...
      </div>
    );
  if (error)
    return (
      <div className="text-center py-12 text-red-500 font-medium">
        Failed to load quiz. Please try again.
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Interactive Quiz
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Test your knowledge. Answer all questions below.
          </p>
        </div>

        {/* Results Screen (If submitted) */}
        {quizResult ? (
          <div className="bg-white rounded-2xl shadow-md border border-emerald-100 p-8 text-center animate-fade-in">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              ✓
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              Quiz Completed!
            </h2>

            <div className="mt-4 p-4 bg-slate-50 rounded-xl">
              <p className="text-4xl font-extrabold text-indigo-600">
                {quizResult.score} / {quizResult.total}
              </p>
              <p className="text-slate-500 mt-1 text-sm">
                {quizResult.total > 0
                  ? Math.round((quizResult.score / quizResult.total) * 100)
                  : 0}
                % correct
              </p>
            </div>

            {/* Points earned - only ever nonzero for solo mode */}
            <div className="mt-4 p-4 bg-amber-50 rounded-xl">
              <p className="text-2xl font-extrabold text-amber-600">
                +{quizResult.pointsEarned} pts
              </p>
              <p className="text-slate-500 mt-1 text-xs">
                {quizResult.mode === "SOLO"
                  ? "Added to your total score"
                  : "Collaborative quizzes don't earn points"}
              </p>
            </div>

            <p className="mt-4 text-slate-600">
              Your answers have been submitted successfully.
            </p>

            <button
              onClick={() => {
                setAnswers({});
                setQuizResult(null);
              }}
              className="mt-6 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition duration-200"
            >
              Try Again
            </button>
          </div>
        ) : (
          /* Quiz Body */
          <div className="space-y-6">
            {questions.map((q, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <span className="flex items-center justify-center bg-indigo-50 text-indigo-600 text-xs font-bold rounded-lg h-7 w-7 shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <h3 className="text-lg font-semibold text-slate-800 leading-tight">
                    {q.question}
                  </h3>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options.map((opt, optIndex) => {
                    const letter = ["A", "B", "C", "D"][optIndex];
                    const isSelected = answers[i] === letter;
                    return (
                      <button
                        key={opt}
                        onClick={() => selectAnswer(i, optIndex)}
                        className={`text-left px-5 py-4 rounded-xl border font-medium text-sm transition-all duration-150 ${
                          isSelected
                            ? "bg-indigo-50 border-indigo-600 text-indigo-700 shadow-sm ring-1 ring-indigo-600"
                            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="pt-4">
              <button
                onClick={submitQuiz}
                disabled={isSubmitting || questions.length === 0}
                className="w-full sm:w-auto float-right px-8 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-md shadow-indigo-100 hover:shadow-lg transition-all duration-200 text-base"
              >
                {isSubmitting ? "Submitting..." : "Submit Answers"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
