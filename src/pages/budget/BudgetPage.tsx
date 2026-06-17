import { TitlePageSection } from "@/components/shared/sections/TitlePageSection";
import { getMonthName } from "@/utils/dateUtils";
import { SettingsSection } from "./components/SettingsSection";
import { StatsSection } from "./components/StatsSection";
import { ProgressMonthSection } from "./components/MonthSection";
import { RecommendationsSection } from "./components/RecommendationsSection";
import { useAuth } from "@/context/AuthContext";
// import { useAuthFetch } from "@/hooks/useAuthFetch";
// import type { DataSummaryBudgetResponse } from "@/types/backend/dashboard/summary/budget/response";
import { Navigate } from "react-router-dom";
import { DashboardSSEProvider } from "@/context/DashboardSSEProvider";
import { useBudget } from "@/hooks/useBudget";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function BudgetPageWithSSE() {
    const { user } = useAuth();
    // const { data } = useAuthFetch<DataSummaryBudgetResponse>(`/dashboard/summary/budget`);
    const { budget, isLoading, error } = useBudget();

    if (isLoading) return <p>Cargando</p>;
    if (error) return <p>{error.message}</p>;

    if (!user || !user.profile) {
        return <Navigate to="/dashboard" replace={true} />;
    }

    return (
        <>
            <TitlePageSection
                title="Monthly Budget"
                subtitle={`Manage your spending limit for ${getMonthName(new Date())}`}
            />
            <ProgressMonthSection
                amount={budget?.totalExpenses || 0}
                budget={user.profile.currentBudget}
                currency={user.profile.currency}
            />
            <SettingsSection />
            <StatsSection
                totalExpenses={budget?.totalExpenses || 0}
                currentBudget={user.profile.currentBudget}
                currency={user.profile.currency}
            />
            <RecommendationsSection />
        </>
    );
}

export default function BudgetPage() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                refetchOnMount: false,
                staleTime: Infinity,
            },
        },
    });
    return (
        <QueryClientProvider client={queryClient}>
            <DashboardSSEProvider>
                <BudgetPageWithSSE />
            </DashboardSSEProvider>
        </QueryClientProvider>
    );
}