import { authFetch } from "@/lib/apiClient";
import type { BackendErrorResponse } from "@/types/backend/errors";
import type { ProfilePayloadType } from "@/types/backend/profile/payload";
import type { ProfileResponse } from "@/types/backend/profile/response";

const ENDPOINT = "/me/profile";

export const profileService = {
    async createProfile(payload: ProfilePayloadType): Promise<ProfileResponse | BackendErrorResponse> {
        const avatar: File | undefined = payload.avatar[0];
        const profileData = {
            currency: payload.currency,
            currentBudget: payload.budget
        };

        const formData = new FormData();
        formData.append('data', new Blob([JSON.stringify(profileData)], { type: 'application/json' }));
        if (avatar) formData.append("avatarImage", avatar);

        const res = await authFetch(ENDPOINT, {
            method: "POST",
            body: formData
        });

        if (!res.ok) {
            const error = await res.json();
            return error as BackendErrorResponse;
        }
        const data = await res.json();
        return data as ProfileResponse;
    }
}