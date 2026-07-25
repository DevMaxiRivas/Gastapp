import { TransactionInitialState } from "@/forms/schemas/TransactionSchema";
import { TransactionForm } from "@/features/transactions/components/TransactionForm";
import { transactionService } from "@/services/transactionService";
import { toast } from "sonner";

export default function TransactionCreateForm() {
    return <TransactionForm
        mode="create"
        defaultValues={TransactionInitialState}
        onSubmitAction={(values) => transactionService.createTransaction(values)}
        onSuccess={() => toast.success("Transaction created successfully")}
        submitLabel="Save"
    />
}