import { z } from "zod";

export const RegisterSchema = z.object({
    username: z.string().min(5, "Username too short").max(50, "Username too long"),
    email: z.email("Invalid email"),
    password: z.string().min(5, "Password too short"),
    confirmPassword: z.string().min(5, "Password too short"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ['confirmPassword']
});

export type RegisterType = z.infer<typeof RegisterSchema>;

export type RegisterFormState = RegisterType & {
    errors?: Record<string, string>;
    success?: boolean;
    _form?: string;
};

export const formInitialState: RegisterType = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
};