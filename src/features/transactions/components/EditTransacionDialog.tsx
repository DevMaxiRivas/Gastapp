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
import { EditIcon } from "lucide-react"


export default function EditTransacionDialog({ transaction }: { transaction: Transaction }) {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={
                <Button variant="ghost" size="icon" >
                    <EditIcon size={24} />
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
