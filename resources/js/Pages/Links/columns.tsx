import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { Link, router } from "@inertiajs/react"
import { Line, LineChart, ResponsiveContainer } from "recharts"
import {
  Check,
  Copy,
  ExternalLink,
  Eye,
  MoreHorizontal,
  Pencil,
  Pin,
  Share2,
} from "lucide-react"

import { Button } from "@/Components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import type { LinkAnalyticsDaily, LinkItem } from "./types"

export type { LinkItem as Link }

function TitleCell({ link }: { link: LinkItem }) {
  const [copied, setCopied] = useState(false)
  const origin = typeof window !== "undefined" ? window.location.origin : ""

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard.writeText(`${origin}/${link.short_code}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center gap-1.5">
        {link.is_pinned ? (
          <Pin
            className="size-3.5 shrink-0 fill-amber-500 text-amber-500"
            title="Tautan Disematkan"
          />
        ) : null}
        <Link
          href={`/links/${link.id}`}
          className="text-sm font-semibold text-foreground hover:text-primary hover:underline"
        >
          {link.title || "Tautan Tanpa Judul"}
        </Link>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <a
          href={`${origin}/${link.short_code}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground hover:underline"
        >
          /{link.short_code}
        </a>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex size-4 items-center justify-center text-muted-foreground hover:text-foreground"
          title="Salin tautan pendek"
        >
          {copied ? (
            <Check className="size-3 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <Copy className="size-3" />
          )}
        </button>
      </div>
    </div>
  )
}

function StatusBadge({ active }: { active: boolean }) {
  return active ? (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
      <span className="size-1.5 rounded-full bg-emerald-500" />
      Aktif
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
      <span className="size-1.5 rounded-full bg-muted-foreground" />
      Tidak Aktif
    </span>
  )
}

function SparklineCell({
  data,
  total,
}: {
  data?: LinkAnalyticsDaily[]
  total?: number
}) {
  const chartData =
    data && data.length > 0
      ? data
      : Array.from({ length: 7 }, (_, i) => ({ date: `${i}`, clicks: 0 }))
  const totalClicks =
    total ?? chartData.reduce((acc, curr) => acc + curr.clicks, 0)

  return (
    <div className="flex items-center gap-3">
      <div className="h-8 w-24">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 2, right: 2, left: 2, bottom: 2 }}
          >
            <Line
              type="monotone"
              dataKey="clicks"
              stroke="var(--primary)"
              strokeWidth={1.75}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <span className="shrink-0 text-xs font-semibold text-foreground">
        {totalClicks.toLocaleString()}
      </span>
    </div>
  )
}

function ActionCell({ link }: { link: LinkItem }) {
  const [copied, setCopied] = useState(false)
  const origin = typeof window !== "undefined" ? window.location.origin : ""

  const handleCopy = () => {
    navigator.clipboard.writeText(`${origin}/${link.short_code}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleTogglePin = () => {
    router.patch(`/links/${link.id}/toggle-pin`, {}, { preserveScroll: true })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 text-muted-foreground hover:text-foreground"
        >
          <MoreHorizontal className="size-4" />
          <span className="sr-only">Open actions</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem asChild>
          <Link href={`/links/${link.id}`} className="cursor-pointer">
            <Eye className="mr-2 size-4" />
            Detail
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleCopy} className="cursor-pointer">
          <Share2 className="mr-2 size-4" />
          {copied ? "Tersalin!" : "Bagikan / Salin"}
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href={`/links/${link.id}/edit`} className="cursor-pointer">
            <Pencil className="mr-2 size-4" />
            Edit
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleTogglePin} className="cursor-pointer">
          <Pin className="mr-2 size-4" />
          {link.is_pinned ? "Lepas Sematan" : "Sematkan Tautan"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const columns: ColumnDef<LinkItem>[] = [
  {
    accessorKey: "title",
    header: "Judul & Tautan",
    cell: ({ row }) => <TitleCell link={row.original} />,
  },
  {
    accessorKey: "original_url",
    header: "URL Tujuan",
    cell: ({ row }) => (
      <div className="flex max-w-[260px] items-center gap-1.5">
        <a
          href={row.original.original_url}
          target="_blank"
          rel="noopener noreferrer"
          className="truncate text-xs text-muted-foreground hover:text-foreground hover:underline"
          title={row.original.original_url}
        >
          {row.original.original_url}
        </a>
        <ExternalLink className="size-3 shrink-0 text-muted-foreground/60" />
      </div>
    ),
  },
  {
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }) => <StatusBadge active={row.original.is_active} />,
  },
  {
    id: "analytics",
    header: "Klik (7 Hari)",
    accessorKey: "analytics_7d",
    cell: ({ row }) => (
      <SparklineCell
        data={row.original.analytics_daily}
        total={row.original.analytics_7d}
      />
    ),
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => (
      <div className="text-right">
        <ActionCell link={row.original} />
      </div>
    ),
  },
]
