import { Section } from "@/components/layout/dashboard/Section";
import MonthlyBalanceGraph from "@/features/transactions/components/MonthlyBalanceGraph";

export function MonthlyBalanceSection() {
    return (
        <Section>
            <MonthlyBalanceGraph />
        </Section>
    );
}