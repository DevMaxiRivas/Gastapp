// ─────────────────────────────────────────────────────────────
//  sseManager.ts
//
//  - Exponencial backoff with jitter between retries
//  - Retry limit configurable (MAX_RETRIES)
//  - Automatic reconnection when network connectivity is restored
//  - Clean disconnection when connectivity is lost
//  - Retry counter reset on successful connection
// ─────────────────────────────────────────────────────────────

import {
  fetchEventSource,
  type EventSourceMessage,
} from "@microsoft/fetch-event-source";
import { tokenStore } from "@/lib/tokenStore";
import { authService } from "./authService";

const BASE_URL = "/api/v1";

export type SSEEventName = string;
export type SSEListener = () => void;

class RetriableError extends Error { }
class FatalError extends Error { }

class SSEManager {
  private listeners = new Map<SSEEventName, Set<SSEListener>>();
  private abortController: AbortController | null = null;
  private isConnecting = false;

  // ── Retry configuration ───────────────────────────
  private retryCount = 0;
  private readonly MAX_RETRIES = 10;
  private readonly BASE_DELAY_MS = 1000;   // 1s 
  private readonly MAX_DELAY_MS = 30_000; // 30s 

  constructor() {
    // Reconnect when the browser regains connectivity
    window.addEventListener("online", () => {
      if (this.totalListeners() > 0 && !this.abortController) {
        console.info("[SSE] Red restaurada — reconectando…");
        this.retryCount = 0;
        this.connect();
      }
    });

    // Disconnect cleanly when the network is lost so that
    // fetchEventSource doesn't wait indefinitely
    window.addEventListener("offline", () => {
      console.warn("[SSE] Network lost — closing connection");
      this.disconnect();
    });
  }

  // ── Exponential backoff with jitter ────────────────────────
  // Jitter (random value) avoids all clients
  // reconnecting at the same time when the server returns,
  // distributing the load (thundering herd problem).
  private getBackoffDelay(): number {
    const exponential = Math.min(
      this.BASE_DELAY_MS * Math.pow(2, this.retryCount),
      this.MAX_DELAY_MS
    );
    const jitter = Math.random() * 1000;
    return Math.round(exponential + jitter);
  }

  // ── Managing listeners ──────────────────────────────────

  subscribe(eventName: SSEEventName, listener: SSEListener): () => void {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set());
    }
    this.listeners.get(eventName)!.add(listener);
    this.ensureConnected();
    return () => this.unsubscribe(eventName, listener);
  }

  private unsubscribe(eventName: SSEEventName, listener: SSEListener): void {
    const set = this.listeners.get(eventName);
    if (!set) return;
    set.delete(listener);
    if (set.size === 0) this.listeners.delete(eventName);
    if (this.totalListeners() === 0) this.disconnect();
  }

  private totalListeners(): number {
    let count = 0;
    this.listeners.forEach((set) => (count += set.size));
    return count;
  }

  private emit(eventName: SSEEventName): void {
    this.listeners.get(eventName)?.forEach((listener) => listener());
  }

  // ── Connection ──────────────────────────────────────────────

  private ensureConnected(): void {
    if (this.abortController || this.isConnecting) return;
    this.connect();
  }

  private async connect(): Promise<void> {
    this.isConnecting = true;
    this.abortController = new AbortController();

    try {
      await fetchEventSource(`${BASE_URL}/stream-sse/events`, {
        method: "GET",
        signal: this.abortController.signal,
        headers: {
          Authorization: `Bearer ${tokenStore.get() ?? ""}`,
          Accept: "text/event-stream",
        },

        // ── Initial response validation ─────────────
        async onopen(response) {
          if (response.ok) {
            // Connection established → reset retries
            sseManager.retryCount = 0;
            return;
          }

          if (response.status === 401) {
            const refreshed = await SSEManager.doRefresh();
            if (refreshed) throw new RetriableError("token_refreshed");
            throw new FatalError("unauthorized");
          }

          if (response.status >= 400 && response.status < 500) {
            throw new FatalError(`client_error_${response.status}`);
          }

          throw new RetriableError(`server_error_${response.status}`);
        },

        // ── Receiving messages ──────────────────────────
        onmessage: (msg: EventSourceMessage) => {
          const eventName = msg.event || msg.data;
          if (eventName) this.emit(eventName.trim());
        },
        onclose() {
          console.warn("[SSE] Connection closed unexpectedly");
          throw new RetriableError();
        },

        // ── Error handling with backoff ──────────────────
        onerror: (err) => {
          if (err instanceof RetriableError) {
            this.retryCount++;
            if (this.retryCount > this.MAX_RETRIES) {
              console.error(`[SSE] Max retries reached (${this.MAX_RETRIES})`);
              throw new FatalError("max_retries_exceeded");
            }

            const delay = this.getBackoffDelay();
            console.warn(
              `[SSE] Retry ${this.retryCount}/${this.MAX_RETRIES} in ${delay}ms`
            );

            // Return a promise that rejects after the delay
            // makes fetchEventSource wait before reconnecting
            return new Promise<void>((_, reject) =>
              setTimeout(() => reject(err), delay)
            ) as never;
          }

          if (err instanceof FatalError) {
            console.error("[SSE] Fatal error:", err.message);
            throw err; // stop retries
          }

        },

        // Keep active even if the tab is in the background
        openWhenHidden: true,
      });
    } catch (err) {
      if (err instanceof FatalError) {
        console.error("[SSE] Conexión cerrada definitivamente:", err.message);
      }
    } finally {
      this.isConnecting = false;
      this.abortController = null;
    }
  }

  disconnect(): void {
    this.abortController?.abort();
    this.abortController = null;
    this.isConnecting = false;
  }


  // ── Silent refresh static ───────────────────────────────

  private static async doRefresh(): Promise<boolean> {
    try {
      authService.silentRefresh();
      return true;
    } catch {
      return false;
    }
  }
}

export const sseManager = new SSEManager();