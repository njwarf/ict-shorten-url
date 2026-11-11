import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Link } from "@inertiajs/react"
import { Link2, Plus } from "lucide-react"

import { Button } from "@/Components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/ui/pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table"

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
  const lastPage = pagination.last_page

  const getPageNumbers = () => {
    if (lastPage <= 5) {
      return Array.from({ length: lastPage }, (_, index) => index + 1)
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", lastPage]
    }

    if (currentPage >= lastPage - 2) {
      return [1, "...", lastPage - 3, lastPage - 2, lastPage - 1, lastPage]
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      lastPage,
    ]
  }

  const hasRows = table.getRowModel().rows.length > 0

  return (
    <Card className="overflow-hidden p-0">
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-muted/40">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="h-10 text-xs font-semibold text-muted-foreground"
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
            {hasRows ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="transition-colors hover:bg-muted/40"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
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
                  className="h-64 text-center"
                >
                  <div className="flex flex-col items-center justify-center gap-2 p-8 text-center text-muted-foreground">
                    <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                      <Link2 className="size-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">
                      Tidak ada tautan
                    </p>
                    <p className="max-w-sm text-xs text-muted-foreground">
                      Tidak ditemukan tautan yang sesuai dengan pencarian Anda.
                      Coba kata kunci lain atau buat tautan baru.
                    </p>
                    <Button asChild size="sm" className="mt-2 h-8 gap-1.5 text-xs">
                      <Link href="/links/create">
                        <Plus className="size-3.5" />
                        Buat Tautan
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      {/* FOOTER */}
      <CardFooter className="flex flex-col gap-4 border-t px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          Menampilkan <span className="font-medium text-foreground">{pagination.from ?? 0}</span> sampai{" "}
          <span className="font-medium text-foreground">{pagination.to ?? 0}</span> dari{" "}
          <span className="font-medium text-foreground">{pagination.total}</span> tautan
        </p>

        {lastPage > 1 && (
          <Pagination className="mx-0 w-auto justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage > 1) {
                      onPageChange(currentPage - 1)
                    }
                  }}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

              {getPageNumbers().map((page, index) => (
                <PaginationItem key={`${page}-${index}`}>
                  {page === "..." ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      href="#"
                      isActive={page === currentPage}
                      onClick={(e) => {
                        e.preventDefault()
                        onPageChange(page as number)
                      }}
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage < lastPage) {
                      onPageChange(currentPage + 1)
                    }
                  }}
                  className={
                    currentPage === lastPage
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </CardFooter>
    </Card>
  )
}
