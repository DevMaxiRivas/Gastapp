export type FormStateType = {
    errors?: Record<string, string>;
    _form?: string;
}

export type FormBaseProps = {
    onSuccess?: () => void;
    submitLabel: string;
};