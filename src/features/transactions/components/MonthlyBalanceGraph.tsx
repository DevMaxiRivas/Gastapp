import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useEffect, useState, useTransition } from "react"
import type { TransactionsDailyBalance } from "@/types/backend/dashboard/transactions/response"
import type { QueryParamsType } from "@/types/backend/query_params"
import { transactionService } from "@/services/transactionService"
import MonthlyExpensesGraphSkeleton from "./skeletons/MonthlyExpensesGraphSkeleton"
import DailyComparisonChart, { type ChartData } from "@/components/shared/graphs/DailyComparisonChart"
import { dateToString, getBeginningOfTheMonth, parseStringToDate } from "@/utils/dateUtils"
import type { ChartConfig } from "@/components/ui/chart"
import type { OptionToggleType } from "@/components/shared/forms/SimpleToggleGroup"
import SimpleToggleGroup from "@/components/shared/forms/SimpleToggleGroup"
import { roundTo } from "@/utils/numberUtils"

const getOptionsToggle = (): OptionToggleType[] => {
    const today = new Date();
    const before2Months = new Date(new Date().setMonth(today.getMonth() - 1));
    const before3Months = new Date(new Date().setMonth(today.getMonth() - 2));
    return [
        {
            label: "30 days",
            value: dateToString(getBeginningOfTheMonth(today))
        },
        {
            label: "2 months",
            value: dateToString(getBeginningOfTheMonth(before2Months))
        },
        {
            label: "3 months",
            value: dateToString(getBeginningOfTheMonth(before3Months))
        },
    ]
}

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

export default function MonthlyBalanceGraph() {
    const [filter, setFilter] = useState<QueryParamsType>({
        fromDate: dateToString(getBeginningOfTheMonth(new Date())),
        toDate: dateToString(new Date()),
    })
    const [isPending, startTransition] = useTransition();
    const [chartData, setChartData] = useState<ChartData[]>([]);

    const handleMapping = (data: TransactionsDailyBalance[]): ChartData[] => {
        return data.map((item: TransactionsDailyBalance) => {
            return {
                date: parseStringToDate(item.date),
                y1: roundTo(item.totalIncome, 2),
                y2: roundTo(item.totalExpense, 2)
            }
        });
    }

    useEffect(() => {
        startTransition(async () => {
            const data: TransactionsDailyBalance[] | null = await transactionService.getHistoryDailyBalance(filter);
            if (data) {
                setChartData(handleMapping(data));
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
                    <SimpleToggleGroup
                        options={getOptionsToggle()}
                        value={filter.fromDate as string}
                        onChange={(change: string | undefined) => {
                            if (change) {
                                setFilter((prev) => {
                                    return {
                                        ...prev,
                                        fromDate: change,
                                    }
                                });
                            }
                        }}
                    />
                </CardAction>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                {chartData.length > 0 ? (
                    <DailyComparisonChart
                        data={chartData}
                        chartConfig={chartConfig}
                        showFullHistory={true}
                        stackData={false}
                    />
                ) : (
                    <div className="flex items-center justify-center h-[200px]">
                        <p className="text-muted-foreground">
                            No data available for the selected period.
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>)

}
