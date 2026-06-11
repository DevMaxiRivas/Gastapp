import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import type { BackendErrorResponse } from "@/types/backend/errors";
import type { ProfileResponse } from "@/types/backend/profile/response";
import { parseBackendErrors } from "@/lib/backend";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { formProfileInitialState, ProfileSchema } from "@/forms/schemas/ProfileSchema";
import type { ProfileFormStateType } from "@/types/backend/profile/form";
import InputImage from "@/components/shared/forms/InputImage";
import InputSelect from "@/components/shared/forms/InputSelect";
import { CurrencyTypeObject } from "@/enums/profile/CurrencyType";
import { profileService } from "@/services/profileService";

export default function ProfileForm() {
    const form = useForm<ProfileFormStateType>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: formProfileInitialState,
        mode: "onBlur"
    });


    const [isPending, startTransition] = useTransition();
    const [serverError, setServerError] = useState<string | null>(null);

    const handleSubmit = form.handleSubmit((values) => {
        setServerError(null);
        startTransition(async () => {
            try {
                const result: ProfileResponse | BackendErrorResponse = await profileService.createProfile(values);
                if (result.success) {
                    toast.success("Profile created successfully");
                    window.location.reload();
                } else {
                    const parsedErrors: Record<string, string> = parseBackendErrors(result as BackendErrorResponse)
                    Object.keys(parsedErrors).forEach((k) => {
                        const errkey = k as keyof ProfileFormStateType;

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
                    name="currency"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-profile-currency">
                                Currency
                            </FieldLabel>
                            <InputSelect
                                id="form-profile-currency"
                                placeholder="Select a currency"
                                items={Object.entries(CurrencyTypeObject).map(([key, value]) => ({
                                    label: key,
                                    value: value,
                                }))}
                                name={field.name}
                                value={field.value}
                                onChange={field.onChange}
                                invalid={fieldState.invalid}
                                disabled={isPending}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="budget"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-profile-budget">
                                Budget
                            </FieldLabel>
                            <Input
                                {...field}
                                type="number"
                                onChange={(e) => field.onChange(+e.target.value)}
                                id="form-profile-budget"
                                aria-invalid={fieldState.invalid}
                                placeholder="1000"
                                disabled={isPending}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="avatar"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-profile-avatar">
                                Avatar
                            </FieldLabel>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                            <InputImage
                                value={field.value}
                                onChange={field.onChange}
                                maxFiles={1}
                            />
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