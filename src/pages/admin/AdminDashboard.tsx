import { useContext } from "react";
import { useEffect } from "react";
import { TitleContext } from "@/components/layout/AdminLayout";

const AdminDashboard = () => {
    const { title, setTitle } = useContext(TitleContext);
    useEffect(() => {
        setTitle("Admin Dashboard");
    }, [title])
    return (
        <div>
            <h1>Admin Dashboard</h1>
        </div>
    );
};

export default AdminDashboard;