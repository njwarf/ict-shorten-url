import { useEffect, useRef, useState } from "react"
import { Head, Link, router, usePage } from "@inertiajs/react"
import { AlertCircle, CheckCircle2, Plus, Search, X } from "lucide-react"

import { AppSidebar } from "@/Components/app-sidebar"
import { SiteHeader } from "@/Components/site-header"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import {
  SidebarInset,
  SidebarProvider,
} from "@/Components/ui/sidebar"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import type { LinksIndexProps } from "./types"

export default function Index({ links, filters }: LinksIndexProps) {
  const { flash } = usePage().props as {
    flash?: {
      error?: string
      success?: string
    }
  }

  const [search, setSearch] = useState(filters?.search ?? "")
  const isInitialMount = useRef(true)

  const goToPage = (page: number) => {
    router.get(
      "/links",
      {
        page,
        search: search || undefined,
      },
      {
        preserveState: true,
        preserveScroll: true,
      }
    )
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    const timeout = setTimeout(() => {
      router.get(
        "/links",
        {
          search: search || undefined,
        },
        {
          preserveState: true,
          preserveScroll: true,
          replace: true,
        }
      )
    }, 400)

    return () => clearTimeout(timeout)
  }, [search])

  const handleClearSearch = () => {
    setSearch("")
    router.get(
      "/links",
      {},
      {
        preserveState: true,
        preserveScroll: true,
        replace: true,
      }
    )
  }

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <Head title="Links" />

      <SidebarProvider className="flex flex-col">
        <SiteHeader />

        <div className="flex flex-1">
          <AppSidebar />

          <SidebarInset>
            <main className="flex flex-1 flex-col gap-6 p-4 md:p-6">
              {/* PAGE HEADER */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-foreground">
                    Links
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Manage your shortened URLs, customize slugs, and monitor 7-day traffic performance.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button asChild size="sm" className="h-9 gap-1.5">
                    <Link href="/links/create">
                      <Plus className="size-4" />
                      <span>Create Link</span>
                    </Link>
                  </Button>
                </div>
              </div>

              {/* FLASH NOTIFICATIONS */}
              {flash?.success && (
                <div className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="size-4 shrink-0" />
                  <span>{flash.success}</span>
                </div>
              )}

              {flash?.error && (
                <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-xs text-destructive">
                  <AlertCircle className="size-4 shrink-0" />
                  <span>{flash.error}</span>
                </div>
              )}

              {/* SEARCH & FILTERS BAR */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by title, code, or URL..."
                    className="h-9 pl-8 pr-8 text-xs"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  {search && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      title="Clear search"
                    >
                      <X className="size-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="rounded-full bg-muted px-2.5 py-1 font-medium">
                    {links.total} {links.total === 1 ? "link" : "links"} total
                  </span>
                </div>
              </div>

              {/* DATA TABLE */}
              <DataTable
                columns={columns}
                data={links.data}
                pagination={links}
                onPageChange={goToPage}
              />
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}
