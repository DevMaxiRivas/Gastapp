// ─────────────────────────────────────────────────────────────
//  sseEventMap.ts
//  Truth table: which SSE event invalidates which query keys.
//
//  This file is the central piece of the pattern with multiple
//  endpoints. Centralizes the reasoning "what changed in the
//  backend?" → "which frontend data became stale?".
//
//  Rule to add a new event:
//  1. The backend adds the SSE event (ej: "category-updated")
//  2. Here we declare which keys it affects
//  3. Ready — no component needs to know about the new event
//
//  An event can invalidate one or more keys.
//  A key can be invalidated by several events.
// ─────────────────────────────────────────────────────────────

import { type QueryKey } from "@tanstack/react-query";
import { dashboardKeys } from "@/services/dashboardService";

// ── Map type ─────────────────────────────────────────────────────

type SSEEventMap = Record<string, QueryKey[]>;

// ── Declarative map ──────────────────────────────────────────

export const sseEventMap: SSEEventMap = {
  // Affects the budget (income and expenses)
  "transaction-created": [dashboardKeys.transactions()],
  "transaction-updated": [dashboardKeys.transactions()],
  "transaction-deleted": [dashboardKeys.transactions()],

  // Affects the entire dashboard
  "profile-updated": [dashboardKeys.budget()],

  // Only affects the history/summary, not the added budget
  "balance-recalculated": [dashboardKeys.summary()],

  // Only affects the budget
  "budget-limit-updated": [dashboardKeys.budget()],

  // Invalidates the entire dashboard
  "account-reset": [dashboardKeys.all],
};
