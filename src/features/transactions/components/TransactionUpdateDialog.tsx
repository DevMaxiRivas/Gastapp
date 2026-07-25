import { Button } from "@/components/ui/button"
import { useState } from "react"
import type { Transaction } from "@/types/backend/transaction/response"
import { EditIcon } from "lucide-react"
import TransactionUpdateForm from "./TransactionUpdateForm"
import CustomDialog from "@/components/shared/dialogs/CustomDialog"
import { TransactionTypeObject } from "@/enums/transaction/TransactionType"

export default function TransactionUpdateDialog({ transaction }: { transaction: Transaction }) {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <CustomDialog
            title="Edit Transaction"
            description={`Edit your ${TransactionTypeObject[transaction.type].toLocaleLowerCase()} transaction.`}
            trigger={
                <Button variant="ghost" size="icon" >
                    <EditIcon size={24} />
                </Button>
            }
            open={open}
            onOpenChange={setOpen}
        >
            <TransactionUpdateForm
                transaction={transaction}
                onSuccess={() => setOpen(false)}
            />
        </CustomDialog>
    )
}
