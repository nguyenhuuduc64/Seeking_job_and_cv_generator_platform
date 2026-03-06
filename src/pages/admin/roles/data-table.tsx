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
import { Plus } from "lucide-react"

// Thêm các Props linh hoạt thưa ông chủ
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    onRowClick?: (row: TData) => void
    filterColumn?: string;      // Cột dùng để search (ví dụ: "email" hoặc "name")
    filterPlaceholder?: string; // Chữ hiện trong ô search
    onAddClick?: () => void;    // Hành động khi nhấn nút Thêm
    addButtonText?: string;     // Chữ hiển thị trên nút Thêm
}

export function DataTable<TData, TValue>({
    columns,
    data,
    onRowClick,
    filterColumn = "name", // Mặc định search theo tên
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
            <div className="flex items-center justify-between py-4">
                {/* Ô tìm kiếm linh hoạt */}
                <Input
                    placeholder={filterPlaceholder}
                    value={(table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn(filterColumn)?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm bg-white shadow-sm"
                />


                <Button onClick={onAddClick} className="flex gap-2">
                    <Plus size={18} /> {addButtonText}
                </Button>

            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <Table>
                    <TableHeader className="bg-gray-50">
                        {table.getHeaderGroups().map((hg) => (
                            <TableRow key={hg.id}>
                                {hg.headers.map((h) => (
                                    <TableHead key={h.id} className="font-bold text-gray-700">
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
                                    className="cursor-pointer hover:bg-blue-50/50 transition-colors"
                                >
                                    {row.getVisibleCells().map((c) => (
                                        <TableCell key={c.id}>
                                            {flexRender(c.column.columnDef.cell, c.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-32 text-center text-gray-500">
                                    Không có dữ liệu phù hợp.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Phân trang */}
            <div className="flex items-center justify-between py-2">
                <p className="text-sm text-muted-foreground">
                    Trang {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
                </p>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Trước
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Tiếp theo
                    </Button>
                </div>
            </div>
        </div>
    )
}