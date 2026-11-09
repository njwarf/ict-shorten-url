
import { AppSidebar } from "@/Components/app-sidebar";
import { SiteHeader } from "@/Components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/Components/ui/sidebar";
import { Button } from "@/Components/ui/button";
import { Head, router } from "@inertiajs/react";
import { ArrowLeft, ExternalLink } from "lucide-react";

interface LinkData {
  id: string;
  title: string;
  original_url: string;
  short_code: string;
  is_active: boolean;
  click_count: number;
  created_at: string;
}

interface Props {
  link: LinkData;
}

export default function Show({ link }: Props) {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <Head title={`Detail - ${link.title}`} />

      <SidebarProvider className="flex flex-col">
        <SiteHeader />

        <div className="flex flex-1">
          <AppSidebar />

          <SidebarInset>
            <div className="p-6">
              <Button
                variant="outline"
                className="mb-6 gap-2"
                onClick={() => router.get("/links")}
              >
                <ArrowLeft className="h-4 w-4" />
                Kembali ke Links
              </Button>

              <h1 className="mb-2 text-3xl font-bold">
                Detail Link
              </h1>

              <p className="mb-8 text-sm text-muted-foreground">
                Informasi lengkap tautan yang kamu pilih.
              </p>

              <div className="max-w-2xl space-y-6 rounded-lg border bg-card p-6">
                <div>
                  <p className="text-sm text-muted-foreground">Judul</p>
                  <p className="font-medium">{link.title}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    URL Asli
                  </p>
                  <a
                    href={link.original_url}
                    target="_blank"
                    rel="noreferrer"
                    className="break-all text-primary underline"
                  >
                    {link.original_url}
                  </a>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Short Code
                  </p>
                  <p>{link.short_code}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Status
                  </p>
                  <p>{link.is_active ? "Aktif" : "Nonaktif"}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Klik
                  </p>
                  <p className="text-2xl font-semibold">
                    {link.click_count}
                  </p>
                </div>

                <Button
                  className="gap-2"
                  onClick={() =>
                    window.open(
                      `/${link.short_code}`,
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                >
                  <ExternalLink className="h-4 w-4" />
                  Buka Short Link
                </Button>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
