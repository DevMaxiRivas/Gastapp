// ─────────────────────────────────────────────────────────────
//  authService.ts
//  All authentication operations centralized.
//  Components never call fetch directly.
// ─────────────────────────────────────────────────────────────

import { publicFetch, authFetch } from "../lib/apiClient";
import { tokenStore } from "../lib/tokenStore";
import { jwtDecode } from "jwt-decode";

import type { AuthApiResponse } from "@/types/backend/response";
import type { LoginPayloadType, RegisterPayloadType } from "@/types/backend/auth/payload";
import type { AuthUserType } from "@/types/backend/auth/user";


export const authService = {
    async login(payload: LoginPayloadType): Promise<AuthUserType> {
        const res = await publicFetch("/auth/login", {
            method: "POST",
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err?.message ?? "Invalid credentials");
        }

        const json: AuthApiResponse = await res.json();
        tokenStore.set(json.data.access_token);
        return jwtDecode(json.data.access_token);
    },
    async register(payload: RegisterPayloadType): Promise<AuthUserType> {
        const res = await publicFetch("/auth/register", {
            method: "POST",
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err?.message ?? "Invalid credentials");
        }

        const json: AuthApiResponse = await res.json();
        tokenStore.set(json.data.access_token);
        return jwtDecode(json.data.access_token);
    },

    /**
     * POST /auth/refresh
     * Llamado al inicio de la app (silent refresh) y automáticamente
     * por authFetch cuando recibe un 401.
     */
    async silentRefresh(): Promise<AuthUserType | null> {
        try {
            const res = await publicFetch("/auth/refresh", { method: "POST" });
            if (!res.ok) return null;

            const json: AuthApiResponse = await res.json();
            tokenStore.set(json.data.access_token);
            return jwtDecode(json.data.access_token);
        } catch {
            return null;
        }
    },

    /** POST /auth/logout — el backend invalida la cookie */
    async logout(): Promise<void> {
        try {
            await authFetch("/auth/logout", { method: "POST" });
        } finally {
            // Limpiar token local siempre, aunque el request falle
            tokenStore.clear();
        }
    },
};