"use client";
import { usePostQuizMutation } from "@/slices/Note";
import React from "react";
import HeroSection from "./components/HeroSection";
import AnalyticsSection from "./components/AnalyticsSection";
import TailoredAssessments from "./components/TailoredAssessments";
import UpgradeSection from "./components/UpgradeSection";

export default function LearningDashboard() {
  return (
    <div className="min-h-screen bg-slate-50/50 w-full mx-auto space-y-10">
      <HeroSection />
      <AnalyticsSection />
      <TailoredAssessments />
      <UpgradeSection />
    </div>
  );
}

// import { useState } from "react";

// export default function CreateQuiz() {
//   const [note, setNote] = useState("");
//   // const [loading, setLoading] = useState(false);

//   const [postQuiz, { isLoading: loading }] = usePostQuizMutation();
//   const generateQuiz = async () => {
//     const res = await postQuiz(note);
//     console.log(res);
//   };

//   return (
//     <div>
//       <h2>Create Quiz from Note</h2>

//       <textarea
//         value={note}
//         onChange={(e) => setNote(e.target.value)}
//         placeholder="Paste your note here..."
//       />

//       <button onClick={generateQuiz}>
//         {loading ? "Generating..." : "Generate Quiz"}
//       </button>
//     </div>
//   );
// }
