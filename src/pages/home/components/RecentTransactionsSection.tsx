import { SectionAsCard } from "@/components/shared/sections/SectionAsCard";
import { SectionAsCardHeader } from "@/components/shared/sections/SectionAsCardHeader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ItemGroup } from "@/components/ui/item";
import { TransactionItem } from "@/features/transactions/components/TransactionItem";
import type { Transaction } from "@/types/backend/transaction/response";

interface RecentTransactionsSectionProps {
    transactions: Transaction[];
}

export function RecentTransactionsSection({ transactions }: RecentTransactionsSectionProps) {
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
                        transactions && transactions.length > 0 ?
                            transactions.map((transaction) => (
                                <TransactionItem key={transaction.id} transaction={transaction} />

                            )) : (
                                <Alert className="w-full">
                                    <AlertTitle>No transactions</AlertTitle>
                                    <AlertDescription>You don't have any transactions yet</AlertDescription>
                                </Alert>
                            )
                    }
                </ItemGroup>
            }
        />
    );
}