"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  CheckCircle2,
  Copy,
  Download,
  FileText,
  X,
  Sparkles,
  Calendar,
  Layers,
  BookOpen,
  Check,
} from "lucide-react";
import { toast } from "sonner";

interface GeneratedReport {
  id: string;
  userEmail: string;
  title: string;
  content: string;
  reportType: string;
  prompt: string | null;
  detailLevel: number | null;
  writingStyle: string | null;
  createdAt: string;
}

interface ReportSuccessModalProps {
  report: GeneratedReport | null;
  onClose: () => void;
}

export function ReportSuccessModal({
  report,
  onClose,
}: ReportSuccessModalProps) {
  const [copied, setCopied] = useState(false);

  if (!report) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(report.content);
      setCopied(true);
      toast.success("Report copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy content.");
    }
  };

  const handleDownload = () => {
    const cleanTitle = report.title
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9_-]/g, "_");
    const filename = `${cleanTitle}_Report.md`;

    const blob = new Blob([report.content], {
      type: "text/markdown;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 md:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-indigo-50/50 via-white to-white px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold tracking-wider text-indigo-700 uppercase">
                  Report Generated Successfully
                </span>
              </div>
              <h2 className="text-lg font-bold text-gray-900 truncate max-w-md">
                {report.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Metadata Strip */}
        <div className="flex flex-wrap items-center gap-4 border-b border-gray-100 bg-gray-50/60 px-6 py-3 text-xs text-gray-600">
          <div className="flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5 text-gray-400" />
            <span>
              Type: <strong>{report.reportType}</strong>
            </span>
          </div>

          {report.writingStyle && (
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
              <span>
                Style: <strong>{report.writingStyle}</strong>
              </span>
            </div>
          )}

          {report.detailLevel && (
            <div className="flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-gray-400" />
              <span>
                Detail Level: <strong>{report.detailLevel}/3</strong>
              </span>
            </div>
          )}

          <div className="flex items-center gap-1.5 ml-auto text-gray-400">
            <Calendar className="h-3.5 w-3.5" />
            <span>{new Date(report.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Content Viewer Body */}
        <div className="p-6 max-h-[55vh] overflow-y-auto bg-white">
          <article className="prose prose-sm md:prose-base max-w-none prose-indigo text-gray-800 leading-relaxed font-sans">
            <ReactMarkdown>{report.content}</ReactMarkdown>
          </article>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-100 bg-gray-50/50 px-6 py-4">
          <div className="text-xs text-gray-500 flex items-center gap-1.5">
            <BookOpen className="h-4 w-4 text-indigo-600" />
            Ready for download or export
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleCopy}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition-all"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-indigo-600" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy Content
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition-all"
            >
              <Download className="h-4 w-4" />
              Download (.md)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
