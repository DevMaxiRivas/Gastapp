import type { ForgotPasswordSchema } from "@/forms/schemas/ForgotPasswordSchema";
import type { ResetPasswordSchema } from "@/forms/schemas/ResetPasswordSchema";
import type { UserSchema } from "@/forms/schemas/UserSchema";
import type z from "zod";

export type LoginPayloadType = {
    email: string;
    password: string;
}

export type RegisterPayloadType = {
    name: string;
    email: string;
    password: string;
}


export type UserPayloadType = z.infer<typeof UserSchema>;

export type ForgotPasswordPayloadType = z.infer<typeof ForgotPasswordSchema>;

export type ResetPasswordPayloadType = z.infer<typeof ResetPasswordSchema>;