import customBaseQuery from "@/service/BaseApi";
import { createApi } from "@reduxjs/toolkit/query/react";

// User-facing ads. The server returns [] for premium users (ad-free), so the UI simply renders
// nothing when the list is empty. Impression/click tracking feeds the admin CPM+CPC revenue.
export interface ActiveAd {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  targetUrl: string | null;
  placement: string;
}

export const adsApi = createApi({
  reducerPath: "adsApi",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    // GET /api/ads/active - active ads for the signed-in user (empty for premium).
    getActiveAds: builder.query<ActiveAd[], void>({
      query: () => ({ url: "/ads/active", method: "GET" }),
    }),

    // POST /api/ads/{id}/impression - one ad shown.
    recordAdImpression: builder.mutation<void, string>({
      query: (id) => ({ url: `/ads/${id}/impression`, method: "POST" }),
    }),

    // POST /api/ads/{id}/click - one ad clicked.
    recordAdClick: builder.mutation<void, string>({
      query: (id) => ({ url: `/ads/${id}/click`, method: "POST" }),
    }),
  }),
});

export const {
  useGetActiveAdsQuery,
  useRecordAdImpressionMutation,
  useRecordAdClickMutation,
} = adsApi;
