import { TitlePageSection } from "@/components/shared/sections/TitlePageSection";
import { SummarySection } from "./components/SummarySection";
import { TransactionsSection } from "./components/TransactionsSection";

export function TransactionsPage() {
    return (
        <>
            <TitlePageSection
                title="Transactions"
                subtitle="Manage your income and expenses"
            />
            <SummarySection />
            <TransactionsSection />
        </>
    )
}