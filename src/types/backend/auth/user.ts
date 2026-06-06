export type AuthUserType = {
    access_token: string;
    id: number;
    name: string;
    sub: string;
    role: string;
    permissions: string[];
}