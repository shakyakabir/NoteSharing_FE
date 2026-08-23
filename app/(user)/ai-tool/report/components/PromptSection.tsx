"use client";
interface PromptSectionProps {
  prompt: string;
  setPrompt: (value: string) => void;
}

export const PromptSection: React.FC<PromptSectionProps> = ({
  prompt,
  setPrompt,
}) => {
  const suggestions = [
    "Summarize key findings",
    "Create research report",
    "Executive summary",
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">
          What would you like to generate?
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Describe the goal, format, and key points to emphasize in the report.
        </p>
      </div>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
        placeholder="e.g., Create a comprehensive executive summary based on the Q3 market analysis and competitor research notes. Focus on highlighting growth opportunities and potential risks..."
        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
      />

      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="text-xs font-semibold text-gray-500">
          Suggestions:
        </span>
        {suggestions.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setPrompt(item)}
            className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};
