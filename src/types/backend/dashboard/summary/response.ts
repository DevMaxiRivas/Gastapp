// import type { CurrencyType } from "@/enums/profile/CurrencyType";
// import type { BackendResponse } from "../../response";

import type { TypeTransactionType } from "@/enums/transaction/TransactionType";
import type { BackendResponse } from "../../response";
import type { Transaction } from "../../transaction/response";

// export interface Profile {
//     id: string;
//     currency: CurrencyType;
//     currentBudget: number;
//     avatarUrl: string;
// }

// export interface ProfileResponse extends BackendResponse {
//     data: Profile | null;
// }

export interface TransactionHistoryByMonth {
    year: number;
    month: number;
    type: TypeTransactionType;
    amount: number;
}

export interface DataSummaryResponse {
    historyByMonth: TransactionHistoryByMonth[];
    recentTransactions: Transaction[];
}

export interface SummaryResponse extends BackendResponse {
    data: DataSummaryResponse | null;
}