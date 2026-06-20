import type { BackendResponse } from "../../response";
import type { Transaction } from "../../transaction/response";

export interface TransactionHistoryByMonth {
    year: number;
    month: number;
    totalExpense: number;
    totalIncome: number;
}

export interface DataSummaryResponse {
    currentAmounts: TransactionHistoryByMonth | null;
    recentTransactions: Transaction[];
}

export interface SummaryResponse extends BackendResponse {
    data: DataSummaryResponse;
}