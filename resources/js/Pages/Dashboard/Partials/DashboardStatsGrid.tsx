import { Globe2, Link2, MousePointerClick, Percent } from "lucide-react"

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import type { DashboardStats } from "../types"

interface DashboardStatsGridProps {
  stats: DashboardStats
}

export function DashboardStatsGrid({ stats }: DashboardStatsGridProps) {
  const statItems = [
    {
      title: "Total Clicks",
      value: stats.totalClicks.toLocaleString(),
      description: "Clicks recorded in this period",
      icon: MousePointerClick,
    },
    {
      title: "Active Links",
      value: stats.activeLinks.toLocaleString(),
      description: "Links with activity in this period",
      icon: Link2,
    },
    {
      title: "Avg. Clicks/Link",
      value: stats.averageClicks.toLocaleString(),
      description: "Average clicks per active link",
      icon: Percent,
    },
    {
      title: "Top Source",
      value: stats.topSource || "-",
      description: "Leading referrer domain/source",
      icon: Globe2,
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statItems.map((stat) => {
        const Icon = stat.icon

        return (
          <Card
            key={stat.title}
            className="border-blue-100 bg-white shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {stat.title}
              </CardTitle>
              <CardAction>
                <div className="flex size-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors">
                  <Icon className="size-4" />
                </div>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight text-slate-900">
                {stat.value}
              </div>
              <p className="mt-1 text-[11px] text-slate-500 font-medium">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}