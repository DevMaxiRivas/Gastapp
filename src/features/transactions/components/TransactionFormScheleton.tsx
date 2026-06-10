import { Skeleton } from "@/components/ui/skeleton";

export default function TransactionFormScheleton() {
    return (
        <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-1">
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
            </div>
            <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                    <Skeleton className="w-20 h-8" />
                </div>
                <Skeleton className="w-full h-10" />
            </div>
            <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                    <Skeleton className="w-20 h-8" />
                </div>
                <Skeleton className="w-full h-10" />
            </div>
            <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                    <Skeleton className="w-20 h-8" />
                </div>
                <Skeleton className="w-full h-10" />
            </div>
            <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                    <Skeleton className="w-20 h-8" />
                </div>
                <Skeleton className="w-full h-35" />
            </div>
            <Skeleton className="w-full h-8" />
        </div>
    )
}