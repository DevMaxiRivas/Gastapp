import type { TypeTransactionType } from "@/enums/transaction/TransactionType";
import type { Category } from "../category/response";
import type { BackendResponse } from "../response";

export interface Transaction {
    id: number;
    amount: number;
    type: TypeTransactionType;
    transactionDate: string;
    note: string;
    category: Category;
}

export interface TransactionResponse extends BackendResponse {
    data: Transaction;
}

export interface TransactionsResponse extends BackendResponse {
    data: Transaction[];
}