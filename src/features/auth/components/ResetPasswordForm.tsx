import { Button } from "@/components/ui/button";
import { Controller } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useEntityForm } from "@/hooks/useEntityForm";
import { authService } from "@/services/authService";
import { toast } from "sonner";
import { ResetPasswordSchema, formResetPasswordInitialState } from "@/forms/schemas/ResetPasswordSchema";
import type { ResetPasswordPayloadType } from "@/types/backend/auth/payload";
import PasswordInput from "@/components/shared/auth/PasswordInput";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "@/lib/constants";

export default function ResetPasswordForm({ token }: { token: string }) {
    const navigate = useNavigate();

    const { form, handleSubmit, isPending, serverError } = useEntityForm({
        schema: ResetPasswordSchema,
        defaultValues: formResetPasswordInitialState,
        onSubmitAction: async (values: ResetPasswordPayloadType) => {
            return await authService.resetPassword(values, token);
        },
        onSuccess: () => {
            toast.success("Reset password request sent successfully. Check your email for more information.");
            navigate(APP_ROUTES.LOGIN);
        },
        isReinitializable: false,
    });
    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
        >
            <FieldGroup>
                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-password">
                                New Password
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
                            <FieldLabel htmlFor="form-confirmPassword">
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
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Reset Password"}
            </Button>
        </form>
    );
}