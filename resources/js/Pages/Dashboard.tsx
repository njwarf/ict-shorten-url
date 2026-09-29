import { AppSidebar } from "@/Components/app-sidebar"
import { SiteHeader } from "@/Components/site-header"
import { SidebarInset, SidebarProvider } from "@/Components/ui/sidebar"
import { Link, router, usePage } from "@inertiajs/react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useState } from "react"
import { differenceInCalendarDays, format } from "date-fns"
import { Calendar } from "@/Components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover"
import { cn } from "@/lib/utils"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/Components/ui/chart"
import {
  CalendarDays,
  ChevronDown,
  Copy,
  Globe2,
  Link2,
  MousePointerClick,
  Percent,
  Plus,
} from "lucide-react"

export const iframeHeight = "800px"

export const description =
  "Dashboard overview with link performance statistics."


type DashboardStats = {
  totalClicks: number
  activeLinks: number
  averageClicks: number
  topSource: string
}

type TopPerformingLink = {
  id: string
  title: string
  original_url: string
  short_code: string
  click_count: number
}

type RecentActivity = {
  id: string
  title: string
  original_url: string
  short_code: string
  is_active: boolean
  click_count: number
  created_at: string
}

type ClicksByDate = {
  date: string
  clicks: number
}
type DashboardProps = {
  stats: DashboardStats
  topPerforming: TopPerformingLink[]
  recentActivity: RecentActivity[]
  clicksByDate: ClicksByDate[]
  auth: {
    user: User
  }
}

type User = {
  name: string
}

export default function Page() {
  const {
    stats,
    topPerforming,
    recentActivity,
    clicksByDate,
    auth,
  } = usePage<DashboardProps>().props

  const [dateRange, setDateRange] = useState<{
    from: Date
    to: Date
  }>({
    from: new Date(new Date().setDate(new Date().getDate() - 29)),
    to: new Date(),
  })

  const totalDays =
    differenceInCalendarDays(dateRange.to, dateRange.from) + 1

  const statItems = [
    {
      title: "Total Clicks",
      value: stats.totalClicks.toLocaleString(),
      icon: MousePointerClick,
    },
    {
      title: "Active Links",
      value: stats.activeLinks.toLocaleString(),
      icon: Link2,
    },
    {
      title: "Avg. Clicks/Link",
      value: stats.averageClicks.toLocaleString(),
      icon: Percent,
    },
    {
      title: "Top Source",
      value: stats.topSource,
      icon: Globe2,
    },
  ]
  const chartConfig = {
    clicks: {
      label: "Clicks",
      color: "var(--foreground)",
    },
  }
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />

        <div className="flex flex-1">
          <AppSidebar />

          <SidebarInset>
            <main className="flex flex-1 flex-col gap-6 p-4 md:p-6">

              {/* HEADER */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-xl font-semibold tracking-tight">
                    Welcome back, {auth.user.name}
                  </h1>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Here is a summary of your link performance for the last {totalDays} days.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className={cn(
                          "inline-flex h-9 items-center gap-2 rounded-md border bg-background px-3 text-sm font-medium shadow-sm transition-colors hover:bg-muted",
                          !dateRange && "text-muted-foreground",
                        )}
                      >
                        <CalendarDays className="size-4" />

                        <span>
                          {format(dateRange.from, "MMM d, yyyy")} -{" "}
                          {format(dateRange.to, "MMM d, yyyy")}
                        </span>

                        <ChevronDown className="size-3.5" />
                      </button>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0" align="end">
                      <Calendar
                        mode="range"
                        selected={dateRange}
                        onSelect={(range) => {
                          if (range?.from && range?.to) {
                            setDateRange({
                              from: range.from,
                              to: range.to,
                            })

                            router.get(
                              route("dashboard"),
                              {
                                start_date: format(range.from, "yyyy-MM-dd"),
                                end_date: format(range.to, "yyyy-MM-dd"),
                              },
                              {
                                preserveState: true,
                                preserveScroll: true,
                              },
                            )
                          }
                        }}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                  <Link
                    href="/links/create"
                    className="inline-flex h-9 items-center gap-2 rounded-md bg-foreground px-3 text-sm font-medium text-background shadow-sm transition-opacity hover:opacity-90"
                  >
                    <Plus className="size-4" />
                    Shorten Link
                  </Link>
                </div>
              </div>

              {/* STATISTICS */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {statItems.map((stat) => {
                  const Icon = stat.icon

                  return (
                    <div
                      key={stat.title}
                      className="relative h-[84px] overflow-hidden rounded-lg border bg-background px-4 py-3 shadow-sm"
                    >
                      {/* TITLE + ICON */}
                      <div className="relative z-10 flex items-start justify-between">
                        <p className="text-[10px] font-medium text-muted-foreground">
                          {stat.title}
                        </p>

                        <Icon className="size-3.5 text-muted-foreground" />
                      </div>

                      {/* VALUE */}
                      <div className="relative z-10 mt-2 flex items-center gap-2">
                        <p className="text-[22px] font-semibold leading-none tracking-tight">
                          {stat.value}
                        </p>

                        {stat.change && (
                          <span className="rounded-sm bg-muted px-1.5 py-0.5 text-[8px] font-medium text-muted-foreground">
                            {stat.change}
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* CHART + TOP PERFORMING */}
              <div className="grid w-full min-w-0 grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)]">

                {/* LINK PERFORMANCE CHART */}
                <div className="min-w-0 overflow-hidden rounded-lg border bg-background shadow-sm">
                  <div className="border-b px-4 py-3.5">
                    <h2 className="text-sm font-semibold">
                      Link Performance Over Time
                    </h2>
                  </div>

                  <div className="px-4 pb-4 pt-3">
                    <ChartContainer
                      config={chartConfig}
                      className="h-[250px] w-full min-w-0"
                    >
                      <AreaChart
                        accessibilityLayer
                        data={clicksByDate}
                        margin={{
                          left: 12,
                          right: 12,
                          top: 10,
                          bottom: 10,
                        }}
                      >
                        <CartesianGrid vertical={false} />

                        <XAxis
                          dataKey="date"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          tickFormatter={(value) => {
                            const date = new Date(value)

                            return date.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })
                          }}
                        />

                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent />}
                        />

                        <Area
                          dataKey="clicks"
                          type="natural"
                          fill="var(--color-clicks)"
                          fillOpacity={0.25}
                          stroke="var(--color-clicks)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ChartContainer>
                  </div>
                </div>

                {/* TOP PERFORMING */}
                <div className="min-w-0 overflow-hidden rounded-lg border bg-background shadow-sm">
                  <div className="border-b px-4 py-3.5">
                    <h2 className="text-sm font-semibold">
                      Top Performing
                    </h2>
                  </div>

                  <div>
                    {topPerforming.map((item, index) => (
                      <div
                        key={item.id}
                        className="flex min-h-[56px] items-center gap-3 border-b px-3 last:border-b-0"
                      >
                        {/* RANK */}
                        <div className="flex size-5 shrink-0 items-center justify-center rounded-sm bg-muted text-xs font-medium">
                          {index + 1}
                        </div>

                        {/* LINK + TITLE */}
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-normal text-muted-foreground">
                            {window.location.origin}/{item.short_code}
                          </p>

                          <p className="truncate text-xs text-muted-foreground">
                            {item.title}
                          </p>
                        </div>

                        {/* CLICKS */}
                        <span className="shrink-0 text-xs font-medium">
                          {item.click_count.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RECENT ACTIVITY */}
              <div className="w-full min-w-0 overflow-hidden rounded-lg border bg-background shadow-sm">
                <div className="flex items-center justify-between border-b px-4 py-3.5">
                  <h2 className="text-sm font-semibold">
                    Recent Activity
                  </h2>

                  <Link
                    href="/links"
                    className="text-sm font-normal text-muted-foreground hover:underline"
                  >
                    View All
                  </Link>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[650px] text-left">
                    <thead>
                      <tr className="border-b bg-muted/20">
                        <th className="px-4 py-2 text-xs font-medium uppercase text-muted-foreground">
                          Short Link
                        </th>

                        <th className="px-4 py-2 text-xs font-medium uppercase text-muted-foreground">
                          Original URL
                        </th>

                        <th className="px-4 py-2 text-xs font-medium uppercase text-muted-foreground">
                          Status
                        </th>

                        <th className="px-4 py-2 text-xs font-medium uppercase text-muted-foreground">
                          Clicks
                        </th>

                        <th className="px-4 py-2 text-right text-xs font-medium uppercase text-muted-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {recentActivity.map((activity) => (
                        <tr
                          key={activity.id}
                          className="border-b last:border-b-0"
                        >
                          <td className="px-4 py-3 text-sm font-normal text-muted-foreground">
                            {window.location.origin}/{activity.short_code}
                          </td>

                          <td className="max-w-[280px] truncate px-4 py-3 text-sm text-muted-foreground">
                            {activity.original_url}
                          </td>

                          <td className="px-4 py-3">
                            <span className="inline-flex items-center gap-1 rounded bg-muted px-2 py-1 text-[9px] font-medium">
                              <span className="size-1.5 rounded-full bg-foreground" />
                              {activity.is_active ? "Active" : "Inactive"}
                            </span>
                          </td>

                          <td className="px-4 py-3 text-sm">
                            {activity.click_count.toLocaleString()}
                          </td>

                          <td className="px-4 py-3 text-right">
                            <button
                              type="button"
                              aria-label={`Copy ${activity.short_code}`}
                              className="inline-flex size-7 items-center justify-center rounded-md hover:bg-muted"
                            >
                              <Copy className="size-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}
