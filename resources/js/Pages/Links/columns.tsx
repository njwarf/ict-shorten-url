"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  MoreHorizontal,
  Eye,
  Share2,
  Pencil,
} from "lucide-react";

import { Button } from "@/Components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

export type Link = {
  id: string;
  title: string;
  original_url: string;
  short_code: string;
  is_active: boolean;

};

export const columns: ColumnDef<Link>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div>
        <p className="text-lg font-semibold">
          {row.original.short_code}
        </p>

        <a
          href={`${window.location.origin}/${row.original.short_code}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:underline"
        >
          {window.location.origin}/{row.original.short_code}
        </a>
      </div>
    ),
  },
  {
    accessorKey: "original_url",
    header: "Original URL",
    cell: ({ row }) => (
      <a
        href={row.original.original_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground hover:underline"
      >
        {row.original.original_url}
      </a>
    ),
  },
  {
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }) => {
      const active = row.original.is_active;

      return (
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${active
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-gray-700"
            }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${active ? "bg-green-500" : "bg-gray-400"
              }`}
          />
          {active ? "Active" : "Inactive"}
        </span>
      );
    },
  },
  {
    id: "analytics",
    header: "Analytics (7D)",
    cell: () => (
      <div className="text-center text-muted-foreground">
        -
      </div>
    ),
  },


  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const link = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              Detail
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => window.location.href = `/links/${link.id}/edit`}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>


          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
