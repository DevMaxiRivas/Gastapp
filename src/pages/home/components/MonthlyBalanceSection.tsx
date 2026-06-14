import { Section } from "@/components/layout/dashboard/Section";
import { MonthlyBalanceGraph } from "@/features/transactions/components/MonthlyExpensesGraph";

export function MonthlyBalanceSection() {
    return (
        <Section>
            <MonthlyBalanceGraph />
        </Section>
    );
}   