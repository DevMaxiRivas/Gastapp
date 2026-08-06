import type { ForgotPasswordPayloadType } from "@/types/backend/auth/payload";
import { z } from "zod";

export const ForgotPasswordSchema = z.object({
    email: z.email("This email is invalid"),
});

export const formForgotPasswordInitialState: ForgotPasswordPayloadType = {
    email: "",
};