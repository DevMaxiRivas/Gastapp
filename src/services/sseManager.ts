// ─────────────────────────────────────────────────────────────
//  sseManager.ts
//  Singleton: Maintains a single SSE connection for the entire application
//
//  Responsibilities:
//  - Connect with Authorization header (no cookie) using
//    @microsoft/fetch-event-source
//  - Handle automatic reconnection on errors
//  - Make silent refresh of the access token if it expires (401)
//  - Distribute events by name to registered listeners
//  - Close the connection when there are no active listeners
// ─────────────────────────────────────────────────────────────

import {
  fetchEventSource,
  type EventSourceMessage,
} from "@microsoft/fetch-event-source";
import { tokenStore } from "@/lib/tokenStore";
import { authService } from "./authService";

const BASE_URL = "/api/v1";

// ── Types ─────────────────────────────────────────────────────

export type SSEEventName = string;
export type SSEListener = () => void;

// ── Controlled errors ───────────────────────────────────────

class RetriableError extends Error { }
class FatalError extends Error { }

// ── Manager ───────────────────────────────────────────────────

class SSEManager {
  // Map<eventName, Set<listener>>
  private listeners = new Map<SSEEventName, Set<SSEListener>>();
  private abortController: AbortController | null = null;
  private isConnecting = false;

  // ── Listener management ────────────────────────────────────

  subscribe(eventName: SSEEventName, listener: SSEListener): () => void {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set());
    }
    this.listeners.get(eventName)!.add(listener);

    // Connect if there is no active connection
    this.ensureConnected();

    // Returns cleanup function
    return () => this.unsubscribe(eventName, listener);
  }

  private unsubscribe(eventName: SSEEventName, listener: SSEListener): void {
    const set = this.listeners.get(eventName);
    if (!set) return;

    set.delete(listener);
    if (set.size === 0) this.listeners.delete(eventName);

    // If no listeners remain, close the connection
    if (this.totalListeners() === 0) this.disconnect();
  }

  private totalListeners(): number {
    let count = 0;
    this.listeners.forEach((set) => (count += set.size));
    return count;
  }

  // ── Dispatch events to listeners ────────────────────────

  private emit(eventName: SSEEventName): void {
    const set = this.listeners.get(eventName);
    if (!set) return;
    set.forEach((listener) => listener());
  }

  // ── SSE connection ────────────────────────────────────────────

  private ensureConnected(): void {
    if (this.abortController || this.isConnecting) return;
    this.connect();
  }

  private async connect(): Promise<void> {
    this.isConnecting = true;
    this.abortController = new AbortController();

    try {
      await fetchEventSource(`${BASE_URL}/stream-sse/dashboard/summary`, {
        method: "GET",
        signal: this.abortController.signal,

        // ── Headers: auth by header, not by cookie ──────────
        // The token is evaluated at each (re)connection to use
        // always the freshest value of the tokenStore.
        headers: {
          Authorization: `Bearer ${tokenStore.get() ?? ""}`,
          Accept: "text/event-stream",
        },

        // ── Initial response validation ───────────────
        async onopen(response) {
          if (response.ok) return; // 200 → connection established

          if (response.status === 401) {
            // Token expired just when connecting; try to refresh
            const refreshed = await SSEManager.doRefresh();
            if (refreshed) {
              // fetchEventSource will retry with the new token
              // because headers() is re-evaluated in each attempt
              throw new RetriableError("token_refreshed");
            }
            throw new FatalError("unauthorized");
          }

          if (response.status >= 400 && response.status < 500) {
            throw new FatalError(`client_error_${response.status}`);
          }

          throw new RetriableError(`server_error_${response.status}`);
        },

        // ── Message reception ────────────────────────────
        onmessage(msg: EventSourceMessage) {
          // The backend only sends the event name.
          // Expected SSE format:
          //   event: transaction-created\n\n
          // or using the "data" field:
          //   data: transaction-created\n\n
          const eventName = msg.event || msg.data;
          if (eventName) sseManager.emit(eventName.trim());
        },

        // ── Error handling and reconnection ───────────────────
        onerror(err) {
          if (err instanceof FatalError) {
            // Non-recoverable error → do not retry
            throw err;
          }
          // RetriableError or other → fetchEventSource retries
          // automatically with exponential backoff
          console.warn("[SSE] Reconnecting…", err);
        },

        // Automatic reconnection with backoff (ms)
        openWhenHidden: true, // keep active even if the tab is hidden
      });
    } catch (err) {
      if (err instanceof FatalError) {
        console.error("[SSE] Fatal error, connection closed:", err.message);
      }
    } finally {
      this.isConnecting = false;
    }
  }

  disconnect(): void {
    this.abortController?.abort();
    this.abortController = null;
    this.isConnecting = false;
  }

  // ── Static silent refresh (instance-independent) ───────

  private static async doRefresh(): Promise<boolean> {
    try {
      await authService.silentRefresh()
      return true;
    } catch {
      return false;
    }
  }
}

// ── Export unique instance ──────────────────────────────────

export const sseManager = new SSEManager();
