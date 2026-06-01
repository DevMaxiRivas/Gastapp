import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function MonthlyBudgetSection() {
    return (
        <section className="px-4">
            <Card className="@container/card">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold"><b>Budget Monthly</b></CardTitle>
                </CardHeader>
                <CardContent>
                    <span className="my-2 text-sm font-semibold">ARS 200.000 of ARS 500.000 </span>
                    <Progress value={60} />
                    <div className="flex justify-between pt-2 text-sm">
                        <span>20% used</span>
                        <span className="ml-auto">ARS 200.000 Available</span>
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}