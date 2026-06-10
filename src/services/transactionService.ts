import type { BackendErrorResponse } from "@/types/backend/errors";
import type { TransactionPayloadType } from "@/types/backend/transaction/payload";
import type { TransactionResponse } from "@/types/backend/transaction/response";
import { authFetch } from "@/lib/apiClient";

const ENDPOINT = "/transactions";

export const transactionService = {
    async createTransaction(payload: TransactionPayloadType): Promise<TransactionResponse | BackendErrorResponse> {
        const res = await authFetch(ENDPOINT, {
            method: "POST",
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            const error = await res.json();
            return error as BackendErrorResponse;
        }
        const data = await res.json();
        return data as TransactionResponse;
    }
}