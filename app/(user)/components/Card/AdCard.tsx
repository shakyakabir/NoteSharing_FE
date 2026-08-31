"use client";

import React, { useEffect, useRef } from "react";
import {
  useGetActiveAdsQuery,
  useRecordAdImpressionMutation,
  useRecordAdClickMutation,
} from "@/slices/Ads";

// Shown to free-tier users only: the server returns [] for premium users (ad-free) and when no ad
// is active, so this component renders nothing in those cases. Displays the first active ad.
export default function AdCard() {
  const { data: ads } = useGetActiveAdsQuery();
  const [recordImpression] = useRecordAdImpressionMutation();
  const [recordClick] = useRecordAdClickMutation();

  const ad = ads?.[0];
  const impressedId = useRef<string | null>(null);

  // Count one impression per ad shown (guarded so React's double-invoke in dev doesn't double-count).
  useEffect(() => {
    if (ad && impressedId.current !== ad.id) {
      impressedId.current = ad.id;
      recordImpression(ad.id);
    }
  }, [ad, recordImpression]);

  if (!ad) return null;

  const handleClick = () => {
    recordClick(ad.id);
    if (ad.targetUrl) {
      window.open(ad.targetUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="px-4 pt-3 flex items-center justify-between">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Sponsored
        </span>
      </div>

      <button
        onClick={handleClick}
        className="w-full text-left p-4 pt-2 group"
      >
        {ad.imageUrl && (
          <div className="relative w-full h-32 rounded-xl overflow-hidden bg-slate-50 mb-3">
            {/* Ad creatives are arbitrary external URLs, so a plain img avoids next/image domain
                config and optimization we don't want on third-party ads. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ad.imageUrl}
              alt={ad.title}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
        )}
        <h3 className="text-sm font-semibold text-slate-800 group-hover:text-primary transition-colors">
          {ad.title}
        </h3>
        {ad.description && (
          <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
            {ad.description}
          </p>
        )}
      </button>
    </div>
  );
}
