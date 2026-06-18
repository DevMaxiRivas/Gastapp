import { QuickStatsSection } from "@/pages/home/components/QuickStatsSection";
import { MonthlyBudgetSection } from "./components/MonthlyBudgetSection";
import { RecentTransactionsSection } from "./components/RecentTransactionsSection";
import { TitlePageSection } from "@/components/shared/sections/TitlePageSection";
import { useMemo } from "react";
import { transactionService } from "@/services/transactionService";
import { TransactionTypeObject } from "@/enums/transaction/TransactionType";
import { MonthlyBalanceSection } from "./components/MonthlyBalanceSection";
import { useSummary } from "@/hooks/useSummary";
import HomePageSkeleton from "./components/HomePageSkeleton";

export default function HomePage() {
    const { summary, isLoading } = useSummary();

    const [currentMonthHistoryExpense, currentMonthHistoryIncome] = useMemo(() => {
        if (summary) {
            return [
                transactionService.getCurrentMonthHistory(summary.historyByMonth.slice(0, 2), TransactionTypeObject.EXPENSE),
                transactionService.getCurrentMonthHistory(summary.historyByMonth.slice(0, 2), TransactionTypeObject.INCOME)
            ];
        }
        return [null, null];
    }, [summary]);


    if (isLoading) return <HomePageSkeleton />;


    return (
        <>
            <TitlePageSection
                title="Dashboard"
                subtitle="Overview of your finances"
            />
            <QuickStatsSection
                totalExpense={currentMonthHistoryExpense?.amount ?? 0}
                totalIncome={currentMonthHistoryIncome?.amount ?? 0}
            />
            <MonthlyBudgetSection
                totalExpense={currentMonthHistoryExpense?.amount ?? 0}
            />
            <MonthlyBalanceSection />
            <RecentTransactionsSection transactions={summary?.recentTransactions} />
        </>
    );
}