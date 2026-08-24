"use client";
import {
  useGetSubscriptionQuery,
  useGetUsageQuery,
  useUpgradeMutation,
} from "@/slices/Subscription";

/**
 * Subscription state + the points-unlock upgrade action for the current user. Identity always comes
 * from the JWT session (no email is sent from the client), and all values are server-computed.
 */
export const useSubscription = () => {
  const { data: subscription, isLoading } = useGetSubscriptionQuery();
  const { data: usage = [] } = useGetUsageQuery();
  const [upgrade, { isLoading: isUpgrading }] = useUpgradeMutation();

  return { subscription, usage, isLoading, upgrade, isUpgrading };
};
