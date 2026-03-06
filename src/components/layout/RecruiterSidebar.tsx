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

const recruiterMenuData = [
    {
        title: "Bảng điều khiển",
        url: "/tuyen-dung", // Trang Dashboard dành riêng cho Recruiter
        icon: LayoutDashboard,
    },
    {
        title: "Quản lý tuyển dụng",
        url: "#",
        icon: Briefcase,
        isActive: true,
        items: [
            { title: "Tin đã đăng", url: "/tuyen-dung/jobs" },
            { title: "Đăng tin mới", url: "/tuyen-dung/jobs/create" },
        ],
    },
    {
        title: "Quản lý Ứng viên",
        url: "#",
        icon: FileText,
        items: [
            { title: "Ứng viên ứng tuyển", url: "/tuyen-dung/candidates" },
        ],
    },
    {
        title: "Hồ sơ Công ty",
        url: "#",
        icon: FileText, // Icon phù hợp hơn cho Công ty
        items: [
            { title: "Thông tin công ty", url: "/tuyen-dung/company-profile" },
        ],
    },
    {
        title: "Báo cáo tuyển dụng",
        url: "/tuyen-dung/analytics",
        icon: PieChart,
    },
    {
        title: "Tin nhắn & Hỗ trợ",
        url: "#",
        icon: MessageSquare,
        items: [
            { title: "Chat với ứng viên", url: "/tuyen-dung/messages" },
            { title: "Yêu cầu hỗ trợ", url: "/tuyen-dung/support" },
        ],
    },
    {
        title: "Cài đặt tài khoản",
        url: "/tuyen-dung/settings",
        icon: Settings,
    },
]

export function RecruiterSidebar() {
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
                        {recruiterMenuData.map((item) => (
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