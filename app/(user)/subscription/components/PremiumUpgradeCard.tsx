"use client";
import React from "react";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { useSubscription } from "@/hooks/subscription/useSubscription";

/**
 * Premium upgrade card. Premium is unlocked by spending the user's existing points (no fake
 * payment) - the backend performs the atomic points deduction and plan change; this only triggers
 * it and reflects the result.
 */
export default function PremiumUpgradeCard() {
  const { subscription, upgrade, isUpgrading } = useSubscription();

  const isPremium = subscription?.plan === "PREMIUM";
  const price = subscription?.premiumPricePoints ?? 0;
  const balance = subscription?.pointBalance ?? 0;
  const premiumCredits = subscription?.premiumCredits ?? 0;
  const premiumRefreshDays = subscription?.premiumRefreshDays ?? 0;
  const premiumDurationDays = subscription?.premiumDurationDays ?? 0;
  const canUnlock = !isPremium && balance >= price;

  const handleUpgrade = async () => {
    try {
      await upgrade().unwrap();
      toast.success("Premium unlocked! Your AI credits have been upgraded.");
    } catch (err: any) {
      toast.error(err?.data?.message || "Could not unlock Premium.");
    }
  };

  const benefits = [
    `${premiumCredits} AI credits every ${premiumRefreshDays} days`,
    "Priority access to all AI power tools",
    `Premium status for ${premiumDurationDays} days`,
  ];

  return (
    <section className="bg-slate-950 rounded-3xl p-8 text-white flex flex-col lg:flex-row items-stretch justify-between gap-8 relative overflow-hidden shadow-xl">
      <div className="flex flex-col justify-between items-start space-y-6 max-w-md z-10">
        <div className="space-y-3">
          <span className="text-[10px] font-black tracking-widest uppercase px-2.5 py-1 bg-white/10 rounded-md border border-white/10">
            Premium Plan
          </span>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-none">
            Upgrade Your
            <br />
            Learning Engine
          </h2>
          <p className="text-slate-400 text-xs leading-relaxed">
            Unlock a larger AI credit allowance that refreshes far more often -
            paid for with the points you have already earned.
          </p>
        </div>

        {isPremium ? (
          <span className="bg-emerald-500/15 border border-emerald-400/20 text-emerald-300 font-bold text-xs px-6 py-3.5 rounded-xl">
            Premium is active
          </span>
        ) : (
          <button
            onClick={handleUpgrade}
            disabled={!canUnlock || isUpgrading}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-white/10 disabled:text-slate-400 text-white font-bold text-xs px-6 py-3.5 rounded-xl transition"
          >
            {isUpgrading
              ? "Unlocking..."
              : canUnlock
                ? `Unlock with ${price} points`
                : `Need ${price} points (you have ${balance})`}
          </button>
        )}
      </div>

      <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 lg:w-2/5 z-10 flex flex-col justify-between gap-4">
        <div className="space-y-3">
          <span className="text-[9px] font-bold text-indigo-400 tracking-wider uppercase">
            What you get
          </span>
          <ul className="space-y-2.5">
            {benefits.map((b) => (
              <li
                key={b}
                className="flex items-start gap-2 text-[11px] text-slate-200"
              >
                <Check size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-baseline justify-between pt-2 border-t border-white/[0.06]">
          <span className="text-xs text-slate-400 font-medium">
            Your points
          </span>
          <span className="text-lg font-black text-slate-100">
            {balance.toLocaleString()}
          </span>
        </div>
      </div>
    </section>
  );
}
