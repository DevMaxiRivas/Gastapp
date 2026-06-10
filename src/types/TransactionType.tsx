import type { CategoryType } from "./CategoryType"

export type TransactionType = {
    id: string,
    type: "EXPENSE" | "INCOME",
    category: CategoryType,
    amount: number,
    note: string,
    date: Date
}