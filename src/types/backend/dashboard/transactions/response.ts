import type { BackendResponse } from "../../response";

export interface TransactionsDailyBalance {
    date: string;
    totalIncome: number;
    totalExpense: number;
}

export interface TransactionsDailyBalanceResponse extends BackendResponse {
    data: TransactionsDailyBalance[];
}