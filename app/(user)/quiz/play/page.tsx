// "use client";

// import { useGetQuizIDQuery } from "@/slices/Note";
// import { useEffect, useState } from "react";

// export default function QuizPlay() {
//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState({});

//   const { data } = useGetQuizIDQuery("79c4e810-74f2-4abb-b3cd-9fa7248b3220");

//   useEffect(() => {
//     if (data?.questionsJson) {
//       try {
//         const parsed = JSON.parse(data.questionsJson);
//         setQuestions(parsed);
//       } catch (e) {
//         console.error("Invalid JSON:", e);
//       }
//     }
//   }, [data]);

//   const selectAnswer = (index, option) => {
//     setAnswers((prev) => ({
//       ...prev,
//       [index]: option,
//     }));
//   };

//   const submitQuiz = async () => {
//     const payload = Object.keys(answers).map((key) => ({
//       questionIndex: parseInt(key),
//       answer: answers[key],
//     }));

//     const res = await fetch(
//       "http://localhost:8080/api/play?quizId=79c4e810-74f2-4abb-b3cd-9fa7248b3220&email=test@gmail.com",
//       {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       },
//     );

//     const result = await res.json();
//     console.log(result);
//   };

//   return (
//     <div>
//       <h2>Quiz</h2>

//       {questions.map((q, i) => (
//         <div key={i}>
//           <h3>{q.question}</h3>

//           {q.options.map((opt) => (
//             <button key={opt} onClick={() => selectAnswer(i, opt)}>
//               {opt}
//             </button>
//           ))}
//         </div>
//       ))}

//       <button onClick={submitQuiz}>Submit</button>
//     </div>
//   );
// }

"use client";

import { useGetQuizIDQuery } from "@/slices/Note";
import { useEffect, useState } from "react";

// Types for better clarity and safety
interface Question {
  question: string;
  options: string[];
}

export default function QuizPlay() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizResult, setQuizResult] = useState<any>(null);

  const { data, isLoading, error } = useGetQuizIDQuery(
    "57dd2e64-41a6-4d1b-8064-2f5349053323",
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
    // Basic validation to check if all questions are answered
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

      const res = await fetch(
        "http://localhost:8080/api/play?quizId=57dd2e64-41a6-4d1b-8064-2f5349053323&email=xiregev461%40getasail.com",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const result = await res.json();
      setQuizResult(result);
      console.log(result);
    } catch (err) {
      console.error("Submission failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading & Error States
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
            {/* ← Add this score display */}
            <div className="mt-4 p-4 bg-slate-50 rounded-xl">
              <p className="text-4xl font-extrabold text-indigo-600">
                {quizResult.score} / {quizResult.total}
              </p>
              <p className="text-slate-500 mt-1 text-sm">
                {Math.round((quizResult.score / quizResult.total) * 100)}%
                correct
              </p>
            </div>
            <p className="mt-2 text-slate-600">
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

                {/* Options Grid */}
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

            {/* Submit Button */}
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
