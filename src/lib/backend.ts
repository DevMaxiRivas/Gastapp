import type { BackendErrorResponse } from "@/types/backend/errors";

function getInfoMessage(message: string) {
    if (!message.includes(":")) return message
    return message.split(":")[1].trim().toLowerCase()
}

export function parseBackendErrors(errorData: BackendErrorResponse): Record<string, string> {
    const fieldErrors: Record<string, string> = {};
    errorData.errors?.forEach((err) => {
        const match = err.source?.pointer?.match(/body\.(\w+)/);
        const fieldName = match ? match[1] : "_form";
        if (match) {
            if (fieldErrors[fieldName]) {
                fieldErrors[fieldName] += `, ${getInfoMessage(err.detail)}`;
            } else {
                fieldErrors[fieldName] = `This ${fieldName} ${getInfoMessage(err.detail)}`
            }
        } else {
            fieldErrors[fieldName] = err.detail
        }
    });
    return fieldErrors;
}

export function parseBackendErrorToString(errorData: BackendErrorResponse): string {
    if (errorData.errors?.length > 0) {
        return errorData.errors?.map((err) => `${err.title}: ${err.detail}`).join("\n");
    }
    return "Unknown error";
}