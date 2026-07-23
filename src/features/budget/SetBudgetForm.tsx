import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { ProfileUpdateSchema } from "@/forms/schemas/ProfileSchema";
import { useEntityForm } from "@/hooks/useEntityForm";
import { profileService } from "@/services/profileService";
import type { ProfileUpdatePayloadType } from "@/types/backend/profile/payload";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";


export function SetBudgetForm() {
    const [isModifying, setIsModifying] = useState<boolean>(false);
    const { user, refresh } = useAuth();

    if (!user || !user.profile) {
        return <Navigate to="/dashboard" replace={true} />;
    }

    const { form, handleSubmit, isPending, serverError } = useEntityForm({
        schema: ProfileUpdateSchema,
        defaultValues: {
            budget: user.profile.currentBudget,
            avatar: []
        },
        onSubmitAction: (values: ProfileUpdatePayloadType) => profileService.updateProfile(values),
        onSuccess: async () => {
            toast.success("Budget updated");
            await refresh();
            setIsModifying(false);
        },
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