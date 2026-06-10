import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { RegisterTransactionForm } from "./RegisterTransactionForm"


export function FormTransactionDialog() {
    return (
        <Dialog>
            <DialogTrigger render={
                <Button className="rounded-full text-white bg-primary hover:bg-primary/90 hover:text-white cursor-pointer">
                    <Plus size={24} />
                </Button>
            } />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Transaction</DialogTitle>
                    <DialogDescription>
                        Add a new transaction to your budget.
                    </DialogDescription>
                </DialogHeader>
                <RegisterTransactionForm />
            </DialogContent>
        </Dialog>
    )
}
