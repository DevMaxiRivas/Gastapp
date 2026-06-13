// QuickStatsSection.tsx
import { Section } from "@/components/layout/dashboard/Section";
import { QuickReferenceCard } from "@/components/shared/cards/QuickReferenceCard";
import { useAuth } from "@/context/AuthContext";
import { getDaysInMonth, getMonthName } from "@/utils/dateUtils";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { useMemo } from "react";

interface QuickStatsSectionProps {
    totalExpense: number;
    totalIncome: number;
}


export function QuickStatsSection({ totalExpense, totalIncome }: QuickStatsSectionProps) {
    const today = new Date();
    const daysInMonth = getDaysInMonth(today);
    const monthName = getMonthName(today);
    const year = today.getFullYear();

    const { user } = useAuth();

    const data = useMemo(() => [
        {
            title: "Total revenue",
            value: `${user?.profile?.currency} ${totalIncome}`,
            footer: `1 - ${daysInMonth} ${monthName} ${year}`,
            type: "success",
            iconCard: TrendingUp
        } as const,
        {
            title: "Total expenses",
            value: `${user?.profile?.currency} ${totalExpense}`,
            footer: `1 - ${daysInMonth} ${monthName} ${year}`,
            type: "danger",
            iconCard: TrendingDown
        } as const,
        {
            title: "Balance",
            value: `${user?.profile?.currency} ${totalIncome - totalExpense}`,
            footer: "Revenue - Expenses",
            type: "neutral",
            iconCard: Wallet
        } as const,
    ], [daysInMonth, monthName, year, totalExpense, totalIncome]);

    return (
        <Section>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
                {data.map((item, index) => (
                    <QuickReferenceCard key={`${item.title}-${index}`} {...item} />
                ))}
            </div>
        </Section>
    );
}