import { TitlePageSection } from "@/components/shared/sections/TitlePageSection";
import { getMonthName } from "@/utils/dateUtils";
import { SettingsSection } from "./components/SettingsSection";
import { StatsSection } from "./components/StatsSection";
import { ProgressMonthSection } from "./components/MonthSection";
import { RecommendationsSection } from "./components/RecommendationsSection";

export default function BudgetPage() {
    return (
        <>
            <TitlePageSection
                title="Monthly Budget"
                subtitle={`Manage your spending limit for ${getMonthName(new Date())}`}
            />
            <ProgressMonthSection />
            <SettingsSection />
            <StatsSection />
            <RecommendationsSection />
        </>
    )
}