import { TransactionTypeObject } from '@/enums/transaction/TransactionType';
import type { TransactionPayloadType } from '@/types/backend/transaction/payload';
import { validateDateIsAfterToday } from '@/utils/dateUtils';
import { z } from 'zod';

export const TransactionSchema = z.object({
    note: z.string().max(255),
    amount: z.number().multipleOf(0.01).positive(),
    categoryId: z.string().refine((val: string) => (val && !Number.isNaN(Number(val))), "Please select a category"),
    type: z.enum(Object.values(TransactionTypeObject) as [string, ...string[]]),
    transactionDate: z.date().refine((date: Date) => !validateDateIsAfterToday(date), "Transaction date cannot be in the future"),
});

export const TransactionInitialState: TransactionPayloadType = {
    note: "",
    amount: 0,
    categoryId: "",
    type: TransactionTypeObject.INCOME,
    transactionDate: new Date(),
};