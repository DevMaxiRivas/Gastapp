import { Trash2Icon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTransition } from "react";
import type { BackendErrorResponse } from "@/types/backend/errors";
import { transactionService } from "@/services/transactionService";
import { toast } from "sonner";
import { parseBackendErrorToString } from "@/lib/backend";
import { useState } from "react";
import CustomAlertDialog from "@/components/shared/dialogs/CustomAlertDialog";

export default function TransactionDeleteDialog({ transactionId }: { transactionId: number }) {
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState<boolean>(false);

    const handleDelete = () => {
        startTransition(async () => {
            try {
                const result: null | BackendErrorResponse = await transactionService.deleteTransaction(transactionId);
                if (result === null) {
                    toast.success(`Transaction deleted successfully`);
                    setOpen(false);
                } else {
                    const errorMessage: string = parseBackendErrorToString(result as BackendErrorResponse)
                    toast.error(errorMessage);
                }
            } catch (err) {
                toast.error("An error occurred while deleting the record. Contact support if the issue persists.");
                setOpen(false);
            }
        });
    };
    return (
        <CustomAlertDialog
            title="Delete Transaction"
            description="Are you sure you want to delete this transaction?"
            action="Delete"
            trigger={
                <Button variant="destructive" size="icon" disabled={isPending}>
                    <Trash2Icon size={20} />
                </Button>
            }
            open={open}
            onOpenChange={setOpen}
            actionOnClick={handleDelete}
        />
    )
}
