import NavBar from "./NavBar";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    const { user, isChecking } = useSelector((state: any) => state.user);
    // Nếu đang kiểm tra token thì hiện loading nhẹ, tránh việc bị nhảy trang lung tung
    if (isChecking) return <div className="h-screen flex items-center justify-center">Đang xác minh...</div>;

    return (
        <div>
            <div className="fixed w-full top-0" style={{ zIndex: 500 }}>
                <Navigation />
            </div>
            <main style={{ marginTop: 'var(--header-height)' }}>{children}</main>
            <Footer />
        </div>
    );
}