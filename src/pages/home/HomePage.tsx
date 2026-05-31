import { QuickStatsSection } from "@/pages/home/components/QuickStatsSection";
// import RegisterExpenseForm from "@/features/expenses/components/RegisterExpenseForm";
import { MonthlyBudgetSection } from "./components/MonthlyBudgetSection";
import { MonthlyExpensesSection } from "./components/MonthlyExpensesSection";
import { TableExpensesHistorySection } from "./components/TableExpensesHistorySection";
import { FormExpenseDialog } from "@/features/expenses/components/FormExpenseDialog";

function FloatingButton() {
    return (
        <div className="fixed bottom-4 right-4 z-50">
            <FormExpenseDialog />
        </div>
    )
}

export function HomePage() {
    return (
        <div className="p-4 space-y-2">
            {/* <RegisterExpenseForm /> */}
            <FloatingButton />
            <QuickStatsSection />
            <MonthlyBudgetSection />
            <MonthlyExpensesSection />
            <TableExpensesHistorySection />
        </div>
    );
}