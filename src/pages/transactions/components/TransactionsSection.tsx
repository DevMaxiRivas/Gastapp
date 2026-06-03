import { Section } from "@/components/layout/Section";
import type { RecentCustomerRow } from "@/components/shared/tables/schema";
import { RecentCustomersTable } from "@/components/shared/tables/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import customersData from "../data.json";

export function TransactionsSection() {
    const customers = customersData as RecentCustomerRow[];
    return (
        <Section>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription className="text-xl font-semibold">
                    </CardDescription>
                    <CardTitle>
                        <b>Transactions History</b>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <RecentCustomersTable data={customers} />
                </CardContent>
            </Card>
        </Section>
    )
}