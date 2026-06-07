interface Profile {
    currency: string;
    currentBudget: number;
    avatarUrl: string;
}

export type AuthUserType = {
    id: number;
    name: string;
    email: string;
    role: string;
    profile: Profile | null;
}