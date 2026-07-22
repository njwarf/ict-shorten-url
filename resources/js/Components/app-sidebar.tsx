import * as React from "react"

import { NavMain } from "@/Components/nav-main"
import { NavProjects } from "@/Components/nav-projects"
import { NavSecondary } from "@/Components/nav-secondary"
import { NavUser } from "@/Components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LifeBuoyIcon, SendIcon, FrameIcon, TerminalIcon, LayoutDashboard, ChartColumn, Link2, MailIcon, GraduationCapIcon, UsersIcon, BriefcaseIcon } from "lucide-react"

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: (
                <LayoutDashboard
                />
            ),
        },
        {
            title: "Analytics",
            url: "/dashboard/analytics",
            icon: (
                <ChartColumn
                />
            ),
        },
        {
            title: "Links",
            url: "/dashboard/links",
            icon: (
                <Link2
                />
            ),
        },
    ],
    navSecondary: [
        {
            title: "UMTAS Apps",
            url: "#",
            icon: (
                <LifeBuoyIcon />
            ),
        },
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
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
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
                <NavProjects projects={data.projects} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    )
}
