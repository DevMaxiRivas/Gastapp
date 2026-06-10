import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import type { UserPayloadType } from "@/types/backend/auth/payload";
import { formUserInitialState, UserSchema } from "@/forms/schemas/UserSchema";
import { useAuth } from "@/context/AuthContext";
import type { BackendErrorResponse } from "@/types/backend/errors";
import type { AuthApiResponse } from "@/types/backend/response";
import { parseBackendErrors } from "@/lib/backend";
import type { UserFormStateType } from "@/types/backend/auth/form";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import PasswordInput from "@/components/shared/auth/PasswordInput";

export default function RegisterForm() {
    const form = useForm<UserFormStateType>({
        resolver: zodResolver(UserSchema),
        defaultValues: formUserInitialState,
        mode: "onBlur"
    });

    const { register } = useAuth();

    const [isPending, startTransition] = useTransition();
    const [serverError, setServerError] = useState<string | null>(null);

    const handleSubmit = form.handleSubmit((values) => {
        setServerError(null);
        startTransition(async () => {
            try {
                const result: AuthApiResponse | BackendErrorResponse = await register(values as UserPayloadType);
                if (result.success) {
                    toast.success("Login successfully");
                    window.location.href = "/dashboard";
                } else {
                    const parsedErrors: Record<string, string> = parseBackendErrors(result as BackendErrorResponse)
                    Object.keys(parsedErrors).forEach((k) => {
                        const errkey = k as keyof UserFormStateType;

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
                    err instanceof Error ? err.message : "Error registering"
                );
            }
        });
    });

    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
        >
            <FieldGroup>
                <Controller
                    name="username"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-register-username">
                                Username
                            </FieldLabel>
                            <Input
                                {...field}
                                type="text"
                                onChange={field.onChange}
                                id="form-register-username"
                                aria-invalid={fieldState.invalid}
                                placeholder="johnDoe123"
                                disabled={isPending}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-register-email">
                                Email
                            </FieldLabel>
                            <Input
                                {...field}
                                type="email"
                                onChange={field.onChange}
                                id="form-register-email"
                                aria-invalid={fieldState.invalid}
                                placeholder="john@example.com"
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
                            <FieldLabel htmlFor="form-register-password">
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
                <Controller
                    name="confirmPassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-register-confirmPassword">
                                Confirm Password
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
                <Alert variant="destructive">
                    <AlertTitle><b>Error</b></AlertTitle>
                    <AlertDescription>{serverError}</AlertDescription>
                </Alert>
            )
            }
            <Button type="submit" disabled={isPending || Object.keys(form.formState.errors).length !== 0} className="w-full">
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Register"}
            </Button>
        </form>
    );
}