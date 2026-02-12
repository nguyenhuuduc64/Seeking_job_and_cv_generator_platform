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

export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

interface CollumnProps {
    onDelete: (id: string | number) => void
    onEdit: (user: UserType) => void
}

export const getColumns = ({ onDelete, onEdit }: CollumnProps): ColumnDef<UserType>[] => [
    {
        accessorKey: "status",
        header: "Trạng thái",
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "fullName",
        header: "Họ và tên",
    },
    {
        accessorKey: "roles",
        header: "Vai trò",
        cell: ({ row }) => {
            // Ép kiểu về mảng các Object Role để TypeScript không báo đỏ
            const role = row.original.roles;

            return (
                <div className="flex gap-1">
                    {role && role.name ? (
                        <Badge variant="outline" className="capitalize">
                            {role.name}
                        </Badge>
                    ) : (
                        <span className="text-muted-foreground text-xs">N/A</span>
                    )}
                </div>
            );
        },

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