"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
export interface RewardItem {
  id: string;
  name: string;
  type: string;
  aiCost: string;
  pointPrice: string;
  maxUses: string;
  status: "ACTIVE" | "DRAFT" | "SUSPENDED";
}

export type RewardFormData = {
  name: string;
  type: string;
  aiCost: string;
  pointPrice: string;
  maxUses: string;
  status: "ACTIVE" | "DRAFT" | "SUSPENDED";
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RewardFormData) => void;
  editingReward: RewardItem | null;
}

export const RewardFormModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  editingReward,
}) => {
  const [formData, setFormData] = useState<RewardFormData>({
    name: "",
    type: "Credits Bundle",
    aiCost: "",
    pointPrice: "",
    maxUses: "",
    status: "ACTIVE",
  });

  useEffect(() => {
    if (editingReward) {
      setFormData({
        name: editingReward.name,
        type: editingReward.type,
        aiCost: editingReward.aiCost === "-" ? "" : editingReward.aiCost,
        pointPrice: editingReward.pointPrice
          .replace(" pts", "")
          .replace(",", ""),
        maxUses: editingReward.maxUses,
        status: editingReward.status,
      });
    } else {
      setFormData({
        name: "",
        type: "Credits Bundle",
        aiCost: "",
        pointPrice: "",
        maxUses: "",
        status: "ACTIVE",
      });
    }
  }, [editingReward, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl border border-gray-100 space-y-5">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <h2 className="text-lg font-bold text-gray-900">
            {editingReward ? "Edit Reward" : "Add New Reward"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(formData);
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              FEATURE NAME
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g. Pro Export Access"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                TYPE
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>Credits Bundle</option>
                <option>Premium Theme</option>
                <option>Export Formats</option>
                <option>Visual Asset</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                STATUS
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as RewardFormData["status"],
                  })
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="DRAFT">DRAFT</option>
                <option value="SUSPENDED">SUSPENDED</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                POINT PRICE
              </label>
              <input
                type="number"
                required
                value={formData.pointPrice}
                onChange={(e) =>
                  setFormData({ ...formData, pointPrice: e.target.value })
                }
                placeholder="500"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                AI COST
              </label>
              <input
                type="text"
                value={formData.aiCost}
                onChange={(e) =>
                  setFormData({ ...formData, aiCost: e.target.value })
                }
                placeholder="-"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                MAX USES
              </label>
              <input
                type="text"
                required
                value={formData.maxUses}
                onChange={(e) =>
                  setFormData({ ...formData, maxUses: e.target.value })
                }
                placeholder="1 / Unlimited"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-gray-100 pt-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition"
            >
              {editingReward ? "Save Changes" : "Create Reward"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
