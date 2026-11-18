import * as React from "react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    pagination?: any
    onPageChange?: (page: number) => void
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

    return (
        <div className="space-y-4">
            <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
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
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Tidak ada data.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Opsional jika dikirim dari parent */}
            {pagination && pagination.last_page > 1 && (
                <div className="flex items-center justify-between px-2">
                    <div className="text-sm text-muted-foreground">
                        Halaman {pagination.current_page} dari {pagination.last_page}
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => onPageChange?.(pagination.current_page - 1)}
                            disabled={pagination.current_page === 1}
                            className="px-3 py-1 text-sm border rounded-md disabled:opacity-50 bg-white"
                        >
                            Sebelumnya
                        </button>
                        <button
                            onClick={() => onPageChange?.(pagination.current_page + 1)}
                            disabled={pagination.current_page === pagination.last_page}
                            className="px-3 py-1 text-sm border rounded-md disabled:opacity-50 bg-white"
                        >
                            Selanjutnya
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}