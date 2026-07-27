
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { AppSidebar } from "@/Components/app-sidebar";
import { SiteHeader } from "@/Components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({
  mustVerifyEmail,
  status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />

        <div className="flex flex-1">
          <AppSidebar />

          <SidebarInset>
            <Head title="Profile" />

            <div className="flex-1 p-6">
              <div className="mx-auto w-full max-w-5xl space-y-6">
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                  <UpdateProfileInformationForm
                    mustVerifyEmail={mustVerifyEmail}
                    status={status}
                    className="max-w-xl"
                  />
                </div>

                <div className="rounded-lg border bg-card p-6 shadow-sm">
                  <UpdatePasswordForm className="max-w-xl" />
                </div>

                <div className="rounded-lg border bg-card p-6 shadow-sm">
                  <DeleteUserForm className="max-w-xl" />
                </div>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
