"use client";
import React, { useState } from "react";
import { Check, X, Loader2, CreditCard } from "lucide-react";
import { useGetPlansQuery } from "@/slices/Subscription";
import { useUserAccess } from "@/hooks/access/useUserAccess";

interface Plan {
  id: string;
  name: string;
  tier: string;
  price: number;
  period: string;
  creditAllowance: number;
  refreshDays: number;
  features: { text: string; included: boolean }[];
}

export default function AvailablePlans() {
  const { data: plans, isLoading } = useGetPlansQuery();
  const { subscription } = useUserAccess();

  // Track purchasing state per plan ID
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);

  const handlePurchasePlan = async (plan: Plan) => {
    try {
      setLoadingPlanId(plan.id);

      // TODO: Replace this with your API mutation or payment gateway integration
      // e.g., const res = await createCheckoutSession({ planId: plan.id }).unwrap();
      // window.location.href = res.checkoutUrl;

      console.log(`Initiating checkout for plan: ${plan.name} (${plan.id})`);

      // Simulating API delay for preview purposes
      await new Promise((resolve) => setTimeout(resolve, 1200));
      alert(`Redirecting to checkout for ${plan.name}...`);
    } catch (error) {
      console.error("Failed to initiate plan purchase:", error);
    } finally {
      setLoadingPlanId(null);
    }
  };

  let currentMarked = false;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-extrabold text-slate-800 tracking-tight">
          Available Plans
        </h2>
      </div>

      {isLoading ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-xs text-center text-slate-400 text-xs flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
          <span>Loading available plans...</span>
        </div>
      ) : !plans || plans.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-xs text-center text-slate-400 text-xs">
          No plans are available right now.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {plans.map((plan: Plan) => {
            const isCurrent =
              !currentMarked && subscription?.plan === plan.tier;
            if (isCurrent) currentMarked = true;

            const isProcessing = loadingPlanId === plan.id;

            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl p-6 border shadow-xs flex flex-col justify-between transition-all duration-200 ${
                  isCurrent
                    ? "border-indigo-500 ring-2 ring-indigo-500/10 shadow-md"
                    : "border-slate-100 hover:border-slate-200 hover:shadow-sm"
                }`}
              >
                {isCurrent && (
                  <span className="absolute -top-3 left-6 text-[9px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-full bg-indigo-600 text-white shadow-xs">
                    Current Plan
                  </span>
                )}

                <div className="space-y-4">
                  {/* Title & Pricing */}
                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-slate-800">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900">
                        ${plan.price}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        /{plan.period}
                      </span>
                    </div>
                  </div>

                  {/* AI Credits Overview */}
                  <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                      AI Credits
                    </p>
                    <p className="text-sm font-bold text-slate-700 mt-0.5">
                      {plan.creditAllowance} every {plan.refreshDays} days
                    </p>
                  </div>

                  {/* Feature Matrix List */}
                  <ul className="space-y-2.5 text-xs">
                    {plan.features?.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        {feature.included ? (
                          <Check
                            size={14}
                            className="text-emerald-500 shrink-0 mt-0.5"
                          />
                        ) : (
                          <X
                            size={14}
                            className="text-slate-300 shrink-0 mt-0.5"
                          />
                        )}
                        <span
                          className={
                            feature.included
                              ? "text-slate-600 font-medium"
                              : "text-slate-400 line-through"
                          }
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Purchase / Status Action Button */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  {isCurrent ? (
                    <button
                      disabled
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50/80 border border-indigo-100 cursor-default text-center"
                    >
                      Active Plan
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePurchasePlan(plan)}
                      disabled={Boolean(loadingPlanId)}
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <CreditCard size={14} />
                          <span>Upgrade to {plan.name}</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
