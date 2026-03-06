import { type ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons"
import { faEdit, faShieldHalved } from "@fortawesome/free-solid-svg-icons"
import { type UserType } from "@/types" // Đảm bảo ông chủ đã có type này

export type RoleType = {
    name: string
    description: string
    permissions?: string[]
    status?: string
}

interface RoleColumnProps {
    users: UserType[] // Nhận danh sách user từ component thưa ông chủ
    roles: RoleType[]
    onDelete: (name: string) => void
    onEdit?: (role: RoleType) => void
}

export const getRoleColumns = ({ users, roles, onDelete, onEdit }: RoleColumnProps): ColumnDef<RoleType>[] => [
    {
        accessorKey: "name",
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="pl-0 hover:bg-transparent"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Tên vai trò
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <span className="font-bold text-gray-700">{row.getValue("name")}</span>
            </div>
        )
    },
    {
        id: "userCount",
        header: "Thành viên",
        cell: ({ row }) => {
            const currentRoleName = row.original.name; // Đây là tên Role (ví dụ: "Admin")

            // Đảm bảo users luôn là mảng để không bị lỗi .filter
            const safeUsers = Array.isArray(users) ? users : [];

            // Đếm số người có role.name trùng với tên Role hiện tại
            const count = safeUsers.filter(user => {
                // Kiểm tra xem user.roles là Object hay Array
                if (Array.isArray(user.roles)) {
                    return user.roles.some(r => r.name === currentRoleName);
                }
                return user.roles?.name === currentRoleName;
            }).length;

            return (
                <div className="flex items-center gap-2 text-gray-600">
                    <Users size={16} className="text-blue-400" />
                    <span className="text-sm font-semibold">{count} người</span>
                </div>
            );
        }
    },
    // ... Các cột description, permissions, actions giữ nguyên như cũ của ông chủ ...
    {
        accessorKey: "description",
        header: "Mô tả",
        cell: ({ row }) => (
            <span className="text-muted-foreground text-sm italic line-clamp-1 max-w-[200px]">
                {row.getValue("description") || "Không có mô tả"}
            </span>
        )
    },
    {
        accessorKey: "permissions",
        header: "Quyền hạn",
        cell: ({ row }) => {
            const permissions = row.original.permissions || [];
            return (
                <div className="flex flex-wrap gap-1 max-w-[250px]">
                    {permissions.length > 0 ? (
                        permissions.slice(0, 2).map((p, index) => (
                            <Badge key={index} variant="secondary" className="text-[10px] px-1.5 py-0 bg-blue-50 text-blue-700 border-blue-200">
                                {p}
                            </Badge>
                        ))
                    ) : (
                        <span className="text-xs text-gray-400 italic">Chưa phân quyền</span>
                    )}
                    {permissions.length > 2 && (
                        <span className="text-[10px] text-muted-foreground font-medium">+{permissions.length - 2}</span>
                    )}
                </div>
            );
        },
    },
    {
        id: "actions",
        header: () => <div className="text-right pr-4 text-xs font-bold uppercase tracking-wider">Thao tác</div>,
        cell: ({ row }) => {
            const role = row.original
            return (
                <div className="flex gap-4 items-center justify-end pr-4">
                    <FontAwesomeIcon
                        className="cursor-pointer text-red-400 hover:text-red-600 transition-colors"
                        icon={faTrashAlt}
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(role.name);
                        }}
                    />
                </div>
            )
        },
    }
]