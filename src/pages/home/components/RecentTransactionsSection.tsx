import { Section } from "@/components/layout/Section";
import { SectionAsCard } from "@/components/shared/sections/SectionAsCard";
import { SectionAsCardHeader } from "@/components/shared/sections/SectionAsCardHeader";
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
        <SectionAsCard
            header={
                <SectionAsCardHeader
                    title="Recent Transactions"
                    description="See your latest transactions"
                />
            }
            content={
                <ItemGroup className="w-full">
                    {
                        transactions.map((transaction) => (
                            <TransactionItem key={transaction.id} transaction={transaction} />

                        ))
                    }
                </ItemGroup>
            }
        />
    );
}