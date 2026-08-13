import Config from "@/config/Index";
import customBaseQuery from "@/service/BaseApi";
import { createApi } from "@reduxjs/toolkit/query/react";

export const rewardApi = createApi({
  reducerPath: "rewardApi",
  baseQuery: customBaseQuery,
  tagTypes: ["Balance", "Reward", "Transaction", "Purchase"],
  endpoints: (builder) => ({
    getPointBalance: builder.query<any, string | void>({
      query: (email) => ({
        url: "/points/balance",
        method: "GET",
        params: { email: email || Config.defaultEmail },
      }),
      providesTags: ["Balance"],
    }),
    earnPoints: builder.mutation({
      query: (data) => ({
        url: "/points/earn",
        method: "POST",
        body: {
          userEmail: Config.defaultEmail,
          ...data,
        },
      }),
      invalidatesTags: ["Balance", "Transaction"],
    }),
    getTransactions: builder.query<any, string | void>({
      query: (email) => ({
        url: "/points/transactions",
        method: "GET",
        params: { email: email || Config.defaultEmail },
      }),
      providesTags: ["Transaction"],
    }),
    createReward: builder.mutation({
      query: (data) => ({
        url: "/rewards",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reward"],
    }),
    getRewards: builder.query<any, void>({
      query: () => ({
        url: "/rewards",
        method: "GET",
      }),
      providesTags: ["Reward"],
    }),
    redeemReward: builder.mutation({
      query: (id) => ({
        url: `/rewards/${id}/redeem`,
        method: "POST",
        params: { email: Config.defaultEmail },
      }),
      invalidatesTags: ["Balance", "Transaction", "Purchase"],
    }),
    getPurchases: builder.query<any, string | void>({
      query: (email) => ({
        url: "/rewards/purchases",
        method: "GET",
        params: { email: email || Config.defaultEmail },
      }),
      providesTags: ["Purchase"],
    }),
  }),
});

export const {
  useGetPointBalanceQuery,
  useEarnPointsMutation,
  useGetTransactionsQuery,
  useCreateRewardMutation,
  useGetRewardsQuery,
  useRedeemRewardMutation,
  useGetPurchasesQuery,
} = rewardApi;
