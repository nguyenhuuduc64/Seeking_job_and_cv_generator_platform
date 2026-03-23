
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"

const chartData = [
    { month: "January", salary: 1800 },
    { month: "February", salary: 2100 },
    { month: "March", salary: 1950 },
    { month: "April", salary: 2400 },
    { month: "May", salary: 2300 },
    { month: "June", salary: 2800 },
]

const chartConfig = {
    salary: {
        label: "Lương ($)",
        color: "var(--primary-color)", // Màu xanh chính trực của ông chủ
    },
} satisfies ChartConfig

export function SalaryChart() {
    return (
        <Card className="border-none shadow-none bg-transparent w-full">
            <CardHeader className="p-0 pb-4">
                <CardTitle className="text-sm font-black uppercase tracking-widest text-gray-500">
                    Xu hướng lương IT (6 tháng)
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                {/* Khống chế chiều cao ở mức 150px thưa ông chủ */}
                <ChartContainer config={chartConfig} className="h-[150px] w-full">
                    <AreaChart
                        data={chartData}
                        margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    >
                        <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.2} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            className="text-[10px] font-bold"
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Area
                            dataKey="salary"
                            type="monotone" // Để đường cong mượt mà hơn thưa ông chủ
                            fill="var(--color-salary)"
                            fillOpacity={0.1}
                            stroke="var(--color-salary)"
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}