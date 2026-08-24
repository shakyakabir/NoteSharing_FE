"use client";

import React, { useState } from "react";
import {
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Edit2,
  Trash2,
} from "lucide-react";
import { RewardItem } from "../components/modal/RewardFormModal";

interface Props {
  rewards: RewardItem[];
  totalCount: number;
  onEdit: (reward: RewardItem) => void;
  onDelete: (reward: RewardItem) => void;
}

export const RewardsTable: React.FC<Props> = ({
  rewards,
  totalCount,
  onEdit,
  onDelete,
}) => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto min-h-[300px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F8F7FD] text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
              <th className="py-3.5 px-6">FEATURE NAME</th>
              <th className="py-3.5 px-6">TYPE</th>
              <th className="py-3.5 px-6 text-center">AI COST</th>
              <th className="py-3.5 px-6 text-center">POINT PRICE</th>
              <th className="py-3.5 px-6 text-center">MAX USES</th>
              <th className="py-3.5 px-6">STATUS</th>
              <th className="py-3.5 px-6 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {rewards.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-400">
                  No rewards found matching your filters.
                </td>
              </tr>
            ) : (
              rewards.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-4 px-6 font-semibold text-gray-900">
                    {item.name}
                  </td>
                  <td className="py-4 px-6 text-gray-500">{item.type}</td>
                  <td className="py-4 px-6 text-center font-medium text-gray-700">
                    {item.aiCost}
                  </td>
                  <td className="py-4 px-6 text-center font-semibold text-indigo-600">
                    {item.pointPrice}
                  </td>
                  <td className="py-4 px-6 text-center text-gray-600">
                    {item.maxUses}
                  </td>
                  <td className="py-4 px-6">
                    {item.status === "ACTIVE" && (
                      <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                        ACTIVE
                      </span>
                    )}
                    {item.status === "DRAFT" && (
                      <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-600 border border-amber-200/60">
                        DRAFT
                      </span>
                    )}
                    {item.status === "SUSPENDED" && (
                      <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold bg-rose-50 text-rose-600 border border-rose-200/60">
                        SUSPENDED
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right relative">
                    <button
                      onClick={() =>
                        setActiveMenuId(
                          activeMenuId === item.id ? null : item.id,
                        )
                      }
                      className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    {activeMenuId === item.id && (
                      <div className="absolute right-6 top-12 z-10 w-36 bg-white rounded-lg shadow-lg border border-gray-100 py-1 text-left">
                        <button
                          onClick={() => {
                            setActiveMenuId(null);
                            onEdit(item);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-gray-500" />
                          Edit Reward
                        </button>
                        <button
                          onClick={() => {
                            setActiveMenuId(null);
                            onDelete(item);
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

      <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        <div>
          Showing 1 to {rewards.length} of {totalCount} entries
        </div>
        <div className="flex items-center gap-1 font-medium">
          <button className="p-1 hover:bg-gray-100 rounded text-gray-400 transition">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-7 h-7 bg-indigo-600 text-white rounded font-semibold flex items-center justify-center">
            1
          </button>
          <button className="p-1 hover:bg-gray-100 rounded text-gray-700 transition">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
