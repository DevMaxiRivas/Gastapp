export interface BackendResponse {
    success: boolean;
    statusCode: number;
    meta: null | MetaResponse;
}

export interface AuthApiResponse extends BackendResponse {
    data: { access_token: string };
}

export interface UsersApiResponse extends BackendResponse {
    data: UserResponse[] | null;
}

export interface UserResponse {
    id: number;
    name: string;
    email: string;
    profile: ProfileResponse | null;
}

export interface ProfileResponse {
    currency: string;
    currentBudget: number;
    avatarUrl: string;
}

export interface MetaResponse {
    currentPage: number;
    totalPages: number;
    totalElements: number;
    pageSize: number;
    isFirst: boolean;
    isLast: boolean;
}