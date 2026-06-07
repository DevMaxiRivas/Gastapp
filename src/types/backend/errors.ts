export interface BackendError {
    success: boolean;
    errors: BackendErrorDetail[];
}

export interface BackendErrorDetail {
    code: number;
    detail: string;
    links: { about: string };
    source: { pointer: string };
    status: string;
    title: string;
}