import type { TypeTransactionType } from "@/enums/transaction/TransactionType";
import type { BackendResponse } from "../response";

export interface Category {
    id: string;
    name: string;
    icon: string;
    type: TypeTransactionType;
}

export interface CategoryResponseApi extends BackendResponse {
    data: Category | null;
}

export interface CategoriesResponseApi extends BackendResponse {
    data: Category[] | null;
}