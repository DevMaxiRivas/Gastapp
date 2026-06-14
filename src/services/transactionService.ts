import type { BackendErrorResponse } from "@/types/backend/errors";
import type { TransactionPayloadType } from "@/types/backend/transaction/payload";
import type { TransactionResponse } from "@/types/backend/transaction/response";
import { authFetch, getQueryString } from "@/lib/apiClient";
import type { TransactionHistoryByMonth } from "@/types/backend/dashboard/summary/response";
import type { TypeTransactionType } from "@/enums/transaction/TransactionType";
import type { QueryParamsType } from "@/types/backend/query_params";
import type { TransactionsDailyBalance, TransactionsDailyBalanceResponse } from "@/types/backend/dashboard/transactions/response";
import { parseStringToDate } from "@/utils/dateUtils";

const ENDPOINT = "/transactions";

export const transactionService = {
    async createTransaction(payload: TransactionPayloadType): Promise<TransactionResponse | BackendErrorResponse> {
        const res = await authFetch(ENDPOINT, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!res.ok) {
            const error = await res.json();
            return error as BackendErrorResponse;
        }
        const data = await res.json();
        return data as TransactionResponse;
    },

    getCurrentMonthHistory(historyByMonth: TransactionHistoryByMonth[], type: TypeTransactionType): TransactionHistoryByMonth | null {
        if (historyByMonth.length === 0) return null;
        const currentHistoryByMonth: TransactionHistoryByMonth | undefined = historyByMonth.filter(
            (item: TransactionHistoryByMonth) => item.type === type && item.month === (new Date).getMonth() + 1
        ).pop();

        return currentHistoryByMonth || null;
    },
    async getHistoryDailyBalance(queryParams: QueryParamsType): Promise<TransactionsDailyBalance[] | null> {
        const URL = `/dashboard/transactions/daily-balance?${getQueryString(queryParams)}`;
        const res = await authFetch(URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!res.ok) {
            return null;
        }
        const data = await res.json() as TransactionsDailyBalanceResponse;
        return data.data as TransactionsDailyBalance[];
    },
    async getFullHistoryDailyBalance(queryParams: QueryParamsType): Promise<TransactionsDailyBalance[] | null> {
        const history: TransactionsDailyBalance[] | null = await this.getHistoryDailyBalance(queryParams);
        if (!history || history.length === 0) return null;

        const lastDate: Date = parseStringToDate(history[0].date);
        const firstDate: Date = parseStringToDate(history[history.length - 1].date);
        const fullHistory: TransactionsDailyBalance[] = [];
        let currentRecord: TransactionsDailyBalance = history.pop() as TransactionsDailyBalance;
        for (let date = firstDate; date <= lastDate; date.setDate(date.getDate() + 1)) {
            const dateString: string = date.toISOString().slice(0, 10);

            if (currentRecord.date === dateString) {
                fullHistory.push(currentRecord);
                currentRecord = history.pop() as TransactionsDailyBalance;
            } else {
                fullHistory.push({
                    date: dateString,
                    totalIncome: 0,
                    totalExpense: 0
                });
            }
        }
        // console.log("fullHistory", fullHistory);
        return fullHistory;
    }

}