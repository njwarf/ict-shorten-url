import { Head } from "@inertiajs/react"
import { ChartColumn } from "lucide-react"

import { AppSidebar } from "@/Components/app-sidebar"
import { SiteHeader } from "@/Components/site-header"
import { SidebarInset, SidebarProvider } from "@/Components/ui/sidebar"

export default function AnalyticsIndex() {
    return (
        <div className="[--header-height:calc(--spacing(14))]">
            <Head title="Analitik & Laporan" />

            <SidebarProvider className="flex flex-col">
                <SiteHeader />

                <div className="flex flex-1">
                    <AppSidebar />

                    <SidebarInset>
                        <main className="flex flex-1 flex-col gap-6 p-4 md:p-6">

                            <div className="flex items-center gap-2">
                                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                                    <ChartColumn className="size-5" />
                                </div>
                                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                                    Dasbor Analitik
                                </h1>
                            </div>

                            <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
                                <p className="text-sm text-muted-foreground">
                                    Halaman laporan dan statistik analitik tautan Anda akan tampil di sini.
                                </p>
                            </div>

                        </main>
                    </SidebarInset>
                </div>
            </SidebarProvider>
        </div>
    )
}