export const TransactionTypeObject = {
  INCOME: "INCOME",
  EXPENSE: "EXPENSE",
} as const;

export type TypeTransactionType = typeof TransactionTypeObject[keyof typeof TransactionTypeObject];