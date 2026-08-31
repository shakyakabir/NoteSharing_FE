"use client";
import {
  useGetSubscriptionQuery,
  useGetCreditsQuery,
  useGetFeatureCostsQuery,
  useGetFeatureAccessQuery,
} from "@/slices/Subscription";

/**
 * Aggregated, read-only view of the current user's access level: subscription tier, live credit
 * balance, per-feature costs, and per-feature premium-only flags (all server-authoritative,
 * identity from the JWT session).
 *
 * This is UX only - the backend is the source of truth and re-checks access on every request.
 * `isPremiumFeature` comes from the public /api/ai/feature-access map (admin-configurable), so the
 * UI can proactively lock premium-only tools; the backend still enforces the same gate and surfaces
 * a FEATURE_NOT_AVAILABLE response the UI also reacts to.
 */
export const useUserAccess = () => {
  const { data: subscription, isLoading: subLoading } =
    useGetSubscriptionQuery();
  const { data: credits, isLoading: creditsLoading } = useGetCreditsQuery();
  const { data: costs, isLoading: costsLoading } = useGetFeatureCostsQuery();
  const { data: featureAccess, isLoading: accessLoading } =
    useGetFeatureAccessQuery();

  const isPremium = subscription?.plan === "PREMIUM";

  const costOf = (feature: string): number => costs?.[feature] ?? 0;

  // Optimistic while data is still loading so we never flash a disabled/blocked state; the backend
  // enforces the real check on every request regardless.
  const hasCredits = (feature: string): boolean =>
    credits ? credits.currentCredits >= costOf(feature) : true;

  // A feature is premium-only only when the server explicitly says so; unknown/loading falls back to
  // false so we never wrongly lock a free feature.
  const isPremiumFeature = (feature: string): boolean =>
    featureAccess?.[feature] === true;

  // Combined gate: premium-only features need the PREMIUM plan, and the balance must cover the cost.
  const canUseFeature = (feature: string): boolean =>
    (!isPremiumFeature(feature) || isPremium) && hasCredits(feature);

  return {
    subscription,
    credits,
    costs,
    featureAccess,
    isPremium,
    isLoading: subLoading || creditsLoading || costsLoading || accessLoading,
    costOf,
    hasCredits,
    isPremiumFeature,
    canUseFeature,
  };
};
