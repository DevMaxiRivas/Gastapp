import { Section } from "@/components/layout/Section";
import { MonthlyExpensesGraph } from "@/features/transactions/components/MonthlyExpensesGraph";

export function MonthlyExpensesSection() {
    return (
        <Section>
            <MonthlyExpensesGraph />
        </Section>
    )
}   