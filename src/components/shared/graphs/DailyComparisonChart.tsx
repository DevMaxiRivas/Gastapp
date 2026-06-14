import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

export type ChartData = {
    date: Date;
    y1: number;
    y2: number;
}

export type ChartConfig = {
    y1: {
        label: string;
        color: string;
    },
    y2: {
        label: string;
        color: string;
    }
}

export type DailyComparisonChartProps = {
    data: ChartData[];
    chartConfig: ChartConfig;
    showFullHistory?: boolean;
    stackData?: boolean;
}

const handleData = (currentData: ChartData[]): ChartData[] => {
    if (currentData.length === 0) return [];
    const lastDate = new Date(currentData[0].date.getTime());
    const firstDate = new Date(currentData[currentData.length - 1].date.getTime());
    const fullHistory: ChartData[] = [];

    const tempArray = [...currentData];
    let currentRecord = tempArray.pop();
    for (let currentDate = new Date(firstDate); currentDate <= lastDate; currentDate.setDate(currentDate.getDate() + 1)) {

        if (currentRecord && currentDate.toDateString() === currentRecord.date.toDateString()) {
            fullHistory.push(currentRecord);
            currentRecord = tempArray.pop();
        } else {
            fullHistory.push({
                date: new Date(currentDate),
                y1: 0,
                y2: 0
            });
        }
    }
    return fullHistory;
}

export default function DailyComparisonChart({ data, chartConfig, showFullHistory = false, stackData = false }: DailyComparisonChartProps) {
    const fullData = showFullHistory ? handleData([...data]) : data;
    return (
        <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
        >
            <AreaChart data={fullData}>
                <defs>
                    <linearGradient id="fillY1" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="5%"
                            stopColor="var(--color-y1)"
                            stopOpacity={1.0}
                        />
                        <stop
                            offset="95%"
                            stopColor="var(--color-y1)"
                            stopOpacity={0.1}
                        />
                    </linearGradient>
                    <linearGradient id="fillY2" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="5%"
                            stopColor="var(--color-y2)"
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="95%"
                            stopColor="var(--color-y2)"
                            stopOpacity={0.1}
                        />
                    </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={32}
                    tickFormatter={(value: Date) => {
                        return value.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                        })
                    }}
                />
                <ChartTooltip
                    cursor={false}
                    content={
                        <ChartTooltipContent
                            labelFormatter={() => "Balance"}
                            indicator="dot"
                        />
                    }
                />
                <Area
                    dataKey="y2"
                    type="natural"
                    fill="url(#fillY2)"
                    stroke="var(--color-y2)"
                    stackId={stackData ? "a" : undefined}
                />
                <Area
                    dataKey="y1"
                    type="natural"
                    fill="url(#fillY1)"
                    stroke="var(--color-y1)"
                    stackId={stackData ? "a" : undefined}
                />
            </AreaChart>
        </ChartContainer>
    )
}