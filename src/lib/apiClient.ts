// ─────────────────────────────────────────────────────────────
//  apiClient.ts
//  Cliente HTTP central.
//
//  - authFetch: para rutas protegidas (adjunta Bearer + reintenta
//    automatically if 401 is received).
//  - publicFetch: for routes without authentication (login, register).
//
//  credentials: 'include' → the browser sends the cookie
//  refresh-token (HttpOnly) in each request without the code
//  touching it ever.
// ─────────────────────────────────────────────────────────────

import { tokenStore } from "./tokenStore";

const BASE_URL = "/api/v1";

// ── Indicator to prevent infinite refresh loops ──────────
let isRefreshing = false;
// Queue of callbacks suspended while the token is being refreshed
let pendingQueue: Array<{
    resolve: (token: string) => void;
    reject: (err: unknown) => void;
}> = [];

function processPendingQueue(error: unknown, token: string | null) {
    pendingQueue.forEach((p) => {
        if (error) p.reject(error);
        else p.resolve(token!);
    });
    pendingQueue = [];
}


function buildHeaders(extra?: HeadersInit): HeadersInit {
    return {
        "Content-Type": "application/json",
        ...(tokenStore.get() ? { Authorization: `Bearer ${tokenStore.get()}` } : {}),
        ...extra,
    };
}

async function doRefresh(): Promise<string> {
    const res = await fetch(`${BASE_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
    });

    if (!res.ok) throw new Error("refresh_failed");

    const json = await res.json();
    const newToken: string = json.data.access_token;
    tokenStore.set(newToken);
    return newToken;
}

// ── Public client (without Authorization) ──────────────────────

export async function publicFetch(
    path: string,
    options: RequestInit = {}
): Promise<Response> {
    return fetch(`${BASE_URL}${path}`, {
        ...options,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });
}

// ── Authenticated client (with 401 interceptor) ─────────────────

export async function authFetch(
    path: string,
    options: RequestInit = {}
): Promise<Response> {
    const request = () =>
        fetch(`${BASE_URL}${path}`, {
            ...options,
            credentials: "include",
            headers: buildHeaders(options.headers),
        });

    let response = await request();

    if (response.status !== 401) return response;

    // ── 401: try to refresh ─────────────────────────────────
    if (isRefreshing) {
        const token = await new Promise<string>((resolve, reject) => {
            pendingQueue.push({ resolve, reject });
        });
        tokenStore.set(token);
        return request();
    }

    isRefreshing = true;

    try {
        const newToken = await doRefresh();
        processPendingQueue(null, newToken);
        response = await request();
        return response;
    } catch (err) {
        processPendingQueue(err, null);
        tokenStore.clear();
        window.location.href = "/login";
        throw err;
    } finally {
        isRefreshing = false;
    }
}