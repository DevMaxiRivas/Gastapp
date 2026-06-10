// ─────────────────────────────────────────────────────────────
//  AuthContext.tsx
//  Estado global de autenticación.
//
//  Initialization flow:
//  1. App mounts → AuthProvider executes silentRefresh()
//  2. If valid cookie  → saves user, sets isReady = true
//  3. If no cookie      → user = null,  isReady = true
//  4. Protected routes don't render until isReady = true
// ─────────────────────────────────────────────────────────────

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import { authService } from "../services/authService";
import type { LoginPayloadType, RegisterPayloadType } from "@/types/backend/auth/payload";
import type { AuthUserType } from "@/types/backend/auth/user";
import type { BackendErrorResponse } from "@/types/backend/errors";
import type { AuthApiResponse } from "@/types/backend/response";

interface AuthContextValue {
    user: AuthUserType | null;
    isReady: boolean;
    isAuthenticated: boolean;
    login: (payload: LoginPayloadType) => Promise<AuthApiResponse | BackendErrorResponse>;
    register: (payload: RegisterPayloadType) => Promise<AuthApiResponse | BackendErrorResponse>;
    logout: () => Promise<void>;
}


const AuthContext = createContext<AuthContextValue | null>(null);


export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUserType | null>(null);
    const [isReady, setIsReady] = useState(false);

    // Silent refresh on app mount
    useEffect(() => {
        authService
            .silentRefresh()
            .then((u) => setUser(u))
            .finally(() => setIsReady(true));
    }, []);

    const login = useCallback(async (payload: LoginPayloadType) => {
        const u: AuthApiResponse | BackendErrorResponse = await authService.login(payload);
        if (u.success) {
            setUser(authService.parseAuthUser(u as AuthApiResponse));
        }
        return u;
    }, []);

    const register = useCallback(async (payload: RegisterPayloadType) => {
        const u: AuthApiResponse | BackendErrorResponse = await authService.register(payload);
        if (u.success) {
            setUser(authService.parseAuthUser(u as AuthApiResponse));
        }
        return u;
    }, []);

    const logout = useCallback(async () => {
        await authService.logout();
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                isReady,
                isAuthenticated: user !== null,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
    return ctx;
}