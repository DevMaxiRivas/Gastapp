import { TitlePageSection } from "@/components/shared/sections/TitlePageSection";
import { getMonthName } from "@/utils/dateUtils";
import { SettingsSection } from "./components/SettingsSection";
import { StatsSection } from "./components/StatsSection";
import { ProgressMonthSection } from "./components/MonthSection";
import { RecommendationsSection } from "./components/RecommendationsSection";
import { useAuth } from "@/context/AuthContext";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import type { DataSummaryBudgetResponse } from "@/types/backend/dashboard/summary/budget/response";
import { Navigate } from "react-router-dom";

export default function BudgetPage() {
    const { user } = useAuth();
    const { data } = useAuthFetch<DataSummaryBudgetResponse>(`/dashboard/summary/budget`);

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
                amount={data?.totalExpenses || 0}
                budget={user.profile.currentBudget}
                currency={user.profile.currency}
            />
            <SettingsSection />
            <StatsSection
                totalExpenses={data?.totalExpenses || 0}
                currentBudget={user.profile.currentBudget}
                currency={user.profile.currency}
            />
            <RecommendationsSection />
        </>
    );
}