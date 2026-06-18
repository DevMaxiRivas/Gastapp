// ─────────────────────────────────────────────────────────────
//  dashboardQueries.ts  (updated — multiple endpoints)
//
//  Each dashboard section has:
//  - Its own branch in the query key factory
//  - Its own query function
//  - Its own response type
//
//  The key hierarchy allows granular invalidations:
//    dashboardKeys.all          → invalidates the ENTIRE dashboard
//    dashboardKeys.budget()     → only the budget
//    dashboardKeys.summary()    → only the summary/history
// ─────────────────────────────────────────────────────────────

import { authFetch } from "@/lib/apiClient";
import { parseBackendErrorToString } from "@/lib/backend";
import type { DataSummaryBudgetResponse } from "@/types/backend/dashboard/summary/budget/response";
import type { DataSummaryResponse } from "@/types/backend/dashboard/summary/response";
import type { BackendErrorResponse } from "@/types/backend/errors";

// ── Query Key Factory ─────────────────────────────────────────

export const dashboardKeys = {
  all: ["dashboard"] as const,
  budget: () => ["dashboard", "budget"] as const,
  categories: () => ["dashboard", "categories"] as const,
  summary: () => ["dashboard", "summary"] as const,
  dailyBalances: () => ["dashboard", "dailyBalances"] as const,
  // Add new sections here without touching existing ones:
  // metrics: () => ["dashboard", "metrics"] as const,
};

// ── Query functions ───────────────────────────────────────────

export async function fetchBudget(): Promise<DataSummaryBudgetResponse> {
  const ENDPOINT = "/dashboard/summary/budget";
  const res = await authFetch(ENDPOINT, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });
  if (!res.ok) {
    const resError: BackendErrorResponse = await res.json() as BackendErrorResponse
    throw new Error(`Error retrieving the response from the URL ${ENDPOINT}. \n${parseBackendErrorToString(resError)}`);
  }
  return (await res.json()).data as DataSummaryBudgetResponse;
}

export async function fetchSummary(): Promise<DataSummaryResponse> {
  const ENDPOINT = "/dashboard/summary";
  const res = await authFetch(ENDPOINT);
  if (!res.ok) {
    const resError: BackendErrorResponse = await res.json() as BackendErrorResponse
    throw new Error(`Error retrieving the response from the URL ${ENDPOINT}. \n${parseBackendErrorToString(resError)}`);
  }
  return (await res.json()).data as DataSummaryResponse;
}
