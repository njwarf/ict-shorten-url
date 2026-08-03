import * as React from "react"

import { NavMain } from "@/Components/nav-main"
import { NavLinks } from "@/Components/nav-links"
import { NavSecondary } from "@/Components/nav-secondary"
import { NavUser } from "@/Components/nav-user"
import { usePage } from "@inertiajs/react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  TerminalIcon,
  LayoutDashboard,
  ChartColumn,
  Link2,
  MailIcon,
  GraduationCapIcon,
  UsersIcon,
  BriefcaseIcon,
} from "lucide-react"
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: (
        <LayoutDashboard />
      ),
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: (
        <ChartColumn />
      ),
    },
    {
      title: "Links",
      url: "/links",
      icon: (
        <Link2 />
      ),
    },
  ],
  navSecondary: [
    {
      title: "Persuratan UMTAS",
      url: "#",
      icon: (
        <MailIcon />
      ),
    },
    {
      title: "PLP UMTAS",
      url: "#",
      icon: (
        <GraduationCapIcon />
      ),
    },
    {
      title: "SIKEMAS UMTAS",
      url: "#",
      icon: (
        <UsersIcon />
      ),
    },
    {
      title: "SIPP UMTAS",
      url: "#",
      icon: (
        <BriefcaseIcon />
      ),
    },
    {
      title: "SIMPEG UMTAS",
      url: "#",
      icon: (
        <UsersIcon />
      ),
    },
  ],
  projects: [],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = usePage().props.auth.user;
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div
                  className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <TerminalIcon className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">ICT Shorten</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavLinks links={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {user && (
          <NavUser user={{
            name: user.name,
            email: user.email,
            avatar: user.avatar ?? "/avatars/shadcn.jpg",
          }}
          />
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
