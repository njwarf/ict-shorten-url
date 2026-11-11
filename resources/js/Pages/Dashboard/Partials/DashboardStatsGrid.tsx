import { Globe2, Link2, MousePointerClick, Percent } from "lucide-react"

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { DashboardStats } from "../types"

interface DashboardStatsGridProps {
  stats: DashboardStats
}

export function DashboardStatsGrid({ stats }: DashboardStatsGridProps) {
  const statItems = [
    {
      title: "Total Klik",
      value: stats.totalClicks.toLocaleString(),
      description: "Klik yang tercatat pada periode ini",
      icon: MousePointerClick,
    },
    {
      title: "Tautan Aktif",
      value: stats.activeLinks.toLocaleString(),
      description: "Tautan dengan aktivitas pada periode ini",
      icon: Link2,
    },
    {
      title: "Rata-rata Klik/Tautan",
      value: stats.averageClicks.toLocaleString(),
      description: "Rata-rata klik per tautan aktif",
      icon: Percent,
    },
    {
      title: "Sumber Teratas",
      value: stats.topSource || "-",
      description: "Domain/sumber perujuk utama",
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
