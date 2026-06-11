import type { Profile } from "../profile/response";
import type { BackendResponse } from "../response";

export type AuthUserType = {
    id: number;
    username: string;
    email: string;
    role: string;
    profile: Profile | null;
}

export interface User {
    id: number;
    name: string;
    email: string;
    profile: Profile | null;
}

export interface UsersApiResponse extends BackendResponse {
    data: User[] | null;
}
