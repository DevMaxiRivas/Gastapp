// ─────────────────────────────────────────────────────────────
//  useAuthFetch.ts
//  Hook for convenience for authenticated calls from
//  components. Handles loading, data and error automatically.
//
//  Usage:
//    const { data, loading, error, refetch } = useAuthFetch<User[]>("/users");
// ─────────────────────────────────────────────────────────────

import { useCallback, useEffect, useState } from "react";
import { authFetch } from "../lib/apiClient";

interface UseFetchState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export function useAuthFetch<T>(
    path: string,
    options?: RequestInit
): UseFetchState<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [tick, setTick] = useState(0);

    const refetch = useCallback(() => setTick((t) => t + 1), []);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setError(null);

        authFetch(path, options)
            .then(async (res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json() as Promise<{ data: T }>;
            })
            .then((json) => {
                if (!cancelled) setData(json.data);
            })
            .catch((err: Error) => {
                if (!cancelled) setError(err.message);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => { cancelled = true; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path, tick]);

    return { data, loading, error, refetch };
}