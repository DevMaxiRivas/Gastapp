import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
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
import { TransactionInitialState, TransactionSchema } from "@/forms/schemas/TransactionSchema"
import { transactionService } from "@/services/transactionService"
import type { Transaction, TransactionResponse } from "@/types/backend/transaction/response"
import type { BackendErrorResponse } from "@/types/backend/errors"
import { parseBackendErrors } from "@/lib/backend"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { Category } from "@/types/backend/category/response"
import { capitalizeFirstLetter } from "@/utils/stringUtils"
import TransactionFormScheleton from "./TransactionFormScheleton"
import InputSelect from "@/components/shared/forms/InputSelect"
import { useCategories } from "@/hooks/useCategories"

export function RegisterTransactionForm() {
    const form = useForm<TransactionFormStateType>({
        resolver: zodResolver(TransactionSchema),
        defaultValues: TransactionInitialState,
        mode: "onSubmit"
    });

    const [isPending, startTransition] = React.useTransition();
    const [serverError, setServerError] = React.useState<string | null>(null);

    const { categories, isLoading } = useCategories()

    const handleSubmit = form.handleSubmit((values) => {
        setServerError(null);
        startTransition(async () => {
            try {
                const result: TransactionResponse | BackendErrorResponse = await transactionService.createTransaction(values);
                if (result.success) {
                    const response: TransactionResponse = result as TransactionResponse;
                    if (response.data) {
                        const data: Transaction = response.data;
                        toast.success(`Transaction ${data.id} saved successfully`);
                        form.reset();
                    }
                } else {
                    const parsedErrors: Record<string, string> = parseBackendErrors(result as BackendErrorResponse)
                    Object.keys(parsedErrors).forEach((k) => {
                        const errkey = k as keyof TransactionFormStateType

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

    const { watch } = form;
    const typeTransaction = watch("type");

    const categoriesByType = React.useMemo(() => {
        if (categories === null)
            return [];
        return categories.filter((category: Category) => category.type === typeTransaction);
    }, [categories, typeTransaction]);

    return (
        isLoading ?
            <TransactionFormScheleton />
            : <form
                id="form-register-transaction"
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
                                <FieldLabel htmlFor="form-register-transaction-amount">
                                    Amount
                                </FieldLabel>
                                <Input
                                    {...field}
                                    type="number"
                                    onChange={event => field.onChange(Number(event.target.value))}
                                    id="form-register-transaction-amount"
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
                                <FieldLabel htmlFor="form-register-transaction-categoryId">
                                    Category
                                </FieldLabel>
                                <FieldContent>
                                    <InputSelect
                                        id="form-register-transaction-categoryId"
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
                                <FieldLabel htmlFor="form-register-transaction-transactionDate">
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
                                <FieldLabel htmlFor="form-register-transaction-note">
                                    Note
                                </FieldLabel>
                                <InputGroup>
                                    <InputGroupTextarea
                                        {...field}
                                        id="form-register-transaction-note"
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
                {serverError && (
                    <Alert variant="destructive" className="my-2">
                        <AlertTitle><b>Error</b></AlertTitle>
                        <AlertDescription>{serverError}</AlertDescription>
                    </Alert>
                )}
                <Button type="submit" disabled={isPending || Object.keys(form.formState.errors).length !== 0} className="w-full">
                    {isPending ? "Processing..." : "Register"}
                </Button>
            </form>
    )
}