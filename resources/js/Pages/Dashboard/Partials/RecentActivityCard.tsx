import { useState } from "react"
import { Link } from "@inertiajs/react"
import { format } from "date-fns"
import {
  ArrowUpRight,
  Check,
  Copy,
  ExternalLink,
  Eye,
  Link2,
  MoreHorizontal,
  Pencil,
  Share2,
} from "lucide-react"

import { Button } from "@/Components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table"
import type { RecentActivity } from "../types"

interface RecentActivityCardProps {
  activity: RecentActivity[]
}

export function RecentActivityCard({ activity }: RecentActivityCardProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const origin = typeof window !== "undefined" ? window.location.origin : ""

  const handleCopy = (id: string, shortCode: string) => {
    const url = `${origin}/${shortCode}`
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => {
      setCopiedId((prev) => (prev === id ? null : prev))
    }, 2000)
  }

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-"
    try {
      return format(new Date(dateStr), "MMM d, yyyy")
    } catch {
      return dateStr
    }
  }

  return (
    <Card className="w-full min-w-0">
      <CardHeader className="border-b pb-3">
        <div>
          <CardTitle className="text-sm font-semibold">Recent Activity</CardTitle>
          <CardDescription className="text-xs">
            Recently created and active shortened links
          </CardDescription>
        </div>

        <CardAction>
          <Button variant="ghost" size="sm" asChild className="h-8 gap-1 text-xs">
            <Link href="/links">
              <span>View All</span>
              <ArrowUpRight className="size-3.5" />
            </Link>
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="p-0">
        {activity.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 p-8 text-center text-muted-foreground">
            <div className="flex size-10 items-center justify-center rounded-full bg-muted">
              <Link2 className="size-5" />
            </div>
            <p className="text-sm font-medium">No recent links</p>
            <p className="text-xs text-muted-foreground">
              You haven't created any links yet. Start by shortening your first URL.
            </p>
            <Button size="sm" asChild className="mt-2 h-8 text-xs">
              <Link href="/links/create">Create Link</Link>
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[200px] text-xs">Short Link</TableHead>
                <TableHead className="text-xs">Original URL</TableHead>
                <TableHead className="w-[100px] text-xs">Status</TableHead>
                <TableHead className="w-[90px] text-xs">Clicks</TableHead>
                <TableHead className="w-[120px] text-xs">Created</TableHead>
                <TableHead className="w-[70px] text-right text-xs">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {activity.map((item) => {
                const isCopied = copiedId === item.id

                return (
                  <TableRow key={item.id}>
                    {/* SHORT LINK */}
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-1.5">
                        <a
                          href={`${origin}/${item.short_code}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-foreground hover:underline"
                        >
                          /{item.short_code}
                        </a>

                        <button
                          type="button"
                          onClick={() => handleCopy(item.id, item.short_code)}
                          className="inline-flex size-5 items-center justify-center rounded text-muted-foreground transition-colors hover:text-foreground"
                          title="Copy short link"
                        >
                          {isCopied ? (
                            <Check className="size-3 text-emerald-600 dark:text-emerald-400" />
                          ) : (
                            <Copy className="size-3" />
                          )}
                        </button>
                      </div>
                    </TableCell>

                    {/* ORIGINAL URL */}
                    <TableCell>
                      <div className="flex max-w-[280px] items-center gap-1.5">
                        <a
                          href={item.original_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="truncate text-xs text-muted-foreground hover:text-foreground hover:underline"
                          title={item.original_url}
                        >
                          {item.original_url}
                        </a>
                        <ExternalLink className="size-3 shrink-0 text-muted-foreground/60" />
                      </div>
                    </TableCell>

                    {/* STATUS */}
                    <TableCell>
                      {item.is_active ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                          <span className="size-1.5 rounded-full bg-emerald-500" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                          <span className="size-1.5 rounded-full bg-muted-foreground" />
                          Inactive
                        </span>
                      )}
                    </TableCell>

                    {/* CLICKS */}
                    <TableCell className="text-xs font-semibold text-foreground">
                      {item.click_count.toLocaleString()}
                    </TableCell>

                    {/* CREATED */}
                    <TableCell className="text-xs text-muted-foreground">
                      {formatDate(item.created_at)}
                    </TableCell>

                    {/* ACTIONS */}
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 text-muted-foreground hover:text-foreground"
                          >
                            <MoreHorizontal className="size-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-36">
                          <DropdownMenuItem asChild>
                            <Link href={`/links/${item.id}`} className="cursor-pointer">
                              <Eye className="mr-2 size-4" />
                              Detail
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() => handleCopy(item.id, item.short_code)}
                            className="cursor-pointer"
                          >
                            <Share2 className="mr-2 size-4" />
                            {isCopied ? "Copied!" : "Share / Copy"}
                          </DropdownMenuItem>

                          <DropdownMenuItem asChild>
                            <Link href={`/links/${item.id}/edit`} className="cursor-pointer">
                              <Pencil className="mr-2 size-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
