// ─────────────────────────────────────────────────────────────
//  useSSEEvent.ts
//  Hook that subscribes a component to an SSE event by name.
//
//  - Registers the listener on mount, cleans it up on unmount.
//  - The callback is stabilized with useCallback to avoid
//    unnecessary re-subscriptions due to re-renders.
//  - The component knows nothing about the underlying SSE connection.
//
//  Usage:
//    useSSEEvent("transaction-created", () => {
//      queryClient.invalidateQueries({ queryKey: ["stats"] });
//    });
// ─────────────────────────────────────────────────────────────

import { useEffect, useRef } from "react";
import { sseManager, type SSEEventName } from "@/services/sseManager";

export function useSSEEvent(
  eventName: SSEEventName,
  callback: () => void
): void {
  // Store the callback in a ref to avoid re-subscribing
  // when the component re-renders with a new function
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const unsubscribe = sseManager.subscribe(eventName, () => {
      callbackRef.current();
    });

    return unsubscribe;
  }, [eventName]); // Only re-subscribe if the event name changes
}
