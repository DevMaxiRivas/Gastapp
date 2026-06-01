import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpensesHistoryTable } from "@/features/transactions/components/ExpensesHistoryTable";

export function ExpensesHistorySection() {
    return (
        <section className="px-4">
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription className="text-xl font-semibold"><b>Expenses History</b></CardDescription>
                    <CardTitle>
                        <ExpensesHistoryTable />
                    </CardTitle>
                </CardHeader>
            </Card>
        </section>
    )
}