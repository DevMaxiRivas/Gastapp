import type { ReactNode } from "react";
import TitlePageSkeleton from "./TitlePageSkeleton";

export function PageSkeleton({ children }: { children: ReactNode }) {
    return (
        <div className="space-y-2 px-4">
            <TitlePageSkeleton />
            {children}
        </div>
    );
}