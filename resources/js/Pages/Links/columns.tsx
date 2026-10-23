"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import { router } from "@inertiajs/react";
import {
  MoreHorizontal,
  Eye,
  Share2,
  Pencil,
  Pin,
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
  is_pinned: boolean;
  analytics_7d: number;
  analytics_daily: {
    date: string;
    clicks: number;
  }[];
};

export const columns: ColumnDef<Link>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div>
        <p className="text-lg font-semibold">
          {row.original.title}
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
    accessorKey: "analytics_7d",
    cell: ({ row }) => {
      const data = row.original.analytics_daily ?? [];

      return (
        <div className="h-10 w-28">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line
                type="monotone"
                dataKey="clicks"
                stroke="var(--primary)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
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
            <DropdownMenuItem
              onClick={() => router.get(`/links/${link.id}`)}
            >
              <Eye className="mr-2 h-4 w-4" />
              Detail
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={async (event) => {
                event.preventDefault();

                try {
                  await navigator.clipboard.writeText(
                    `${window.location.origin}/${link.short_code}`
                  );

                  alert("URL berhasil disalin!");
                } catch {
                  alert("Gagal menyalin URL.");
                }
              }}
            >
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
              onClick={() =>
                router.patch(`/links/${link.id}/toggle-pin`)
              }
            >
              <Pin className="mr-2 h-4 w-4" />
              {link.is_pinned ? "Unpin" : "Pin"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
