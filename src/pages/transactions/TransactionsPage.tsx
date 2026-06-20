import { TitlePageSection } from "@/components/shared/sections/TitlePageSection";
import TransactionsSection from "./components/TransactionsSection";
import { QuickStatsSection } from "../home/components/QuickStatsSection";
import { useSummary } from "@/hooks/useSummary";
import TransactionPageSkeleton from "./components/TransactionPageSkeleton";

export default function TransactionsPage() {
    const { summary, isLoading } = useSummary();

    if (isLoading) return <TransactionPageSkeleton />;

    return (
        <>
            <TitlePageSection
                title="Transactions"
                subtitle="Manage your income and expenses"
            />
            <QuickStatsSection
                totalExpense={summary?.currentAmounts?.totalExpense ?? 0}
                totalIncome={summary?.currentAmounts?.totalIncome ?? 0}
            />
            <TransactionsSection />
        </>
    )
}