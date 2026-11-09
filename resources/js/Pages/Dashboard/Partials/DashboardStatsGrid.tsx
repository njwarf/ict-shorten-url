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
            className="transition-all hover:ring-foreground/20 hover:shadow-xs"
          >
            <CardHeader>
              <CardTitle className="text-xs font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <CardAction>
                <div className="flex size-7 items-center justify-center rounded-md bg-muted text-muted-foreground">
                  <Icon className="size-3.5" />
                </div>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight text-foreground">
                {stat.value}
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
