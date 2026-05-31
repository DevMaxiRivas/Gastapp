// QuickStatsSection.tsx
import { QuickReferenceCard } from "@/components/shared/cards/QuickReferenceCard";
import { useMemo } from "react";

const getDaysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate();
const getMonthName = (month: Date) => month.toLocaleString('default', { month: 'long' });

export function QuickStatsSection() {
    const today = new Date();
    const daysInMonth = getDaysInMonth(today.getFullYear(), today.getMonth() + 1);
    const monthName = getMonthName(today);
    const year = today.getFullYear();

    const data = useMemo(() => [
        {
            title: "Total revenue",
            value: "ARS 1.250,00",
            footer: `1 - ${daysInMonth} ${monthName} ${year}`,
            type: "success",
        } as const,
        {
            title: "Total expenses",
            value: "ARS 2.000,00",
            footer: `1 - ${daysInMonth} ${monthName} ${year}`,
            type: "danger",
        } as const,
        {
            title: "Balance",
            value: "ARS -750,00",
            footer: "Revenue - Expenses",
            type: "neutral",
        } as const,
    ], [daysInMonth, monthName, year]);

    return (
        <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 px-4">
            {data.map((item, index) => (
                <QuickReferenceCard key={`${item.title}-${index}`} {...item} />
            ))}
        </section>
    );
}