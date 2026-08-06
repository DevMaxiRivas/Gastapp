export interface BackendResponse {
    success: true;
    statusCode: number;
    meta: null | MetaResponse;
}

export interface AuthApiResponse extends BackendResponse {
    data: { access_token: string };
}

export interface MetaResponse {
    currentPage: number;
    totalPages: number;
    totalElements: number;
    pageSize: number;
    isFirst: boolean;
    isLast: boolean;
}