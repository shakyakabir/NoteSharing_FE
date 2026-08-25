"use client";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useAiCredits } from "@/hooks/ai/useAiCredits";

interface AiCostNoticeProps {
  /** Backend AiFeature key, e.g. "SUMMARIZE" | "REPORT" | "QUIZ" | "PPT". */
  feature: string;
  className?: string;
}

/**
 * Inline "this action uses N credits · Balance: X/Y" indicator for AI tool pages. The cost and
 * balance are both read from the backend (never hard-coded). When the balance is too low it turns
 * into an insufficient-credits warning with an "Upgrade to Premium" CTA.
 */
export default function AiCostNotice({
  feature,
  className = "",
}: AiCostNoticeProps) {
  const { credits, costs, costOf, canAfford } = useAiCredits();

  // Costs not loaded yet - render nothing rather than a misleading "0 credits".
  if (!costs) return null;

  const cost = costOf(feature);
  const enough = canAfford(feature);

  if (!enough) {
    return (
      <div
        className={`flex flex-col sm:flex-row sm:items-center gap-2 bg-red-50 border border-red-100 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 ${className}`}
      >
        <span className="flex items-center gap-1.5">
          <Sparkles size={14} />
          Not enough AI credits - needs {cost}, you have{" "}
          {credits?.currentCredits ?? 0}.
        </span>
        <Link
          href="/subscription"
          className="underline font-bold hover:text-red-700"
        >
          Upgrade to Premium
        </Link>
      </div>
    );
  }

  return (
    <div
      className={`bg-amber-50/60 border border-amber-100 px-3 py-1.5 rounded-xl inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 ${className}`}
    >
      <Sparkles size={14} />
      <span>
        Uses {cost} {cost === 1 ? "credit" : "credits"}
        {credits
          ? ` · Balance: ${credits.currentCredits}/${credits.maxCredits}`
          : ""}
      </span>
    </div>
  );
}
