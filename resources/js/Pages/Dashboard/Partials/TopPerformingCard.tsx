import { useState } from "react"
import { Link } from "@inertiajs/react"
import { Check, Copy, ExternalLink, MousePointerClick, TrendingUp } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/Components/ui/button"
import type { TopPerformingLink } from "../types"

interface TopPerformingCardProps {
  links: TopPerformingLink[]
}

export function TopPerformingCard({ links }: TopPerformingCardProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (id: string, shortCode: string) => {
    const origin = typeof window !== "undefined" ? window.location.origin : ""
    const url = `${origin}/${shortCode}`

    navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => {
      setCopiedId((prev) => (prev === id ? null : prev))
    }, 2000)
  }

  const origin = typeof window !== "undefined" ? window.location.origin : ""

  return (
    <Card className="min-w-0 flex flex-col">
      <CardHeader className="border-b pb-3">
        <CardTitle className="text-sm font-semibold">Performa Teratas</CardTitle>
        <CardDescription className="text-xs">
          Tautan dengan total interaksi tertinggi
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        {links.length === 0 ? (
          <div className="flex h-full min-h-[220px] flex-col items-center justify-center gap-2 p-6 text-center text-muted-foreground">
            <div className="flex size-10 items-center justify-center rounded-full bg-muted">
              <TrendingUp className="size-5" />
            </div>
            <p className="text-sm font-medium">Belum ada tautan teratas</p>
            <p className="text-xs text-muted-foreground">
              Buat dan bagikan tautan untuk melihat performa terbaik di sini.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {links.map((item, index) => {
              const isFirst = index === 0
              const isSecondOrThird = index === 1 || index === 2
              const isCopied = copiedId === item.id

              return (
                <div
                  key={item.id}
                  className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-muted/30"
                >
                  {/* RANK BADGE */}
                  <div
                    className={`flex size-6 shrink-0 items-center justify-center rounded-md text-xs font-semibold ${isFirst
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : isSecondOrThird
                        ? "bg-muted text-foreground"
                        : "bg-muted/50 text-muted-foreground"
                      }`}
                  >
                    {index + 1}
                  </div>

                  {/* LINK INFO */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <Link
                        href={`/links/${item.id}`}
                        className="truncate text-xs font-medium text-foreground hover:underline"
                        title={item.title}
                      >
                        {item.title || "Tautan Tanpa Judul"}
                      </Link>
                    </div>

                    <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <a
                        href={`${origin}/${item.short_code}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="truncate hover:text-foreground hover:underline"
                        title={`${origin}/${item.short_code}`}
                      >
                        /{item.short_code}
                      </a>

                      <button
                        type="button"
                        onClick={() => handleCopy(item.id, item.short_code)}
                        className="inline-flex items-center text-muted-foreground hover:text-foreground"
                        title="Salin tautan pendek"
                      >
                        {isCopied ? (
                          <Check className="size-3 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <Copy className="size-3" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* CLICKS */}
                  <div className="flex shrink-0 items-center gap-1 rounded-full bg-muted/60 px-2 py-0.5 text-xs font-medium text-foreground">
                    <MousePointerClick className="size-3 text-muted-foreground" />
                    <span>{item.click_count.toLocaleString()}</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
