import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect } from "react";
import { formInitialState, RegisterSchema, type RegisterFormState } from "@/forms/schemas/RegisterSchema";
import { submitRegisterAction } from "@/actions/auth/submitRegisterAction";
import { toast } from "sonner";

export default function RegisterForm() {
    const form = useForm<RegisterFormState>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: formInitialState,
        mode: "onBlur"
    });

    const [formState, formAction, isPending] = useActionState<RegisterFormState, FormData>(
        submitRegisterAction,
        formInitialState
    );


    const handleServerValidation = (form: any, formState: RegisterFormState) => {
        form.setValue('username', formState.username)
        form.setValue('email', formState.email)
    }

    useEffect(() => {
        handleServerValidation(form, formState)

        if (formState.errors) {
            Object.keys(formState.errors).forEach((k) => {
                const errkey = k as keyof RegisterFormState

                if (formState.errors && errkey in formState.errors) {
                    form.setError(errkey, { message: formState.errors ? formState.errors[errkey.toString()] : '' })
                }

            })
        }


        if (formState.success) {
            toast.success("User registered successfully");
            window.location.href = "/";
        }
    }, [formState, form]);
    return (
        <form
            className="flex flex-col gap-4"
            action={formAction}
        >
            <div className="flex flex-col gap-1">
                <Label htmlFor="username">Username</Label>
                <Input
                    id="username"
                    type="text"
                    placeholder="johndoe"
                    disabled={isPending}
                    {...form.register("username")}
                />
                {form.formState.errors.username && (
                    <p className="text-xs text-red-500">{form.formState.errors.username.message}</p>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="text"
                    placeholder="your@email.com"
                    disabled={isPending}
                    {...form.register("email")}
                />
                {form.formState.errors.email && (
                    <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>
                )}
            </div>

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

            <div className="flex flex-col gap-1">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    disabled={isPending}
                    {...form.register("confirmPassword")}
                />
                {form.formState.errors.confirmPassword && (
                    <p className="text-xs text-red-500">{form.formState.errors.confirmPassword.message}</p>
                )}
            </div>

            {/* General error messages */}
            {formState.errors?._form && (
                <div className="text-sm text-red-500 text-center">{formState.errors._form}</div>
            )}

            <Button type="submit" disabled={isPending || Object.keys(form.formState.errors).length !== 0} className="w-full">
                {isPending ? "Registrando..." : "Registrarse"}
            </Button>
        </form>
    );
}