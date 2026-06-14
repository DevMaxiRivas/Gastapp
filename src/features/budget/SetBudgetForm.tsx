import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { ProfileUpdateSchema } from "@/forms/schemas/ProfileSchema";
import { parseBackendErrors } from "@/lib/backend";
import { profileService } from "@/services/profileService";
import type { BackendErrorResponse } from "@/types/backend/errors";
import type { ProfileUpdateFormStateType } from "@/types/backend/profile/form";
import type { ProfileResponse } from "@/types/backend/profile/response";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";


export function SetBudgetForm() {
    const [isModifying, setIsModifying] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition();
    const [serverError, setServerError] = useState<string | null>(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleRefresh = () => {
        navigate(0);
    };

    if (!user || !user.profile) {
        return <Navigate to="/dashboard" replace={true} />;
    }

    const form = useForm<ProfileUpdateFormStateType>({
        resolver: zodResolver(ProfileUpdateSchema),
        defaultValues: {
            budget: user.profile.currentBudget,
            avatar: []
        },
        mode: "onSubmit"
    });

    const handleSubmit = form.handleSubmit((values) => {
        console.log(values);
        setServerError(null);
        startTransition(async () => {
            try {
                const result: ProfileResponse | BackendErrorResponse = await profileService.updateProfile(values);
                if (result.success) {
                    const response: ProfileResponse = result as ProfileResponse;
                    if (response.data) {
                        toast.success(`Profile updated successfully`);
                        handleRefresh();
                    }
                } else {
                    const parsedErrors: Record<string, string> = parseBackendErrors(result as BackendErrorResponse)
                    Object.keys(parsedErrors).forEach((k) => {
                        const errkey = k as keyof ProfileUpdateFormStateType

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
                    err instanceof Error ? err.message : "Error saving transaction"
                );
            }
        });
    });

    return (
        isModifying ?
            <form
                id="form-profile"
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
            >
                <div className="flex gap-3">
                    <FieldGroup>
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
                    </FieldGroup>
                    <div className="flex flex-col justify-end gap-1 pl-4">
                        <Button type="submit" disabled={isPending || Object.keys(form.formState.errors).length !== 0} className="w-full bg-green-600 text-white hover:bg-green-500">
                            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
                        </Button>
                        <Button type="button" disabled={isPending} className="w-full bg-red-600 text-white hover:bg-red-500" onClick={() => setIsModifying(false)}>Cancel</Button>
                    </div>
                </div>
                {serverError && (
                    <Alert variant="destructive">
                        <AlertTitle><b>Error</b></AlertTitle>
                        <AlertDescription>{serverError}</AlertDescription>
                    </Alert>
                )
                }
            </form> : <div className="flex justify-between items-center " >
                <div>
                    <p className="text-lg font-medium">Current limit</p>
                    <p className="text-2xl font-semibold">{user.profile.currency} {(user.profile.currentBudget).toLocaleString()}</p>
                </div>
                <Button onClick={() => setIsModifying(true)}>Modify</Button>
            </div>
    );
}