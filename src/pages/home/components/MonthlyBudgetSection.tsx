import { SectionAsCard } from "@/components/shared/sections/SectionAsCard"
import { SectionAsCardHeader } from "@/components/shared/sections/SectionAsCardHeader"
import { useAuth } from "@/context/AuthContext";
import { BudgetSpendingBar } from "@/features/budget/BudgetSpendingBar"
import { Navigate } from "react-router-dom";

interface MonthlyBudgetSectionProps {
    totalExpense: number
}

export function MonthlyBudgetSection({ totalExpense }: MonthlyBudgetSectionProps) {
    const { user } = useAuth();

    if (!user || !user.profile) {
        return <Navigate to="/dashboard" replace={true} />;
    }

    return (
        <SectionAsCard
            header={
                <SectionAsCardHeader
                    title="Budget Monthly"
                />
            }
            content={
                <BudgetSpendingBar
                    amount={totalExpense}
                    budget={user.profile.currentBudget}
                    currency={user.profile.currency}
                />
            }
        />
    )
}