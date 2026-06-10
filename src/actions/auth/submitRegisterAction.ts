import { RegisterSchema, type RegisterFormState } from "@/forms/schemas/RegisterSchema";
import { parseBackendErrors } from "@/lib/backend";
import type { RegisterPayloadType } from "@/types/backend/auth/payload";
import type { BackendErrorResponse } from "@/types/backend/errors";

const ENDPOINT = "api/v1/auth/register";

export async function submitRegisterAction(
    _prevState: RegisterFormState,
    formData: FormData
): Promise<RegisterFormState> {
    const rawData = {
        username: formData.get("username") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        confirmPassword: formData.get("confirmPassword") as string,
    };


    // Zod Validation (server side)
    const validated = RegisterSchema.safeParse(rawData);

    if (!validated.success) {
        const errors: Record<string, string> = {};
        validated.error.issues.forEach((issue) => {
            if (issue.path[0]) {
                errors[issue.path[0] as string] = issue.message;
            }
        });

        console.log(rawData, errors);

        return {
            ...rawData,
            password: "",
            confirmPassword: "",
            errors,
            success: false,
        };
    }

    // Data ready to send to the backend
    const payload: RegisterPayloadType = {
        name: validated.data.username,
        email: validated.data.email,
        password: validated.data.password,
    };

    try {
        const response = await fetch(ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const errorData: BackendErrorResponse = await response.json();

        if (!response.ok) {
            const errors: Record<string, string> = parseBackendErrors(errorData);

            return {
                ...rawData,
                password: "",
                confirmPassword: "",
                errors,
                success: false,
            };
        }

        // Success register
        return {
            ...rawData,
            password: "",
            confirmPassword: "",
            errors: {},
            success: true,
        };
    } catch (error) {
        console.error("Network error:", error);
        return {
            ...rawData,
            password: "",
            confirmPassword: "",
            errors: { _form: "We were unable to connect to the server" },
            success: false,
        };
    }
}