import { SectionAsCard } from "@/components/shared/sections/SectionAsCard";
import { SectionAsCardHeader } from "@/components/shared/sections/SectionAsCardHeader";

export function RecommendationsSection() {
    return (
        <SectionAsCard
            header={
                <SectionAsCardHeader
                    title="Recommendations"
                    description="Based on your spending habits"
                />
            }
            content={
                <div className="p-4 bg-green-50 border border-green-300 rounded-md">
                    <p className="text-green-600 font-medium text-sm">
                        No recommendations yet.
                    </p>
                </div>
            }
        />
    );
}   