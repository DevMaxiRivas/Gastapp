import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TableExpensesHistory } from "@/features/expenses/components/TableExpensesHistory";

export function TableExpensesHistorySection() {
    return (
        <section className="px-4">
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription className="text-xl font-semibold"><b>Expenses History</b></CardDescription>
                    <CardTitle>
                        <TableExpensesHistory />
                    </CardTitle>
                </CardHeader>
            </Card>
        </section>
    )
}