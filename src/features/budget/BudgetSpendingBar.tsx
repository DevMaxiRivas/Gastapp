import { Progress } from "@/components/ui/progress";

export function BudgetSpendingBar() {
    const percent = 80;
    const spent = 200000;
    const total = 500000;
    const available = total - spent;
    const daysLeft = 23;

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
                ARS {spent.toLocaleString()} of ARS {total.toLocaleString()}
            </span>
            <Progress value={percent} className={`[&>div>div]:${colorType}`} />
            <div className="flex justify-between pt-2 text-sm">
                <span>{percent}% used</span>
                <span className="ml-auto">ARS {available.toLocaleString()} Available ({daysLeft} days left)</span>
            </div>
        </>

    );
}