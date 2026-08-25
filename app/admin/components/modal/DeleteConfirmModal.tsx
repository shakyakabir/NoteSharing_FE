"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import { RewardItem } from "./RewardFormModal";


interface Props {
  isOpen: boolean;
  item: RewardItem | null;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmModal: React.FC<Props> = ({
  isOpen,
  item,
  onClose,
  onConfirm,
}) => {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl border border-gray-100 space-y-4 text-center">
        <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Delete Reward?</h3>
          <p className="text-xs text-gray-500 mt-1">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-gray-700">"{item.name}"</span>?
            This action cannot be undone.
          </p>
        </div>
        <div className="flex justify-center gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-sm font-semibold transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
