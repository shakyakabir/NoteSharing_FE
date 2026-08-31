"use client";

import React, { useState } from "react";
import { MoreVertical, Edit2, Trash2 } from "lucide-react";
import type { AdminAd } from "@/slices/Admin";

interface Props {
  ads: AdminAd[];
  onEdit: (ad: AdminAd) => void;
  onDelete: (ad: AdminAd) => void;
}

// Per-ad earnings mirror the backend formula: impressions/1000 * cpmRate + clicks * cpcRate.
const adRevenue = (ad: AdminAd) =>
  (ad.impressions / 1000) * ad.cpmRate + ad.clicks * ad.cpcRate;

const money = (n: number) =>
  `$${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

export const AdsTable: React.FC<Props> = ({ ads, onEdit, onDelete }) => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto min-h-[300px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F8F7FD] text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
              <th className="py-3.5 px-6">AD TITLE</th>
              <th className="py-3.5 px-6">PLACEMENT</th>
              <th className="py-3.5 px-6 text-center">IMPRESSIONS</th>
              <th className="py-3.5 px-6 text-center">CLICKS</th>
              <th className="py-3.5 px-6 text-center">REVENUE</th>
              <th className="py-3.5 px-6">STATUS</th>
              <th className="py-3.5 px-6 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {ads.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-400">
                  No ads yet. Create one to start earning.
                </td>
              </tr>
            ) : (
              ads.map((ad) => (
                <tr
                  key={ad.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-4 px-6 font-semibold text-gray-900">
                    {ad.title}
                  </td>
                  <td className="py-4 px-6 text-gray-500">{ad.placement}</td>
                  <td className="py-4 px-6 text-center text-gray-600">
                    {ad.impressions.toLocaleString()}
                  </td>
                  <td className="py-4 px-6 text-center text-gray-600">
                    {ad.clicks.toLocaleString()}
                  </td>
                  <td className="py-4 px-6 text-center font-semibold text-indigo-600">
                    {money(adRevenue(ad))}
                  </td>
                  <td className="py-4 px-6">
                    {ad.status === "ACTIVE" && (
                      <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                        ACTIVE
                      </span>
                    )}
                    {ad.status === "PAUSED" && (
                      <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-600 border border-amber-200/60">
                        PAUSED
                      </span>
                    )}
                    {ad.status === "DRAFT" && (
                      <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold bg-gray-100 text-gray-500 border border-gray-200/60">
                        DRAFT
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right relative">
                    <button
                      onClick={() =>
                        setActiveMenuId(activeMenuId === ad.id ? null : ad.id)
                      }
                      className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    {activeMenuId === ad.id && (
                      <div className="absolute right-6 top-12 z-10 w-36 bg-white rounded-lg shadow-lg border border-gray-100 py-1 text-left">
                        <button
                          onClick={() => {
                            setActiveMenuId(null);
                            onEdit(ad);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-gray-500" />
                          Edit Ad
                        </button>
                        <button
                          onClick={() => {
                            setActiveMenuId(null);
                            onDelete(ad);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
