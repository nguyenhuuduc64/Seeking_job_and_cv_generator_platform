import { type ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown, Eye, CheckCircle2, XCircle, Clock, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type RecruiterRegistrationResponse } from "@/types" // DTO của ông chủ
import { useState } from "react"
import ConfirmRecruiterRegistration from "@/components/admin/ConfirmRecruiterRegistration"

interface ConfirmColumnProps {
    onApprove: (id: string) => void
    onReject: (id: string) => void
}

export const getConfirmColumns = ({ onApprove, onReject }: ConfirmColumnProps): ColumnDef<RecruiterRegistrationResponse>[] => [
    {
        accessorKey: "userFullName",
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="pl-0 hover:bg-transparent"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Người yêu cầu
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="flex flex-col">
                <span className="font-bold text-gray-800">{row.original.userFullName}</span>
                <span className="text-xs text-gray-500">{row.original.userEmail}</span>
            </div>
        )
    },
    {
        accessorKey: "businessLicenseUrl",
        header: "Giấy phép kinh doanh",
        cell: ({ row }) => {
            const url = row.getValue("businessLicenseUrl") as string;
            const userId = row.original.userId;
            const userEmail = row.original.userEmail;
            const registrationId = row.original.id;
            const [open, setOpen] = useState(false);
            return (
                <div
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-medium text-sm"
                    onClick={() => setOpen(prev => !prev)}
                >
                    <Eye size={16} />
                    Xem ảnh chứng thực
                    <ExternalLink size={12} />
                    {open && <ConfirmRecruiterRegistration url={url} userId={userId} userEmail={userEmail} registrationId={registrationId} />}
                </div>
            );
        }
    },
    {
        accessorKey: "createdAt",
        header: "Ngày gửi",
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
        accessorKey: "status",
        header: "Trạng thái",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            const variants: Record<string, string> = {
                PENDING: "bg-yellow-100 text-yellow-700 border-yellow-200",
                APPROVED: "bg-green-100 text-green-700 border-green-200",
                REJECTED: "bg-red-100 text-red-700 border-red-200",
            };

            return (
                <Badge className={`font-medium shadow-none border ${variants[status] || "bg-gray-100"}`}>
                    {status === 'PENDING' ? 'Chờ duyệt' : status === 'APPROVED' ? 'Đã duyệt' : 'Từ chối'}
                </Badge>
            );
        }
    },
    {
        id: "actions",
        header: () => <div className="text-right pr-4 text-xs font-bold uppercase tracking-wider">Thao tác</div>,
        cell: ({ row }) => {
            const { id, status } = row.original;

            // Nếu đã xử lý rồi thì không hiện nút bấm nữa thưa ông chủ
            if (status !== "PENDING") return <div className="text-right pr-4 text-gray-400 italic text-xs">Đã xử lý</div>;

            return (
                <div className="flex gap-2 items-center justify-end pr-2">

                    <Button
                        size="sm"
                        variant="outline"
                        className="h-8 px-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={() => onReject(id)}
                    >
                        <XCircle size={16} className="mr-1" />
                        Từ chối
                    </Button>
                </div>
            )
        },
    }
]