import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useMemo } from "react"
import type { TransactionsDailyBalance } from "@/types/backend/dashboard/transactions/response"
import MonthlyExpensesGraphSkeleton from "./skeletons/MonthlyExpensesGraphSkeleton"
import DailyComparisonChart, { type ChartData } from "@/components/shared/graphs/DailyComparisonChart"
import { dateToString, getBeginningOfTheMonth, parseStringToDate } from "@/utils/dateUtils"
import type { ChartConfig } from "@/components/ui/chart"
import type { OptionToggleType } from "@/components/shared/forms/SimpleToggleGroup"
import SimpleToggleGroup from "@/components/shared/forms/SimpleToggleGroup"
import { roundTo } from "@/utils/numberUtils"
import useGetHistoryDailyBalance from "@/hooks/usegetHistoryDailyBalance"

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
    const { balances, isLoading, filters, setFilters } = useGetHistoryDailyBalance();

    const handleMapping = (data: TransactionsDailyBalance[]): ChartData[] => {
        return data.map((item: TransactionsDailyBalance) => {
            return {
                date: parseStringToDate(item.date),
                y1: roundTo(item.totalIncome, 2),
                y2: roundTo(item.totalExpense, 2)
            }
        });
    }

    const chartData: ChartData[] = useMemo(() => {
        if (!balances) return [];
        return handleMapping(balances);
    }, [balances])

    return isLoading ?
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
                        value={filters.fromDate as string}
                        onChange={(change: string | undefined) => {
                            if (change) {
                                setFilters((prev) => {
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
