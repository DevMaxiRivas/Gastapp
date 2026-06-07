import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { PasswordInput } from "@/components/shared/auth/PasswordInput"
import { useForm } from "react-hook-form";
import type { LoginFormState } from "@/forms/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginInitialState, LoginSchema } from "@/forms/schemas/LoginSchema";
import { useActionState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import type { BackendError } from "@/types/backend/errors";
import type { AuthApiResponse } from "@/types/backend/response";
import { parseBackendErrors } from "@/lib/backend";
import { toast } from "sonner";

export default function LoginForm() {
    const form = useForm<LoginFormState>({
        resolver: zodResolver(LoginSchema),
        defaultValues: loginInitialState,
        mode: "onBlur"
    });

    const { login } = useAuth();

    const [formState, formAction, isPending] = useActionState<LoginFormState, FormData>(
        handleSubmitLogin,
        loginInitialState
    );

    async function handleSubmitLogin(_state: LoginFormState, formData: FormData): Promise<LoginFormState> {
        const payload: LoginFormState = {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        };

        try {
            const response: BackendError | AuthApiResponse = await login(payload);

            if (!response.success) {
                const errors: Record<string, string> = parseBackendErrors(response as BackendError);

                return {
                    ...payload,
                    password: "",
                    errors,
                    success: false,
                };
            }

            // Success login
            return {
                ...payload,
                password: "",
                errors: {},
                success: true,
            };
        } catch (err: unknown) {
            console.error("Network error:", err instanceof Error ? err.message : "An error occurred");
            return {
                ...payload,
                password: "",
                errors: { _form: "We were unable to connect to the server" },
                success: false,
            };
        }
    }

    const handleServerValidation = (form: any, formState: LoginFormState) => {
        form.setValue('email', formState.email)
    }

    useEffect(() => {
        handleServerValidation(form, formState)

        if (formState.errors) {
            Object.keys(formState.errors).forEach((k) => {
                const errkey = k as keyof LoginFormState

                if (formState.errors && errkey in formState.errors) {
                    form.setError(errkey, { message: formState.errors ? formState.errors[errkey.toString()] : '' })
                }

            })
        }


        if (formState.success) {
            toast.success("User Logined successfully");
            window.location.href = "/";
        }
    }, [formState, form]);

    return (
        <form
            action={formAction}
            className="flex flex-col gap-3"
        >
            <div className="flex flex-col gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    disabled={isPending}
                    {...form.register("email")}
                    required
                />
                {form.formState.errors.email && (
                    <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>
                )}
            </div>

            {/* <div className="flex flex-col gap-3">
                <Label htmlFor="password">Password</Label>
                <PasswordInput id="password" name="password" />
            </div> */}
            <div className="flex flex-col gap-1">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    disabled={isPending}
                    {...form.register("password")}
                />
                {form.formState.errors.password && (
                    <p className="text-xs text-red-500">{form.formState.errors.password.message}</p>
                )}
            </div>
            <div className="text-sm my-3">
                <a href="/forgot-password" className="font-semibold text-primary hover:text-black">
                    Forgot password?
                </a>
            </div>

            {formState.errors?._form && (
                <div className="text-sm text-red-500 text-center">{formState.errors._form}</div>
            )}

            <Button type="submit" disabled={isPending || Object.keys(form.formState.errors).length !== 0} className="w-full">
                {isPending ? "Loging in..." : "Login"}
            </Button>

        </form>
    )
}
