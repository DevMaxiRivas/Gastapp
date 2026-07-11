import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import type { Transaction } from "@/types/backend/transaction/response"
import UpdateTransactionForm from "./UpdateTransactionForm"


export function EditTransacionDialog({ transaction }: { transaction: Transaction }) {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={
                <Button
                    className={"text-black bg-transparent border-black hover:bg-black hover:text-white dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"}>
                    Edit
                </Button>
            } />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Transaction</DialogTitle>
                    <DialogDescription>
                        Edit your transaction.
                    </DialogDescription>
                </DialogHeader>
                <UpdateTransactionForm transaction={transaction} hiddenDialog={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    )
}
