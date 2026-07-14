import { Trash2Icon } from "lucide-react"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useTransition } from "react";
import type { BackendErrorResponse } from "@/types/backend/errors";
import { transactionService } from "@/services/transactionService";
import { toast } from "sonner";
import { parseBackendErrorToString } from "@/lib/backend";
import { useState } from "react";

export default function DeleteTransacionDialog({ transactionId }: { transactionId: number }) {
    const [_isPending, startTransition] = useTransition();
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
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger
                render={<Button variant="destructive" size="icon" >
                    <Trash2Icon size={24} />
                </Button>}
            />
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Delete Transaction?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete this transaction?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} variant="destructive">Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
