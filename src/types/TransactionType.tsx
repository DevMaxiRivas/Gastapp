import type { CategoryType } from "./CategoryType"

export type TransactionType = {
    id: string,
    type: "expense" | "income",
    category: CategoryType,
    amount: number,
    note: string,
    date: Date
}