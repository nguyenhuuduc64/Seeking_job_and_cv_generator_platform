import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const token = localStorage.getItem("accessToken");

    // Nếu có token, cho phép xem nội dung (children)
    // Nếu không, chuyển hướng về trang chủ hoặc trang login
    return token ? <>{children}</> : <Navigate to="/" replace />;
};

export default PrivateRoute;