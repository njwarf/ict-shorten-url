import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import {MoreHorizontalIcon, FolderIcon, ShareIcon, Trash2Icon, Link2} from "lucide-react"
import * as React from "react";

export function NavLinks({links,}: {
  links: {
    name: string
    url: string
    icon: React.ReactNode
  }[]
}) {
  const {isMobile} = useSidebar()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Pinned Links</SidebarGroupLabel>
      <SidebarMenu>
        {links.length < 1 && (
          <p className="text-xs italic px-2 text-muted-foreground">
            Create new link to pinned
          </p>
        )}
        {links.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                {item.icon}
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction
                  showOnHover
                  className="aria-expanded:bg-muted"
                >
                  <MoreHorizontalIcon
                  />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <FolderIcon className="text-muted-foreground"/>
                  <span>Open Link</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ShareIcon className="text-muted-foreground"/>
                  <span>Share Link</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>
                  <Trash2Icon className="text-muted-foreground"/>
                  <span>Remove Link</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
