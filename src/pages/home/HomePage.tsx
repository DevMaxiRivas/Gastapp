import { QuickStatsSection } from "@/pages/home/components/QuickStatsSection";
import { MonthlyBudgetSection } from "./components/MonthlyBudgetSection";
import { MonthlyExpensesSection } from "./components/MonthlyExpensesSection";
import { RecentTransactionsSection } from "./components/RecentTransactionsSection";

export function HomePage() {
    return (
        <>
            <QuickStatsSection />
            <MonthlyBudgetSection />
            <MonthlyExpensesSection />
            <RecentTransactionsSection />
        </>
    );
}