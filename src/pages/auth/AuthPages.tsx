// ─────────────────────────────────────────────────────────────
//  ProtectedRoute.tsx
//  Guards de navegación basados en el estado de autenticación.
//
//  <ProtectedRoute>     → only authenticated users
//  <PublicOnlyRoute>    → only NOT authenticated users (login/register)
//  <RoleRoute role="ADMIN"> → only a specific role
//
//  Both wait for isReady to be true (complete silent-refresh)
//  to avoid premature redirection.
// ─────────────────────────────────────────────────────────────

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import LayoutDashboard from "@/components/layout/dashboard/LayoutDashboard";
import LayoutPublic from "@/components/layout/public/LayoutPublic";

// ── Spinner while silent-refresh is resolved ─────────────────

function AuthLoading() {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                gap: "0.75rem",
                color: "var(--color-text-secondary)",
                fontSize: "0.875rem",
            }}
        >
            <span
                style={{
                    width: 18,
                    height: 18,
                    border: "2px solid currentColor",
                    borderTopColor: "transparent",
                    borderRadius: "50%",
                    display: "inline-block",
                    animation: "spin 0.7s linear infinite",
                }}
            />
            Verificando sesión…
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}

// ── Protected route (requires authentication) ───────────────────

/**
 * Place <ProtectedRoute /> as the parent of routes that require login.
 * If the user is not authenticated → redirect to /login,
 * saving the origin URL to redirect after login.
 */
export function ProtectedRoute() {
    const { isReady, isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isReady) return <AuthLoading />;

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <LayoutDashboard />;
}

// ── Public route (only NOT authenticated users) ──────────────

/**
 * Place <PublicOnlyRoute /> as the parent of /login and /register.
 * If the user IS already authenticated → redirect to dashboard.
 */
export function PublicOnlyRoute() {
    const { isReady, isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isReady) return <AuthLoading />;

    if (isAuthenticated) {
        const from = (location.state as { from?: Location })?.from?.pathname ?? "/dashboard";
        return <Navigate to={from} replace />;
    }

    return <LayoutPublic />;
}

// ── Role restricted route ──────────────────────────────────

interface RoleRouteProps {
    role: string;
    redirectTo?: string;
}

/**
 * Place <RoleRoute role="ADMIN" /> for administration routes.
 * If the role does not match → redirect to /unauthorized (or the indicated path).
 */
export function RoleRoute({ role, redirectTo = "/unauthorized" }: RoleRouteProps) {
    const { isReady, isAuthenticated, user } = useAuth();

    if (!isReady) return <AuthLoading />;

    if (!isAuthenticated) return <Navigate to="/login" replace />;

    if (user?.role !== role) return <Navigate to={redirectTo} replace />;

    return <Outlet />;
}