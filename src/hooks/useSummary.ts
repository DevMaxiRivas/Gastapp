// ─────────────────────────────────────────────────────────────
//  useSummary.ts
//  Data hook for the endpoint /dashboard/summary.
//  Also uses TanStack Query only — no SSE knowledge.
// ─────────────────────────────────────────────────────────────

import { useQuery } from "@tanstack/react-query";
import { dashboardKeys, fetchSummary } from "@/services/dashboardService";
import type { DataSummaryResponse } from "@/types/backend/dashboard/summary/response";

export function useSummary() {
  const query = useQuery<DataSummaryResponse, Error>({
    queryKey: dashboardKeys.summary(),
    queryFn: fetchSummary,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return {
    summary: query.data ?? null,
    isLoading: query.isLoading,
    isRefetching: query.isRefetching,
    error: query.error,
  };
}
