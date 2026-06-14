import type { ProfilePayloadType, ProfileUpdatePayloadType } from "@/types/backend/profile/payload";
import type { FormStateType } from "@/types/forms/FormStateType";

export type ProfileFormStateType = ProfilePayloadType & FormStateType;

export type ProfileUpdateFormStateType = ProfileUpdatePayloadType & FormStateType;