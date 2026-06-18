import { TitlePageSection } from "@/components/shared/sections/TitlePageSection";
import { getMonthName } from "@/utils/dateUtils";
import { SettingsSection } from "./components/SettingsSection";
import { StatsSection } from "./components/StatsSection";
import { ProgressMonthSection } from "./components/MonthSection";
import { RecommendationsSection } from "./components/RecommendationsSection";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { useBudget } from "@/hooks/useBudget";
import BudgetPageSkeleton from "./components/BudgetPageSkeleton";

export default function BudgetPage() {
    const { user } = useAuth();
    const { budget, isLoading, error } = useBudget();

    if (isLoading) return <BudgetPageSkeleton />;
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