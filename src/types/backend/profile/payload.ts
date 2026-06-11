import { z } from "zod";
import { ProfileSchema } from "@/forms/schemas/ProfileSchema";

export type ProfilePayloadType = z.infer<typeof ProfileSchema>;