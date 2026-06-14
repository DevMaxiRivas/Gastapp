import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function MonthlyExpensesGraphSkeleton() {
    return (
        <Card>
            <div className="flex flex-col gap-5 px-4">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <Skeleton className="w-full h-20" />
                    </div>
                    <Skeleton className="w-full h-60" />
                </div>
            </div>
        </Card>
    )
}