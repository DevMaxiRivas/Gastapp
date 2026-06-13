import { SectionAsCard } from "@/components/shared/sections/SectionAsCard"
import { SectionAsCardHeader } from "@/components/shared/sections/SectionAsCardHeader"
import { useAuth } from "@/context/AuthContext";
import { BudgetSpendingBar } from "@/features/budget/BudgetSpendingBar"

interface MonthlyBudgetSectionProps {
    totalExpense: number
}

export function MonthlyBudgetSection({ totalExpense }: MonthlyBudgetSectionProps) {
    const { user } = useAuth();
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
                    budget={user?.profile?.currentBudget || 0}
                    currency={user?.profile?.currency || 'ARS'}
                />
            }
        />
    )
}