"use client";

import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import {
  RewardFormData,
  RewardFormModal,
  RewardItem,
} from "../components/modal/RewardFormModal";
import { RewardsFilterBar } from "./RewardsFilterBar";
import { DeleteConfirmModal } from "../components/modal/DeleteConfirmModal";
import { RewardsTable } from "./RewardsTable";
import {
  useGetAdminRewardsQuery,
  useCreateRewardMutation,
  useUpdateRewardMutation,
  useDeleteRewardMutation,
  type AdminReward,
  type AdminRewardRequest,
} from "@/slices/Admin";

const errMsg = (err: unknown, fallback: string) =>
  (err as { data?: { message?: string } })?.data?.message || fallback;

// Backend RewardItem entity -> the UI's display shape. Numbers become the mock's display strings
// (0 max-uses = "Unlimited", 0 AI cost = "-", cost = "5,000 pts").
const toUi = (r: AdminReward): RewardItem => ({
  id: r.id,
  name: r.title,
  type: r.rewardType,
  aiCost: r.aiCost > 0 ? String(r.aiCost) : "-",
  pointPrice: `${r.cost.toLocaleString()} pts`,
  maxUses: r.maxUses === 0 ? "Unlimited" : String(r.maxUses),
  status:
    r.status === "DRAFT" || r.status === "SUSPENDED" ? r.status : "ACTIVE",
});

const toInt = (value: string) => {
  const n = parseInt(value, 10);
  return Number.isNaN(n) ? 0 : Math.max(0, n);
};

export default function PointsRewardsManagement() {
  const { data: apiRewards } = useGetAdminRewardsQuery();
  const [createReward] = useCreateRewardMutation();
  const [updateReward] = useUpdateRewardMutation();
  const [deleteReward] = useDeleteRewardMutation();

  const [featureTypeFilter, setFeatureTypeFilter] =
    useState("All Feature Types");
  const [statusFilter, setStatusFilter] = useState("Status: All");

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingReward, setEditingReward] = useState<RewardItem | null>(null);
  const [deletingReward, setDeletingReward] = useState<RewardItem | null>(null);

  const rewards = useMemo<RewardItem[]>(
    () => (apiRewards ?? []).map(toUi),
    [apiRewards],
  );

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

  const handleCreateOrUpdate = async (data: RewardFormData) => {
    const body: AdminRewardRequest = {
      title: data.name,
      rewardType: data.type,
      cost: toInt(data.pointPrice.replace(/,/g, "")),
      aiCost: toInt(data.aiCost),
      maxUses: toInt(data.maxUses),
      status: data.status,
    };

    try {
      if (editingReward) {
        await updateReward({ id: editingReward.id, body }).unwrap();
        toast.success("Reward updated");
      } else {
        await createReward(body).unwrap();
        toast.success("Reward created");
      }
      setIsFormModalOpen(false);
      setEditingReward(null);
    } catch (err) {
      toast.error(errMsg(err, "Failed to save reward"));
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingReward) return;
    try {
      await deleteReward(deletingReward.id).unwrap();
      toast.success("Reward deleted");
      setIsDeleteModalOpen(false);
      setDeletingReward(null);
    } catch (err) {
      toast.error(errMsg(err, "Failed to delete reward"));
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
