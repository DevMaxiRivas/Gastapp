// ─────────────────────────────────────────────────────────────
//  useBudget.ts
//  Data hook for the endpoint /dashboard/summary/budget.
//  Only knows about TanStack Query — knows nothing about SSE.
//  Invalidation comes from DashboardSSEProvider.
// ─────────────────────────────────────────────────────────────

import { useQuery } from "@tanstack/react-query";
import { dashboardKeys, fetchBudget } from "@/services/dashboardService";
import type { DataSummaryBudgetResponse } from "@/types/backend/dashboard/summary/budget/response";

export function useBudget() {
  const query = useQuery<DataSummaryBudgetResponse, Error>({
    queryKey: dashboardKeys.budget(),
    queryFn: fetchBudget,
    gcTime: 1000 * 60 * 30,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  });

  return {
    budget: query.data ?? null,
    isLoading: query.isLoading,
    isRefetching: query.isRefetching,
    error: query.error,
  };
}
