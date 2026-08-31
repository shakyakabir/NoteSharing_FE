// "use client";
// import { Sparkles } from "lucide-react";
// import TextInputArea from "../components/TextInputArea";
// import UploadZone from "../components/UploadZone";
// import Breadcrumbs from "../components/Breadcrumbs";
// import { useState } from "react";
// import { useSummarizeMutation } from "@/slices/Ai";
// import { toast } from "sonner";
// import AiCostNotice from "../../components/AiCostNotice";
// import RestrictedFeatureModal from "../../components/RestrictedFeatureModal";
// import {
//   useAiCredits,
//   getInsufficientCredits,
//   getFeatureNotAvailable,
// } from "@/hooks/ai/useAiCredits";
// import { useUserAccess } from "@/hooks/access/useUserAccess";

// const Summarizer = () => {
//   const [textInput, setTextInput] = useState("");
//   const [summary, setSummary] = useState("");
//   const [summarize, { isLoading: isProcessing }] = useSummarizeMutation();
//   const { canAfford, refetch } = useAiCredits();
//   const { isPremium, isPremiumFeature } = useUserAccess();
//   const [accessError, setAccessError] = useState<unknown>(null);

//   // Premium-only feature on a free plan: lock the action (the backend enforces the same gate).
//   const locked = isPremiumFeature("SUMMARIZE") && !isPremium;

//   const handleGenerate = async () => {
//     try {
//       const result = await summarize({
//         title: "Generated Summary",
//         sourceContent: textInput,
//         reportType: "SUMMARY",
//       }).unwrap();

//       setSummary(result?.content || "");
//       // Balance changed server-side - refresh the shared credits cache (badge, dashboard, etc.).
//       refetch();
//     } catch (err) {
//       if (getInsufficientCredits(err) || getFeatureNotAvailable(err)) {
//         setAccessError(err);
//       } else {
//         toast.error("Failed to generate summary.");
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#F9FAFD] p-6 md:p-10 max-w-4xl mx-auto space-y-6">
//       {/* Structural Meta Header Block Row */}
//       <div className="space-y-2">
//         <Breadcrumbs toolName={""} />
//         <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
//           AI Tools Hub
//         </h1>
//         <p className="text-slate-400 text-xs max-w-2xl leading-relaxed">
//           Enhance your learning experience with our suite of intelligent note
//           processing tools. Use your points to unlock instant insights and
//           automated organization.
//         </p>
//       </div>

//       {/* Primary Configuration Panel Interface Card container */}
//       <div className="bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
//         {/* Module Subheader row containing pricing tags */}
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-50 pb-4">
//           <div className="space-y-0.5">
//             <h2 className="text-base font-bold text-slate-800 tracking-tight">
//               Summarize Note
//             </h2>
//             <p className="text-slate-400 text-xs">
//               Upload a document or paste text to generate an AI summary.
//             </p>
//           </div>

//           <AiCostNotice
//             feature="SUMMARIZE"
//             className="self-start sm:self-auto"
//           />
//         </div>

//         {/* Binary Choice Inputs Blocks: Drag drop zone + Custom textarea entry box formatting */}
//         <div className="space-y-6">
//           <UploadZone />

//           <TextInputArea
//             value={textInput}
//             onChange={(e) => setTextInput(e.target.value)}
//           />
//         </div>

//         {/* Footer trigger submission action panel row */}
//         <div className="flex justify-end pt-2">
//           <button
//             onClick={handleGenerate}
//             disabled={isProcessing || !canAfford("SUMMARIZE") || locked}
//             className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold text-xs px-5 py-3 rounded-xl transition flex items-center space-x-2 shadow-md shadow-indigo-600/10"
//           >
//             <span>
//               {isProcessing ? "Processing Matrix..." : "Generate Summary"}
//             </span>
//             <Sparkles
//               size={14}
//               className={isProcessing ? "animate-spin" : "fill-white/20"}
//             />
//           </button>
//         </div>
//       </div>

//       {summary && (
//         <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
//           <h2 className="text-base font-bold text-slate-800 mb-3">
//             Generated Summary
//           </h2>
//           <pre className="whitespace-pre-wrap text-xs leading-relaxed text-slate-600 font-sans">
//             {summary}
//           </pre>
//         </div>
//       )}

//       <RestrictedFeatureModal
//         error={accessError}
//         onClose={() => setAccessError(null)}
//       />
//     </div>
//   );
// };
// export default Summarizer;

"use client";

import { Sparkles, Upload, X } from "lucide-react";
import TextInputArea from "../components/TextInputArea";
import Breadcrumbs from "../components/Breadcrumbs";
import { useState, useRef } from "react";
import { useSummarizeMutation } from "@/slices/Ai";
import { toast } from "sonner";
import AiCostNotice from "../../components/AiCostNotice";
import RestrictedFeatureModal from "../../components/RestrictedFeatureModal";
import {
  useAiCredits,
  getInsufficientCredits,
  getFeatureNotAvailable,
} from "@/hooks/ai/useAiCredits";
import { useUserAccess } from "@/hooks/access/useUserAccess";
import Config from "@/config/Index";

// Inline UploadZone with Click-to-Open File Dialog
interface UploadZoneProps {
  onFileSelect: (file: File | null) => void;
  accept?: string;
}

function UploadZone({
  onFileSelect,
  accept = ".pdf,.doc,.docx,.txt",
}: UploadZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileSelect(file);
    e.target.value = "";
  };

  return (
    <div
      onClick={handleClick}
      className="border-2 border-dashed border-slate-200 hover:border-indigo-400 bg-slate-50/50 hover:bg-indigo-50/20 rounded-2xl p-6 text-center cursor-pointer transition flex flex-col items-center justify-center space-y-3 group"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:scale-105 shadow-sm transition">
        <Upload className="w-5 h-5" />
      </div>

      <div className="space-y-1">
        <p className="text-xs font-bold text-slate-700 group-hover:text-indigo-600 transition">
          Click to browse and upload file
        </p>
        <p className="text-[11px] text-slate-400">
          Supports PDF, DOC, DOCX, or TXT up to 10MB
        </p>
      </div>
    </div>
  );
}

export default function Summarizer() {
  const [textInput, setTextInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [summary, setSummary] = useState("");

  const [summarize, { isLoading: isProcessing }] = useSummarizeMutation();

  const { canAfford, refetch } = useAiCredits();
  const { isPremium, isPremiumFeature } = useUserAccess();

  const [accessError, setAccessError] = useState<unknown>(null);

  const locked = isPremiumFeature("SUMMARIZE") && !isPremium;
  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        // strip the "data:<mime>;base64," prefix — keep raw base64 only
        const result = reader.result as string;
        resolve(result.split(",")[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleGenerate = async () => {
    try {
      if (!textInput.trim() && !selectedFile) {
        toast.error("Please enter text or upload a document.");
        return;
      }

      if (!canAfford("SUMMARIZE")) {
        toast.error("Not enough AI credits.");
        return;
      }

      if (locked) {
        toast.error("This is a Premium feature.");
        return;
      }
      // const email=localStorage.getItem("email")
      const email = Config.defaultEmail;

      if (!email) {
        toast.error("User email not found. Please log in again.");
        return;
      }
      const formData = new FormData();
      formData.append("title", "Generated Summary");
      formData.append("reportType", "SUMMARY");
      formData.append("userEmail", email);

      if (textInput.trim()) {
        formData.append("sourceContent", textInput.trim());
      } else if (selectedFile) {
        formData.append("sourceFile", selectedFile); // raw File — matches MultipartFile field
      }

      const result = await summarize(formData).unwrap();
      setSummary(result?.content || "");

      await refetch();
      toast.success("Summary generated successfully.");
    } catch (err) {
      console.error("Summary generation failed:", err);

      if (getInsufficientCredits(err) || getFeatureNotAvailable(err)) {
        setAccessError(err);
      } else {
        toast.error("Failed to generate summary.");
      }
    }
  };

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    if (file) {
      setTextInput("");
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFD] p-6 md:p-10 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <Breadcrumbs toolName="" />

        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          AI Tools Hub
        </h1>

        <p className="text-slate-400 text-xs max-w-2xl leading-relaxed">
          Enhance your learning experience with our suite of intelligent note
          processing tools. Use your points to unlock instant insights and
          automated organization.
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-50 pb-4">
          <div className="space-y-0.5">
            <h2 className="text-base font-bold text-slate-800 tracking-tight">
              Summarize Note
            </h2>

            <p className="text-slate-400 text-xs">
              Upload a document or paste text to generate an AI summary.
            </p>
          </div>

          <AiCostNotice
            feature="SUMMARIZE"
            className="self-start sm:self-auto"
          />
        </div>

        {/* Input Controls */}
        <div className="space-y-6">
          <UploadZone onFileSelect={handleFileSelect} />

          {/* Selected File Card Display */}
          {selectedFile && (
            <div className="flex items-center justify-between bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-indigo-700 truncate">
                  {selectedFile.name}
                </p>

                <p className="text-[11px] text-indigo-400 mt-0.5">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedFile(null)}
                className="text-indigo-400 hover:text-red-500 transition ml-4"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <TextInputArea
            value={textInput}
            onChange={(e) => {
              setTextInput(e.target.value);
              if (e.target.value.trim()) {
                setSelectedFile(null);
              }
            }}
          />
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isProcessing || !canAfford("SUMMARIZE") || locked}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white font-bold text-xs px-5 py-3 rounded-xl transition flex items-center space-x-2 shadow-md shadow-indigo-600/10"
          >
            <span>{isProcessing ? "Processing..." : "Generate Summary"}</span>

            <Sparkles
              size={14}
              className={isProcessing ? "animate-spin" : "fill-white/20"}
            />
          </button>
        </div>
      </div>

      {/* Output Container */}
      {summary && (
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-800 mb-3">
            Generated Summary
          </h2>

          <pre className="whitespace-pre-wrap text-xs leading-relaxed text-slate-600 font-sans">
            {summary}
          </pre>
        </div>
      )}

      {/* Access Restriction Modal */}
      <RestrictedFeatureModal
        error={accessError}
        onClose={() => setAccessError(null)}
      />
    </div>
  );
}
