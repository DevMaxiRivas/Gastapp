// QuickStatsSection.tsx
import { QuickReferenceCard } from "@/components/shared/cards/QuickReferenceCard";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { useMemo } from "react";

export function SummarySection() {
    const data = useMemo(() => [
        {
            title: "Total revenue",
            value: "ARS 1.250,00",
            type: "success",
            iconCard: TrendingUp
        } as const,
        {
            title: "Total expenses",
            value: "ARS 2.000,00",
            type: "danger",
            iconCard: TrendingDown
        } as const,
        {
            title: "Balance",
            value: "ARS -750,00",
            type: "neutral",
            iconCard: Wallet
        } as const,
    ], []);

    return (
        <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 px-4">
            {data.map((item, index) => (
                <QuickReferenceCard key={`${item.title}-${index}`} {...item} />
            ))}
        </section>
    );
}