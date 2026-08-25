import customBaseQuery from "@/service/BaseApi";
import { createApi } from "@reduxjs/toolkit/query/react";

// --- Types (mirror the backend DTOs) ---
// Every value here is computed server-side; the frontend only ever displays it and never
// mutates a balance. Identity comes from the JWT cookie, so no email/plan/cost is ever sent.

export interface CreditStatus {
  plan: string;
  status: string;
  currentCredits: number;
  maxCredits: number;
  refreshDays: number;
  nextRefresh: string;
  daysUntilRefresh: number;
}

export interface Subscription {
  plan: string;
  status: string;
  currentCredits: number;
  maxCredits: number;
  refreshDays: number;
  nextRefresh: string;
  subscriptionStartDate: string | null;
  subscriptionEndDate: string | null;
  autoRenew: boolean;

  // Info for the "unlock Premium with points" CTA.
  pointBalance: number;
  premiumPricePoints: number;
  premiumDurationDays: number;
  premiumCredits: number;
  premiumRefreshDays: number;
}

export interface CreditTransaction {
  id: string;
  userEmail: string;
  feature: string | null;
  type: "GRANT" | "CONSUME" | "REFUND" | "REFRESH";
  amount: number;
  balanceAfter: number;
  description: string;
  createdAt: string;
}

export type FeatureCosts = Record<string, number>;

export interface PlanFeature {
  text: string;
  included: boolean;
}

// Public view of an admin-configured plan (active plans only). Mirrors SubscriptionPlanDTO; the
// same shape the admin grid uses, exposed read-only to users for the pricing surface.
export interface PublicPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  tier: string;
  creditAllowance: number;
  refreshDays: number;
  features: PlanFeature[];
  active: boolean;
  sortOrder: number;
}
export interface SubscriptionCheckoutRequest {
  planId: string;
  email: string;
  paymentMethod: "ESEWA" | "KHALTI";
}

export interface PaymentInitiationResponse {
  paymentId: string;
  paymentMethod: "ESEWA" | "KHALTI";
  paymentUrl: string;
  transactionUuid: string;
  pidx?: string;
  formData?: Record<string, string>;
}

export const subscriptionApi = createApi({
  reducerPath: "subscriptionApi",
  baseQuery: customBaseQuery,
  tagTypes: ["Credits", "Subscription", "Usage"],
  endpoints: (builder) => ({
    // GET /api/ai/credits - current balance + refresh schedule (identity from JWT session).
    getCredits: builder.query<CreditStatus, void>({
      query: () => ({
        url: "/ai/credits",
        method: "GET",
      }),
      providesTags: ["Credits"],
    }),

    // GET /api/ai/feature-costs - per-feature credit cost map, so the UI never hard-codes costs.
    getFeatureCosts: builder.query<FeatureCosts, void>({
      query: () => ({
        url: "/ai/feature-costs",
        method: "GET",
      }),
    }),

    // GET /api/subscription - plan + subscription window + premium upgrade info.
    getSubscription: builder.query<Subscription, void>({
      query: () => ({
        url: "/subscription",
        method: "GET",
      }),
      providesTags: ["Subscription"],
    }),

    // GET /api/subscription/plans - active admin-configured plans for the pricing surface.
    getPlans: builder.query<PublicPlan[], void>({
      query: () => ({
        url: "/subscription/plans",
        method: "GET",
      }),
      providesTags: ["Subscription"],
    }),

    createSubscriptionCheckout: builder.mutation<
      PaymentInitiationResponse,
      SubscriptionCheckoutRequest
    >({
      query: (body) => ({
        url: "/checkout",
        method: "POST",
        body,
      }),
    }),

    // GET /api/ai/usage - append-only credit ledger for the current user.
    getUsage: builder.query<CreditTransaction[], void>({
      query: () => ({
        url: "/ai/usage",
        method: "GET",
      }),
      providesTags: ["Usage"],
    }),

    // POST /api/subscription/upgrade - unlock Premium by spending existing points.
    upgrade: builder.mutation<Subscription, void>({
      query: () => ({
        url: "/subscription/upgrade",
        method: "POST",
      }),
      invalidatesTags: ["Credits", "Subscription", "Usage"],
    }),
  }),
});

export const {
  useGetCreditsQuery,
  useGetFeatureCostsQuery,
  useGetSubscriptionQuery,
  useGetPlansQuery,
  useCreateSubscriptionCheckoutMutation,
  useGetUsageQuery,
  useUpgradeMutation,
} = subscriptionApi;
