import { QuickStatsSection } from "@/pages/home/components/QuickStatsSection";
import { MonthlyBudgetSection } from "./components/MonthlyBudgetSection";
import { MonthlyExpensesSection } from "./components/MonthlyExpensesSection";
import { RecentTransactionsSection } from "./components/RecentTransactionsSection";
import { TitleSection } from "@/components/shared/sections/TitleSection";

export function HomePage() {
    return (
        <>
            <TitleSection
                title="Dashboard"
                subtitle="Overview of your finances"
            />
            <QuickStatsSection />
            <MonthlyBudgetSection />
            <MonthlyExpensesSection />
            <RecentTransactionsSection />
        </>
    );
}