import { Section } from "@/components/layout/Section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ItemGroup } from "@/components/ui/item";
import { TransactionItem } from "@/features/transactions/components/TransactionItem";
import { CATEGORY_ICONS } from "@/lib/constants-front";
const transactions = [
    {
        category: {
            id: "1",
            name: "Groceries",
            type: "income",
            icon: CATEGORY_ICONS["UtensilsIcon"],
        },
        id: "1",
        type: "expense",
        amount: 10,
        note: "Groceries",
        date: new Date()
    } as const,
    {
        category: {
            id: "2",
            name: "Groceries",
            type: "income",
            icon: CATEGORY_ICONS["CarIcon"],
        },
        id: "2",
        type: "expense",
        amount: 20,
        note: "Groceries",
        date: new Date()
    } as const,
    {
        category: {
            id: "3",
            type: "expense",
            name: "Groceries",
            icon: CATEGORY_ICONS["ShoppingBagIcon"],
        },
        id: "3",
        amount: 30,
        type: "income",
        note: "Groceries",
        date: new Date()
    } as const
]

export function RecentTransactionsSection() {
    return (
        <Section>
            <Card className="@container/card">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold"><b>Recent Transactions</b></CardTitle>
                    <CardDescription>See your latest transactions</CardDescription>
                </CardHeader>
                <CardContent>
                    <ItemGroup className="w-full">
                        {
                            transactions.map((transaction) => (
                                <TransactionItem key={transaction.id} transaction={transaction} />

                            ))
                        }
                    </ItemGroup>
                </CardContent>
            </Card>
        </Section>
    );
}