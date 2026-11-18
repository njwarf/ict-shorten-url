import { useState } from "react"
import { Head, router } from "@inertiajs/react"
import { Link as LinkIcon, Search, X, Plus } from "lucide-react"

import { AppSidebar } from "@/Components/app-sidebar"
import { SiteHeader } from "@/Components/site-header"
import { Input } from "@/Components/ui/input"
import { Button } from "@/Components/ui/button"
import { SidebarInset, SidebarProvider } from "@/Components/ui/sidebar"
import { columns } from "./columns"
import { DataTable } from "@/Components/data-table"

export default function LinksIndex({ links, filters }: { links: any; filters: any }) {
  const [search, setSearch] = useState(filters?.search ?? "")

  const goToPage = (page: number) => {
    router.get(
      route("links.index"),
      { page, search: search || undefined },
      { preserveState: true, preserveScroll: true }
    )
  }

  const handleSearchChange = (value: string) => {
    setSearch(value)
    router.get(
      route("links.index"),
      { search: value || undefined },
      { preserveState: true, preserveScroll: true, replace: true }
    )
  }

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <Head title="Manajemen Tautan" />

      <SidebarProvider className="flex flex-col">
        <SiteHeader />

        <div className="flex flex-1">
          <AppSidebar />

          <SidebarInset>
            <main className="flex flex-1 flex-col gap-6 p-4 md:p-6">

              {/* PAGE HEADER */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-primary/10 p-2 text-primary">
                      <LinkIcon className="size-5" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                      Manajemen Tautan
                    </h1>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Buat, kelola, dan pantau URL pendek serta analitik Anda.
                  </p>
                </div>

                <div>
                  <Button asChild>
                    <a href={route("links.create")}>
                      <Plus className="mr-2 size-4" />
                      Buat Tautan
                    </a>
                  </Button>
                </div>
              </div>

              {/* SEARCH BAR & TOTAL BADGE */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Cari berdasarkan judul, URL, atau kode..."
                    className="h-9 pl-8 pr-8 text-xs"
                    value={search}
                    onChange={(e) => handleSearchChange(e.target.value)}
                  />
                  {search && (
                    <button
                      type="button"
                      onClick={() => handleSearchChange("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      title="Hapus pencarian"
                    >
                      <X className="size-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="rounded-full bg-muted px-3 py-1 font-medium">
                    Total Tautan: {links?.total ?? 0}
                  </span>
                </div>
              </div>

              {/* DATA TABLE */}
              <DataTable
                columns={columns}
                data={links?.data ?? []}
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