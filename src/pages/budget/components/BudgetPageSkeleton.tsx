import CardSkeleton from "@/components/shared/skeleton/CardSkeleton";
import { PageSkeleton } from "@/components/shared/skeleton/PageSkeleton";

export default function BudgetPageSkeleton() {
    return (
        <PageSkeleton>
            <CardSkeleton />
            <CardSkeleton />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
            </div>
            <CardSkeleton />
        </PageSkeleton>
    );
}