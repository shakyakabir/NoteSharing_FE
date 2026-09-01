"use client";


export default function ReportPage() {
  return (
    <>
      <h1>Repor</h1>
    </>
  );
  //  <div className="min-h-screen bg-[#eef0f3] text-gray-900 print:bg-white">
  {
    /* <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur print:hidden">
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

      <div className="mx-auto flex max-w-[1500px]">
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

        <main className="min-w-0 flex-1 px-4 py-10 md:px-8 lg:px-12 print:p-0">
          <div className="mx-auto flex flex-col items-center gap-8 print:gap-0">
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

            {contentPages.map((pageLines, pageIdx) => (
              <article
                key={pageIdx}
                className="relative flex min-h-[297mm] w-full max-w-[210mm] flex-col justify-between border border-gray-300 bg-white p-12 shadow-md md:p-16 lg:p-20 print:m-0 print:min-h-screen print:w-full print:max-w-none print:border-none print:p-0 print:shadow-none print:break-before-page"
              >
                <div className="prose prose-gray max-w-none flex-1">
                  {renderLines(pageLines)}
                </div>

                <div className="mt-12 flex items-center justify-between border-t border-gray-100 pt-4 text-xs text-gray-400">
                  <span>{reportData.title}</span>
                  <span>Page {pageIdx + 1}</span>
                </div>
              </article>
            ))}

            <div className="mt-2 flex w-full max-w-[210mm] items-center justify-between px-2 text-xs text-gray-400 print:hidden">
              <span>Generated with AI Report</span>
              <span>Last updated {formatDate(reportData.updatedAt)}</span>
            </div>
          </div>
        </main>
      </div>
    </div> 
    */
  }
  // );
}
