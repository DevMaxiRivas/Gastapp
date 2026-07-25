import * as React from "react"
import { Controller } from "react-hook-form"

import {
    Field,
    FieldContent,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"

import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"

import { TransactionTypeObject } from "@/enums/transaction/TransactionType"
import { DollarSign, ShoppingBag } from "lucide-react"
import { DatePicker } from "@/components/shared/forms/DatePicker"
import { TabsAsInput } from "@/components/shared/forms/TabsAsInput"
import type { TransactionFormStateType } from "@/types/backend/transaction/form"
import { TransactionSchema } from "@/forms/schemas/TransactionSchema"
import type { TransactionResponse } from "@/types/backend/transaction/response"
import type { BackendErrorResponse } from "@/types/backend/errors"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { Category } from "@/types/backend/category/response"
import { capitalizeFirstLetter } from "@/utils/stringUtils"
import TransactionFormScheleton from "./TransactionFormScheleton"
import InputSelect from "@/components/shared/forms/InputSelect"
import { useCategories } from "@/hooks/useCategories"
import type { FormBaseProps } from "@/types/forms/FormStateType"
import type z from "zod"
import { useEntityForm } from "@/hooks/useEntityForm"
import SubmitButton from "@/components/shared/forms/SubmitButton"


type TransactionFormProps = FormBaseProps &
    (
        | {
            mode: "create";
            defaultValues: TransactionFormStateType;
            onSubmitAction: (values: z.infer<typeof TransactionSchema>) => Promise<TransactionResponse | BackendErrorResponse>;
        }
        | {
            mode: "update";
            defaultValues: TransactionFormStateType;
            onSubmitAction: (values: z.infer<typeof TransactionSchema>) => Promise<TransactionResponse | BackendErrorResponse>;
        }
    );

export function TransactionForm(props: TransactionFormProps) {
    const { mode, defaultValues, onSubmitAction, onSuccess, submitLabel } = props;

    const { form, handleSubmit, isPending, serverError } = useEntityForm({
        schema: TransactionSchema,
        defaultValues: defaultValues,
        onSubmitAction: onSubmitAction,
        onSuccess: onSuccess,
        isReinitializable: mode == "create" ? true : false,
    });

    const { categories, isLoading } = useCategories()

    const { watch } = form;
    const typeTransaction = watch("type");

    const categoriesByType = React.useMemo(() => {
        if (categories === null) return [];
        return categories.filter((category: Category) => category.type === typeTransaction);
    }, [categories, typeTransaction]);

    return (
        isLoading ?
            <TransactionFormScheleton />
            : <form
                id="form-transaction"
                onSubmit={handleSubmit}
            >
                <FieldGroup>
                    <Controller
                        name="type"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <TabsAsInput
                                    options={
                                        [
                                            { label: "Expense", value: TransactionTypeObject.EXPENSE, icon: ShoppingBag },
                                            { label: "Income", value: TransactionTypeObject.INCOME, icon: DollarSign },
                                        ]
                                    }
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={mode === "update"}
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        name="amount"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-transaction-amount">
                                    Amount
                                </FieldLabel>
                                <Input
                                    {...field}
                                    type="number"
                                    onChange={event => field.onChange(Number(event.target.value))}
                                    id="form-transaction-amount"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="0.00"
                                    autoComplete="off"
                                    disabled={isPending}
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    {categoriesByType && <Controller
                        name="categoryId"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field orientation="responsive" data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-transaction-categoryId">
                                    Category
                                </FieldLabel>
                                <FieldContent>
                                    <InputSelect
                                        id="form-transaction-categoryId"
                                        placeholder="Select category"
                                        items={
                                            categoriesByType.map((category: Category) => ({
                                                value: String(category.id),
                                                label: capitalizeFirstLetter(category.name)
                                            }))
                                        }
                                        name={field.name}
                                        disabled={isPending}
                                        invalid={fieldState.invalid}
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                </FieldContent>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />}
                    <Controller
                        name="transactionDate"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-transaction-transactionDate">
                                    Date
                                </FieldLabel>
                                <DatePicker
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        name="note"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-transaction-note">
                                    Note
                                </FieldLabel>
                                <InputGroup>
                                    <InputGroupTextarea
                                        {...field}
                                        id="form-transaction-note"
                                        placeholder="Optional note of the expense or income."
                                        rows={6}
                                        className="min-h-24 resize-none"
                                        disabled={isPending}
                                    />
                                    <InputGroupAddon align="block-end">
                                        <InputGroupText className="tabular-nums">
                                            {field.value.length}/100 characters
                                        </InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>
                {
                    serverError && (
                        <Alert variant="destructive" className="my-2">
                            <AlertTitle><b>Error</b></AlertTitle>
                            <AlertDescription>{serverError}</AlertDescription>
                        </Alert>
                    )
                }
                <SubmitButton label={submitLabel} isSubmitting={isPending} />
            </form>
    )
}