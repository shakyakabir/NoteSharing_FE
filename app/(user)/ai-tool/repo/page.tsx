"use client";

import React, { useMemo } from "react";
import {
  ArrowLeft,
  Download,
  FileText,
  Clock,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetReportByIdQuery } from "@/slices/Ai";

type Report = {
  id: string;
  userEmail: string;
  sourceContent: string;
  content: string;
  title: string;
  reportType: string;
  prompt: string | null;
  detailLevel: number | null;
  writingStyle: string | null;
  referenceContent: string | null;
  createdAt: string;
  updatedAt: string;
};

type Props = {
  report?: Report;
};

export default function ReportPage({ report }: Props) {
  const router = useRouter();
  const { data } = useGetReportByIdQuery(
    "83c3d304-b4c6-46bf-b71e-da5ae63c105d",
  );

  const reportData = data;

  const sections = useMemo(() => {
    if (!reportData?.content) return [];

    const lines = reportData.content.split("\n");

    return lines
      .filter((line) => {
        const text = line.replace(/\*/g, "").trim();
        return text.startsWith("Chapter ") || /^\d+\.\d+\s/.test(text);
      })
      .map((line) => {
        const clean = line.replace(/\*/g, "").trim();
        return {
          title: clean,
          id: clean
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, ""),
        };
      });
  }, [reportData]);

  // Splits report content into distinct pages whenever a major heading is detected
  const contentPages = useMemo(() => {
    if (!reportData?.content) return [];

    const lines = reportData.content.split("\n");
    const pages: string[][] = [];
    let currentPage: string[] = [];

    const isHeading = (line: string) => {
      const trimmed = line.trim();
      return (
        trimmed.startsWith("**Chapter ") ||
        /^\*\*\d+\.\d+/.test(trimmed) ||
        trimmed.startsWith("**TABLE OF CONTENTS**") ||
        trimmed === "**TABLE OF CONTENTS**" ||
        trimmed.startsWith("**ABSTRACT**") ||
        trimmed.startsWith("**ACKNOWLEDGEMENT**") ||
        trimmed.startsWith("**Approval Sheet**") ||
        trimmed.startsWith("**DECLARATION**")
      );
    };

    lines.forEach((line) => {
      if (isHeading(line) && currentPage.length > 0) {
        pages.push(currentPage);
        currentPage = [];
      }
      currentPage.push(line);
    });

    if (currentPage.length > 0) {
      pages.push(currentPage);
    }

    return pages;
  }, [reportData]);

  if (!reportData) {
    return (
      <div className="min-h-screen bg-[#f7f8fa] flex items-center justify-center">
        <div className="text-center">
          <FileText className="mx-auto mb-4 h-12 w-12 text-gray-300" />
          <h2 className="text-lg font-semibold text-gray-800">
            Report not found
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            The requested report could not be loaded.
          </p>
          <button
            onClick={() => router.back()}
            className="mt-5 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderLines = (lines: string[]) => {
    return lines.map((line, index) => {
      const trimmed = line.trim();

      if (!trimmed) {
        return <div key={index} className="h-3" />;
      }

      /* Chapter Heading */
      if (trimmed.startsWith("**Chapter ")) {
        const title = trimmed.replace(/\*\*/g, "");
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

        return (
          <section key={index} id={id} className="pt-2">
            <div className="mb-6 flex items-center gap-3 border-b border-gray-200 pb-3">
              <div className="h-8 w-1.5 rounded-full bg-gray-900" />
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            </div>
          </section>
        );
      }

      /* Numbered Section Heading */
      if (/^\*\*\d+\.\d+/.test(trimmed)) {
        const title = trimmed.replace(/\*\*/g, "");
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

        return (
          <h3
            key={index}
            id={id}
            className="mt-4 mb-3 text-lg font-semibold text-gray-900 break-after-avoid"
          >
            {title}
          </h3>
        );
      }

      /* Table of Contents */
      if (
        trimmed.startsWith("**TABLE OF CONTENTS**") ||
        trimmed === "**TABLE OF CONTENTS**"
      ) {
        return (
          <h2 key={index} className="mb-5 text-xl font-bold text-gray-900">
            TABLE OF CONTENTS
          </h2>
        );
      }

      /* Major Headings */
      if (
        trimmed.startsWith("**ABSTRACT**") ||
        trimmed.startsWith("**ACKNOWLEDGEMENT**") ||
        trimmed.startsWith("**Approval Sheet**") ||
        trimmed.startsWith("**DECLARATION**")
      ) {
        return (
          <h2
            key={index}
            className="mb-4 border-b border-gray-200 pb-3 text-xl font-bold text-gray-900"
          >
            {trimmed.replace(/\*\*/g, "")}
          </h2>
        );
      }

      /* Bullet Points */
      if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
        return (
          <li
            key={index}
            className="ml-6 mb-2 list-disc pl-1 text-[15px] leading-7 text-gray-700"
          >
            {trimmed.substring(2)}
          </li>
        );
      }

      /* Bold Lines */
      if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
        return (
          <p key={index} className="mb-2 font-semibold text-gray-900">
            {trimmed.replace(/\*\*/g, "")}
          </p>
        );
      }

      /* Normal Paragraph */
      return (
        <p key={index} className="mb-4 text-[15px] leading-8 text-gray-700">
          {trimmed.replace(/\*\*/g, "")}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-[#eef0f3] text-gray-900 print:bg-white">
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur print:hidden">
        <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50"
            >
              <ArrowLeft size={18} />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900 text-white">
                <FileText size={18} />
              </div>

              <div>
                <p className="text-xs font-medium text-gray-400">AI REPORT</p>
                <h1 className="max-w-[500px] truncate text-sm font-semibold text-gray-900">
                  {reportData.title}
                </h1>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 text-xs text-gray-500 md:flex">
              <Clock size={14} />
              <span>Generated {formatDate(reportData.createdAt)}</span>
            </div>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
            >
              <Download size={16} />
              Export PDF / Print
            </button>
          </div>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <div className="mx-auto flex max-w-[1500px]">
        {/* ================= SIDEBAR ================= */}
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-72 shrink-0 overflow-y-auto border-r border-gray-200 bg-white px-5 py-7 lg:block print:hidden">
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <BookOpen size={17} className="text-gray-500" />
              <h2 className="text-sm font-semibold text-gray-900">Contents</h2>
            </div>
            <p className="mt-1 text-xs text-gray-400">
              Navigate through the report
            </p>
          </div>

          <nav className="space-y-1">
            {sections.map((section, index) => {
              const isChapter = section.title.startsWith("Chapter");

              return (
                <a
                  key={`${section.id}-${index}`}
                  href={`#${section.id}`}
                  className={`group flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition hover:bg-gray-50 ${
                    isChapter
                      ? "font-semibold text-gray-800"
                      : "ml-2 text-gray-500"
                  }`}
                >
                  <ChevronRight
                    size={14}
                    className="shrink-0 text-gray-300 transition group-hover:text-gray-500"
                  />
                  <span className="line-clamp-2">{section.title}</span>
                </a>
              );
            })}
          </nav>

          <div className="mt-10 border-t border-gray-100 pt-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Report Information
            </p>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-400">Type</p>
                <p className="mt-1 text-sm font-medium text-gray-700">
                  {reportData.reportType}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Created</p>
                <p className="mt-1 text-sm font-medium text-gray-700">
                  {formatDate(reportData.createdAt)}
                </p>
              </div>

              {reportData.writingStyle && (
                <div>
                  <p className="text-xs text-gray-400">Writing Style</p>
                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {reportData.writingStyle}
                  </p>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* ================= DOCUMENT CANVAS ================= */}
        <main className="min-w-0 flex-1 px-4 py-10 md:px-8 lg:px-12 print:p-0">
          <div className="mx-auto flex flex-col items-center gap-8 print:gap-0">
            {/* ---------------- COVER PAGE SHEET ---------------- */}
            <article className="relative min-h-[297mm] w-full max-w-[210mm] border border-gray-300 bg-white p-12 shadow-md md:p-20 print:m-0 print:min-h-screen print:w-full print:max-w-none print:border-none print:p-0 print:shadow-none print:break-after-page">
              <div className="flex h-full min-h-[240mm] flex-col items-center justify-between border-4 border-double border-gray-100 p-8 text-center">
                <div className="flex flex-col items-center pt-12">
                  <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-900 text-white shadow-sm">
                    <FileText size={30} />
                  </div>

                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
                    Project Report
                  </p>

                  <h1 className="max-w-xl text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl">
                    {reportData.title}
                  </h1>

                  <div className="mt-8 h-px w-20 bg-gray-300" />
                </div>

                <div className="pb-12 space-y-2 text-sm text-gray-500">
                  <p className="font-medium text-gray-700">
                    {reportData.reportType}
                  </p>
                  <p>Generated on {formatDate(reportData.createdAt)}</p>
                </div>
              </div>
            </article>

            {/* ---------------- SEPARATE A4 SHEET FOR EACH HEADING ---------------- */}
            {contentPages.map((pageLines, pageIdx) => (
              <article
                key={pageIdx}
                className="relative flex min-h-[297mm] w-full max-w-[210mm] flex-col justify-between border border-gray-300 bg-white p-12 shadow-md md:p-16 lg:p-20 print:m-0 print:min-h-screen print:w-full print:max-w-none print:border-none print:p-0 print:shadow-none print:break-before-page"
              >
                <div className="prose prose-gray max-w-none flex-1">
                  {renderLines(pageLines)}
                </div>

                {/* Page Footer / Page Number */}
                <div className="mt-12 flex items-center justify-between border-t border-gray-100 pt-4 text-xs text-gray-400">
                  <span>{reportData.title}</span>
                  <span>Page {pageIdx + 1}</span>
                </div>
              </article>
            ))}

            {/* Footer info (Screen view only) */}
            <div className="mt-2 flex w-full max-w-[210mm] items-center justify-between px-2 text-xs text-gray-400 print:hidden">
              <span>Generated with AI Report</span>
              <span>Last updated {formatDate(reportData.updatedAt)}</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
