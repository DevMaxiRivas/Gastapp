import type { LucideIcon } from "lucide-react";

export type CategoryType = {
    id: string;
    name: string;
    type: "expense" | "income";
    icon: LucideIcon;
}