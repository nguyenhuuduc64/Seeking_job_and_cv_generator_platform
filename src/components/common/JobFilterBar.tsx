import * as React from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ListFilter } from "lucide-react"

export function JobFilterBar() {
    return (
        <div className="w-full bg-white border rounded-xl p-4  flex items-center justify-between gap-4">

            {/* CÁC NÚT LỌC BÊN TRÁI THƯA ÔNG CHỦ */}
            <div className="flex flex-wrap items-center gap-3">
                {/* 1. Cấp bậc */}
                <FilterSelect placeholder="Cấp bậc" options={["Intern", "Junior", "Senior", "Manager"]} />

                {/* 2. Hình thức làm việc */}
                <FilterSelect placeholder="Hình thức làm việc" options={["Toàn thời gian", "Bán thời gian", "Remote"]} />

                {/* 3. Mức lương */}
                <FilterSelect placeholder="Mức lương" options={["Dưới 10tr", "10-20tr", "20-50tr", "Trên 50tr"]} />

                {/* 4. Lĩnh vực công việc */}
                <FilterSelect placeholder="Lĩnh vực công việc" options={["IT / Phần mềm", "Marketing", "Thiết kế", "Kế toán"]} />
            </div>

            {/* NÚT BỘ LỌC TỔNG BÊN PHẢI */}
            <Button variant="outline" className="flex items-center gap-2 rounded-lg border-gray-300 font-bold text-sm h-10 px-6">
                <ListFilter size={18} />
                Bộ lọc
            </Button>
        </div>
    )
}

// Component con để tái sử dụng thưa ông chủ
function FilterSelect({ placeholder, options }: { placeholder: string; options: string[] }) {
    return (
        <Select>
            <SelectTrigger className="h-10 w-fit min-w-[140px] rounded-full border-gray-200 bg-white px-4 text-xs font-bold text-gray-700 hover:bg-gray-50 focus:ring-0">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-gray-100 shadow-xl">
                {options.map((opt) => (
                    <SelectItem key={opt} value={opt.toLowerCase()} className="text-xs font-bold uppercase">
                        {opt}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}