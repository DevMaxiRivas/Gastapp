import { Section } from "@/components/layout/Section";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpensesHistoryTable } from "@/features/transactions/components/ExpensesHistoryTable";

export function ExpensesHistorySection() {
    return (
        <Section>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription className="text-xl font-semibold"><b>Expenses History</b></CardDescription>
                    <CardTitle>
                        <ExpensesHistoryTable />
                    </CardTitle>
                </CardHeader>
            </Card>
        </Section>
    )
}