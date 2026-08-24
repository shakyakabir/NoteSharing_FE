"use client";

import React, { useState } from "react";
import { CurrentPlanCard } from "./components/CurrentPlanCard";
import { PlanGrid } from "./components/PlanGrid";
import { PaymentHistoryTable } from "./components/PaymentHistoryTable";
import { SubscriptionModals } from "./modal/SubscriptionModals";
import { PaymentHistoryItem, Plan } from "./type/subscription";

const INITIAL_PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "mo",
    isCurrent: false,
    buttonText: "Downgrade",
    buttonVariant: "secondary",
    features: [
      { text: "Basic Support", included: true },
      { text: "10 AI Credits/mo", included: true },
      { text: "No Advanced Analytics", included: false },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: "$9.99",
    period: "mo",
    isCurrent: true,
    buttonText: "Current Plan",
    buttonVariant: "disabled",
    features: [
      { text: "Priority Support", included: true },
      { text: "100 AI Credits/mo", included: true },
      { text: "Basic Analytics", included: true },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$19.99",
    period: "mo",
    isCurrent: false,
    buttonText: "Upgrade to Pro",
    buttonVariant: "primary",
    features: [
      { text: "24/7 Dedicated Support", included: true },
      { text: "Unlimited AI Credits", included: true },
      { text: "Advanced Analytics Suite", included: true },
    ],
  },
];

const INITIAL_HISTORY: PaymentHistoryItem[] = [
  {
    id: "1",
    date: "Aug 24, 2026",
    invoiceId: "INV-2026-08",
    amount: "$9.99",
    plan: "Premium",
    status: "PAID",
  },
  {
    id: "2",
    date: "Jul 24, 2026",
    invoiceId: "INV-2026-07",
    amount: "$9.99",
    plan: "Premium",
    status: "PAID",
  },
  {
    id: "3",
    date: "Jun 24, 2026",
    invoiceId: "INV-2026-06",
    amount: "$9.99",
    plan: "Premium",
    status: "PAID",
  },
];

export default function SubscriptionManagementPage() {
  const [plans, setPlans] = useState<Plan[]>(INITIAL_PLANS);
  const [history] = useState<PaymentHistoryItem[]>(INITIAL_HISTORY);

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: "UPGRADE" | "CANCEL" | "CHANGE_PLAN" | "CREATE_PLAN" | null;
    selectedPlan: Plan | null;
  }>({
    isOpen: false,
    type: null,
    selectedPlan: null,
  });

  const currentPlan = plans.find((p) => p.isCurrent) || plans[1];

  const handleSelectPlan = (plan: Plan) => {
    setModalState({
      isOpen: true,
      type: "CHANGE_PLAN",
      selectedPlan: plan,
    });
  };

  const handleConfirmPlanChange = (targetPlan?: Plan) => {
    if (!targetPlan && modalState.selectedPlan) {
      targetPlan = modalState.selectedPlan;
    }
    if (targetPlan) {
      setPlans((prev) =>
        prev.map((p) => ({
          ...p,
          isCurrent: p.id === targetPlan.id,
          buttonText:
            p.id === targetPlan.id
              ? "Current Plan"
              : p.price === "$0"
                ? "Downgrade"
                : `Upgrade to ${p.name}`,
          buttonVariant:
            p.id === targetPlan.id
              ? "disabled"
              : p.price === "$0"
                ? "secondary"
                : "primary",
        })),
      );
    }
    setModalState({ isOpen: false, type: null, selectedPlan: null });
  };

  const handleCreateCustomPlan = (data: { name: string; price: string }) => {
    if (!data.name || !data.price) return;
    const newPlan: Plan = {
      id: Date.now().toString(),
      name: data.name,
      price: data.price,
      period: "mo",
      isCurrent: false,
      buttonText: `Upgrade to ${data.name}`,
      buttonVariant: "primary",
      features: [
        { text: "Custom Features Tier", included: true },
        { text: "500 AI Credits/mo", included: true },
        { text: "Full Custom Suite Access", included: true },
      ],
    };
    setPlans((prev) => [...prev, newPlan]);
    setModalState({ isOpen: false, type: null, selectedPlan: null });
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
          currentPlanName={currentPlan.name}
          price={`${currentPlan.price}/mo`}
          nextBillingDate="Sep 24, 2026"
          usedCredits={73}
          totalCredits={100}
          resetDays={12}
          onUpgrade={() => {
            const nextPlan =
              plans.find((p) => !p.isCurrent && p.price !== "$0") || plans[2];
            setModalState({
              isOpen: true,
              type: "UPGRADE",
              selectedPlan: nextPlan,
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
          onCreatePlan={() =>
            setModalState({
              isOpen: true,
              type: "CREATE_PLAN",
              selectedPlan: null,
            })
          }
        />

        {/* Invoice Log */}
        <PaymentHistoryTable history={history} />
      </div>

      {/* Global Modals */}
      <SubscriptionModals
        isOpen={modalState.isOpen}
        type={modalState.type}
        selectedPlan={modalState.selectedPlan}
        onClose={() =>
          setModalState({ isOpen: false, type: null, selectedPlan: null })
        }
        onConfirm={(data) => {
          if (modalState.type === "CREATE_PLAN") {
            handleCreateCustomPlan(data);
          } else {
            handleConfirmPlanChange(data);
          }
        }}
      />
    </div>
  );
}
