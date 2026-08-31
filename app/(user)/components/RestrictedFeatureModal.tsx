"use client";
import Link from "next/link";
import { Sparkles, Lock, X } from "lucide-react";
import {
  getInsufficientCredits,
  getFeatureNotAvailable,
} from "@/hooks/ai/useAiCredits";

interface RestrictedFeatureModalProps {
  /** The caught request error that triggered the modal, or null when closed. */
  error: unknown;
  onClose: () => void;
}

/**
 * Reactive access-gate modal for AI tools. Shown after a generation request is rejected by the
 * backend - either because the feature needs Premium (FEATURE_NOT_AVAILABLE) or the balance is too
 * low (INSUFFICIENT_AI_CREDITS). It reads the coded error to pick its message, so the backend stays
 * the single source of truth; the CTA points at the existing /subscription page (as AiCostNotice
 * already does). Renders nothing for any other error shape.
 */
export default function RestrictedFeatureModal({
  error,
  onClose,
}: RestrictedFeatureModalProps) {
  const insufficient = getInsufficientCredits(error);
  const premiumOnly = getFeatureNotAvailable(error);

  if (!insufficient && !premiumOnly) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl border border-slate-100 space-y-4">
        <div className="flex items-start justify-between">
          <div className="p-2 rounded-xl bg-amber-50 border border-amber-100">
            {premiumOnly ? (
              <Lock size={18} className="text-amber-600" />
            ) : (
              <Sparkles size={18} className="text-amber-600" />
            )}
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <X size={16} />
          </button>
        </div>

        <div className="space-y-1.5">
          <h3 className="text-lg font-black text-slate-800 tracking-tight">
            {premiumOnly ? "Premium feature" : "Not enough AI credits"}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {premiumOnly
              ? "This AI tool is available on the Premium plan. Upgrade to Premium to start using it."
              : `This action needs ${insufficient?.requiredCredits} credits, but you have ${insufficient?.availableCredits}. Your credits refresh automatically, or unlock a larger allowance with Premium.`}
          </p>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
          >
            Maybe later
          </button>
          <Link
            href="/subscription"
            onClick={onClose}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition"
          >
            View Premium
          </Link>
        </div>
      </div>
    </div>
  );
}
