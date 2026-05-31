import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import RegisterExpenseForm from "./RegisterExpenseForm"

export function FormExpenseDialog() {
    return (
        <Dialog>
            <DialogTrigger render={
                <Button className="rounded-full text-white bg-primary hover:bg-primary/90 hover:text-white cursor-pointer">
                    <Plus size={24} />
                </Button>
            } />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Expense</DialogTitle>
                    <DialogDescription>
                        Add a new expense to your budget.
                    </DialogDescription>
                </DialogHeader>
                <RegisterExpenseForm />
                <DialogFooter>
                    <DialogClose render={<Button className={"w-full cursor-pointer bg-red-600 hover:bg-red-600/90 text-white hover:text-white"}>Cancel</Button>} />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
