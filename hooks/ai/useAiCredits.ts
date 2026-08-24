"use client";
import {
  useGetCreditsQuery,
  useGetFeatureCostsQuery,
} from "@/slices/Subscription";

/**
 * Read-only view of the current user's AI credits + per-feature costs (both server-authoritative).
 * The UI only displays these values - the balance is never changed from the client.
 */
export const useAiCredits = () => {
  const creditsQuery = useGetCreditsQuery();
  const costsQuery = useGetFeatureCostsQuery();

  const credits = creditsQuery.data;
  const costs = costsQuery.data;

  const costOf = (feature: string): number => costs?.[feature] ?? 0;

  // Default to "affordable" while data is still loading so we don't flash a disabled button;
  // the backend enforces the real check on every request regardless.
  const canAfford = (feature: string): boolean =>
    credits ? credits.currentCredits >= costOf(feature) : true;

  return {
    credits,
    costs,
    isLoading: creditsQuery.isLoading || costsQuery.isLoading,
    // Refetch the shared credits cache entry (updates the header badge, dashboard tile, etc.).
    refetch: () => {
      creditsQuery.refetch();
    },
    costOf,
    canAfford,
  };
};

/**
 * Detect the backend's structured "not enough credits" error (HTTP 402, wrapped in ApiResponse.data)
 * so callers can show the right toast + upgrade CTA. Returns the required/available numbers, or null
 * for any other error shape.
 */
export const getInsufficientCredits = (
  error: any,
): { requiredCredits: number; availableCredits: number } | null => {
  const data = error?.data?.data;
  if (data && data.code === "INSUFFICIENT_AI_CREDITS") {
    return {
      requiredCredits: data.requiredCredits,
      availableCredits: data.availableCredits,
    };
  }
  return null;
};
