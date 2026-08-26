"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Copy,
  Download,
  FileText,
  Layers,
  Printer,
  Sparkles,
  Trash2,
  Check,
  Edit2,
  Clock,
  BookOpen,
  Share2,
} from "lucide-react";
import { toast } from "sonner";
import { useGetReportByIdQuery } from "@/slices/Ai";

export default function SingleReportDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const reportId = params?.id as string;

  // Replace with your RTK Query hooks
  const { data: report, isLoading, isError } = useGetReportByIdQuery(reportId);
  //   const [deleteReport, { isLoading: isDeleting }] = useDeleteReportMutation();

  const [copied, setCopied] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(report?.title || "");

  // Fallback loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50/60 p-6 md:p-12 font-sans text-gray-900">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-2/3 bg-gray-200 rounded animate-pulse"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 h-[600px] bg-white rounded-2xl border border-gray-100 p-8 animate-pulse space-y-4">
              <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
              <div className="h-4 w-full bg-gray-100 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-100 rounded"></div>
              <div className="h-4 w-4/6 bg-gray-100 rounded"></div>
            </div>
            <div className="h-80 bg-white rounded-2xl border border-gray-100 p-6 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !report) {
    return (
      <div className="min-h-screen bg-gray-50/60 p-6 md:p-12 font-sans text-gray-900 flex flex-col items-center justify-center">
        <div className="text-center space-y-4">
          <FileText className="w-12 h-12 text-gray-300 mx-auto" />
          <h2 className="text-xl font-bold text-gray-800">Report Not Found</h2>
          <p className="text-sm text-gray-500">
            The report you are looking for does not exist or was removed.
          </p>
          <Link
            href="/ai-tool/report"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Reports
          </Link>
        </div>
      </div>
    );
  }

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

  const handleDownloadMarkdown = () => {
    const cleanTitle = (report.title || "Report")
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9_-]/g, "_");
    const blob = new Blob([report.content], {
      type: "text/markdown;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${cleanTitle}_Report.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this report?")) {
      try {
        // await deleteReport(report.id).unwrap();
        toast.success("Report deleted.");
        router.push("/ai-tool/report");
      } catch {
        toast.error("Failed to delete report.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/60 p-6 md:p-12 font-sans text-gray-900">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Navigation & Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/ai-tool/report"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Reports
          </Link>

          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all shadow-sm"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-indigo-600" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              {copied ? "Copied" : "Copy Text"}
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" /> Print / PDF
            </button>

            <button
              onClick={handleDownloadMarkdown}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5" /> Download (.md)
            </button>

            <button
              onClick={handleDelete}
              //   disabled={isDeleting}
              className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg border border-transparent hover:border-red-100 transition-all ml-1"
              title="Delete Report"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title Header */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-wider text-indigo-700 uppercase bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">
                  {report.reportType || "REPORT"}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(report.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                {report.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Content & Metadata Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Markdown Content Document View */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
            <article className="prose prose-sm md:prose-base max-w-none prose-indigo text-gray-800 leading-relaxed font-sans">
              <ReactMarkdown>{report.content}</ReactMarkdown>
            </article>
          </div>

          {/* Configuration Sidebar */}
          <div className="lg:col-span-1 space-y-6 sticky top-6 print:hidden">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                Generation Overview
              </h3>

              <div className="space-y-3.5 text-xs">
                {/* Writing Style */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Writing Style</span>
                  </div>
                  <span className="font-semibold text-gray-800">
                    {report.writingStyle || "Standard"}
                  </span>
                </div>

                {/* Detail Level */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Layers className="w-3.5 h-3.5 text-gray-400" />
                    <span>Detail Level</span>
                  </div>
                  <span className="font-semibold text-gray-800">
                    {report.detailLevel
                      ? `${report.detailLevel} / 3`
                      : "Balanced"}
                  </span>
                </div>

                {/* Created Date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>Created Date</span>
                  </div>
                  <span className="font-medium text-gray-700">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Original Prompt Container */}
              {report.prompt && (
                <div className="pt-3 border-t border-gray-100 space-y-1.5">
                  <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    Prompt Input
                  </span>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs text-gray-600 italic leading-relaxed">
                    {report.prompt}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
