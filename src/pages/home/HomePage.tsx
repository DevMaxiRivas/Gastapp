import { QuickStatsSection } from "@/pages/home/components/QuickStatsSection";
import { MonthlyBudgetSection } from "./components/MonthlyBudgetSection";
import { RecentTransactionsSection } from "./components/RecentTransactionsSection";
import { TitlePageSection } from "@/components/shared/sections/TitlePageSection";
import { MonthlyBalanceSection } from "./components/MonthlyBalanceSection";
import { useSummary } from "@/hooks/useSummary";
import HomePageSkeleton from "./components/HomePageSkeleton";

export default function HomePage() {
    const { summary, isLoading } = useSummary();

    if (isLoading) return <HomePageSkeleton />;

    return (
        <>
            <TitlePageSection
                title="Dashboard"
                subtitle="Overview of your finances"
            />
            <QuickStatsSection
                totalExpense={summary?.currentAmounts?.totalExpense ?? 0}
                totalIncome={summary?.currentAmounts?.totalIncome ?? 0}
            />
            <MonthlyBudgetSection
                totalExpense={summary?.currentAmounts?.totalExpense ?? 0}
            />
            <MonthlyBalanceSection />
            <RecentTransactionsSection transactions={summary?.recentTransactions ?? []} />
        </>
    );
}