import { Controller } from "react-hook-form";
import { Loader2 } from "lucide-react";
import type { BackendErrorResponse } from "@/types/backend/errors";
import { ProfileUpdateSchema } from "@/forms/schemas/ProfileSchema";
import type { ProfileResponse } from "@/types/backend/profile/response";
import type { ProfileFormStateType, ProfileUpdateFormStateType } from "@/types/backend/profile/form";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import InputSelect from "../../components/shared/forms/InputSelect";
import { CurrencyTypeObject } from "@/enums/profile/CurrencyType";
import { Input } from "@/components/ui/input";
import InputImage from "../../components/shared/forms/InputImage";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useEntityForm } from "@/hooks/useEntityForm";
import type z from "zod";

type ProfileFormBaseProps = {
    onSuccess?: () => void;
    submitLabel?: string;
};

type ProfileFormProps = ProfileFormBaseProps &
    (
        | {
            mode: "create";
            defaultValues: ProfileFormStateType;
            onSubmitAction: (values: z.infer<typeof ProfileUpdateSchema>) => Promise<ProfileResponse | BackendErrorResponse>;
        }
        | {
            mode: "update";
            defaultValues: ProfileUpdateFormStateType;
            onSubmitAction: (values: z.infer<typeof ProfileUpdateSchema>) => Promise<ProfileResponse | BackendErrorResponse>;
        }
    );

export default function ProfileForm(props: ProfileFormProps) {
    const { mode, defaultValues, onSubmitAction, onSuccess, submitLabel } = props;
    const label = submitLabel ? submitLabel : mode === "create" ? "Save" : "Save Changes";

    const { form, handleSubmit, isPending, serverError } = useEntityForm({
        schema: ProfileUpdateSchema,
        defaultValues: defaultValues,
        onSubmitAction: onSubmitAction,
        onSuccess: onSuccess,
    });

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <FieldGroup>
                <Controller
                    name="currency"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-profile-currency">Currency</FieldLabel>
                            <InputSelect
                                id="form-profile-currency"
                                placeholder="Select a currency"
                                items={Object.entries(CurrencyTypeObject).map(([key, value]) => ({
                                    label: key,
                                    value: value,
                                }))}
                                name={field.name}
                                value={field.value as string}
                                onChange={field.onChange}
                                invalid={fieldState.invalid}
                                disabled={isPending}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="budget"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-profile-budget">Budget</FieldLabel>
                            <Input
                                {...field}
                                type="number"
                                onChange={(e) => field.onChange(+e.target.value)}
                                id="form-profile-budget"
                                aria-invalid={fieldState.invalid}
                                placeholder="1000"
                                disabled={isPending}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="avatar"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-profile-avatar">Avatar</FieldLabel>
                            <InputImage
                                value={field.value as File[]}
                                onChange={field.onChange}
                                maxFiles={1}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
            </FieldGroup>

            {serverError && (
                <Alert variant="destructive">
                    <AlertTitle><b>Error</b></AlertTitle>
                    <AlertDescription>{serverError}</AlertDescription>
                </Alert>
            )}
            <Button type="submit" disabled={isPending} className="w-full bg-primary hover:bg-primary/90 cursor-pointer">
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : label}
            </Button>
        </form>
    );
}
