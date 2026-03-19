import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

interface RoleBasedRouteProps {
    children: React.ReactNode;
    requiredRole: 'ADMIN' | 'USER' | 'RECRUITER';
}

const RoleBasedRoute = ({ children, requiredRole }: RoleBasedRouteProps) => {
    const { user, isChecking } = useSelector((state: any) => state.user);

    // NẾU ĐANG KIỂM TRA: Đứng im tại đây, không làm gì cả
    if (isChecking) {
        return <div className="h-screen flex items-center justify-center font-bold">
            HỆ THỐNG ĐANG XÁC MINH DANH TÍNH...
        </div>;
    }
    if (!user) {
        console.log("khong co user")
    } else console.log("co user", user)

    // TRƯỜNG HỢP 2: ĐANG TẢI DỮ LIỆU USER
    // Nếu đã auth nhưng dữ liệu user trong Redux chưa kịp đổ về (null/undefined)
    // Phải chặn lại để tránh lỗi "cannot read property of undefined"
    // 2a. Nếu thực sự không có user (sau khi Logout hoặc chưa Login)
    if (!user) {
        console.log("Không có user -> Trả về Login");
        return <Navigate to="/" replace />;
    }

    // 2b. Có user nhưng dữ liệu Role chưa kịp load (Phòng trường hợp API chậm)
    if (!user.roles) {
        return (
            <div className="flex h-screen items-center justify-center font-bold">
                Đang tải thông tin quyền hạn...
            </div>
        );
    }

    // Lấy Role và chuẩn hóa thành chữ HOA
    const currentRole = user.roles.name.toUpperCase();

    // TRƯỜNG HỢP 3: KIỂM TRA QUYỀN TRUY CẬP
    // Nếu Role hiện tại KHÔNG KHỚP với Role yêu cầu của Route
    if (currentRole !== requiredRole) {

        // 3a. Admin đi lạc: Nếu là Admin mà vào nhầm trang User/Recruiter -> Đá về Dashboard Admin
        if (currentRole === 'ADMIN') {
            alert('Admin đi lạc');
            return <Navigate to="/admin/dashboard" replace />;
        }

        // 3b. Nhà tuyển dụng đi lạc: Nếu là Recruiter mà vào nhầm trang Admin/User -> Đá về trang Tuyển dụng
        if (currentRole === 'RECRUITER') {
            alert('Recruiter đi lạc');
            return <Navigate to="/tuyen-dung" replace />;
        }

        if (currentRole === 'USER') {
            alert('User đi lạc');
            return <Navigate to="/" replace />;
        }
    }

    // TRƯỜNG HỢP 4: KHỚP ROLE
    // Mọi thứ đều ổn, mời ông chủ vào trang!
    alert('Đúng vai trò');
    return <>{children}</>;
};

export default RoleBasedRoute;