import { useEffect, useState } from "react"
import { Head, router, usePage } from "@inertiajs/react"
import { differenceInCalendarDays, format } from "date-fns"

import { AppSidebar } from "@/Components/app-sidebar"
import { SiteHeader } from "@/Components/site-header"
import { SidebarInset, SidebarProvider } from "@/Components/ui/sidebar"
import { DashboardHeader } from "./Dashboard/Partials/DashboardHeader"
import { DashboardStatsGrid } from "./Dashboard/Partials/DashboardStatsGrid"
import { PerformanceChartCard } from "./Dashboard/Partials/PerformanceChartCard"
import { TopPerformingCard } from "./Dashboard/Partials/TopPerformingCard"
import { RecentActivityCard } from "./Dashboard/Partials/RecentActivityCard"
import type { DashboardProps } from "./Dashboard/types"

export default function Dashboard() {
  const {
    stats,
    topPerforming = [],
    recentActivity = [],
    clicksByDate = [],
    start_date,
    end_date,
    auth,
  } = usePage<DashboardProps>().props

  const [dateRange, setDateRange] = useState<{
    from: Date
    to: Date
  }>(() => {
    if (start_date && end_date) {
      return {
        from: new Date(start_date),
        to: new Date(end_date),
      }
    }
    const to = new Date()
    const from = new Date()
    from.setDate(to.getDate() - 29)
    return { from, to }
  })

  useEffect(() => {
    if (start_date && end_date) {
      setDateRange({
        from: new Date(start_date),
        to: new Date(end_date),
      })
    }
  }, [start_date, end_date])

  const totalDays =
    differenceInCalendarDays(dateRange.to, dateRange.from) + 1

  const handleDateRangeChange = (newRange: { from: Date; to: Date }) => {
    setDateRange(newRange)

    router.get(
      route("dashboard"),
      {
        start_date: format(newRange.from, "yyyy-MM-dd"),
        end_date: format(newRange.to, "yyyy-MM-dd"),
      },
      {
        preserveState: true,
        preserveScroll: true,
      }
    )
  }

  return (
    <div className="[--header-height:calc(--spacing(14))] bg-blue-50/30 min-h-screen">
      <Head title="Dasbor - Ringkasan Performa" />

      <SidebarProvider className="flex flex-col">
        <SiteHeader />

        <div className="flex flex-1">
          <AppSidebar />

          <SidebarInset>
            <main className="flex flex-1 flex-col gap-6 p-4 md:p-8 animate-in fade-in-50 duration-300">

              {/* HEADER DENGAN SAPAAN & FILTER TANGGAL */}
              <DashboardHeader
                userName={auth.user?.name ?? "Pengguna"}
                totalDays={totalDays}
                dateRange={dateRange}
                onDateRangeChange={handleDateRangeChange}
              />

              {/* KARTU STATISTIK UTAMA */}
              <DashboardStatsGrid stats={stats} />

              {/* GRAFIK & KARTU PERFORMA TERATAS */}
              <div className="grid w-full min-w-0 grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)]">
                <PerformanceChartCard data={clicksByDate} />
                <TopPerformingCard links={topPerforming} />
              </div>

              {/* TABEL AKTIVITAS TERBARU */}
              <RecentActivityCard activity={recentActivity} />

            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}