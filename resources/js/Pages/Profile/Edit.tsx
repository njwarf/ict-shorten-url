import { Head } from "@inertiajs/react"

import { AppSidebar } from "@/Components/app-sidebar"
import { SiteHeader } from "@/Components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/Components/ui/sidebar"
import type { PageProps } from "@/types"
import DeleteUserForm from "./Partials/DeleteUserForm"
import UpdatePasswordForm from "./Partials/UpdatePasswordForm"
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm"

interface EditProps {
  mustVerifyEmail: boolean
  status?: string
}

export default function Edit({
  mustVerifyEmail,
  status,
}: PageProps<EditProps>) {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <Head title="Profile Settings" />

      <SidebarProvider className="flex flex-col">
        <SiteHeader />

        <div className="flex flex-1">
          <AppSidebar />

          <SidebarInset>
            <main className="flex flex-1 flex-col gap-6 p-4 md:p-6">
              {/* PAGE HEADER */}
              <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  Profile Settings
                </h1>
                <p className="text-sm text-muted-foreground">
                  Manage your personal details, credentials, and account preferences.
                </p>
              </div>

              {/* FORMS CONTAINER */}
              <div className="flex max-w-4xl flex-col gap-6">
                <UpdateProfileInformationForm
                  mustVerifyEmail={mustVerifyEmail}
                  status={status}
                />

                <UpdatePasswordForm />

                <DeleteUserForm />
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}
