import { type ColumnDef } from "@tanstack/react-table"
import { type UserType } from "@/types"
import { Badge } from "@/components/ui/badge"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { ArrowUpDown, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMessage, faTrashAlt } from "@fortawesome/free-regular-svg-icons"
import { faEdit } from "@fortawesome/free-solid-svg-icons"
import { type JobCategoryType } from "@/types/JobType"
import { Clock } from "lucide-react"
export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

interface CollumnProps {
    onDelete: (id: string | number) => void
    onEdit: (user: JobCategoryType) => void
}

export const getColumns = ({ onDelete, onEdit }: CollumnProps): ColumnDef<JobCategoryType>[] => [

    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Tên ngành nghề
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "createdAt",
        header: "Ngày tạo",
        cell: ({ row }) => {
            const date = new Date(row.getValue("createdAt"));
            return (
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Clock size={14} />
                    {date.toLocaleDateString('vi-VN')}
                </div>
            );
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const user = row.original
            return (
                <div className="flex gap-4">
                    <FontAwesomeIcon
                        className="cursor-pointer text-red-500 hover:text-red-700"
                        icon={faTrashAlt}
                        onClick={() => onDelete(user.id)}
                    />
                    <FontAwesomeIcon icon={faMessage} className="cursor-pointer" />
                    <FontAwesomeIcon icon={faEdit} className="cursor-pointer" onClick={() => onEdit(user)} />
                </div>
            )
        },
    }

]