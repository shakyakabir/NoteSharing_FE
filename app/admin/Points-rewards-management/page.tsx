"use client";

import React, { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import {
  RewardFormData,
  RewardFormModal,
  RewardItem,
} from "../components/modal/RewardFormModal";
import { RewardsFilterBar } from "./RewardsFilterBar";
import { DeleteConfirmModal } from "../components/modal/DeleteConfirmModal";
import { RewardsTable } from "./RewardsTable";

const INITIAL_REWARDS: RewardItem[] = [
  {
    id: "1",
    name: "100 AI Credits Pack",
    type: "Credits Bundle",
    aiCost: "100",
    pointPrice: "5,000 pts",
    maxUses: "Unlimited",
    status: "ACTIVE",
  },
  {
    id: "2",
    name: "Dark Academia Theme",
    type: "Premium Theme",
    aiCost: "-",
    pointPrice: "1,500 pts",
    maxUses: "1",
    status: "ACTIVE",
  },
  {
    id: "3",
    name: "Export to PDF (Pro)",
    type: "Export Formats",
    aiCost: "5",
    pointPrice: "500 pts",
    maxUses: "10",
    status: "DRAFT",
  },
  {
    id: "4",
    name: "Legacy Icon Pack",
    type: "Visual Asset",
    aiCost: "-",
    pointPrice: "2,000 pts",
    maxUses: "1",
    status: "SUSPENDED",
  },
];

export default function PointsRewardsManagement() {
  const [rewards, setRewards] = useState<RewardItem[]>(INITIAL_REWARDS);
  const [featureTypeFilter, setFeatureTypeFilter] =
    useState("All Feature Types");
  const [statusFilter, setStatusFilter] = useState("Status: All");

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingReward, setEditingReward] = useState<RewardItem | null>(null);
  const [deletingReward, setDeletingReward] = useState<RewardItem | null>(null);

  const filteredRewards = useMemo(() => {
    return rewards.filter((item) => {
      const matchesType =
        featureTypeFilter === "All Feature Types" ||
        item.type === featureTypeFilter;
      const cleanStatus = statusFilter.replace("Status: ", "");
      const matchesStatus =
        statusFilter === "Status: All" ||
        item.status === cleanStatus.toUpperCase();
      return matchesType && matchesStatus;
    });
  }, [rewards, featureTypeFilter, statusFilter]);

  const handleCreateOrUpdate = (data: RewardFormData) => {
    const formattedPrice = `${Number(data.pointPrice || 0).toLocaleString()} pts`;
    const formattedAiCost = data.aiCost.trim() ? data.aiCost : "-";

    if (editingReward) {
      setRewards((prev) =>
        prev.map((item) =>
          item.id === editingReward.id
            ? {
                ...item,
                ...data,
                pointPrice: formattedPrice,
                aiCost: formattedAiCost,
              }
            : item,
        ),
      );
    } else {
      setRewards((prev) => [
        {
          id: Date.now().toString(),
          ...data,
          pointPrice: formattedPrice,
          aiCost: formattedAiCost,
        },
        ...prev,
      ]);
    }
    setIsFormModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deletingReward) {
      setRewards((prev) =>
        prev.filter((item) => item.id !== deletingReward.id),
      );
      setIsDeleteModalOpen(false);
      setDeletingReward(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] p-8 text-gray-800 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1E1B4B]">
              Points & Rewards Management
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Configure and monitor redeemable features and AI credit costs.
            </p>
          </div>
          <button
            onClick={() => {
              setEditingReward(null);
              setIsFormModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-lg text-sm font-semibold shadow-sm transition"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            Add Reward
          </button>
        </div>

        <RewardsFilterBar
          featureTypeFilter={featureTypeFilter}
          setFeatureTypeFilter={setFeatureTypeFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        <RewardsTable
          rewards={filteredRewards}
          totalCount={rewards.length}
          onEdit={(reward) => {
            setEditingReward(reward);
            setIsFormModalOpen(true);
          }}
          onDelete={(reward) => {
            setDeletingReward(reward);
            setIsDeleteModalOpen(true);
          }}
        />

        <RewardFormModal
          isOpen={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
          onSubmit={handleCreateOrUpdate}
          editingReward={editingReward}
        />

        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          item={deletingReward}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
        />
      </div>
    </div>
  );
}
