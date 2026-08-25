"use client";
import {
  useGetSubscriptionQuery,
  useGetCreditsQuery,
  useGetFeatureCostsQuery,
} from "@/slices/Subscription";

/**
 * Aggregated, read-only view of the current user's access level: subscription tier, live credit
 * balance, and per-feature costs (all server-authoritative, identity from the JWT session).
 *
 * This is UX only - the backend is the source of truth and re-checks access on every request. There
 * is deliberately no client-side `hasFeature` premium gate: the public feature-cost map does not
 * expose which features are premium-only, so premium enforcement stays entirely server-side and
 * surfaces to the UI as a FEATURE_NOT_AVAILABLE response that the UI reacts to.
 */
export const useUserAccess = () => {
  const { data: subscription, isLoading: subLoading } =
    useGetSubscriptionQuery();
  const { data: credits, isLoading: creditsLoading } = useGetCreditsQuery();
  const { data: costs, isLoading: costsLoading } = useGetFeatureCostsQuery();

  const isPremium = subscription?.plan === "PREMIUM";

  const costOf = (feature: string): number => costs?.[feature] ?? 0;

  // Optimistic while data is still loading so we never flash a disabled/blocked state; the backend
  // enforces the real check on every request regardless.
  const hasCredits = (feature: string): boolean =>
    credits ? credits.currentCredits >= costOf(feature) : true;

  return {
    subscription,
    credits,
    costs,
    isPremium,
    isLoading: subLoading || creditsLoading || costsLoading,
    costOf,
    hasCredits,
  };
};
