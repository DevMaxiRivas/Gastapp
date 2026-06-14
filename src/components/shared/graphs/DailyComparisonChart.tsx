import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
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
    data: any[];
    chartConfig: ChartConfig;
    handleMapping: (data: any[]) => ChartData[];
}

export default function DailyComparisonChart({ data, chartConfig, handleMapping }: DailyComparisonChartProps) {
    const formattedData = handleMapping(data);

    return (
        <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
        >
            <AreaChart data={formattedData}>
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
                    stackId="a"
                />
                <Area
                    dataKey="y1"
                    type="natural"
                    fill="url(#fillY1)"
                    stroke="var(--color-y1)"
                    stackId="a"
                />
            </AreaChart>
        </ChartContainer>
    )
}