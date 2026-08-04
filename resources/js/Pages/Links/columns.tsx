"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  MoreHorizontal,
  TrendingUp,
  Eye,
  Share2,
  Pencil,
  Trash2,
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

export const columns = (
  setOpen: (value: boolean) => void,
  setSelectedId: (id: string) => void
): ColumnDef<Link>[] => [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="space-y-1">
          <p className="font-semibold">
            {row.original.title}
          </p>

          <p className="text-xs text-muted-foreground">
            ict.sh/{row.original.short_code}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "original_url",
      header: "Original URL",
      cell: ({ row }) => (
        <div className="max-w-[320px] truncate text-sm text-muted-foreground">
          {row.original.original_url}
        </div>
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
      cell: ({ row }) => {
        const charts = [
          "M2 16C10 10 18 10 26 16C34 6 42 6 50 14C58 4 66 8 68 6", // gelombang
          "M2 10H68", // datar
          "M2 15L10 11L18 15L26 7L34 12L42 5L50 9L58 4L68 8", // zig-zag
          "M2 14C12 15 24 13 34 10C46 7 56 6 68 8", // kurva naik
        ];

        const index = Number(row.index) % charts.length;

        const color = index === 1 ? "#9CA3AF" : "#111827";

        return (
          <div className="flex items-center justify-center">
            <svg width="70" height="20" viewBox="0 0 70 20" fill="none">
              <path
                d={charts[index]}
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        );
      },
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

              <DropdownMenuItem
                className="text-red-600"
                onClick={() => {
                  setSelectedId(link.id);
                  setOpen(true);
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Hapus
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
