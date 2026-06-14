import { SectionAsCard } from "@/components/shared/sections/SectionAsCard";
import { SectionAsCardHeader } from "@/components/shared/sections/SectionAsCardHeader";
import { type CurrencyType } from "@/enums/profile/CurrencyType";
import { BudgetSpendingBar } from "@/features/budget/BudgetSpendingBar";

type Props = {
    amount: number;
    budget: number;
    currency: CurrencyType;
}

export function ProgressMonthSection({ amount, budget, currency }: Props) {
    return (
        <SectionAsCard
            header={
                <SectionAsCardHeader
                    title="Progress of the Month"
                    description="Manage your monthly budget"
                />
            }
            content={
                <BudgetSpendingBar
                    amount={amount}
                    budget={budget}
                    currency={currency}
                />
            }
        />
    );
}

