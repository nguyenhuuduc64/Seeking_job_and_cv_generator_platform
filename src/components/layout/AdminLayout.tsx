import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AdminSidebar } from "./AdminSidebar"
import { useContext, useEffect, useState } from "react"
import { createContext } from "react"
import { useSelector, UseSelector } from "react-redux"
import { RecruiterSidebar } from "./RecruiterSidebar"
export const TitleContext = createContext({
    title: "",
    setTitle: (title: string) => { }
});
export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [title, setTitle] = useState("Dashboard");
    const user = useSelector((state: any) => state.user.user);

    return (
        <SidebarProvider>
            {/* Sidebar của Shadcn đã được thiết lập sẵn 'fixed' hoặc 'sticky' bên trong nó */}
            {user?.roles.name === "admin" ? <AdminSidebar /> : <RecruiterSidebar />}

            {/* Sửa lại: h-screen và overflow-hidden ở đây để khóa khung hình lại */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">

                <TitleContext.Provider value={{ title, setTitle }}>
                    {/* Header: Giữ nguyên sticky hoặc đổi thành h-16 cố định */}
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4">
                        <SidebarTrigger className="-ml-1" />
                        <div className="h-4 w-[1px] bg-border mx-2" />
                        <h1 className="font-bold text-lg text-slate-800">
                            {title}
                        </h1>
                    </header>

                    {/* Nội dung trang: CHỈ VÙNG NÀY ĐƯỢC CUỘN */}
                    <main className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
                        {children}
                    </main>
                </TitleContext.Provider>
            </div>
        </SidebarProvider>
    )
}