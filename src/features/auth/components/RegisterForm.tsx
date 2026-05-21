"use client";

import { useActionState } from "react";
// import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import { registerAction } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { useAuth } from "@/contexts/auth-context";
import { PasswordInput } from "@/components/shared/auth/PasswordInput";

type RegisterState = {
    error?: string;
    fieldErrors?: {
        username?: string;
        email?: string;
        password?: string;
        confirmPassword?: string;
    };
    user?: { id: number; username: string; email: string };
} | null;

export default function RegisterForm() {
    return (
        <form
            // action={action} 
            className="flex flex-col gap-4 w-full max-w-sm"
        >

            {/* {state?.error && (
            <div className="px-4 py-3 text-sm text-red-600 border border-red-200 rounded-lg bg-red-50">
                {state.error}
            </div>
        )} */}

            <div className="flex flex-col gap-1">
                <Label htmlFor="username">Username</Label>
                <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="johndoe"
                    required
                />
                {/* {state?.fieldErrors?.username && (
                    <p className="text-xs text-red-500">{state.fieldErrors.username}</p>
                )} */}
            </div>

            <div className="flex flex-col gap-1">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                />
                {/* {state?.fieldErrors?.email && (
                    <p className="text-xs text-red-500">{state.fieldErrors.email}</p>
                )} */}
            </div>

            <div className="flex flex-col gap-1">
                <Label htmlFor="password">Password</Label>
                <PasswordInput id="password" name="password" />
                {/* {state?.fieldErrors?.password && (
                    <p className="text-xs text-red-500">{state.fieldErrors.password}</p>
                )} */}
            </div>

            <div className="flex flex-col gap-1">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <PasswordInput id="confirmPassword" name="confirmPassword" />
                {/* {state?.fieldErrors?.confirmPassword && (
                    <p className="text-xs text-red-500">{state.fieldErrors.confirmPassword}</p>
                )} */}
            </div>

            <Button
                type="submit"
                // disabled={isPending} 
                className="w-full">
                {/* {isPending ? "Creando cuenta..." : "Create account"} */}
                Register
            </Button>

            <p className="text-sm text-center text-muted-foreground">
                Already have an account?
                <a href="/login" className="underline">Sign in</a>
            </p>
        </form>
    );
}