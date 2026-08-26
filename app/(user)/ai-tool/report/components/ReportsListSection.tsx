"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  Calendar,
  Eye,
  Download,
  Search,
  ArrowRight,
  Clock,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

export interface ReportItem {
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

interface ReportsListSectionProps {
  reports: ReportItem[];
  isLoading: boolean;
  onSelectReport?: (report: ReportItem) => void;
  showViewAllLink?: boolean;
}

export function ReportsListSection({
  reports,
  isLoading,
  onSelectReport,
  showViewAllLink = true,
}: ReportsListSectionProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredReports = reports?.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase()),
  );

  const handleNavigateToDetail = (e: React.MouseEvent, reportId: string) => {
    e.stopPropagation();
    router.push(`/ai-tool/report/${reportId}`);
  };

  const handleCardClick = (report: ReportItem) => {
    if (onSelectReport) {
      onSelectReport(report);
    } else {
      router.push(`/ai-tool/report/${report.id}`);
    }
  };

  const handleDownload = (e: React.MouseEvent, report: ReportItem) => {
    e.stopPropagation();
    const cleanTitle = report.title
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

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-600" />
            Generated Reports
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Browse and manage all your AI-generated documents
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search reports..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>

          {showViewAllLink && (
            <Link
              href="/reports"
              className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 whitespace-nowrap transition-colors"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>

      {/* Loading Skeletons */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-44 bg-gray-50 rounded-xl animate-pulse border border-gray-100 p-4 space-y-3"
            >
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="h-12 bg-gray-100 rounded w-full"></div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredReports?.length === 0 && (
        <div className="text-center py-12 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
          <FileText className="w-10 h-10 text-gray-300 mx-auto mb-2" />
          <p className="text-sm font-medium text-gray-600">No reports found</p>
          <p className="text-xs text-gray-400 mt-1">
            {search
              ? "Try adjusting your search query."
              : "Generated reports will appear here."}
          </p>
        </div>
      )}

      {/* Reports Grid */}
      {!isLoading && filteredReports?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredReports?.map((report) => (
            <div
              key={report.id}
              onClick={() => handleCardClick(report)}
              className="group relative flex flex-col justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {report.title}
                  </h3>
                  <span className="shrink-0 text-[10px] font-medium px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
                    {report.reportType}
                  </span>
                </div>

                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                  {report.content.replace(/^[#*-\s]+/g, "")}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center gap-1 text-[11px]">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Direct Navigate Button */}
                  <button
                    onClick={(e) => handleNavigateToDetail(e, report.id)}
                    className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors"
                    title="Open Full Page View"
                  >
                    <span>Open</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>

                  {/* Icon Actions */}
                  <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    {onSelectReport && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectReport(report);
                        }}
                        className="p-1 hover:bg-indigo-50 rounded text-indigo-600"
                        title="Quick Preview Modal"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={(e) => handleDownload(e, report)}
                      className="p-1 hover:bg-gray-100 rounded text-gray-600"
                      title="Download Markdown"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
