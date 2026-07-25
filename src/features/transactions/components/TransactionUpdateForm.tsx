import { TransactionForm } from "@/features/transactions/components/TransactionForm";
import { transactionService } from "@/services/transactionService";
import { toast } from "sonner";
import type { Transaction } from "@/types/backend/transaction/response";
import { parseISO } from "date-fns";

type TransactionUpdateFormProps = {
    transaction: Transaction;
    onSuccess?: () => void;
}

export default function TransactionUpdateForm({ transaction, onSuccess }: TransactionUpdateFormProps) {
    return <TransactionForm
        mode="update"
        defaultValues={{
            type: transaction.type,
            amount: transaction.amount,
            note: transaction.note,
            categoryId: String(transaction.category.id),
            transactionDate: parseISO(transaction.transactionDate)
        }}
        onSubmitAction={(values) => transactionService.updateTransaction(transaction.id, values)}
        onSuccess={() => {
            toast.success("Transaction updated successfully");
            onSuccess?.();
        }}
        submitLabel="Save changes"
    />
}