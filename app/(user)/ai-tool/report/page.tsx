"use client";
import { useState } from "react";
import { PromptSection } from "./components/PromptSection";
import { SourceMaterialSection } from "./components/SourceMaterialSection";
import { ReferenceReportSection } from "./components/ReferenceReportSection";
import { ConfigurationSummary } from "./components/ConfigurationSummary";
import { useGetNotesQuery } from "@/slices/Note";
import { useCreateReportMutation } from "@/slices/Ai";
import { toast } from "sonner";
import AiCostNotice from "../../components/AiCostNotice";
import { useAiCredits, getInsufficientCredits } from "@/hooks/ai/useAiCredits";
// import * as pdfjsLib from "pdfjs-dist";

export default function GenerateReport() {
  //   const [selectedNotes, setSelectedNotes] = useState<string[]>([
  //     "Market Analysis Q3",
  //     "Competitor Research",
  //   ]);

  const { data: selectedNotes = [], isLoading } = useGetNotesQuery();
  const [createRepo, { isLoading: createLoading }] = useCreateReportMutation();
  const { canAfford, refetch } = useAiCredits();
  const [prompt, setPrompt] = useState("");
  const [selectedNote, setSelectedNote] = useState<any>("");
  const [note, setNote] = useState<any>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [referenceFiles, setReferenceFiles] = useState<File | null>(null);

  // Output configuration
  const [detailLevel, setDetailLevel] = useState(2);

  const [writingStyle, setWritingStyle] = useState("Professional / Academic");
  const handleRemoveNote = (noteToRemove: string) => {
    selectedNotes.filter((n: any) => n !== noteToRemove);
  };
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
        alert("Please enter a prompt.");
        return;
      }

      if (!selectedNote && !uploadedFile) {
        alert("Please select a note or upload a source document.");
        return;
      }

      if (!canAfford("REPORT")) {
        toast.error("Not enough AI credits to generate a report.");
        return;
      }

      let sourceContent = "";
      let noteId = null;
      let title = "Generated Report";

      /**
       * Existing note selected
       */
      if (selectedNote) {
        noteId = note.id;

        title = note.title || "Generated Report";

        sourceContent = htmlToText(
          note.content || selectedNote.noteContent || "",
        );
      }

      /**
       * Local document selected
       */
      if (uploadedFile) {
        sourceContent = await readFileAsText(uploadedFile);

        title = uploadedFile.name;
      }

      /**
       * Reference report
       */
      let referenceContent = "";
      console.log();
      // if (referenceFiles) {
      //   referenceContent = await readFileAsText(referenceFiles);
      // }

      if (referenceFiles) {
        if (referenceFiles.type === "application/pdf") {
          referenceContent = await readPdfAsText(referenceFiles);
        } else if (
          referenceFiles.type === "text/plain" ||
          referenceFiles.name.endsWith(".md")
        ) {
          referenceContent = await readFileAsText(referenceFiles);
        } else {
          alert("Reference file format is not currently supported.");
          return;
        }
      }

      /**
       * API payload
       */
      const payload = {
        noteId,

        sourceContent,

        title,

        reportType: "GENERAL",

        prompt,

        detailLevel,

        writingStyle,

        referenceContent,
      };

      console.log("Generate Report Payload:", payload);

      const response = await createRepo(payload).unwrap();

      console.log("Report generated successfully:", response);

      refetch();
      alert("Report generated successfully.");
    } catch (error) {
      console.log("Generate report failed:", error);

      const insufficient = getInsufficientCredits(error);
      if (insufficient) {
        toast.error(
          `Not enough AI credits - needs ${insufficient.requiredCredits}, you have ${insufficient.availableCredits}.`,
        );
        return;
      }

      alert("Failed to generate report.");
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
      </div>
    </div>
  );
}
