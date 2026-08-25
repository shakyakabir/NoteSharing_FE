import customBaseQuery from "@/service/BaseApi";
import { createApi } from "@reduxjs/toolkit/query/react";

// --- Types (mirror the backend admin DTOs) ---
// Every value is computed server-side; identity comes from the JWT cookie (no email/param is ever
// sent), and /api/admin/** is gated to ROLE_ADMIN by Spring Security - a non-admin gets 401/403.

export interface AdminDashboard {
  totalUsers: number;
  aiCreditsUsed: number;
  totalRevenue: number;
}

export interface FeatureUsage {
  feature: string;
  name: string;
  count: number;
  percent: number;
}

export interface RevenuePoint {
  month: string;
  mrr: number;
  churn: number;
  subscription: number;
  ads: number;
}

export interface AdminAnalytics {
  mrr: number;
  churnRate: number;
  aiCreditsConsumed: number;
  avgProcessingTime: number;
  revenueBreakdown: RevenuePoint[];
  featureUsage: FeatureUsage[];
}

export interface AdminMe {
  email: string;
  name: string;
  role: string;
}

export interface UserAdmin {
  id: string;
  name: string;
  email: string;
  accountType: string;
  aiCredits: number;
  joinedDate: string;
  status: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface AdminSubscriptionPlan {
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

export interface PlanRequest {
  name?: string;
  price?: number;
  period?: string;
  tier?: string;
  creditAllowance?: number;
  refreshDays?: number;
  features?: PlanFeature[];
  active?: boolean;
  sortOrder?: number;
}

export interface AdminFeatureConfig {
  id: string;
  feature: string;
  name: string;
  description: string;
  status: string;
  cost: number;
  premiumOnly: boolean;
}

export interface FeatureCostItem {
  feature: string;
  cost?: number;
  premiumOnly?: boolean;
  status?: string;
}

// Admin reward endpoints return the RewardItem entity directly (like the self-service RewardController).
export interface AdminReward {
  id: string;
  title: string;
  description: string | null;
  cost: number;
  rewardType: string;
  aiCost: number;
  maxUses: number;
  status: string;
  active: boolean;
  createdAt: string;
}

export interface AdminRewardRequest {
  title: string;
  description?: string;
  cost: number;
  rewardType: string;
  aiCost: number;
  maxUses: number;
  status: string;
}

export interface UsersQueryArgs {
  search?: string;
  accountType?: string;
  status?: string;
  page?: number;
  size?: number;
}

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: customBaseQuery,
  tagTypes: [
    "AdminUsers",
    "AdminPlans",
    "AdminFeatureCosts",
    "AdminRewards",
  ],
  endpoints: (builder) => ({
    // GET /api/admin/me - admin identity; 200 for admins, 401/403 otherwise (doubles as the gate).
    getAdminMe: builder.query<AdminMe, void>({
      query: () => ({ url: "/admin/me", method: "GET" }),
    }),

    // GET /api/admin/dashboard - the three stat cards.
    getDashboard: builder.query<AdminDashboard, void>({
      query: () => ({ url: "/admin/dashboard", method: "GET" }),
    }),

    // GET /api/admin/analytics - real churn + per-feature usage; money metrics are 0 (no payments).
    getAnalytics: builder.query<AdminAnalytics, string | void>({
      query: (range) => ({
        url: "/admin/analytics",
        method: "GET",
        params: range ? { range } : undefined,
      }),
    }),

    // GET /api/admin/users - paginated, server-side search/filter.
    getUsers: builder.query<PageResponse<UserAdmin>, UsersQueryArgs | void>({
      query: (args) => {
        const a = args || {};
        const params: Record<string, string | number> = {};
        if (a.search) params.search = a.search;
        if (a.accountType) params.accountType = a.accountType;
        if (a.status) params.status = a.status;
        if (a.page !== undefined) params.page = a.page;
        if (a.size !== undefined) params.size = a.size;
        return { url: "/admin/users", method: "GET", params };
      },
      providesTags: ["AdminUsers"],
    }),

    // PUT /api/admin/users/{id}/status - Active | Suspended.
    setUserStatus: builder.mutation<UserAdmin, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/admin/users/${id}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["AdminUsers"],
    }),

    // POST /api/admin/users/{id}/credits - adjust balance (never negative, logged).
    adjustUserCredits: builder.mutation<
      UserAdmin,
      { id: string; amount: number; reason?: string }
    >({
      query: ({ id, amount, reason }) => ({
        url: `/admin/users/${id}/credits`,
        method: "POST",
        body: { amount, reason },
      }),
      invalidatesTags: ["AdminUsers"],
    }),

    // PUT /api/admin/users/{id}/plan - move the user onto a plan (resets balance to its allowance).
    changeUserPlan: builder.mutation<
      UserAdmin,
      { id: string; planConfigId: string }
    >({
      query: ({ id, planConfigId }) => ({
        url: `/admin/users/${id}/plan`,
        method: "PUT",
        body: { planConfigId },
      }),
      invalidatesTags: ["AdminUsers"],
    }),

    // GET /api/admin/plans - active plans in display order.
    getPlans: builder.query<AdminSubscriptionPlan[], void>({
      query: () => ({ url: "/admin/plans", method: "GET" }),
      providesTags: ["AdminPlans"],
    }),

    createPlan: builder.mutation<AdminSubscriptionPlan, PlanRequest>({
      query: (body) => ({ url: "/admin/plans", method: "POST", body }),
      invalidatesTags: ["AdminPlans"],
    }),

    updatePlan: builder.mutation<
      AdminSubscriptionPlan,
      { id: string; body: PlanRequest }
    >({
      query: ({ id, body }) => ({
        url: `/admin/plans/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["AdminPlans"],
    }),

    deletePlan: builder.mutation<void, string>({
      query: (id) => ({ url: `/admin/plans/${id}`, method: "DELETE" }),
      invalidatesTags: ["AdminPlans"],
    }),

    // GET /api/admin/ai-credit-costs - per-feature configs (cost, premium gating, status).
    getFeatureCosts: builder.query<AdminFeatureConfig[], void>({
      query: () => ({ url: "/admin/ai-credit-costs", method: "GET" }),
      providesTags: ["AdminFeatureCosts"],
    }),

    // PUT /api/admin/ai-credit-costs - bulk "Save Changes".
    updateFeatureCosts: builder.mutation<AdminFeatureConfig[], FeatureCostItem[]>({
      query: (body) => ({
        url: "/admin/ai-credit-costs",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["AdminFeatureCosts"],
    }),

    // GET /api/admin/rewards - every reward regardless of status.
    getAdminRewards: builder.query<AdminReward[], void>({
      query: () => ({ url: "/admin/rewards", method: "GET" }),
      providesTags: ["AdminRewards"],
    }),

    createReward: builder.mutation<AdminReward, AdminRewardRequest>({
      query: (body) => ({ url: "/admin/rewards", method: "POST", body }),
      invalidatesTags: ["AdminRewards"],
    }),

    updateReward: builder.mutation<
      AdminReward,
      { id: string; body: AdminRewardRequest }
    >({
      query: ({ id, body }) => ({
        url: `/admin/rewards/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["AdminRewards"],
    }),

    deleteReward: builder.mutation<void, string>({
      query: (id) => ({ url: `/admin/rewards/${id}`, method: "DELETE" }),
      invalidatesTags: ["AdminRewards"],
    }),
  }),
});

export const {
  useGetAdminMeQuery,
  useGetDashboardQuery,
  useGetAnalyticsQuery,
  useGetUsersQuery,
  useSetUserStatusMutation,
  useAdjustUserCreditsMutation,
  useChangeUserPlanMutation,
  useGetPlansQuery,
  useCreatePlanMutation,
  useUpdatePlanMutation,
  useDeletePlanMutation,
  useGetFeatureCostsQuery,
  useUpdateFeatureCostsMutation,
  useGetAdminRewardsQuery,
  useCreateRewardMutation,
  useUpdateRewardMutation,
  useDeleteRewardMutation,
} = adminApi;
