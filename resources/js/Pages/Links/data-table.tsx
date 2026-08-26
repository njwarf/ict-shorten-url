"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { ChevronLeft, ChevronRight } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/Components/ui/pagination"

interface PaginationData {
  current_page: number
  last_page: number
  per_page: number
  total: number
  from: number | null
  to: number | null
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pagination: PaginationData
  onPageChange: (page: number) => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  onPageChange,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const currentPage = pagination.current_page

  return (
    <div className="mt-6 overflow-hidden rounded-xl border bg-background">
      <Table>
        <TableHeader className="bg-muted/30">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="h-12 text-xs font-semibold uppercase text-muted-foreground"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="hover:bg-muted/50"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="py-4"
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
              >
                Belum ada data link.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* FOOTER */}
      <div className="flex items-center justify-between border-t px-6 py-4 text-sm text-muted-foreground">
        {/* SHOWING */}
        <p>
          Showing {pagination.from ?? 0} to {pagination.to ?? 0} of{" "}
          {pagination.total} results
        </p>

        {/* PAGINATION */}
        <Pagination className="mx-0 w-auto justify-end">
          <PaginationContent>

            {/* LEFT */}
            <PaginationItem>
              <PaginationLink
                href="#"
                size="icon"
                aria-label="Previous page"
                onClick={(e) => {
                  e.preventDefault()

                  if (currentPage > 1) {
                    onPageChange(currentPage - 1)
                  }
                }}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              >
                <ChevronLeft className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>

            {/* CURRENT PAGE */}
            <PaginationItem>
              <PaginationLink
                href="#"
                size="icon"
                isActive
                onClick={(e) => e.preventDefault()}
                className="bg-black text-white hover:bg-black hover:text-white"
              >
                {currentPage}
              </PaginationLink>
            </PaginationItem>

            {/* RIGHT */}
            <PaginationItem>
              <PaginationLink
                href="#"
                size="icon"
                aria-label="Next page"
                onClick={(e) => {
                  e.preventDefault()

                  if (currentPage < pagination.last_page) {
                    onPageChange(currentPage + 1)
                  }
                }}
                className={
                  currentPage === pagination.last_page
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              >
                <ChevronRight className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>

          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
