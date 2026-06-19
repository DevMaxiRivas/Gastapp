import type { ColorType } from "@/types/colors/types";

export const TransactionTypeObject = {
  INCOME: "INCOME",
  EXPENSE: "EXPENSE",
} as const;

export type TypeTransactionType = typeof TransactionTypeObject[keyof typeof TransactionTypeObject];

export function getColorByTransactionType(type: TypeTransactionType): ColorType {
  if (type === TransactionTypeObject.EXPENSE) return "danger";
  return "success";
}