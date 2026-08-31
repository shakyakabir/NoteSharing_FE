"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { AdminAd, AdminAdRequest } from "@/slices/Admin";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AdminAdRequest) => void;
  editingAd: AdminAd | null;
}

// Local form shape: rates are edited as strings and parsed on submit (mirrors the reward modal).
type AdFormState = {
  title: string;
  placement: string;
  status: "ACTIVE" | "PAUSED" | "DRAFT";
  imageUrl: string;
  targetUrl: string;
  cpmRate: string;
  cpcRate: string;
  description: string;
};

const EMPTY: AdFormState = {
  title: "",
  placement: "BANNER",
  status: "ACTIVE",
  imageUrl: "",
  targetUrl: "",
  cpmRate: "",
  cpcRate: "",
  description: "",
};

const toNumber = (value: string) => {
  const n = parseFloat(value);
  return Number.isNaN(n) ? 0 : Math.max(0, n);
};

export const AdFormModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  editingAd,
}) => {
  const [formData, setFormData] = useState<AdFormState>(EMPTY);

  useEffect(() => {
    if (editingAd) {
      setFormData({
        title: editingAd.title,
        placement: editingAd.placement || "BANNER",
        status:
          editingAd.status === "PAUSED" || editingAd.status === "DRAFT"
            ? editingAd.status
            : "ACTIVE",
        imageUrl: editingAd.imageUrl ?? "",
        targetUrl: editingAd.targetUrl ?? "",
        cpmRate: editingAd.cpmRate ? String(editingAd.cpmRate) : "",
        cpcRate: editingAd.cpcRate ? String(editingAd.cpcRate) : "",
        description: editingAd.description ?? "",
      });
    } else {
      setFormData(EMPTY);
    }
  }, [editingAd, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl border border-gray-100 space-y-5">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <h2 className="text-lg font-bold text-gray-900">
            {editingAd ? "Edit Ad" : "Add New Ad"}
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
            onSubmit({
              title: formData.title,
              description: formData.description || undefined,
              imageUrl: formData.imageUrl || undefined,
              targetUrl: formData.targetUrl || undefined,
              placement: formData.placement,
              cpmRate: toNumber(formData.cpmRate),
              cpcRate: toNumber(formData.cpcRate),
              status: formData.status,
            });
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              AD TITLE
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="e.g. Upgrade to Premium"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                PLACEMENT
              </label>
              <select
                value={formData.placement}
                onChange={(e) =>
                  setFormData({ ...formData, placement: e.target.value })
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="BANNER">BANNER</option>
                <option value="SIDEBAR">SIDEBAR</option>
                <option value="INLINE">INLINE</option>
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
                    status: e.target.value as AdFormState["status"],
                  })
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="PAUSED">PAUSED</option>
                <option value="DRAFT">DRAFT</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              IMAGE URL
            </label>
            <input
              type="text"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
              placeholder="https://…"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              TARGET URL
            </label>
            <input
              type="text"
              value={formData.targetUrl}
              onChange={(e) =>
                setFormData({ ...formData, targetUrl: e.target.value })
              }
              placeholder="https://…"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                CPM RATE
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.cpmRate}
                onChange={(e) =>
                  setFormData({ ...formData, cpmRate: e.target.value })
                }
                placeholder="per 1,000 views"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                CPC RATE
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.cpcRate}
                onChange={(e) =>
                  setFormData({ ...formData, cpcRate: e.target.value })
                }
                placeholder="per click"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              DESCRIPTION
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={2}
              placeholder="Short ad copy shown to free-tier users"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
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
              {editingAd ? "Save Changes" : "Create Ad"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
