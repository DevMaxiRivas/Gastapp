import type { UserPayloadType } from "@/types/backend/auth/payload";
import { z } from "zod";

export const UserSchema = z.object({
    username: z.string().min(5, "Username too short").max(50, "Username too long"),
    email: z.email("This email is invalid"),
    password: z.string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/\d/, "Password must contain at least one number")
        .regex(/[@$!%*?&]/, "Password must contain at least one special character [@$!%*?&]"),
    confirmPassword: z.string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/\d/, "Password must contain at least one number")
        .regex(/[@$!%*?&]/, "Password must contain at least one special character [@$!%*?&]"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ['confirmPassword']
});

export const formUserInitialState: UserPayloadType = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
};