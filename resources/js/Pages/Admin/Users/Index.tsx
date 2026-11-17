import { useState } from "react"
import { Head, router } from "@inertiajs/react"
import { Users, Search, X } from "lucide-react"

import { AppSidebar } from "@/Components/app-sidebar"
import { SiteHeader } from "@/Components/site-header"
import { Input } from "@/Components/ui/input"
import { SidebarInset, SidebarProvider } from "@/Components/ui/sidebar"
import { columns } from "./columns"
import { DataTable } from "@/Components/data-table"

export default function AdminUsersIndex({ users, filters }: { users: any; filters: any }) {
  const [search, setSearch] = useState(filters?.search ?? "")
  const [role, setRole] = useState(filters?.role ?? "")

  const goToPage = (page: number) => {
    router.get(
      route("admin.users.index"),
      { page, search: search || undefined, role: role || undefined },
      { preserveState: true, preserveScroll: true }
    )
  }

  const handleSearchChange = (value: string) => {
    setSearch(value)
    router.get(
      route("admin.users.index"),
      { search: value || undefined, role: role || undefined },
      { preserveState: true, preserveScroll: true, replace: true }
    )
  }

  const handleRoleChange = (selectedRole: string) => {
    setRole(selectedRole)
    router.get(
      route("admin.users.index"),
      { search: search || undefined, role: selectedRole || undefined },
      { preserveState: true, preserveScroll: true, replace: true }
    )
  }

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <Head title="Admin - Manajemen Pengguna" />

      <SidebarProvider className="flex flex-col">
        <SiteHeader />

        <div className="flex flex-1">
          <AppSidebar />

          <SidebarInset>
            <main className="flex flex-1 flex-col gap-6 p-4 md:p-6">

              {/* PAGE HEADER */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <Users className="size-5" />
                  </div>
                  <h1 className="text-2xl font-bold tracking-tight text-foreground">
                    Manajemen Pengguna (Admin)
                  </h1>
                </div>
                <p className="text-sm text-muted-foreground">
                  Kelola pengguna platform, lihat peran, dan pantau status akun dengan aman.
                </p>
              </div>

              {/* SEARCH BAR, ROLE FILTER & TOTAL BADGE */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  {/* SEARCH */}
                  <div className="relative w-full sm:w-80">
                    <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Cari berdasarkan nama atau email..."
                      className="h-9 pl-8 pr-8 text-xs"
                      value={search}
                      onChange={(e) => handleSearchChange(e.target.value)}
                    />
                    {search && (
                      <button
                        type="button"
                        onClick={() => handleSearchChange("")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        <X className="size-3.5" />
                      </button>
                    )}
                  </div>

                  {/* FILTER ROLE DROPDOWN */}
                  <div className="relative">
                    <select
                      value={role}
                      onChange={(e) => handleRoleChange(e.target.value)}
                      className="h-9 w-full sm:w-40 rounded-md border border-input bg-background px-3 py-1 text-xs text-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none pr-8 cursor-pointer"
                    >
                      <option value="">Semua Peran</option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground">
                      <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="rounded-full bg-muted px-3 py-1 font-medium">
                    Total Pengguna: {users.total}
                  </span>
                </div>
              </div>

              {/* DATA TABLE */}
              <DataTable
                columns={columns}
                data={users.data}
                pagination={users}
                onPageChange={goToPage}
              />

            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}