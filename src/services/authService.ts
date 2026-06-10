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
import type { BackendErrorResponse } from "@/types/backend/errors";


export const authService = {

    async parseErrors(res: any): Promise<BackendErrorResponse> {
        try {
            const errorData: BackendErrorResponse = await res.json();
            return errorData;
        } catch {
            throw Error("We were unable to connect to the server")
        }
    },

    parseAuthUser(json: AuthApiResponse): AuthUserType {
        tokenStore.set(json.data.access_token);
        return jwtDecode(json.data.access_token)
    },

    async login(payload: LoginPayloadType): Promise<AuthApiResponse | BackendErrorResponse> {
        const res = await publicFetch("/auth/login", {
            method: "POST",
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            return await this.parseErrors(res);
        }

        const json: AuthApiResponse = await res.json();
        return json;
    },
    async register(payload: RegisterPayloadType): Promise<AuthApiResponse | BackendErrorResponse> {
        const res = await publicFetch("/auth/register", {
            method: "POST",
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            return await this.parseErrors(res);
        }

        const json: AuthApiResponse = await res.json();
        return json;
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