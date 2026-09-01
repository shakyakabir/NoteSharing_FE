"use client";

import React, { useState } from "react";
import { Check, X, Loader2, CreditCard, X as CloseIcon } from "lucide-react";

import {
  useGetPlansQuery,
  useCreateSubscriptionCheckoutMutation,
} from "@/slices/Subscription";

import { useUserAccess } from "@/hooks/access/useUserAccess";

interface Plan {
  id: string;
  name: string;
  tier: string;
  price: number;
  period: string;
  creditAllowance: number;
  refreshDays: number;
  features: {
    text: string;
    included: boolean;
  }[];
}

type PaymentMethod = "ESEWA" | "KHALTI";

interface PaymentInitiationResponse {
  paymentId: string;
  paymentMethod: PaymentMethod;
  paymentUrl: string;
  transactionUuid: string;
  pidx?: string;
  formData?: Record<string, string>;
}

export default function AvailablePlans() {
  const { data: plans, isLoading } = useGetPlansQuery();

  const { subscription } = useUserAccess();

  const [createCheckout, { isLoading: isCheckoutLoading }] =
    useCreateSubscriptionCheckoutMutation();

  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);

  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  /*
   * Get the logged-in user's email.
   *
   * Change this if your application stores the email
   * somewhere else.
   */
  const email =
    typeof window !== "undefined" ? localStorage.getItem("email") : null;

  // =========================================================
  // OPEN PAYMENT METHOD MODAL
  // =========================================================

  const handlePurchasePlan = (plan: Plan) => {
    setSelectedPlan(plan);
  };

  // =========================================================
  // START CHECKOUT
  // =========================================================

  const handlePayment = async (paymentMethod: PaymentMethod) => {
    if (!selectedPlan) {
      return;
    }

    if (!email) {
      alert("User email not found. Please login again.");
      return;
    }

    try {
      setLoadingPlanId(selectedPlan.id);

      const response = await createCheckout({
        planId: selectedPlan.id,
        email: email,
        paymentMethod: paymentMethod,
      }).unwrap();

      console.log("Payment checkout response:", response);

      /*
       * Close modal
       */
      setSelectedPlan(null);

      /*
       * =====================================================
       * ESEWA
       * =====================================================
       *
       * eSewa requires POST form submission.
       */

      if (response.paymentMethod === "ESEWA") {
        submitEsewaForm(response);

        return;
      }

      /*
       * =====================================================
       * KHALTI
       * =====================================================
       *
       * Khalti gives us a payment URL.
       */

      if (response.paymentMethod === "KHALTI") {
        if (!response.paymentUrl) {
          throw new Error("Khalti payment URL was not returned");
        }

        window.location.href = response.paymentUrl;

        return;
      }
    } catch (error) {
      console.error("Failed to initiate payment:", error);

      alert("Unable to start payment. Please try again.");
    } finally {
      setLoadingPlanId(null);
    }
  };

  // =========================================================
  // ESEWA FORM SUBMISSION
  // =========================================================

  const submitEsewaForm = (response: PaymentInitiationResponse) => {
    if (!response.paymentUrl) {
      throw new Error("eSewa payment URL was not returned");
    }

    if (!response.formData || Object.keys(response.formData).length === 0) {
      throw new Error("eSewa payment form data was not returned");
    }

    /*
     * Create a hidden HTML form
     */

    const form = document.createElement("form");

    form.method = "POST";

    form.action = response.paymentUrl;

    form.style.display = "none";

    /*
     * Add all eSewa fields
     */

    Object.entries(response.formData).forEach(([key, value]) => {
      const input = document.createElement("input");

      input.type = "hidden";

      input.name = key;

      input.value = value;

      form.appendChild(input);
    });

    /*
     * Add form to document
     */

    document.body.appendChild(form);

    /*
     * Submit to eSewa
     */

    form.submit();
  };

  let currentMarked = false;

  return (
    <div className="space-y-4">
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="flex justify-between items-center">
        <h2 className="text-base font-extrabold text-slate-800 tracking-tight">
          Available Plans
        </h2>
      </div>

      {/* ================================================= */}
      {/* LOADING */}
      {/* ================================================= */}

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
        /* ================================================= */
        /* PLANS */
        /* ================================================= */

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {plans.map((plan: Plan) => {
            const isCurrent =
              !currentMarked && subscription?.plan === plan.tier;

            if (isCurrent) {
              currentMarked = true;
            }

            const isProcessing = loadingPlanId === plan.id;

            return (
              <div
                key={plan.id}
                className={`
                    relative
                    bg-white
                    rounded-2xl
                    p-6
                    border
                    shadow-xs
                    flex
                    flex-col
                    justify-between
                    transition-all
                    duration-200
                    ${
                      isCurrent
                        ? "border-indigo-500 ring-2 ring-indigo-500/10 shadow-md"
                        : "border-slate-100 hover:border-slate-200 hover:shadow-sm"
                    }
                  `}
              >
                {/* ======================================= */}
                {/* CURRENT PLAN */}
                {/* ======================================= */}

                {isCurrent && (
                  <span
                    className="
                        absolute
                        -top-3
                        left-6
                        text-[9px]
                        font-extrabold
                        tracking-widest
                        uppercase
                        px-3
                        py-1
                        rounded-full
                        bg-indigo-600
                        text-white
                        shadow-xs
                      "
                  >
                    Current Plan
                  </span>
                )}

                {/* ======================================= */}
                {/* PLAN CONTENT */}
                {/* ======================================= */}

                <div className="space-y-4">
                  {/* TITLE */}

                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-slate-800">
                      {plan.name}
                    </h3>

                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900">
                        Rs.{plan.price}
                      </span>

                      <span className="text-xs text-slate-400 font-medium">
                        /{plan.period}
                      </span>
                    </div>
                  </div>

                  {/* AI CREDITS */}

                  <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                      AI Credits
                    </p>

                    <p className="text-sm font-bold text-slate-700 mt-0.5">
                      {plan.creditAllowance} every {plan.refreshDays} days
                    </p>
                  </div>

                  {/* FEATURES */}

                  <ul className="space-y-2.5 text-xs">
                    {plan.features?.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        {feature.included ? (
                          <Check
                            size={14}
                            className="
                                  text-emerald-500
                                  shrink-0
                                  mt-0.5
                                "
                          />
                        ) : (
                          <X
                            size={14}
                            className="
                                  text-slate-300
                                  shrink-0
                                  mt-0.5
                                "
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

                {/* ======================================= */}
                {/* BUTTON */}
                {/* ======================================= */}

                <div className="mt-6 pt-4 border-t border-slate-100">
                  {isCurrent ? (
                    <button
                      disabled
                      className="
                          w-full
                          py-2.5
                          px-4
                          rounded-xl
                          text-xs
                          font-bold
                          text-indigo-700
                          bg-indigo-50/80
                          border
                          border-indigo-100
                          cursor-default
                          text-center
                        "
                    >
                      Active Plan
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePurchasePlan(plan)}
                      disabled={Boolean(loadingPlanId)}
                      className="
                          w-full
                          py-2.5
                          px-4
                          rounded-xl
                          text-xs
                          font-bold
                          text-white
                          bg-indigo-600
                          hover:bg-indigo-700
                          active:bg-indigo-800
                          shadow-xs
                          transition-colors
                          flex
                          items-center
                          justify-center
                          gap-2
                          disabled:opacity-60
                          disabled:cursor-not-allowed
                        "
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

      {/* ================================================= */}
      {/* PAYMENT METHOD MODAL */}
      {/* ================================================= */}

      {selectedPlan && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/40
            backdrop-blur-sm
            p-4
          "
        >
          <div
            className="
              w-full
              max-w-md
              bg-white
              rounded-2xl
              shadow-xl
              p-6
            "
          >
            {/* =========================================== */}
            {/* MODAL HEADER */}
            {/* =========================================== */}

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Choose Payment Method
                </h3>

                <p className="text-xs text-slate-500 mt-1">
                  Purchase {selectedPlan.name}
                </p>
              </div>

              <button
                onClick={() => setSelectedPlan(null)}
                disabled={isCheckoutLoading}
                className="
                  p-2
                  rounded-lg
                  hover:bg-slate-100
                  text-slate-500
                "
              >
                <CloseIcon size={18} />
              </button>
            </div>

            {/* =========================================== */}
            {/* PRICE */}
            {/* =========================================== */}

            <div
              className="
                mt-5
                p-4
                rounded-xl
                bg-slate-50
                border
                border-slate-100
              "
            >
              <div className="flex justify-between">
                <span className="text-xs text-slate-500">Plan</span>

                <span className="text-sm font-bold text-slate-800">
                  {selectedPlan.name}
                </span>
              </div>

              <div className="flex justify-between mt-2">
                <span className="text-xs text-slate-500">Amount</span>

                <span className="text-lg font-black text-slate-900">
                  ${selectedPlan.price}
                </span>
              </div>
            </div>

            {/* =========================================== */}
            {/* PAYMENT OPTIONS */}
            {/* =========================================== */}

            <div className="mt-5 space-y-3">
              {/* ESEWA */}

              <button
                disabled={isCheckoutLoading}
                onClick={() => handlePayment("ESEWA")}
                className="
                  w-full
                  p-4
                  rounded-xl
                  border
                  border-slate-200
                  hover:border-green-500
                  hover:bg-green-50
                  transition
                  flex
                  items-center
                  justify-between
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      w-10
                      h-10
                      rounded-lg
                      bg-green-100
                      flex
                      items-center
                      justify-center
                      font-black
                      text-green-700
                    "
                  >
                    e
                  </div>

                  <div className="text-left">
                    <p className="text-sm font-bold text-slate-800">eSewa</p>

                    <p className="text-[11px] text-slate-500">
                      Pay securely with eSewa
                    </p>
                  </div>
                </div>

                {isCheckoutLoading ? (
                  <Loader2 size={18} className="animate-spin text-indigo-600" />
                ) : (
                  <span className="text-xs font-bold text-indigo-600">Pay</span>
                )}
              </button>

              {/* KHALTI */}

              {/* <button
                disabled={isCheckoutLoading}
                onClick={() => handlePayment("KHALTI")}
                className="
                  w-full
                  p-4 
                  rounded-xl
                  border
                  border-slate-200
                  hover:border-purple-500
                  hover:bg-purple-50
                  transition
                  flex
                  items-center
                  justify-between
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      w-10
                      h-10
                      rounded-lg
                      bg-purple-100
                      flex
                      items-center
                      justify-center
                      font-black
                      text-purple-700
                    "
                  >
                    K
                  </div>

                  <div className="text-left">
                    <p className="text-sm font-bold text-slate-800">Khalti</p>

                    <p className="text-[11px] text-slate-500">
                      Pay securely with Khalti
                    </p>
                  </div>
                </div>

                {isCheckoutLoading ? (
                  <Loader2 size={18} className="animate-spin text-indigo-600" />
                ) : (
                  <span className="text-xs font-bold text-indigo-600">Pay</span>
                )}
              </button> */}
            </div>

            {/* =========================================== */}
            {/* CANCEL */}
            {/* =========================================== */}

            <button
              onClick={() => setSelectedPlan(null)}
              disabled={isCheckoutLoading}
              className="
                w-full
                mt-5
                py-2.5
                rounded-xl
                bg-slate-100
                hover:bg-slate-200
                text-xs
                font-bold
                text-slate-600
              "
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
