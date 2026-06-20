import type { BackendErrorResponse } from "@/types/backend/errors";
import type { TransactionPayloadType } from "@/types/backend/transaction/payload";
import type { TransactionResponse, TransactionsResponse } from "@/types/backend/transaction/response";
import { authFetch, getQueryPageableString, getQueryString } from "@/lib/apiClient";
import type { QueryPageableParams, QueryParamsType } from "@/types/backend/query_params";
import type { TransactionsDailyBalance, TransactionsDailyBalanceResponse } from "@/types/backend/dashboard/transactions/response";
import { parseBackendErrorToString } from "@/lib/backend";

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

    async getHistoryDailyBalance(queryParams: QueryParamsType): Promise<TransactionsDailyBalance[]> {
        const URL = `/dashboard/transactions/daily-balance?${getQueryString(queryParams)}`;
        const res = await authFetch(URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!res.ok) {
            const error = await res.json() as BackendErrorResponse;
            throw new Error(`Error retrieving the response from the URL ${URL}. \n${parseBackendErrorToString(error)}`);
        }
        const data = await res.json() as TransactionsDailyBalanceResponse;
        return data.data;
    },

    async getTransactions(queryParams: QueryParamsType, queryPageableParams: QueryPageableParams): Promise<TransactionsResponse> {
        const URL = `${ENDPOINT}?${getQueryString(queryParams)}&${getQueryPageableString(queryPageableParams)}`;

        const res = await authFetch(URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!res.ok) {
            throw new Error(`Error retrieving the response from the URL ${URL}`);
        }

        const successResponse: TransactionsResponse = await res.json();
        return successResponse;
    }
}