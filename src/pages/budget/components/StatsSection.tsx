import { Section } from "@/components/layout/dashboard/Section";
import { QuickReferenceCard, type QuickReferenceCardParams } from "@/components/shared/cards/QuickReferenceCard";
import type { CurrencyType } from "@/enums/profile/CurrencyType";
import { roundTo } from "@/utils/numberUtils";
import { DollarSign, Target, TrendingDown } from "lucide-react";

function getStats(totalExpenses: number, currentBudget: number, currency: CurrencyType): QuickReferenceCardParams[] {
    const daysElapsed: number = new Date().getDate();
    return [
        {
            title: "Available",
            value: `${currency} ${(roundTo(currentBudget - totalExpenses, 2)).toLocaleString()}`,
            footer: "Remaining for the month",
            type: "neutral",
            iconCard: DollarSign
        } as const,
        {
            title: "Daily Average",
            value: `${currency} ${(roundTo(totalExpenses / daysElapsed, 2)).toLocaleString()}`,
            footer: `Average spending to date (${daysElapsed})`,
            type: "neutral",
            iconCard: TrendingDown
        } as const,
        {
            title: "Daily Limit",
            value: `${currency} ${(roundTo((currentBudget - totalExpenses) / (30 - daysElapsed), 2)).toLocaleString()}`,
            footer: `For the next ${30 - daysElapsed} days`,
            type: "neutral",
            iconCard: Target
        } as const
    ];
}

export type StatSectionProps = { totalExpenses: number, currentBudget: number, currency: CurrencyType };

export function StatsSection({ totalExpenses, currentBudget, currency }: StatSectionProps) {
    const data = getStats(totalExpenses, currentBudget, currency);

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