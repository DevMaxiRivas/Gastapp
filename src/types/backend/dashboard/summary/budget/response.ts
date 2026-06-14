import type { BackendResponse } from "@/types/backend/response";

export interface DataSummaryBudgetResponse {
    totalExpenses: number;
}

export interface SummaryBudgetResponse extends BackendResponse {
    data: DataSummaryBudgetResponse | null;
}