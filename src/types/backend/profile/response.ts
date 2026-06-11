import type { CurrencyType } from "@/enums/profile/CurrencyType";
import type { BackendResponse } from "../response";

export interface Profile {
    id: string;
    currency: CurrencyType;
    currentBudget: number;
    avatarUrl: string;
}

export interface ProfileResponse extends BackendResponse {
    data: Profile | null;
}