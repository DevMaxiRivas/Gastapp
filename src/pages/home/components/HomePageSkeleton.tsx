import CardSkeleton from "@/components/shared/skeleton/CardSkeleton";
import { PageSkeleton } from "@/components/shared/skeleton/PageSkeleton";

export default function HomePageSkeleton() {
    return (
        <PageSkeleton>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
            </div>
            <CardSkeleton sizeContentBody="h-80" />
            <CardSkeleton />
        </PageSkeleton>
    );
}