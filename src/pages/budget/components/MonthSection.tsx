import { SectionAsCard } from "@/components/shared/sections/SectionAsCard";
import { SectionAsCardHeader } from "@/components/shared/sections/SectionAsCardHeader";
import { BudgetSpendingBar } from "@/features/budget/BudgetSpendingBar";

export function ProgressMonthSection() {
    return (
        <SectionAsCard
            header={
                <SectionAsCardHeader
                    title="Progress of the Month"
                    description="Manage your monthly budget"
                />
            }
            content={
                <BudgetSpendingBar />
            }
        />
    );
}

