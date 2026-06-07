import { z } from 'zod';

export const LoginSchema = z.object({
    email: z.email("This email is invalid"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type LoginType = z.infer<typeof LoginSchema>;

export type LoginFormState = LoginType & {
    errors?: Record<string, string>;
    success?: boolean;
    _form?: string;
};

export const loginInitialState: LoginType = {
    email: "",
    password: "",
};