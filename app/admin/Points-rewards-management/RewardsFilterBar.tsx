"use client";

import React from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

interface Props {
  featureTypeFilter: string;
  setFeatureTypeFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
}

export const RewardsFilterBar: React.FC<Props> = ({
  featureTypeFilter,
  setFeatureTypeFilter,
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <div className="bg-[#F3F1FB] p-3 rounded-xl flex flex-wrap items-center gap-3">
      <div className="relative min-w-[200px] flex-1 sm:flex-initial">
        <select
          value={featureTypeFilter}
          onChange={(e) => setFeatureTypeFilter(e.target.value)}
          className="w-full appearance-none bg-white border border-gray-200/80 rounded-lg px-4 py-2 pr-10 text-sm text-gray-700 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
        >
          <option>All Feature Types</option>
          <option>Credits Bundle</option>
          <option>Premium Theme</option>
          <option>Export Formats</option>
          <option>Visual Asset</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>

      <div className="relative min-w-[180px] flex-1 sm:flex-initial">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full appearance-none bg-white border border-gray-200/80 rounded-lg px-4 py-2 pr-10 text-sm text-gray-700 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
        >
          <option>Status: All</option>
          <option>Status: Active</option>
          <option>Status: Draft</option>
          <option>Status: Suspended</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>

      <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200/80 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition ml-auto">
        <SlidersHorizontal className="w-4 h-4 text-gray-500" />
        More Filters
      </button>
    </div>
  );
};
