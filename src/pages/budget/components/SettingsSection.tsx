import { SectionAsCard } from "@/components/shared/sections/SectionAsCard";
import { CardTitle } from "@/components/ui/card";
import { SetBudgetForm } from "@/features/budget/SetBudgetForm";
import { Settings } from "lucide-react";


export function SettingsSection() {
    return (
        <SectionAsCard
            header={
                <CardTitle className="flex items-center gap-2">
                    <Settings />
                    <span className="text-xl font-medium"><b>Budget Settings</b></span>
                </CardTitle>
            }
            content={
                <SetBudgetForm />
            }
        />
    );
}

