import { FormExpenseDialog } from "./FormExpenseDialog";

export function FloatingButton() {
    return (
        <div className="fixed bottom-4 right-4 z-50">
            <FormExpenseDialog />
        </div>
    )
}