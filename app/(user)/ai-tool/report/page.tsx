"use client";
import { useState } from "react";
import { PromptSection } from "./components/PromptSection";
import { SourceMaterialSection } from "./components/SourceMaterialSection";
import { ReferenceReportSection } from "./components/ReferenceReportSection";
import { ConfigurationSummary } from "./components/ConfigurationSummary";
import { useGetNotesQuery } from "@/slices/Note";
import { useCreateReportMutation, useGetReportsQuery } from "@/slices/Ai";
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
import { ReportSuccessModal } from "./components/ReportSuccessModal";
import { ReportsListSection } from "./components/ReportsListSection";
// import * as pdfjsLib from "pdfjs-dist";

export default function GenerateReport() {
  //   const [selectedNotes, setSelectedNotes] = useState<string[]>([
  //     "Market Analysis Q3",
  //     "Competitor Research",
  //   ]);

  const { data: selectedNotes = [], isLoading } = useGetNotesQuery();
  const [createRepo, { isLoading: createLoading }] = useCreateReportMutation();
  const { canAfford, refetch } = useAiCredits();
  const { isPremium, isPremiumFeature } = useUserAccess();
  const [accessError, setAccessError] = useState<unknown>(null);
  const [prompt, setPrompt] = useState("");
  const [selectedNote, setSelectedNote] = useState<any>("");
  const [note, setNote] = useState<any>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [referenceFiles, setReferenceFiles] = useState<File | null>(null);

  // Output configuration
  const [detailLevel, setDetailLevel] = useState(2);
  const [generatedReport, setGeneratedReport] = useState<any | null>(null);
  const [writingStyle, setWritingStyle] = useState("Professional / Academic");
  const handleRemoveNote = (noteToRemove: string) => {
    selectedNotes.filter((n: any) => n !== noteToRemove);
  };
  const { data: reports, isLoading: reportsLoading } = useGetReportsQuery();
  const handleSelectNote = (note: any | null) => {
    setSelectedNote(note?.title ?? "");
    setNote(note ?? "");
  };
  const handleUploadedNote = (file: File | null) => {
    setUploadedFile(file);
  };
  const handleReferenceValue = (file: File | null) => {
    setReferenceFiles(file);
  };
  console.log(note, "sleecredNOte");
  const htmlToText = (html: string): string => {
    if (!html) return "";

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    return doc.body.textContent?.replace(/\s+/g, " ").trim() || "";
  };
  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(String(reader.result ?? ""));
      };

      reader.onerror = () => {
        reject(new Error("Unable to read file"));
      };

      reader.readAsText(file);
    });
  };
  const readPdfAsText = async (file: File): Promise<string> => {
    if (typeof window === "undefined") {
      throw new Error("PDF extraction must run in the browser.");
    }

    const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");

    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

    const arrayBuffer = await file.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({
      data: new Uint8Array(arrayBuffer),
    }).promise;

    let text = "";

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);

      const content = await page.getTextContent();

      const pageText = content.items
        .map((item: any) => item.str || "")
        .join(" ");

      text += pageText + "\n";
    }

    return text.trim();
  };
  const handleReportGenerate = async () => {
    try {
      if (!prompt.trim()) {
        toast.error("Please enter a prompt.");
        return;
      }

      if (!selectedNote && !uploadedFile) {
        toast.error("Please select a note or upload a source document.");
        return;
      }

      if (!canAfford("REPORT")) {
        toast.error("Not enough AI credits to generate a report.");
        return;
      }

      if (isPremiumFeature("REPORT") && !isPremium) {
        toast.error("This is a Premium feature. Upgrade to use it.");
        return;
      }

      let sourceContent = "";
      let noteId: string | null = null;
      let title = "Generated Report";

      // =========================
      // Selected note
      // =========================
      if (selectedNote && note) {
        noteId = note.id;
        title = note.title || "Generated Report";

        sourceContent = htmlToText(note.content || "");
      }

      // =========================
      // Uploaded source file
      // =========================
      if (uploadedFile) {
        title = uploadedFile.name;

        // Do NOT read PDF into sourceContent.
        // Backend will extract the PDF from sourceFile.
        sourceContent = "";
      }

      // =========================
      // Reference content
      // =========================
      let referenceContent = "";

      if (referenceFiles) {
        if (referenceFiles.type === "application/pdf") {
          referenceContent = await readPdfAsText(referenceFiles);
        } else if (
          referenceFiles.type === "text/plain" ||
          referenceFiles.name.toLowerCase().endsWith(".md")
        ) {
          referenceContent = await readFileAsText(referenceFiles);
        } else {
          toast.error("Reference file format is not supported.");
          return;
        }
      }

      // =========================
      // Multipart request
      // =========================
      const formData = new FormData();

      if (noteId) {
        formData.append("noteId", noteId);
      }

      formData.append("sourceContent", sourceContent);
      formData.append("title", title);

      // IMPORTANT
      formData.append("reportType", "REPORT");

      formData.append("prompt", prompt);
      formData.append("detailLevel", String(detailLevel));
      formData.append("writingStyle", writingStyle);
      formData.append("referenceContent", referenceContent);

      if (uploadedFile) {
        formData.append("sourceFile", uploadedFile);
      }

      if (referenceFiles) {
        formData.append("referenceFile", referenceFiles);
      }

      console.log("Creating report...");
      console.log("title:", title);
      console.log("reportType:", "REPORT");
      console.log("sourceFile:", uploadedFile?.name);
      console.log("noteId:", noteId);

      const response = await createRepo(formData).unwrap();

      console.log("Report generated successfully:", response);

      refetch();
      toast.success("Report generated successfully.");
      setGeneratedReport(response);
    } catch (error) {
      console.error("Generate report failed:", error);

      if (getInsufficientCredits(error) || getFeatureNotAvailable(error)) {
        setAccessError(error);
        return;
      }

      toast.error("Failed to generate report.");
    }
  };
  return (
    <div className="min-h-screen bg-gray-50/60 p-6 md:p-12 font-sans text-gray-900">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Generate Report
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Turn your notes and documents into professional reports with AI
            assistance.
          </p>
        </div>

        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column (Main Form) */}
          <div className="lg:col-span-2 space-y-6">
            <AiCostNotice feature="REPORT" />
            <SourceMaterialSection
              selectedNotes={selectedNotes}
              onRemoveNote={handleRemoveNote}
              onSelectedNote={handleSelectNote}
              onUploadedNote={handleUploadedNote}
            />
            <PromptSection prompt={prompt} setPrompt={setPrompt} />
            <ReferenceReportSection referenceFile={handleReferenceValue} />
          </div>

          {/* Right Column (Sidebar Configuration) */}
          <div className="lg:col-span-1">
            <ConfigurationSummary
              selectedNotesCount={selectedNote ? 1 : 0}
              uploadedFilesCount={uploadedFile ? 1 : 0}
              detailLevel={detailLevel}
              setDetailLevel={setDetailLevel}
              writingStyle={writingStyle}
              setWritingStyle={setWritingStyle}
              onGenerate={handleReportGenerate}
              isLoading={createLoading}
            />
          </div>
        </div>
        <ReportsListSection
          reports={reports}
          isLoading={reportsLoading}
          onSelectReport={(report) => setGeneratedReport(report)}
        />

        <RestrictedFeatureModal
          error={accessError}
          onClose={() => setAccessError(null)}
        />

        <ReportSuccessModal
          report={generatedReport}
          onClose={() => setGeneratedReport(null)}
        />
      </div>
    </div>
  );
}
