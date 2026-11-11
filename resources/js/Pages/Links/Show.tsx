import { useState } from "react"
import { Head, Link } from "@inertiajs/react"
import { format } from "date-fns"
import {
  ArrowLeft,
  Calendar,
  Check,
  Copy,
  ExternalLink,
  Eye,
  Link2,
  MousePointerClick,
  Pencil,
} from "lucide-react"

import { AppSidebar } from "@/Components/app-sidebar"
import { SiteHeader } from "@/Components/site-header"
import { Button } from "@/Components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import {
  SidebarInset,
  SidebarProvider,
} from "@/Components/ui/sidebar"
import type { LinkItem } from "./types"

interface ShowProps {
  link: LinkItem
}

export default function Show({ link }: ShowProps) {
  const [copied, setCopied] = useState(false)
  const origin = typeof window !== "undefined" ? window.location.origin : ""
  const shortUrl = `${origin}/${link.short_code}`

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-"
    try {
      return format(new Date(dateStr), "dd MMM yyyy - HH:mm")
    } catch {
      return dateStr
    }
  }

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <Head title={`Detail - ${link.title || link.short_code}`} />

      <SidebarProvider className="flex flex-col">
        <SiteHeader />

        <div className="flex flex-1">
          <AppSidebar />

          <SidebarInset>
            <main className="flex flex-1 flex-col gap-6 p-4 md:p-6">
              {/* PAGE HEADER */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="icon" asChild className="size-8">
                    <Link href="/links">
                      <ArrowLeft className="size-4" />
                      <span className="sr-only">Kembali ke Tautan</span>
                    </Link>
                  </Button>

                  <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                      Detail Tautan
                    </h1>
                    <p className="text-xs text-muted-foreground">
                      Informasi lengkap dan statistik untuk URL pendek ini.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" asChild className="gap-1.5 text-xs">
                    <Link href={`/links/${link.id}/edit`}>
                      <Pencil className="size-3.5" />
                      <span>Edit Tautan</span>
                    </Link>
                  </Button>

                  <Button size="sm" asChild className="gap-1.5 text-xs">
                    <a
                      href={shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="size-3.5" />
                      <span>Kunjungi Tautan Pendek</span>
                    </a>
                  </Button>
                </div>
              </div>

              {/* DETAILS CARD */}
              <div className="max-w-3xl">
                <Card>
                  <CardHeader className="border-b pb-4">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <CardTitle className="text-lg font-bold text-foreground">
                          {link.title || "Tautan Tanpa Judul"}
                        </CardTitle>
                        <CardDescription className="text-xs">
                          Dibuat {formatDate(link.created_at)}
                        </CardDescription>
                      </div>

                      <CardAction>
                        {link.is_active ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                            <span className="size-1.5 rounded-full bg-emerald-500" />
                            Aktif
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                            <span className="size-1.5 rounded-full bg-muted-foreground" />
                            Tidak Aktif
                          </span>
                        )}
                      </CardAction>
                    </div>
                  </CardHeader>

                  <CardContent className="flex flex-col gap-5 pt-5">
                    {/* SHORT LINK */}
                    <div className="rounded-lg border border-border/80 bg-muted/20 p-4">
                      <p className="text-xs font-medium text-muted-foreground">
                        URL Pendek
                      </p>
                      <div className="mt-1.5 flex flex-wrap items-center justify-between gap-2">
                        <a
                          href={shortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-sm font-semibold text-primary hover:underline"
                        >
                          {shortUrl}
                        </a>

                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={handleCopy}
                            className="h-8 gap-1.5 text-xs"
                          >
                            {copied ? (
                              <Check className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                            ) : (
                              <Copy className="size-3.5" />
                            )}
                            <span>{copied ? "Tersalin!" : "Salin URL"}</span>
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* DESTINATION URL */}
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">
                        URL Tujuan
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <a
                          href={link.original_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="break-all text-sm text-foreground hover:text-primary hover:underline"
                        >
                          {link.original_url}
                        </a>
                        <ExternalLink className="size-3.5 shrink-0 text-muted-foreground" />
                      </div>
                    </div>

                    {/* METRICS ROW */}
                    <div className="grid grid-cols-1 gap-4 border-t pt-4 sm:grid-cols-2">
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
                          <MousePointerClick className="size-4" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Total Klik</p>
                          <p className="text-xl font-bold text-foreground">
                            {(link.click_count ?? 0).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
                          <Calendar className="size-4" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Slug Kode Pendek</p>
                          <p className="font-mono text-sm font-semibold text-foreground">
                            /{link.short_code}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex items-center justify-between border-t bg-muted/20 px-6 py-3">
                    <Button variant="ghost" size="sm" asChild className="gap-1.5 text-xs">
                      <Link href="/links">
                        <ArrowLeft className="size-3.5" />
                        <span>Semua Tautan</span>
                      </Link>
                    </Button>

                    <Button variant="outline" size="sm" asChild className="gap-1.5 text-xs">
                      <Link href={`/links/${link.id}/edit`}>
                        <Pencil className="size-3.5" />
                        <span>Edit Tautan</span>
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}
