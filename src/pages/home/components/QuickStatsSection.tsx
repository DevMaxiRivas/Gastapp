// QuickStatsSection.tsx
import { Section } from "@/components/layout/Section";
import { QuickReferenceCard } from "@/components/shared/cards/QuickReferenceCard";
import { getDaysInMonth, getMonthName } from "@/utils/dateUtils";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { useMemo } from "react";

export function QuickStatsSection() {
    const today = new Date();
    const daysInMonth = getDaysInMonth(today);
    const monthName = getMonthName(today);
    const year = today.getFullYear();

    const data = useMemo(() => [
        {
            title: "Total revenue",
            value: "ARS 1.250,00",
            footer: `1 - ${daysInMonth} ${monthName} ${year}`,
            type: "success",
            iconCard: TrendingUp
        } as const,
        {
            title: "Total expenses",
            value: "ARS 2.000,00",
            footer: `1 - ${daysInMonth} ${monthName} ${year}`,
            type: "danger",
            iconCard: TrendingDown
        } as const,
        {
            title: "Balance",
            value: "ARS -750,00",
            footer: "Revenue - Expenses",
            type: "neutral",
            iconCard: Wallet
        } as const,
    ], [daysInMonth, monthName, year]);

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