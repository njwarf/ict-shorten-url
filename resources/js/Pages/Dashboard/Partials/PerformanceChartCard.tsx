import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { BarChart3 } from "lucide-react"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/Components/ui/chart"
import type { ClicksByDate } from "../types"

const chartConfig = {
  clicks: {
    label: "Klik",
    color: "var(--primary)",
  },
} satisfies ChartConfig

interface PerformanceChartCardProps {
  data: ClicksByDate[]
}

export function PerformanceChartCard({ data }: PerformanceChartCardProps) {
  const totalClicksInRange = data.reduce((acc, curr) => acc + curr.clicks, 0)
  const hasData = data && data.length > 0

  return (
    <Card className="min-w-0">
      <CardHeader className="border-b pb-3">
        <div>
          <CardTitle className="text-sm font-semibold">
            Performa Tautan dari Waktu ke Waktu
          </CardTitle>
          <CardDescription className="text-xs">
            Trend klik harian pada semua tautan aktif
          </CardDescription>
        </div>
        <CardAction>
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            {totalClicksInRange.toLocaleString()} total klik
          </span>
        </CardAction>
      </CardHeader>

      <CardContent className="pt-4">
        {!hasData ? (
          <div className="flex h-[260px] flex-col items-center justify-center gap-2 text-center text-muted-foreground">
            <div className="flex size-10 items-center justify-center rounded-full bg-muted">
              <BarChart3 className="size-5" />
            </div>
            <p className="text-sm font-medium">Belum ada data performa</p>
            <p className="text-xs text-muted-foreground">
              Aktivitas akan ditampilkan di sini setelah tautan Anda menerima klik.
            </p>
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="h-[260px] w-full min-w-0"
          >
            <AreaChart
              accessibilityLayer
              data={data}
              margin={{
                left: 12,
                right: 12,
                top: 10,
                bottom: 10,
              }}
            >
              <defs>
                <linearGradient id="fillClicks" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-clicks)"
                    stopOpacity={0.35}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-clicks)"
                    stopOpacity={0.0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid vertical={false} strokeDasharray="3 3" />

              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString("id-ID", {
                    month: "short",
                    day: "numeric",
                  })
                }}
              />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />

              <Area
                dataKey="clicks"
                type="natural"
                fill="url(#fillClicks)"
                stroke="var(--color-clicks)"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
