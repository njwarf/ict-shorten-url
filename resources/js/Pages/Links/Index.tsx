import { AppSidebar } from "@/Components/app-sidebar";
import { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { SiteHeader } from "@/Components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/Components/ui/sidebar";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import {
  List,
  Grid2X2,
  Search,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

interface Link {
  id: string;
  title: string;
  original_url: string;
  short_code: string;
  is_active: boolean;
}

interface PaginationLinkData {
  url: string | null;
  label: string;
  active: boolean;
}

interface PaginatedLinks {
  data: Link[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number | null;
  to: number | null;
  links: PaginationLinkData[];
}

interface Props {
  links: PaginatedLinks;
  filters?: {
    search?: string;
  };
}

export default function Index({ links, filters }: Props) {
  const { flash } = usePage().props as {
    flash?: {
      error?: string;
      success?: string;
    };
  };
  const tableColumns = columns;

  const [search, setSearch] = useState(filters?.search ?? "");

  const filteredLinks = links.data;

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
    );
  };

  useEffect(() => {
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
      );
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />

        <div className="flex flex-1">
          <AppSidebar />

          <SidebarInset>
            <div className="p-6">
              {/* Header */}
              <div className="mb-10 flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    Inventory
                  </p>

                  <h1 className="text-6xl font-bold tracking-tight">
                    Links
                  </h1>

                  <p className="text-sm text-muted-foreground">
                    Manage your redirection architecture and track
                    real-time performance across all touchpoints.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="default"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => router.get("/links/create")}
                  >
                    + Create New Link
                  </Button>
                </div>
              </div>

              {/* Search & Actions */}
              <div className="mb-6 flex items-center justify-between gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    placeholder="Search links..."
                    className="w-[320px] pl-10"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="gap-2"
                      >
                        Sort by: Newest
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        Newest
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                        Oldest
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button
                    variant="outline"
                    size="icon"
                  >
                    <List className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                  >
                    <Grid2X2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {flash?.error && (
                <div className="mb-4 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {flash.error}
                </div>
              )}

              {/* Data Table */}
              <DataTable
                columns={tableColumns}
                data={filteredLinks}
                pagination={links}
                onPageChange={goToPage}
              />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
