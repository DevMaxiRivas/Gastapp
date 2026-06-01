import { QuickStatsSection } from "@/pages/home/components/QuickStatsSection";
import { MonthlyBudgetSection } from "./components/MonthlyBudgetSection";
import { MonthlyExpensesSection } from "./components/MonthlyExpensesSection";
import { RecentTransactionsSection } from "./components/RecentTransactionsSection";

export function HomePage() {
    return (
        <div className="p-4 space-y-2">
            <QuickStatsSection />
            <MonthlyBudgetSection />
            <MonthlyExpensesSection />
            <RecentTransactionsSection />
        </div>
    );
}