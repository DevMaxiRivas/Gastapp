import { Progress } from "@/components/ui/progress";
import type { CurrencyType } from "@/enums/profile/CurrencyType";
import { getDaysInMonth } from "date-fns";

interface BudgetSpendingBarProps {
    amount: number;
    budget: number;
    currency: CurrencyType;
}

export function BudgetSpendingBar({ amount, budget, currency }: BudgetSpendingBarProps) {
    const percent = Math.round(amount / budget * 100);
    const available = budget - amount;
    const daysLeft = getDaysInMonth(new Date()) - new Date().getDate() + 1;

    let colorType = "bg-green-600";

    if (percent > 75) {
        colorType = "bg-red-600";
    } else if (percent >= 50) {
        colorType = "bg-yellow-400";
    } else {
        colorType = "bg-green-600";
    }

    return (
        <>
            <span className="my-2 text-sm font-semibold">
                {currency} {amount.toLocaleString()} of {currency} {budget.toLocaleString()}
            </span>
            <Progress value={percent} className={`[&>div>div]:${colorType}`} />
            <div className="flex justify-between pt-2 text-sm">
                <span>{percent}% used</span>
                <span className="ml-auto">{currency} {available.toLocaleString()} Available ({daysLeft} days left)</span>
            </div>
        </>

    );
}