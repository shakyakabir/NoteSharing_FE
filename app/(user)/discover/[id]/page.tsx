import React from "react";
import {
  Bookmark,
  Share2,
  ThumbsUp,
  MessageSquare,
  RefreshCw,
  FileText,
  BarChart2,
  HelpCircle,
  Sliders,
  Award,
} from "lucide-react";

const data = {
  id: "advanced-quantum-computing-principles",
  breadcrumbs: ["Discover", "Physics", "Quantum Computing"],
  title: "Advanced Quantum Computing Principles",
  author: {
    name: "Julian Thorne",
    initials: "JT",
    postedAt: "2 days ago",
    readTime: "12 min read",
  },
  metrics: {
    likes: "1.2k",
    comments: 84,
    viewsText: "Viewed by 5k students",
  },
  content: [
    {
      type: "section",
      heading: "1. Introduction to Superposition",
      paragraphs: [
        "At the core of quantum computing lies the principle of superposition. Unlike a classical bit, which exists as either 0 or 1, a quantum bit (qubit) can exist in a linear combination of both states simultaneously. This fundamental property allows quantum computers to process massive amounts of information in parallel.",
      ],
      codeBlock: {
        language: "qsharp",
        comment: "// Example of a simple Qubit state in Q#",
        lines: [
          {
            text: "operation ",
            highlight: "text-emerald-400",
            child: { text: "InitializeQubit", highlight: "text-sky-400" },
            suffix: "() : Unit {",
          },
          {
            text: "use q = Qubit();",
            indent: true,
            highlight: "text-slate-400",
          },
          {
            text: "H(q); ",
            indent: true,
            highlight: "text-amber-400",
            comment: "// Applies the Hadamard gate to create superposition",
          },
          {
            text: "let result = M(q);",
            indent: true,
            highlight: "text-slate-400",
          },
          { text: "Reset(q);", indent: true, highlight: "text-slate-400" },
          { text: "}", highlight: "text-emerald-400" },
        ],
      },
    },
    {
      type: "section",
      heading: '2. Entanglement: "Spooky Action at a Distance"',
      paragraphs: [
        "Entanglement is a phenomenon where qubits become interconnected such that the state of one qubit instantaneously influences the state of another, regardless of the distance between them. This is essential for quantum teleportation and dense coding protocols.",
      ],
      callout: {
        title: "Key Concept: The Bell State",
        text: "The Bell state represents the simplest example of quantum entanglement between two qubits.",
      },
    },
    {
      type: "section",
      heading: "3. Quantum Decoherence",
      paragraphs: [
        'One of the primary challenges in building a practical quantum computer is decoherence. This is the process where a quantum system loses its "quantumness" due to interaction with the external environment. Maintaining high-fidelity qubits requires extremely low temperatures and sophisticated error-correction codes.',
        "Researchers are currently focusing on **Surface Codes** as a robust method for quantum error correction, which could pave the way for fault-tolerant quantum computing in the next decade.",
      ],
    },
  ],
  intelligenceEngine: {
    isPro: true,
    summary:
      "This note provides a comprehensive overview of quantum computing fundamentals, focusing on superposition, entanglement, and the critical challenge of decoherence. It explores how qubits leverage quantum states to achieve parallel processing and the theoretical requirements for fault-tolerant hardware.",
    keyInsights: [
      "Superposition allows qubits to process $2^n$ states simultaneously.",
      "Entanglement is the backbone of quantum communication protocols.",
      "Surface codes are required to mitigate high decoherence rates.",
      "The Hadamard gate is the primary mechanism for qubit initialization.",
    ],
    gamification: {
      currentPoints: 1250,
      targetPoints: 2000,
      text: "Earning 1250 / 2000 Amber for Daily Goal",
    },
  },
};

// Helper component to format inline strings like **bold strings**
const FormattedText = ({ text }) => {
  if (!text.includes("**")) return <span>{text}</span>;
  const parts = text.split(/\*\*([^*]+)\*\*/g);
  return (
    <span>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <strong key={index} className="text-slate-900 font-semibold">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </span>
  );
};

export default function QuantumArticle() {
  // Graceful fallback if dynamic item context isn't fully loaded yet
  if (!data)
    return (
      <div className="p-8 text-center text-sm text-slate-500">
        Loading Article Details...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-800 p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: Main Article Content */}
        <main className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8">
          {/* Breadcrumbs */}
          <nav className="text-xs text-slate-500 flex items-center gap-1 mb-4">
            {data.breadcrumbs?.map((crumb, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span>&gt;</span>}
                <span
                  className={
                    idx === data.breadcrumbs.length - 1
                      ? "text-indigo-600 font-medium"
                      : ""
                  }
                >
                  {crumb}
                </span>
              </React.Fragment>
            ))}
          </nav>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-6">
            {data.title}
          </h1>

          {/* Author / Metadata Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center text-slate-600 font-bold">
                {data.author?.initials}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">
                  {data.author?.name}
                </h4>
                <p className="text-xs text-slate-500">
                  Posted {data.author?.postedAt} • {data.author?.readTime}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg border border-slate-200 transition">
                <Bookmark className="w-4 h-4" />
              </button>
              <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg border border-slate-200 transition">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Dynamic Article Body */}
          <div className="space-y-6 text-sm md:text-base leading-relaxed text-slate-700">
            {data.content?.map((section, sIdx) => (
              <section key={sIdx}>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {section.heading}
                </h3>

                {section.paragraphs?.map((pText, pIdx) => (
                  <p key={pIdx} className="mb-3 last:mb-0">
                    <FormattedText text={pText} />
                  </p>
                ))}

                {/* Optional Dynamic Q# Code Block */}
                {section.codeBlock && (
                  <div className="bg-slate-900 rounded-xl p-4 font-mono text-xs md:text-sm text-slate-300 overflow-x-auto shadow-inner mt-4">
                    <p className="text-slate-500 mb-1">
                      {section.codeBlock.comment}
                    </p>
                    {section.codeBlock.lines?.map((line, lIdx) => (
                      <p key={lIdx} className={line.indent ? "pl-4" : ""}>
                        <span className={line.highlight}>{line.text}</span>
                        {line.child && (
                          <span className={line.child.highlight}>
                            {line.child.text}
                          </span>
                        )}
                        {line.suffix && <span>{line.suffix}</span>}
                        {line.comment && (
                          <span className="text-slate-500">
                            {" "}
                            {line.comment}
                          </span>
                        )}
                      </p>
                    ))}
                  </div>
                )}

                {/* Optional Dynamic Callout Box */}
                {section.callout && (
                  <div className="bg-indigo-50/60 border-l-4 border-indigo-500 rounded-r-xl p-4 my-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-1">
                      {section.callout.title}
                    </h4>
                    <p className="text-sm italic text-indigo-900">
                      {section.callout.text}
                    </p>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Footer Metrics */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-6 mt-8 text-xs md:text-sm text-slate-500">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1.5 hover:text-indigo-600 transition">
                <ThumbsUp className="w-4 h-4" />
                <span>{data.metrics?.likes}</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-indigo-600 transition">
                <MessageSquare className="w-4 h-4" />
                <span>{data.metrics?.comments}</span>
              </button>
            </div>
            <div>
              <span>{data.metrics?.viewsText}</span>
            </div>
          </div>
        </main>

        {/* RIGHT COLUMN: Sidebar (Intelligence Engine) */}
        <aside className="space-y-6">
          {/* Header Panel */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-5 bg-indigo-600 rounded-full"></div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Intelligence Engine
              </h2>
            </div>
            {data.intelligenceEngine?.isPro && (
              <span className="bg-amber-500 text-[10px] font-black uppercase text-white px-1.5 py-0.5 rounded tracking-wide shadow-sm">
                Pro
              </span>
            )}
          </div>

          {/* Quick Summary Card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 relative overflow-hidden">
            <div className="flex justify-between items-start mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Quick Summary
              </h4>
              <button className="text-slate-400 hover:text-indigo-600 transition">
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs leading-relaxed text-slate-600">
              {data.intelligenceEngine?.summary}
            </p>
          </div>

          {/* Key Insights Card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Key Insights
            </h4>
            <ul className="space-y-3.5 text-xs text-slate-600">
              {data.intelligenceEngine?.keyInsights?.map((insight, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Intelligence Tools Grid */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Intelligence Tools
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-white border border-slate-200/80 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:border-indigo-500 hover:shadow-sm transition text-center group">
                <FileText className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition" />
                <span className="text-xs font-medium text-slate-700">
                  Extract Key Points
                </span>
              </button>
              <button className="bg-white border border-slate-200/80 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:border-indigo-500 hover:shadow-sm transition text-center group">
                <BarChart2 className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition" />
                <span className="text-xs font-medium text-slate-700">
                  Generate Report
                </span>
              </button>
              <button className="bg-white border border-slate-200/80 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:border-indigo-500 hover:shadow-sm transition text-center group">
                <HelpCircle className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition" />
                <span className="text-xs font-medium text-slate-700">
                  Create Quiz
                </span>
              </button>
              <button className="bg-white border border-slate-200/80 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:border-indigo-500 hover:shadow-sm transition text-center group">
                <Sliders className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition" />
                <span className="text-xs font-medium text-slate-700">
                  Custom Prompt
                </span>
              </button>
            </div>
          </div>

          {/* Call to Action: Quiz Promotion */}
          <div className="bg-gradient-to-b from-indigo-600 to-indigo-700 rounded-2xl shadow-md p-6 text-center text-white relative overflow-hidden">
            <div className="w-10 h-10 mx-auto mb-3 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
              <Award className="w-5 h-5 text-amber-300" />
            </div>
            <h4 className="font-bold text-sm mb-1">Ready for the Quiz?</h4>
            <p className="text-[11px] text-indigo-100 mb-5 max-w-[220px] mx-auto leading-relaxed">
              Test your knowledge on Quantum Principles and earn 50 Amber
              points.
            </p>
            <button className="w-full py-2.5 bg-white text-indigo-700 hover:bg-slate-50 transition font-bold text-xs rounded-xl shadow-md tracking-wide">
              Start Practice Quiz
            </button>
          </div>

          {/* Gamification Progress Bar */}
          <div className="bg-amber-50/60 border border-amber-200/60 rounded-xl px-4 py-3 flex items-center justify-between text-xs font-medium text-amber-800">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>{data.intelligenceEngine?.gamification?.text}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
