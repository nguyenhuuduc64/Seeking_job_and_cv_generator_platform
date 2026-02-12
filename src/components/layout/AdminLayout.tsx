import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AdminSidebar } from "./AdminSidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            {/* 1. Đảm bảo Sidebar nằm trong Provider */}
            <AdminSidebar />

            {/* 2. Khối bao bên phải này sẽ tự động bắt đầu từ mép Sidebar */}
            <div className="flex-1 flex flex-col min-w-0 min-h-screen">

                {/* 3. Header giờ sẽ chiếm phần chiều rộng CÒN LẠI */}
                <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-white/80 backdrop-blur px-4">
                    <SidebarTrigger className="-ml-1" />
                    <div className="h-4 w-[1px] bg-border mx-2" />
                    <h1 className="font-bold text-lg text-slate-800">
                        Hệ thống ViecS Admin
                    </h1>
                </header>

                {/* 4. Nội dung trang */}
                <main className="flex-1 overflow-auto p-6 bg-slate-50/50">
                    {children}
                </main>
            </div>
        </SidebarProvider>
    )
}