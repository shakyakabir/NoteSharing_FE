"use client";

import React, { useState } from "react";
import { X, AlertTriangle, ShieldCheck } from "lucide-react";
import { Plan } from "../types/subscription";

interface ActionModalProps {
  isOpen: boolean;
  type: "UPGRADE" | "CANCEL" | "CHANGE_PLAN" | "CREATE_PLAN" | null;
  selectedPlan: Plan | null;
  onClose: () => void;
  onConfirm: (data?: any) => void;
}

export const SubscriptionModals: React.FC<ActionModalProps> = ({
  isOpen,
  type,
  selectedPlan,
  onClose,
  onConfirm,
}) => {
  const [newPlanName, setNewPlanName] = useState("");
  const [newPlanPrice, setNewPlanPrice] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl border border-gray-100 space-y-4">
        {type === "CANCEL" && (
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              Cancel Subscription?
            </h3>
            <p className="text-xs text-gray-500">
              Are you sure you want to cancel your Premium subscription? You
              will lose access to priority support and bonus AI credits at the
              end of your billing cycle.
            </p>
            <div className="flex gap-3 pt-3">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 transition"
              >
                Keep Plan
              </button>
              <button
                onClick={() => onConfirm()}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold transition"
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        )}

        {(type === "UPGRADE" || type === "CHANGE_PLAN") && selectedPlan && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-gray-900">
                Confirm Plan Change
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-indigo-500 font-bold uppercase">
                  Target Tier
                </p>
                <p className="text-base font-bold text-indigo-950">
                  {selectedPlan.name}
                </p>
              </div>
              <p className="text-lg font-black text-indigo-600">
                {selectedPlan.price}/mo
              </p>
            </div>
            <p className="text-xs text-gray-500">
              Your new plan benefits will apply immediately. Prorated charges
              will be reflected on your next invoice.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => onConfirm(selectedPlan)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold"
              >
                Confirm Upgrade
              </button>
            </div>
          </div>
        )}

        {type === "CREATE_PLAN" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-gray-900">
                Create Custom Plan
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  PLAN NAME
                </label>
                <input
                  type="text"
                  placeholder="e.g. Enterprise Tier"
                  value={newPlanName}
                  onChange={(e) => setNewPlanName(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  MONTHLY PRICE ($)
                </label>
                <input
                  type="text"
                  placeholder="49.99"
                  value={newPlanPrice}
                  onChange={(e) => setNewPlanPrice(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  onConfirm({ name: newPlanName, price: `$${newPlanPrice}` })
                }
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold"
              >
                Save Plan
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
