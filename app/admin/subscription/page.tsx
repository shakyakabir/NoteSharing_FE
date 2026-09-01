"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CurrentPlanCard } from "./components/CurrentPlanCard";
import { PlanGrid } from "./components/PlanGrid";
import { PaymentHistoryTable } from "./components/PaymentHistoryTable";
import { SubscriptionModals } from "./modal/SubscriptionModals";
import { Plan } from "./type/subscription";
import {
  useGetPlansQuery,
  useCreatePlanMutation,
  useUpdatePlanMutation,
  useDeletePlanMutation,
  type PlanRequest,
} from "@/slices/Admin";
import {
  useGetSubscriptionQuery,
  useGetCreditsQuery,
  useUpgradeMutation,
} from "@/slices/Subscription";

const errMsg = (err: unknown, fallback: string) =>
  (err as { data?: { message?: string } })?.data?.message || fallback;

// ISO date -> "Sep 24, 2026"; null/blank -> "—" (there is no billing system, so this shows the
// premium window end date when present and nothing otherwise).
const fmtDate = (iso?: string | null) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? "—"
    : d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
};

export default function SubscriptionManagementPage() {
  const { data: apiPlans } = useGetPlansQuery();
  const { data: sub } = useGetSubscriptionQuery();
  const { data: credits } = useGetCreditsQuery();
  const [createPlan] = useCreatePlanMutation();
  const [updatePlan] = useUpdatePlanMutation();
  const [deletePlan] = useDeletePlanMutation();
  const [upgrade] = useUpgradeMutation();

  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: "UPGRADE" | "CANCEL" | "CHANGE_PLAN" | "CREATE_PLAN" | null;
    selectedPlan: Plan | null;
  }>({
    isOpen: false,
    type: null,
    selectedPlan: null,
  });

  // Map backend plan configs -> the page's Plan shape. The admin's active plan is the first plan
  // whose enforcement tier matches their subscription tier: plans arrive in display order and the
  // system always assigns the lowest-sortOrder plan of a tier, so the first match is the real one.
  let currentMarked = false;
  const plans: Plan[] = (apiPlans ?? []).map((p) => {
    const isCurrent = !currentMarked && sub?.plan === p.tier;
    if (isCurrent) currentMarked = true;
    const isFree = p.tier === "FREE";
    return {
      id: p.id,
      name: p.name,
      price: `Rs.${p.price}`,
      period: p.period,
      isCurrent,
      features: p.features,
      buttonText: isCurrent
        ? "Current Plan"
        : isFree
          ? "Downgrade"
          : `Upgrade to ${p.name}`,
      buttonVariant: isCurrent ? "disabled" : isFree ? "secondary" : "primary",
    };
  });

  const currentPlan = plans.find((p) => p.isCurrent);
  const tierOf = (id: string) => apiPlans?.find((a) => a.id === id)?.tier;

  const closeModal = () => {
    setModalState({ isOpen: false, type: null, selectedPlan: null });
    setEditingPlan(null);
  };

  const handleSelectPlan = (plan: Plan) => {
    setModalState({ isOpen: true, type: "CHANGE_PLAN", selectedPlan: plan });
  };

  // Changing the admin's own subscription reuses the real points-based upgrade. Every non-free
  // plan grants the PREMIUM tier, so unlocking any of them unlocks Premium; a free/downgrade has
  // no backend endpoint, so it stays an honest no-op with a notice.
  const handleConfirmPlanChange = async (targetPlan?: Plan) => {
    const finalPlan = targetPlan ?? modalState.selectedPlan;
    closeModal();
    if (!finalPlan || finalPlan.isCurrent) return;
    if (tierOf(finalPlan.id) === "FREE") {
      toast.info("Downgrading isn't available from here yet.");
      return;
    }
    try {
      await upgrade().unwrap();
      toast.success("Premium unlocked");
    } catch (err) {
      toast.error(errMsg(err, "Upgrade failed"));
    }
  };

  const handleCancel = () => {
    closeModal();
    toast.info("Self-service cancellation isn't available yet.");
  };

  const handleCreateOrEditPlan = async (data: {
    name: string;
    price: string;
  }) => {
    if (!data.name?.trim()) {
      toast.error("Plan name is required");
      return;
    }
    const price = parseFloat((data.price || "").replace(/[^0-9.]/g, "")) || 0;
    const body: PlanRequest = { name: data.name.trim(), price };
    try {
      if (editingPlan) {
        await updatePlan({ id: editingPlan.id, body }).unwrap();
        toast.success("Plan updated");
      } else {
        await createPlan(body).unwrap();
        toast.success("Plan created");
      }
      closeModal();
    } catch (err) {
      toast.error(errMsg(err, "Failed to save plan"));
    }
  };

  const handleEditPlan = (plan: Plan) => {
    setEditingPlan(plan);
    setModalState({ isOpen: true, type: "CREATE_PLAN", selectedPlan: null });
  };

  const handleDeletePlan = async (plan: Plan) => {
    if (plan.isCurrent) {
      toast.error("You can't delete your active plan.");
      return;
    }
    try {
      await deletePlan(plan.id).unwrap();
      toast.success("Plan deleted");
    } catch (err) {
      toast.error(errMsg(err, "Failed to delete plan"));
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] p-8 text-gray-800 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Title Header */}
        <div>
          <h1 className="text-2xl font-bold text-[#1E1B4B]">
            Manage Subscription
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            View and manage your current plan, billing details, and credit
            usage.
          </p>
        </div>

        {/* Overview & Usage */}
        <CurrentPlanCard
          currentPlanName={currentPlan?.name ?? sub?.plan ?? "—"}
          price={
            currentPlan ? `${currentPlan.price}/${currentPlan.period}` : "—"
          }
          nextBillingDate={fmtDate(sub?.subscriptionEndDate)}
          usedCredits={
            credits ? credits.maxCredits - credits.currentCredits : 0
          }
          totalCredits={credits?.maxCredits ?? 0}
          resetDays={credits?.daysUntilRefresh ?? 0}
          onUpgrade={() => {
            const target = plans.find(
              (p) => !p.isCurrent && tierOf(p.id) === "PREMIUM",
            );
            if (!target) {
              toast.info("No upgrade plan is available.");
              return;
            }
            setModalState({
              isOpen: true,
              type: "UPGRADE",
              selectedPlan: target,
            });
          }}
          onCancel={() =>
            setModalState({ isOpen: true, type: "CANCEL", selectedPlan: null })
          }
        />

        {/* Pricing Cards */}
        <PlanGrid
          plans={plans}
          onSelectPlan={handleSelectPlan}
          onCreatePlan={() => {
            setEditingPlan(null);
            setModalState({
              isOpen: true,
              type: "CREATE_PLAN",
              selectedPlan: null,
            });
          }}
          onEditPlan={handleEditPlan}
          onDeletePlan={handleDeletePlan}
        />

        {/* Invoice Log (no billing system yet -> honest empty state) */}
        <PaymentHistoryTable history={[]} />
      </div>

      {/* Global Modals */}
      <SubscriptionModals
        isOpen={modalState.isOpen}
        type={modalState.type}
        selectedPlan={modalState.selectedPlan}
        editingPlan={editingPlan}
        onClose={closeModal}
        onConfirm={(data) => {
          if (modalState.type === "CREATE_PLAN") {
            handleCreateOrEditPlan(data);
          } else if (modalState.type === "CANCEL") {
            handleCancel();
          } else {
            handleConfirmPlanChange(data);
          }
        }}
      />
    </div>
  );
}
