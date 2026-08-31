"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { AdsTable } from "./AdsTable";
import { AdFormModal } from "./AdFormModal";
import { DeleteAdModal } from "./DeleteAdModal";
import {
  useGetAdsQuery,
  useCreateAdMutation,
  useUpdateAdMutation,
  useDeleteAdMutation,
  type AdminAd,
  type AdminAdRequest,
} from "@/slices/Admin";

const errMsg = (err: unknown, fallback: string) =>
  (err as { data?: { message?: string } })?.data?.message || fallback;

export default function AdsManagement() {
  const { data: ads } = useGetAdsQuery();
  const [createAd] = useCreateAdMutation();
  const [updateAd] = useUpdateAdMutation();
  const [deleteAd] = useDeleteAdMutation();

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<AdminAd | null>(null);
  const [deletingAd, setDeletingAd] = useState<AdminAd | null>(null);

  const handleCreateOrUpdate = async (body: AdminAdRequest) => {
    try {
      if (editingAd) {
        await updateAd({ id: editingAd.id, body }).unwrap();
        toast.success("Ad updated");
      } else {
        await createAd(body).unwrap();
        toast.success("Ad created");
      }
      setIsFormModalOpen(false);
      setEditingAd(null);
    } catch (err) {
      toast.error(errMsg(err, "Failed to save ad"));
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingAd) return;
    try {
      await deleteAd(deletingAd.id).unwrap();
      toast.success("Ad deleted");
      setIsDeleteModalOpen(false);
      setDeletingAd(null);
    } catch (err) {
      toast.error(errMsg(err, "Failed to delete ad"));
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] p-8 text-gray-800 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1E1B4B]">
              Ads Management
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage the ads shown to free-tier users and track CPM/CPC
              earnings.
            </p>
          </div>
          <button
            onClick={() => {
              setEditingAd(null);
              setIsFormModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-lg text-sm font-semibold shadow-sm transition"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            Add Ad
          </button>
        </div>

        <AdsTable
          ads={ads ?? []}
          onEdit={(ad) => {
            setEditingAd(ad);
            setIsFormModalOpen(true);
          }}
          onDelete={(ad) => {
            setDeletingAd(ad);
            setIsDeleteModalOpen(true);
          }}
        />

        <AdFormModal
          isOpen={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
          onSubmit={handleCreateOrUpdate}
          editingAd={editingAd}
        />

        <DeleteAdModal
          isOpen={isDeleteModalOpen}
          ad={deletingAd}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
        />
      </div>
    </div>
  );
}
