import { useForm, type Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import type { z } from "zod";
import type { BackendErrorResponse } from "@/types/backend/errors";
import { parseBackendErrors } from "@/lib/backend";
import { toast } from "sonner";

/**
 *  Source Base 
 *  https://github.com/orgs/react-hook-form/discussions/13205
 **/


/**
 * Configuration params accepted by `useEntityForm`.
 *
 * @template TSchema   A Zod schema type. The form's field values are inferred
 *                      from this schema via `z.infer<TSchema>`, so the hook
 *                      stays in sync with whatever shape the schema defines
 *                      (required vs. optional fields, etc.).
 * @template TResponse The shape of a *successful* backend response. Must at
 *                      least contain a `success` boolean so the hook can
 *                      discriminate between success and error responses
 *                      returned by `onSubmitAction`.
 */
type UseEntityFormParams<TSchema extends { _zod: { output: any; input: any } }, TResponse> = {
    /**
     * Zod schema used to validate the form. Passed directly to
     * `zodResolver`, and also used to infer the TypeScript type of the
     * form values (`z.infer<TSchema>`).
     */
    schema: TSchema;

    /**
     * Initial values for the form fields. Must match the shape inferred
     * from `schema` (e.g. for an "update" form, this is typically the
     * entity's current data; for a "create" form, typically an empty/blank
     * state).
     */
    defaultValues: z.infer<TSchema>;

    /**
     * Function that performs the actual submission (e.g. a service call
     * like `profileService.createProfile` or `transactionService.update`).
     *
     * It receives the validated form values and must return a Promise that
     * resolves to either:
     * - `TResponse`: a success payload (must include `success: true`), or
     * - `BackendErrorResponse`: a structured error payload the hook knows
     *   how to parse via `parseBackendErrors`.
     *
     * Any network/runtime error should be thrown (not returned) so it's
     * caught by the hook's `try/catch` and surfaced as `serverError`.
     */
    onSubmitAction: (values: z.infer<TSchema>) => Promise<TResponse | BackendErrorResponse>;

    /**
     * Optional callback fired after a successful submission. Receives the
     * full success response so the caller can decide what to do next
     * (e.g. show a toast, redirect, refetch data, close a modal).
     *
     * Deliberately NOT handled inside the hook (e.g. no built-in
     * `window.location.reload()`), so each form controls its own
     * post-success behavior instead of a one-size-fits-all side effect.
     */
    onSuccess?: (result: TResponse) => void;
};

/**
 * Shared form-handling logic for "server-backed" forms: wires up
 * `react-hook-form` with Zod validation, manages the pending/submitting
 * state via `useTransition`, and normalizes backend error handling
 * (field-level errors via `form.setError`, plus a generic `_form`-level
 * error surfaced as `serverError`).
 *
 * This hook intentionally does NOT render any JSX or know about specific
 * fields — it only owns *behavior* (validation, submission, error state).
 * Each concrete form component (e.g. `ProfileForm`, `TransactionForm`)
 * is expected to supply its own schema/fields/layout and consume the
 * returned `form`, `handleSubmit`, `isPending`, and `serverError`.
 *
 * @template TSchema   Zod schema type for this form.
 * @template TResponse Shape of the success response; must include a
 *                      `success: boolean` discriminator field.
 *
 * @param params Configuration object — see {@link UseEntityFormParams}.
 *
 * @returns An object with:
 * - `form`: the `react-hook-form` instance (pass `form.control` to your
 *   `Controller` components, read `form.formState`, etc.).
 * - `handleSubmit`: ready-to-use submit handler; wire it directly to the
 *   `<form onSubmit={handleSubmit}>` element.
 * - `isPending`: `true` while the submission transition is in flight;
 *   use it to disable inputs/buttons and show a loading indicator.
 * - `serverError`: a generic, non-field-specific error message returned
 *   by the backend (the `_form` key from `parseBackendErrors`), or `null`
 *   if there isn't one. Field-specific errors are NOT returned here —
 *   they're already applied to `form.formState.errors` via `setError`.
 *
 * @example
 * ```tsx
 * const { form, handleSubmit, isPending, serverError } = useEntityForm({
 *   schema: ProfileSchema,
 *   defaultValues: formProfileInitialState,
 *   onSubmitAction: profileService.createProfile,
 *   onSuccess: () => toast.success("Profile created"),
 * });
 * ```
 */
export function useEntityForm<TSchema extends { _zod: { output: any; input: any } }, TResponse extends { success: boolean }>({
    schema,
    defaultValues,
    onSubmitAction,
    onSuccess,
}: UseEntityFormParams<TSchema, TResponse>) {
    // Initialize react-hook-form with Zod-based validation.
    // - `resolver`: delegates validation to the given schema on each
    //   submit/blur, converting Zod issues into RHF-compatible field errors.
    // - `defaultValues`: seeds the form with initial values (blank for
    //   "create" flows, pre-filled with entity data for "update" flows).
    // - `mode: "onBlur"`: (re)validates a field as soon as it loses focus,
    //   rather than waiting until submit, for faster user feedback.
    const form = useForm<z.infer<TSchema>>({
        resolver: zodResolver(schema as any),
        defaultValues,
        mode: "onBlur",
    });

    const { dirtyFields } = form.formState;

    // `isPending` tracks whether the submission transition is currently
    // running; `startTransition` marks the async work inside it as a
    // non-urgent transition so React can keep the UI responsive while it
    // resolves (e.g. avoids blocking input while awaiting the request).
    const [isPending, startTransition] = useTransition();

    // Holds a generic, form-level error message (not tied to a specific
    // field) — e.g. "Something went wrong" from the backend, or a message
    // derived from a thrown JS Error. `null` means there's currently no
    // such error to display.
    const [serverError, setServerError] = useState<string | null>(null);

    // Wrap react-hook-form's `handleSubmit`: RHF first runs Zod validation
    // and only invokes this inner callback with the parsed/validated
    // `values` if validation passed.
    const handleSubmit = form.handleSubmit((values) => {
        if (Object.keys(dirtyFields).length === 0) {
            toast.error("No changes detected");
            return;
        }

        // Clear any previous form-level error before attempting a new
        // submission, so stale errors don't linger on screen.
        setServerError(null);

        // Run the actual submission inside a transition so React treats
        // it as interruptible/non-blocking UI work; `isPending` flips to
        // `true` for the duration of the async callback below.
        startTransition(async () => {
            try {
                // Delegate the actual network call to the caller-provided
                // function, passing along the validated values.
                const result = await onSubmitAction(values as never);

                if (result.success) {
                    // Success path: hand the full response back to the
                    // caller via `onSuccess`, without prescribing what
                    // should happen next (toast, redirect, refetch, etc.).
                    onSuccess?.(result as TResponse);
                } else {
                    // Error path: the backend responded, but the
                    // operation itself failed (e.g. validation errors
                    // from the server, business-rule violations).
                    // `parseBackendErrors` normalizes the raw backend
                    // error payload into a flat { fieldName: message }
                    // record (plus a special `_form` key for a
                    // non-field-specific message).
                    const parsedErrors: Record<string, string> = parseBackendErrors(
                        result as BackendErrorResponse
                    );

                    // Apply each parsed error to its corresponding field
                    // on the form, so it renders next to the relevant
                    // input via `fieldState.error`.
                    Object.keys(parsedErrors).forEach((k) => {
                        // Cast the string key to a valid field name/path
                        // of the current form's values, since
                        // `parsedErrors` is a loosely-typed
                        // `Record<string, string>` coming from an
                        // untyped backend payload.
                        const errkey = k as Path<z.infer<TSchema>>;

                        // Skip the special `_form` key here — it's not a
                        // real field, it's handled separately below as
                        // the generic `serverError`.
                        if (errkey !== ("_form" as typeof errkey)) {
                            form.setError(errkey, { message: parsedErrors[errkey] });
                        }
                    });

                    // If the backend included a general, non-field error
                    // (e.g. "Could not process request"), surface it via
                    // `serverError` for the consuming component to render
                    // (typically in an `<Alert variant="destructive">`).
                    if (parsedErrors._form) {
                        setServerError(parsedErrors._form);
                    }
                }
            } catch (err) {
                // Catches network failures, thrown exceptions inside
                // `onSubmitAction`, or any other unexpected runtime
                // error — falls back to the error's message, or a
                // generic default if it's not an `Error` instance.
                setServerError(err instanceof Error ? err.message : "Error processing the form");
            }
        });
    });

    // Expose only what consuming form components need: the RHF instance
    // (for `control`, `formState`, etc.), the wrapped submit handler, the
    // pending flag, and the generic server error message.
    return { form, handleSubmit, isPending, serverError };
}