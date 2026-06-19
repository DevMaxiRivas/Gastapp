import { SectionAsCard } from "@/components/shared/sections/SectionAsCard";
import { SectionAsCardHeader } from "@/components/shared/sections/SectionAsCardHeader";
import TransactionsTable from "@/features/transactions/components/TransactionsTable";

export default function TransactionsSection() {
    return (
        <SectionAsCard
            header={
                <SectionAsCardHeader
                    title="History"
                    description="View and manage your transactions history"
                />
            }
            content={<TransactionsTable />}
        />
    )
}