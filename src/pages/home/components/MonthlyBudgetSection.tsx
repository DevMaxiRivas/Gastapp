import { SectionAsCard } from "@/components/shared/sections/SectionAsCard"
import { SectionAsCardHeader } from "@/components/shared/sections/SectionAsCardHeader"
import { BudgetSpendingBar } from "@/features/budget/BudgetSpendingBar"

export function MonthlyBudgetSection() {
    return (
        <SectionAsCard
            header={
                <SectionAsCardHeader
                    title="Budget Monthly"
                />
            }
            content={
                <BudgetSpendingBar />
            }
        />
    )
}