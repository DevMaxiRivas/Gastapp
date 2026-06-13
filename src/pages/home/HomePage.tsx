import { QuickStatsSection } from "@/pages/home/components/QuickStatsSection";
import { MonthlyBudgetSection } from "./components/MonthlyBudgetSection";
import { MonthlyExpensesSection } from "./components/MonthlyExpensesSection";
import { RecentTransactionsSection } from "./components/RecentTransactionsSection";
import { TitlePageSection } from "@/components/shared/sections/TitlePageSection";
import type { DataSummaryResponse } from "@/types/backend/dashboard/summary/response";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useMemo } from "react";
import { transactionService } from "@/services/transactionService";
import { TransactionTypeObject } from "@/enums/transaction/TransactionType";

export default function HomePage() {
    const { data, loading, error } = useAuthFetch<DataSummaryResponse>("/dashboard/summary")

    const [currentMonthHistoryExpense, currentMonthHistoryIncome] = useMemo(() => {
        if (data) {
            return [
                transactionService.getCurrentMonthHistory(data.historyByMonth.slice(0, 2), TransactionTypeObject.EXPENSE),
                transactionService.getCurrentMonthHistory(data.historyByMonth.slice(0, 2), TransactionTypeObject.INCOME)
            ];
        }
        return [null, null];
    }, [data]);


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
            <MonthlyExpensesSection />
            <RecentTransactionsSection transactions={data?.recentTransactions} />
        </>
    );
}