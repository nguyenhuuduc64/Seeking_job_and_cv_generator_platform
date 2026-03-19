import {
    type ColumnDef,
    type ColumnFiltersState,
    getFilteredRowModel,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getSortedRowModel,
    type SortingState,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import React from "react"
import { Input } from "@/components/ui/input"
import { Plus, ChevronLeft, ChevronRight } from "lucide-react"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    onRowClick?: (row: TData) => void
    filterColumn?: string;
    filterPlaceholder?: string;
    onAddClick?: () => void;
    addButtonText?: string;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    onRowClick,
    filterColumn, // Để mặc định là undefined để check logic ẩn/hiện search
    filterPlaceholder = "Tìm kiếm...",
    onAddClick,
    addButtonText = "Thêm mới"
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: { sorting, columnFilters },
    })

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                {/* Chỉ hiện ô Search nếu ông chủ truyền filterColumn */}
                {filterColumn && (
                    <Input
                        placeholder={filterPlaceholder}
                        value={(table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn(filterColumn)?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm bg-white shadow-sm border-gray-200 focus:ring-emerald-500"
                    />
                )}

                {/* Chỉ hiện nút Thêm nếu ông chủ truyền hàm xử lý onAddClick */}
                {onAddClick && (
                    <Button onClick={onAddClick} className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 shadow-sm">
                        <Plus size={18} /> {addButtonText}
                    </Button>
                )}
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md">
                <Table>
                    <TableHeader className="bg-gray-50/50">
                        {table.getHeaderGroups().map((hg) => (
                            <TableRow key={hg.id} className="hover:bg-transparent">
                                {hg.headers.map((h) => (
                                    <TableHead key={h.id} className="h-12 font-semibold text-gray-600 px-6">
                                        {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    onClick={() => onRowClick?.(row.original)}
                                    className="group cursor-pointer hover:bg-emerald-50/30 transition-colors"
                                >
                                    {row.getVisibleCells().map((c) => (
                                        <TableCell key={c.id} className="px-6 py-4">
                                            {flexRender(c.column.columnDef.cell, c.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-32 text-center text-gray-400 italic">
                                    Không tìm thấy dữ liệu nào phù hợp.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Phân trang kiểu hiện đại */}
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