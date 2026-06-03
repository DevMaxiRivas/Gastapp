import { QuickStatsSection } from "@/pages/home/components/QuickStatsSection";
import { MonthlyBudgetSection } from "./components/MonthlyBudgetSection";
import { MonthlyExpensesSection } from "./components/MonthlyExpensesSection";
import { RecentTransactionsSection } from "./components/RecentTransactionsSection";
import { TitlePageSection } from "@/components/shared/sections/TitlePageSection";

export function HomePage() {
    return (
        <>
            <TitlePageSection
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