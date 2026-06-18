// ─────────────────────────────────────────────────────────────
//  DashboardSSEProvider.tsx
//  Component that registers all SSE listeners for the dashboard.
//  It is placed as a wrapper of the dashboard layout, not in each
//  individual component.
//
//  By separating it into its own component:
//  - The statistics components (BudgetCard, SummaryCard)
//    are pure data presentation components
//  - The SSE logic is in a single place
//  - If you navigate outside the dashboard, all listeners
//    are automatically cleaned up on unmount
// ─────────────────────────────────────────────────────────────

import { useCallback, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSSEEvent } from "@/hooks/useSSEEvent";
import { sseEventMap } from "@/lib/sseEventMap";

// Component that registers ONE SSE listener
function SSEListener({ eventName }: { eventName: string }) {
  const queryClient = useQueryClient();
  const handler = useCallback(() => {
    const keys = sseEventMap[eventName];
    if (!keys) return;
    keys.forEach((queryKey) => {
      queryClient.invalidateQueries({ queryKey });
    });
  }, [eventName, queryClient]);

  useSSEEvent(eventName, handler);
  return null;
}

// Main provider: renders one SSEListener per event
export function DashboardSSEProvider({ children }: { children: ReactNode }) {
  const eventNames = Object.keys(sseEventMap);

  return (
    <>
      {eventNames.map((name) => (
        <SSEListener key={name} eventName={name} />
      ))}
      {children}
    </>
  );
}
