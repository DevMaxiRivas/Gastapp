import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// import { PasswordInput } from "@/components/shared/auth/PasswordInput"
import { Controller, useForm } from "react-hook-form";
import type { LoginFormState } from "@/forms/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginInitialState, LoginSchema } from "@/forms/schemas/LoginSchema";
import { useState, useTransition } from "react";
import { useAuth } from "@/context/AuthContext";
import type { BackendErrorResponse } from "@/types/backend/errors";
import type { AuthApiResponse } from "@/types/backend/response";
import { parseBackendErrors } from "@/lib/backend";
import { toast } from "sonner";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import PasswordInput from "@/components/shared/auth/PasswordInput";
import { Loader2 } from "lucide-react";
import type { LoginPayloadType } from "@/types/backend/auth/payload";

export default function LoginForm() {
    const form = useForm<LoginFormState>({
        resolver: zodResolver(LoginSchema),
        defaultValues: loginInitialState,
        mode: "onSubmit"
    });

    const { login } = useAuth();

    const [isPending, startTransition] = useTransition();
    const [serverError, setServerError] = useState<string | null>(null);

    const handleSubmit = form.handleSubmit((values) => {
        setServerError(null);
        startTransition(async () => {
            try {
                const result: AuthApiResponse | BackendErrorResponse = await login(values as LoginPayloadType);
                if (result.success) {
                    toast.success("Login successfully");
                    window.location.href = "/dashboard";
                } else {
                    const parsedErrors: Record<string, string> = parseBackendErrors(result as BackendErrorResponse)
                    Object.keys(parsedErrors).forEach((k) => {
                        const errkey = k as keyof LoginFormState

                        if (errkey !== '_form') {
                            form.setError(errkey, { message: parsedErrors[errkey] })
                        }

                    })

                    if (parsedErrors._form) {
                        setServerError(parsedErrors._form)
                    }
                }
            } catch (err) {
                setServerError(
                    err instanceof Error ? err.message : "Error logining in"
                );
            }
        });
    });

    return (
        <form
            id="form-login"
            onSubmit={handleSubmit}
        >
            <FieldGroup>
                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-login-email">
                                Email
                            </FieldLabel>
                            <Input
                                {...field}
                                type="email"
                                onChange={field.onChange}
                                id="form-login-email"
                                aria-invalid={fieldState.invalid}
                                placeholder="user@example.com"
                                disabled={isPending}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-login-password">
                                Password
                            </FieldLabel>
                            <PasswordInput
                                value={field.value}
                                onChange={field.onChange}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </FieldGroup>
            {serverError && (
                <Alert variant="destructive" className="my-2">
                    <AlertTitle><b>Error</b></AlertTitle>
                    <AlertDescription>{serverError}</AlertDescription>
                </Alert>
            )
            }
            <Button type="submit" disabled={isPending || Object.keys(form.formState.errors).length !== 0} className="mt-2 w-full">
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Login"}
            </Button>
        </form>
    );
}
