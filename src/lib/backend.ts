import type { BackendError } from "@/types/backend/errors";

function getInfoMessage(message: string) {
    if (!message.includes(":")) return message
    return message.split(":")[1]
}

export function parseBackendErrors(errorData: BackendError): Record<string, string> {
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
            fieldErrors[fieldName] = `${getInfoMessage(err.detail)}`
        }
    });
    return fieldErrors;
}