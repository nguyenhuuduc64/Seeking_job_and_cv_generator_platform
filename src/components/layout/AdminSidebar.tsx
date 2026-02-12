import {
    LayoutDashboard, FileText, Users, Settings,
    Briefcase, ShieldCheck, PieChart, Bell,
    History, CreditCard, MessageSquare, HelpCircle,
    ChevronRight
} from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from "@/components/ui/sidebar"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Link } from "react-router-dom"

const menuData = [
    {
        title: "Bảng điều khiển",
        url: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Hệ thống Tuyển dụng",
        url: "#",
        icon: Briefcase,
        isActive: true, // Mặc định mở mục này
        items: [
            { title: "Tin tuyển dụng", url: "/admin/jobs" },
            { title: "Công ty đối tác", url: "/admin/companies" },
            { title: "Duyệt tin mới", url: "/admin/jobs/pending" },
        ],
    },
    {
        title: "Quản lý Hồ sơ (CV)",
        url: "#",
        icon: FileText,
        items: [
            { title: "Tất cả CV ứng viên", url: "/admin/cvs" },
            { title: "Mẫu CV hệ thống", url: "/admin/cv-templates" },
            { title: "Báo cáo vi phạm", url: "/admin/cvs/reports" },
        ],
    },
    {
        title: "Người dùng & Bảo mật",
        url: "#",
        icon: ShieldCheck,
        items: [
            { title: "Danh sách người dung", url: "/admin/nguoi-dung" },
            { title: "Phân quyền (Roles)", url: "/admin/users/roles" },
        ],
    },
    {
        title: "Tài chính & Gói dịch vụ",
        url: "#",
        icon: CreditCard,
        items: [
            { title: "Lịch sử giao dịch", url: "/admin/transactions" },
            { title: "Quản lý gói đăng tin", url: "/admin/subscriptions" },
        ],
    },
    {
        title: "Báo cáo & Phân tích",
        url: "/admin/analytics",
        icon: PieChart,
    },
    {
        title: "Hỗ trợ khách hàng",
        url: "#",
        icon: MessageSquare,
        items: [
            { title: "Phản hồi (Feedback)", url: "/admin/feedback" },
            { title: "Câu hỏi thường gặp", url: "/admin/faqs" },
        ],
    },
    {
        title: "Cấu hình hệ thống",
        url: "/admin/settings",
        icon: Settings,
    },
]

export function AdminSidebar() {
    const { open } = useSidebar() // Kiểm tra trạng thái đóng/mở

    return (
        <Sidebar collapsible="icon" className="relative "> {/* Thêm icon mode để không bị đè Header */}
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="px-4 py-8 h-auto">
                        {open ? (
                            <h5 className="text-2xl font-bold transition-all duration-300">
                                <span className="text-blue-600">Viec</span>
                                <span className="text-orange-500">S</span>
                                <span className="text-blue-600"> Admin</span>
                            </h5>
                        ) : (
                            <span className="text-orange-500 text-xl font-bold">S</span>
                        )}
                    </SidebarGroupLabel>

                    <SidebarMenu>
                        {menuData.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                {item.items ? (
                                    <Collapsible
                                        className="group/collapsible"
                                        defaultOpen={item.isActive} // Mở sẵn mục Tuyển dụng
                                    >
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton tooltip={item.title}>
                                                {item.icon && <item.icon className="w-5 h-5" />}
                                                <span className="font-medium">{item.title}</span>
                                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.items.map((subItem) => (
                                                    <SidebarMenuSubItem key={subItem.title}>
                                                        <SidebarMenuSubButton asChild>
                                                            <Link to={subItem.url} className="hover:text-blue-600 transition-colors">
                                                                <span>{subItem.title}</span>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </Collapsible>
                                ) : (
                                    <SidebarMenuButton asChild tooltip={item.title}>
                                        <Link to={item.url}>
                                            {item.icon && <item.icon className="w-5 h-5" />}
                                            <span className="font-medium">{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                )}
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}