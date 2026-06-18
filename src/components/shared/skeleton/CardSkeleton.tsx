import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type CardSkeletonProps = {
    sizeContentBody?: string;
}

export default function CardSkeleton({ sizeContentBody = "h-20" }: CardSkeletonProps) {

    return (
        <Card className="px-4">
            <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-50" />
            </div>
            <Skeleton className={`${sizeContentBody} w-full`} />
        </Card>
    );
}