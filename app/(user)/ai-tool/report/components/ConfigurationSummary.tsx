import { BookOpen, FileText, Paperclip, Sparkles } from "lucide-react";

interface ConfigProps {
  selectedNotesCount: number;
  uploadedFilesCount: number;

  detailLevel: number;
  setDetailLevel: (value: number) => void;
  writingStyle: string;
  setWritingStyle: (value: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}
export const ConfigurationSummary: React.FC<ConfigProps> = ({
  selectedNotesCount,
  uploadedFilesCount,
  detailLevel,
  setDetailLevel,
  writingStyle,
  setWritingStyle,
  onGenerate,
  isLoading,
}) => {
  const detailLabel =
    detailLevel === 1
      ? "Brief"
      : detailLevel === 2
        ? "Balanced"
        : "Comprehensive";

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-6 self-start">
      <h2 className="text-xl font-bold text-gray-900">Configuration Summary</h2>

      {/* Stats List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-2.5 bg-gray-50/70 rounded-lg">
          <div className="flex items-center gap-2.5 text-sm text-gray-600">
            <FileText className="w-4 h-4 text-gray-500" />
            <span>Selected Notes</span>
          </div>
          <span className="text-xs font-bold bg-white px-2 py-1 rounded shadow-2xs border border-gray-200 text-gray-700">
            {selectedNotesCount}
          </span>
        </div>

        <div className="flex items-center justify-between p-2.5 bg-gray-50/70 rounded-lg">
          <div className="flex items-center gap-2.5 text-sm text-gray-600">
            <Paperclip className="w-4 h-4 text-gray-500" />
            <span>Uploaded Files</span>
          </div>
          <span className="text-xs font-bold bg-white px-2 py-1 rounded shadow-2xs border border-gray-200 text-gray-700">
            {uploadedFilesCount}
          </span>
        </div>

        <div className="flex items-center justify-between p-2.5 bg-gray-50/70 rounded-lg">
          <div className="flex items-center gap-2.5 text-sm text-gray-600">
            <BookOpen className="w-4 h-4 text-gray-500" />
            <span>Reference Style</span>
          </div>
          <span className="text-xs italic text-gray-400 font-medium">None</span>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Output Settings */}
      <div className="space-y-6">
        <h3 className="text-xs font-bold tracking-wider text-gray-500 uppercase">
          Output Settings
        </h3>

        {/* Detail Level Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-gray-700">Detail Level</span>

            <span className="text-indigo-600 font-semibold">{detailLabel}</span>
          </div>

          <input
            type="range"
            min="1"
            max="3"
            value={detailLevel}
            onChange={(e) => setDetailLevel(Number(e.target.value))}
            className="w-full accent-indigo-600 bg-gray-200 rounded-lg h-1.5 cursor-pointer"
          />

          <div className="flex justify-between text-[10px] text-gray-400 font-medium">
            <span>Brief</span>
            <span>Balanced</span>
            <span>Detailed</span>
          </div>
        </div>

        {/* Writing Style Selector */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-700">
            Writing Style
          </label>

          <select
            value={writingStyle}
            onChange={(e) => setWritingStyle(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          >
            <option value="Professional / Academic">
              Professional / Academic
            </option>

            <option value="Casual / Conversational">
              Casual / Conversational
            </option>

            <option value="Technical / Concise">Technical / Concise</option>
          </select>
        </div>
        {/* CTA Button */}
        <button
          type="button"
          onClick={onGenerate}
          disabled={isLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm active:scale-[0.99]"
        >
          <Sparkles className="w-4 h-4 fill-current" />

          {isLoading ? "Generating..." : "Generate Report"}
        </button>

        <p className="text-center text-xs text-gray-400 font-medium">
          Estimated time: <span className="text-gray-600">~2 minutes</span>
        </p>
      </div>
    </div>
  );
};
