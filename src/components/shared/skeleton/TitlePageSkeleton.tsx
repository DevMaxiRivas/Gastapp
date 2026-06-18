import { Skeleton } from "@/components/ui/skeleton";

export default function TitlePageSkeleton() {
    return (
        <div className="space-y-1">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-98" />
        </div>
    );
}