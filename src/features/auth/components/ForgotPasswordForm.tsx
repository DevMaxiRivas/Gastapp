import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { ForgotPasswordSchema, formForgotPasswordInitialState } from "@/forms/schemas/ForgotPasswordSchema";
import { useEntityForm } from "@/hooks/useEntityForm";
import type { ForgotPasswordPayloadType } from "@/types/backend/auth/payload";
import { authService } from "@/services/authService";
import { toast } from "sonner";

export default function ForgotPasswordForm() {
    const { form, handleSubmit, isPending, serverError } = useEntityForm({
        schema: ForgotPasswordSchema,
        defaultValues: formForgotPasswordInitialState,
        onSubmitAction: async (values: ForgotPasswordPayloadType) => {
            return await authService.forgotPassword(values);
        },
        onSuccess: () => {
            toast.success("Forgot password request sent successfully. Check your email for the reset link.");
        },
        onError: (error: any) => {
            toast.error(error.message);
        },
        isReinitializable: true,
    });
    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
        >
            <FieldGroup>
                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-email">
                                Email
                            </FieldLabel>
                            <Input
                                {...field}
                                type="email"
                                onChange={field.onChange}
                                id="form-email"
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
            </FieldGroup>
            {serverError && (
                <Alert variant="destructive">
                    <AlertTitle><b>Error</b></AlertTitle>
                    <AlertDescription>{serverError}</AlertDescription>
                </Alert>
            )
            }
            <Button type="submit" disabled={isPending || Object.keys(form.formState.errors).length !== 0} className="w-full">
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send Reset Link"}
            </Button>
        </form>
    );
}