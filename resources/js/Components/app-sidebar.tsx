import * as React from "react"
import { Link } from "@inertiajs/react";
import { NavMain } from "@/Components/nav-main"
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
} from "@/Components/ui/sidebar"
import {
  TerminalIcon,
  LayoutDashboard,
  ChartColumn,
  Link2,
  MailIcon,
  GraduationCapIcon,
  UsersIcon,
  BriefcaseIcon,
  Pin,
  Users,
} from "lucide-react"

type PinnedLink = {
  id: string;
  title: string;
  short_code: string;
};

const data = {
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
  const page = usePage<any>();
  const user = page.props.auth.user;
  const pinnedLinks: PinnedLink[] = page.props.pinnedLinks ?? [];

  // Periksa apakah user yang sedang login memiliki role admin
  const isAdmin = user?.role === 'admin';

  // Daftar menu utama yang bersifat dinamis berdasarkan role
  const navMain = [
    {
      title: "Dasbor",
      url: "/dashboard",
      icon: <LayoutDashboard />,
    },
    {
      title: "Analitik",
      url: "/dashboard/analytics",
      icon: <ChartColumn />,
    },
    {
      title: "Tautan",
      url: "/links",
      icon: <Link2 />,
    },
    // Menu Users hanya akan dirender jika user berstatus admin
    ...(isAdmin
      ? [
        {
          title: "Users",
          url: "/admin/users",
          icon: <Users />,
        },
      ]
      : []),
  ];

  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div
                  className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <TerminalIcon className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">ICT SH</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />

        <div className="px-2 py-2">
          <p className="mb-2 px-2 text-xs font-medium text-muted-foreground">
            Tautan Disematkan
          </p>

          <SidebarMenu>
            {pinnedLinks.length < 1 && (
              <p className="px-2 text-xs italic text-muted-foreground">
                Buat tautan untuk disematkan
              </p>
            )}

            {pinnedLinks.map((link) => (
              <SidebarMenuItem key={link.id}>
                <SidebarMenuButton asChild>
                  <Link href={`/links/${link.id}/edit`}>
                    <Pin className="size-4" />
                    <span className="truncate">{link.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {user && (
          <NavUser user={{
            name: user.name,
            email: user.email,
            avatar: user.avatar ?? undefined
          }}
          />
        )}
      </SidebarFooter>
    </Sidebar>
  )
}