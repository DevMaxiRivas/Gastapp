import type { BackendErrorResponse } from "@/types/backend/errors";
import type { TransactionPayloadType } from "@/types/backend/transaction/payload";
import type { TransactionResponse } from "@/types/backend/transaction/response";
import { authFetch } from "@/lib/apiClient";
import type { TransactionHistoryByMonth } from "@/types/backend/dashboard/summary/response";
import type { TypeTransactionType } from "@/enums/transaction/TransactionType";

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
    }
}