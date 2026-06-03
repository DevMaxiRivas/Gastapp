import { Section } from "@/components/layout/Section";
import { QuickReferenceCard } from "@/components/shared/cards/QuickReferenceCard";
import { DollarSign, Target, TrendingDown } from "lucide-react";

export function StatsSection() {
    const data = [
        {
            title: "Available",
            value: "ARS 1.250,00",
            footer: "Remaining for the month",
            type: "neutral",
            iconCard: DollarSign
        } as const,
        {
            title: "Daily Average",
            value: "ARS 2.000,00",
            footer: "Average spending to date",
            type: "neutral",
            iconCard: TrendingDown
        } as const,
        {
            title: "Daily Limit",
            value: "ARS 750,00",
            footer: "For the next 23 days",
            type: "neutral",
            iconCard: Target
        } as const
    ];

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