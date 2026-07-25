import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import TransactionCreateForm from "./TransactionCreateForm"
import CustomDialog from "@/components/shared/dialogs/CustomDialog"

export default function TransacionCreateDialog() {
    return (
        <CustomDialog
            title="Add Transaction"
            description="Add a new transaction to your budget."
            trigger={
                <Button className="rounded-full text-white bg-primary hover:bg-primary/90 hover:text-white cursor-pointer">
                    <Plus size={24} />
                </Button>
            }
        >
            <TransactionCreateForm />
        </CustomDialog>
    )
}
