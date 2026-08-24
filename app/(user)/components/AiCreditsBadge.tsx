"use client";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useAiCredits } from "@/hooks/ai/useAiCredits";

/**
 * Compact, app-wide AI credit indicator shown in the header. Purely displays the server-computed
 * balance; clicking it opens the subscription page. Turns red when the user is out of credits.
 */
export default function AiCreditsBadge() {
  const { credits } = useAiCredits();

  if (!credits) return null;

  const low = credits.currentCredits <= 0;

  return (
    <Link
      href="/subscription"
      title={`Refreshes in ${credits.daysUntilRefresh}d · Next refresh: ${new Date(
        credits.nextRefresh,
      ).toLocaleDateString()}`}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
        low
          ? "bg-red-50 border-red-100 text-red-600 hover:bg-red-100"
          : "bg-amber-50/60 border-amber-100 text-amber-700 hover:bg-amber-100/60"
      }`}
    >
      <Sparkles size={14} />
      <span>
        {credits.currentCredits}/{credits.maxCredits}
      </span>
    </Link>
  );
}
