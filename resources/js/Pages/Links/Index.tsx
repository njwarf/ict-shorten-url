import { AppSidebar } from "@/Components/app-sidebar";
import { router } from "@inertiajs/react";
import { SiteHeader } from "@/Components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { columns as getColumns } from "./columns";
import { DataTable } from "./data-table";
import { List, Grid2X2, Search, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/Components/ui/dialog";
interface Link {
  id: string;
  title: string;
  original_url: string;
  short_code: string;
  status: string;
}

interface Props {
  links: Link[];
}

export default function Index({ links }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const tableColumns = getColumns(
    setOpen,
    setSelectedId
  );

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />

        <div className="flex flex-1">
          <AppSidebar />

          <SidebarInset >
            <div className="p-6">
              <div className="mb-10 flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-widest text-gray-500">
                    Inventory
                  </p>

                  <h1 className="text-5xl font-bold">
                    Links
                  </h1>

                  <p className="text-sm text-gray-500">
                    Manage your redirection architecture and track real-time performance across all touchpoints.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Button
                      className="bg-black text-white hover:bg-gray-800"
                      onClick={() => router.get("/links/create")}
                    >
                      + Create New Link
                    </Button>
                  </div>
                </div>
              </div>
              <div className="mb-6 flex items-center justify-between gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

                  <Input
                    placeholder="Search links or destination URLs..."
                    className="h-10 pl-10"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-11 gap-2"
                      >
                        Sort by: Newest
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Newest</DropdownMenuItem>
                      <DropdownMenuItem>Oldest</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button
                    variant="outline"
                    size="icon"
                    className="h-11 w-11"
                  >
                    <List className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    className="h-11 w-11"
                  >
                    <Grid2X2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <DataTable
                columns={tableColumns}
                data={links}
              />
            </div>
          </SidebarInset>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Hapus Link?
                </DialogTitle>

                <DialogDescription>
                  Apakah kamu yakin ingin menghapus link ini?
                  Data yang sudah dihapus tidak bisa dikembalikan.
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded border px-4 py-2"
                >
                  Batal
                </button>

                <button
                  onClick={() => {
                    if (selectedId) {
                      router.delete(`/links/${selectedId}`);
                    }

                    setOpen(false);
                  }}
                  className="rounded bg-red-600 px-4 py-2 text-white"
                >
                  Hapus
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div >
      </SidebarProvider >
    </div >
  );
}
