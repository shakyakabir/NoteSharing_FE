"use client";

import React, { useState } from "react";
import {
  Save,
  Filter,
  FileText,
  HelpCircle,
  BarChart3,
  Presentation,
} from "lucide-react";

interface FeatureItem {
  id: string;
  name: string;
  description: string;
  status: "ACTIVE" | "BETA";
  currentCost: number;
  newCost: number;
  isPremiumOnly: boolean;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
}

const INITIAL_FEATURES: FeatureItem[] = [
  {
    id: "1",
    name: "Summarize Document",
    description: "Basic text abstraction",
    status: "ACTIVE",
    currentCost: 2,
    newCost: 2,
    isPremiumOnly: false,
    icon: FileText,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
  {
    id: "2",
    name: "Generate Quiz",
    description: "10-question multiple choice",
    status: "ACTIVE",
    currentCost: 4,
    newCost: 4,
    isPremiumOnly: true,
    icon: HelpCircle,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    id: "3",
    name: "Analytics Report",
    description: "Deep dive semantic analysis",
    status: "BETA",
    currentCost: 6,
    newCost: 6,
    isPremiumOnly: true,
    icon: BarChart3,
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600",
  },
  {
    id: "4",
    name: "Generate PPT",
    description: "Full slide deck creation",
    status: "ACTIVE",
    currentCost: 8,
    newCost: 8,
    isPremiumOnly: true,
    icon: Presentation,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
  },
];

export default function AIFeaturePricing() {
  const [features, setFeatures] = useState<FeatureItem[]>(INITIAL_FEATURES);

  const handleCostChange = (id: string, value: string) => {
    const numericValue = parseInt(value, 10) || 0;
    setFeatures((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, newCost: numericValue } : item,
      ),
    );
  };

  const handleTogglePremium = (id: string) => {
    setFeatures((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isPremiumOnly: !item.isPremiumOnly } : item,
      ),
    );
  };

  const handleDiscard = () => {
    setFeatures(INITIAL_FEATURES);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] p-8 text-gray-800 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1E1B4B]">
              AI Feature Pricing
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Configure base credit costs and premium tier restrictions for all
              generative features.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDiscard}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition"
            >
              Discard Draft
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-lg text-sm font-semibold shadow-sm transition">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Sub Header Filter Bar */}
          <div className="bg-[#F3F1FB] px-6 py-3 border-b border-gray-200/60 flex items-center gap-2">
            <Filter className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-bold text-[#1E1B4B] tracking-wide">
              Filter: All Features Active
            </span>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8F7FD] text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                  <th className="py-3 px-6">FEATURE NAME</th>
                  <th className="py-3 px-6">STATUS</th>
                  <th className="py-3 px-6">CURRENT COST</th>
                  <th className="py-3 px-6 text-center">NEW COST</th>
                  <th className="py-3 px-6 text-right">PREMIUM ONLY</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {features.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <tr
                      key={feature.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      {/* Feature Name & Icon */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-lg ${feature.iconBg} ${feature.iconColor} flex items-center justify-center shrink-0`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">
                              {feature.name}
                            </div>
                            <div className="text-xs text-gray-400">
                              {feature.description}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
                        {feature.status === "ACTIVE" ? (
                          <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                            ACTIVE
                          </span>
                        ) : (
                          <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-600 border border-amber-200/60">
                            BETA
                          </span>
                        )}
                      </td>

                      {/* Current Cost */}
                      <td className="py-4 px-6 font-medium text-gray-600">
                        {feature.currentCost} Credits
                      </td>

                      {/* New Cost Input */}
                      <td className="py-4 px-6 text-center">
                        <input
                          type="number"
                          min="0"
                          value={feature.newCost}
                          onChange={(e) =>
                            handleCostChange(feature.id, e.target.value)
                          }
                          className="w-20 text-center px-3 py-1.5 border border-gray-200 rounded-lg font-medium text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </td>

                      {/* Premium Only Toggle */}
                      <td className="py-4 px-6 text-right">
                        <button
                          type="button"
                          onClick={() => handleTogglePremium(feature.id)}
                          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            feature.isPremiumOnly
                              ? "bg-[#4F46E5]"
                              : "bg-gray-200"
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                              feature.isPremiumOnly
                                ? "translate-x-5"
                                : "translate-x-0"
                            }`}
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
