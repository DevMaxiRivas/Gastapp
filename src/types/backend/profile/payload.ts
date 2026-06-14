import { z } from "zod";
import { ProfileSchema, ProfileUpdateSchema } from "@/forms/schemas/ProfileSchema";

export type ProfilePayloadType = z.infer<typeof ProfileSchema>;

export type ProfileUpdatePayloadType = z.infer<typeof ProfileUpdateSchema>;