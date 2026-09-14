import { AppSidebar } from "@/Components/app-sidebar"
import { SiteHeader } from "@/Components/site-header"
import { SidebarInset, SidebarProvider } from "@/Components/ui/sidebar"
import { Link } from "@inertiajs/react"
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

const stats = [
  {
    title: "Total Clicks",
    value: "124.8k",
    change: "+12%",
    icon: MousePointerClick,
    sparkline: true,
  },
  {
    title: "Active Links",
    value: "1,240",
    change: "+8.2%",
    icon: Link2,
  },
  {
    title: "Avg. CTR",
    value: "4.2%",
    change: "+0.5%",
    icon: Percent,
  },
  {
    title: "Top Source",
    value: "Indonesia",
    icon: Globe2,
  },
]

const topPerforming = [
  {
    rank: 1,
    url: "ict.st/qt2-rpt",
    title: "Q2 Financial Report",
    clicks: "12.4k",
  },
  {
    rank: 2,
    url: "ict.st/promo-x",
    title: "Summer Promo Tw...",
    clicks: "8.2k",
  },
  {
    rank: 3,
    url: "ict.st/app-dl",
    title: "App Download Page",
    clicks: "5.1k",
  },
  {
    rank: 4,
    url: "ict.st/blog-42",
    title: "Blog Post 42",
    clicks: "3.8k",
  },
]

const recentActivity = [
  {
    shortLink: "ict.st/new-feature",
    originalUrl: "https://example.com/features/new-release-v2",
    status: "Active",
    clicks: "12",
  },
  {
    shortLink: "ict.st/webinar-reg",
    originalUrl:
      "https://example.com/events/webinar-registration-aug...",
    status: "Active",
    clicks: "84",
  },
]

export default function Page() {
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
                    Welcome back, User Name
                  </h1>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Here is a summary of your link performance for the last 30 days.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="inline-flex h-9 items-center gap-2 rounded-md border bg-background px-3 text-sm font-medium shadow-sm transition-colors hover:bg-muted"
                  >
                    <CalendarDays className="size-4" />
                    <span>Last 30 Days</span>
                    <ChevronDown className="size-3.5" />
                  </button>

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
                {stats.map((stat) => {
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

                        <Icon className="size-3.5 text-black" />
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

                      {/* MINI GRAPH - TOTAL CLICKS */}
                      {stat.sparkline && (
                        <svg
                          viewBox="0 0 180 45"
                          className="absolute bottom-0 left-0 h-[42px] w-[150px]"
                          preserveAspectRatio="none"
                        >
                          <path
                            d="
                              M0 28
                              C10 25 18 27 27 32
                              C38 38 46 38 56 31
                              C67 23 72 17 82 21
                              C92 25 96 39 106 38
                              C116 37 119 20 128 13
                              C138 5 146 11 153 24
                              C160 37 168 39 180 25
                            "
                            fill="none"
                            stroke="currentColor"
                            className="text-muted-foreground/40"
                            strokeWidth="2"
                          />
                        </svg>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* CHART + TOP PERFORMING */}
              <div className="grid gap-4 lg:grid-cols-[1.8fr_1fr]">

                {/* LINK PERFORMANCE CHART */}
                <div className="rounded-lg border bg-background shadow-sm">
                  <div className="border-b px-4 py-3.5">
                    <h2 className="text-sm font-semibold">
                      Link Performance Over Time
                    </h2>
                  </div>

                  <div className="px-4 pb-4 pt-3">
                    <div className="h-[250px] w-full">
                      <svg
                        viewBox="0 0 700 250"
                        className="h-full w-full"
                        preserveAspectRatio="none"
                      >
                        {/* HORIZONTAL GRID */}
                        <line
                          x1="0"
                          y1="35"
                          x2="700"
                          y2="35"
                          stroke="currentColor"
                          className="text-muted/30"
                        />

                        <line
                          x1="0"
                          y1="90"
                          x2="700"
                          y2="90"
                          stroke="currentColor"
                          className="text-muted/30"
                        />

                        <line
                          x1="0"
                          y1="145"
                          x2="700"
                          y2="145"
                          stroke="currentColor"
                          className="text-muted/30"
                        />

                        <line
                          x1="0"
                          y1="200"
                          x2="700"
                          y2="200"
                          stroke="currentColor"
                          className="text-muted/30"
                        />

                        {/* AREA */}
                        <path
                          d="
                            M0 205
                            C28 175 55 170 82 179
                            C108 188 126 201 153 197
                            C184 192 199 169 220 143
                            C243 114 263 83 291 80
                            C319 77 339 104 365 119
                            C391 134 411 126 430 101
                            C451 74 466 38 493 27
                            C519 16 541 24 559 43
                            C580 65 594 87 618 84
                            C644 81 660 60 680 45
                            C689 38 696 34 700 32
                            L700 205
                            L0 205
                            Z
                          "
                          fill="#eeeeee"
                          className="text-muted/20"
                        />

                        {/* MAIN GRAPH */}
                        <path
                          d="
                            M0 205
                            C28 175 55 170 82 179
                            C108 188 126 201 153 197
                            C184 192 199 169 220 143
                            C243 114 263 83 291 80
                            C319 77 339 104 365 119
                            C391 134 411 126 430 101
                            C451 74 466 38 493 27
                            C519 16 541 24 559 43
                            C580 65 594 87 618 84
                            C644 81 660 60 680 45
                            C689 38 696 34 700 32
                          "
                          fill="none"
                          stroke="currentColor"
                          className="text-foreground"
                          strokeWidth="4"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* TOP PERFORMING */}
                <div className="rounded-lg border bg-background shadow-sm">
                  <div className="border-b px-4 py-3.5">
                    <h2 className="text-sm font-semibold">
                      Top Performing
                    </h2>
                  </div>

                  <div>
                    {topPerforming.map((item) => (
                      <div
                        key={item.rank}
                        className="flex min-h-[56px] items-center gap-3 border-b px-3 last:border-b-0"
                      >
                        {/* RANK */}
                        <div className="flex size-5 shrink-0 items-center justify-center rounded-sm bg-muted text-[9px] font-medium">
                          {item.rank}
                        </div>

                        {/* LINK + TITLE */}
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[9px] font-normal text-muted-foreground">
                            {item.url}
                          </p>

                          <p className="truncate text-[9px] text-muted-foreground">
                            {item.title}
                          </p>
                        </div>

                        {/* CLICKS */}
                        <span className="shrink-0 text-[9px] font-medium">
                          {item.clicks}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RECENT ACTIVITY */}
              <div className="rounded-lg border bg-background shadow-sm">
                <div className="flex items-center justify-between border-b px-4 py-3.5">
                  <h2 className="text-sm font-semibold">
                    Recent Activity
                  </h2>

                  <Link
                    href="/links"
                    className="text-[10px] font-normal text-muted-foreground hover:underline"
                  >
                    View All
                  </Link>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[650px] text-left">
                    <thead>
                      <tr className="border-b bg-muted/20">
                        <th className="px-4 py-2 text-[9px] font-medium uppercase text-muted-foreground">
                          Short Link
                        </th>

                        <th className="px-4 py-2 text-[9px] font-medium uppercase text-muted-foreground">
                          Original URL
                        </th>

                        <th className="px-4 py-2 text-[9px] font-medium uppercase text-muted-foreground">
                          Status
                        </th>

                        <th className="px-4 py-2 text-[9px] font-medium uppercase text-muted-foreground">
                          Clicks
                        </th>

                        <th className="px-4 py-2 text-right text-[9px] font-medium uppercase text-muted-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {recentActivity.map((activity) => (
                        <tr
                          key={activity.shortLink}
                          className="border-b last:border-b-0"
                        >
                          <td className="px-4 py-3 text-[10px] font-normal text-muted-foreground">
                            {activity.shortLink}
                          </td>

                          <td className="max-w-[280px] truncate px-4 py-3 text-[10px] text-muted-foreground">
                            {activity.originalUrl}
                          </td>

                          <td className="px-4 py-3">
                            <span className="inline-flex items-center gap-1 rounded bg-muted px-2 py-1 text-[9px] font-medium">
                              <span className="size-1.5 rounded-full bg-foreground" />
                              {activity.status}
                            </span>
                          </td>

                          <td className="px-4 py-3 text-[10px]">
                            {activity.clicks}
                          </td>

                          <td className="px-4 py-3 text-right">
                            <button
                              type="button"
                              aria-label={`Copy ${activity.shortLink}`}
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
