import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { useEffect, useState, useTransition } from "react"
import type { TransactionsDailyBalance } from "@/types/backend/dashboard/transactions/response"
import type { QueryParamsType } from "@/types/backend/query_params"
import { transactionService } from "@/services/transactionService"
import MonthlyExpensesGraphSkeleton from "./skeletons/MonthlyExpensesGraphSkeleton"
import DailyComparisonChart, { type ChartData } from "@/components/shared/graphs/DailyComparisonChart"
import { parseStringToDate } from "@/utils/dateUtils"
import type { ChartConfig } from "@/components/ui/chart"

export const description = "An interactive area chart"

const chartConfig = {
    y1: {
        label: "Income",
        color: "#22c55e",
    },
    y2: {
        label: "Expense",
        color: "#ef4444",
    },
} satisfies ChartConfig

export function MonthlyBalanceGraph() {
    const [filter, setFilter] = useState<QueryParamsType>({
        fromDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        toDate: new Date(),
        userId: null
    })

    const [timeRange, setTimeRange] = useState("30d")

    const [isPending, startTransition] = useTransition();
    const [chartData, setChartData] = useState<TransactionsDailyBalance[]>([]);

    const handleMapping = (data: TransactionsDailyBalance[]): ChartData[] => {
        return data.map((item: TransactionsDailyBalance) => {
            return {
                date: parseStringToDate(item.date),
                y1: item.totalIncome,
                y2: item.totalExpense
            } as const
        })
    }

    useEffect(() => {
        startTransition(async () => {
            const data: TransactionsDailyBalance[] | null = await transactionService.getFullHistoryDailyBalance(filter);
            if (data) {
                setChartData(data);
            }
        });
    }, [filter])

    return isPending ?
        <MonthlyExpensesGraphSkeleton /> :
        (<Card className="@container/card">
            <CardHeader>
                <CardTitle className="text-xl font-semibold"><b>Monthly Balance</b></CardTitle>
                <CardDescription>
                    <span className="hidden @[540px]/card:block">
                        Daily balance for the last 30 days
                    </span>
                    <span className="@[540px]/card:hidden">Last 30 days</span>
                </CardDescription>
                <CardAction>
                    <ToggleGroup
                        // type="single"
                        // value={timeRange}
                        // onValueChange={setTimeRange}
                        variant="outline"
                        className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
                    >
                        <ToggleGroupItem value="90d">30 days</ToggleGroupItem>
                        <ToggleGroupItem value="30d">2 months</ToggleGroupItem>
                        <ToggleGroupItem value="7d">3 months</ToggleGroupItem>
                    </ToggleGroup>
                </CardAction>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <DailyComparisonChart
                    data={chartData}
                    chartConfig={chartConfig}
                    handleMapping={handleMapping}
                />
            </CardContent>
        </Card>)

}
