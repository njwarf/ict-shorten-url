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