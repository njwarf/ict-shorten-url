import { useState } from "react"
import { Head, router } from "@inertiajs/react"
import { AppSidebar } from "@/Components/app-sidebar"
import { SiteHeader } from "@/Components/site-header"
import { SidebarInset, SidebarProvider } from "@/Components/ui/sidebar"
import { columns, User } from "./columns"
import { DataTable } from "@/Components/ui/data-table"
import { Input } from "@/Components/ui/input"
import { Users, Shield, Search, Filter } from "lucide-react"

interface Props {
  users: {
    data: User[];
    links: any[];
    current_page: number;
    last_page: number;
    total: number;
  };
  filters: {
    search?: string;
    role?: string;
  };
}

export default function Index({ users, filters }: Props) {
  const [search, setSearch] = useState(filters.search || "");
  const [role, setRole] = useState(filters.role || "");

  const handleFilter = (newSearch: string, newRole: string) => {
    router.get(
      route('admin.users.index'),
      { search: newSearch, role: newRole },
      { preserveState: true, replace: true }
    );
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFilter(search, role);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);
    handleFilter(search, selectedRole);
  };

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <Head title="Manajemen Pengguna" />
      <SidebarProvider className="flex flex-col">
        <SiteHeader />

        <div className="flex flex-1">
          <AppSidebar />

          <SidebarInset>
            <main className="flex flex-1 flex-col gap-6 p-4 md:p-6 bg-slate-50/50">

              {/* Header Halaman dengan Ikon & Statistik Ringkas */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                    <Users className="size-6 text-primary" /> Manajemen Pengguna
                  </h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    Kelola data akun, hak akses peran (role), dan pantau aktivitas pengguna aplikasi.
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border shadow-sm">
                  <Shield className="size-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">Total Pengguna:</span>
                  <span className="text-sm font-bold text-foreground">{users.total ?? users.data.length} Akun</span>
                </div>
              </div>

              {/* Kontainer Utama */}
              <div className="bg-white shadow-sm rounded-xl p-6 border">

                {/* Baris Pencarian & Filter Role */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6 items-center justify-between">

                  {/* Form Pencarian */}
                  <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full sm:w-auto flex-1 max-w-md">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Cari berdasarkan nama atau email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                      Cari
                    </button>
                  </form>

                  {/* Filter Berdasarkan Role */}
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Filter className="size-4 text-muted-foreground" />
                    <select
                      value={role}
                      onChange={handleRoleChange}
                      className="h-10 w-full sm:w-44 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="">Semua Peran</option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>

                </div>

                {/* Data Table */}
                <div className="rounded-lg overflow-hidden border">
                  <DataTable columns={columns} data={users.data} />
                </div>

              </div>

            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}