import { type ColumnDef, type ColumnFiltersState, getFilteredRowModel, flexRender, getCoreRowModel, useReactTable, getPaginationRowModel, getSortedRowModel, type SortingState, } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import React from "react"
import { Input } from "@/components/ui/input"
import { useDispatch } from "react-redux"
import { openForm } from "@/features/modal/formSlice"
import { ChevronLeft, ChevronRight } from "lucide-react"
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    onRowClick?: (row: TData) => void
}

export function DataTable<TData, TValue>({ columns, data, onRowClick }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        // Lưu ý: Để dùng được nextPage, ông chủ phải thêm logic phân trang vào đây
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    })
    const dispatch = useDispatch();
    return (
        <div>
            <div className="flex items-center py-4 [&>_*]:mr-4 ">
                <Input
                    placeholder="Filter emails..."
                    value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("email")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm bg-white"
                />
                <Button onClick={() => dispatch(openForm('jobCategoryForm'))}>Thêm danh mục nghề</Button>
            </div>
            <div className="overflow-hidden rounded-md border bg-white">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((hg) => (
                            <TableRow key={hg.id}>
                                {hg.headers.map((h) => (
                                    <TableHead key={h.id}>
                                        {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} onClick={() => onRowClick?.(row.original)}>
                                    {row.getVisibleCells().map((c) => (
                                        <TableCell key={c.id}>{flexRender(c.column.columnDef.cell, c.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">Không có dữ liệu.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between px-2 py-4 border-t border-gray-100">
                <div className="text-sm text-gray-500 font-medium">
                    Hiển thị <span className="text-gray-800">{table.getRowModel().rows.length}</span> trên <span className="text-gray-800">{data.length}</span> kết quả
                </div>
                <div className="flex items-center space-x-3">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-600 hover:bg-gray-100"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeft size={16} className="mr-1" /> Trước
                    </Button>
                    <div className="text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-md">
                        {table.getState().pagination.pageIndex + 1}
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-600 hover:bg-gray-100"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Tiếp <ChevronRight size={16} className="ml-1" />
                    </Button>
                </div>
            </div>
        </div>
    )
}