import NavBar from "./NavBar";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    const { user, isChecking } = useSelector((state: any) => state.user);

    // Nếu đang kiểm tra token thì hiện loading nhẹ, tránh việc bị nhảy trang lung tung
    if (isChecking) return <div className="h-screen flex items-center justify-center">Đang xác minh...</div>;

    if (user && user.roles) {
        const role = user.roles.name.toUpperCase();
        // Phải so sánh với chữ HOA
        if (role === 'ADMIN') return <Navigate to="/admin/dashboard" replace />;
        if (role === 'RECRUITER') return <Navigate to="/tuyen-dung" replace />;
    }

    return (
        <div>
            <div className="fixed w-full top-0" style={{ zIndex: 500 }}>
                <NavBar />
            </div>
            <main style={{ marginTop: 'var(--header-height)' }}>{children}</main>
        </div>
    );
}