import { AppSidebar } from "@/Components/app-sidebar";
import { router } from "@inertiajs/react";
import { SiteHeader } from "@/Components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";

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
}

interface Props {
  links: Link[];
}

export default function Index({ links }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />

        <div className="flex flex-1">
          <AppSidebar />

          <SidebarInset>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Links</h1>

                <a
                  href="/links/create"
                  className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Tambah Link
                </a>
              </div>

              <table className="w-full border">
                <thead>
                  <tr>
                    <th className="border p-2">Title</th>
                    <th className="border p-2">Original URL</th>
                    <th className="border p-2">Short Code</th>
                    <th className="border p-2">Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {links.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="border p-4 text-center"
                      >
                        Belum ada data link.
                      </td>
                    </tr>
                  ) : (
                    links.map((link) => (
                      <tr key={link.id}>
                        <td className="border p-2">{link.title}</td>
                        <td className="border p-2">{link.original_url}</td>
                        <td className="border p-2">{link.short_code}</td>

                        <td className="border p-2">
                          <a
                            href={`/links/${link.id}/edit`}
                            className="mr-2 rounded bg-yellow-500 px-3 py-1 text-white"
                          >
                            Edit
                          </a>

                          <button
                            onClick={() => {
                              setSelectedId(link.id);
                              setOpen(true);
                            }}
                            className="rounded bg-red-600 px-3 py-1 text-white"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </SidebarInset >
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
