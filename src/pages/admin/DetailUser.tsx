import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { UserService } from "@/services/userService";
import { CVService } from "@/services/cvService";

const DetailUser = () => {
    const { id } = useParams();

    const fetchUser = async () => {
        const response = await UserService.getUserById(id as string);
        return response;
    }

    const fetchCvs = async () => {
        const response = await CVService.getCvsByUserId(id as string);
        return response;
    }

    const { data: user, isLoading, isError, error } = useQuery({
        queryKey: ['user', id],
        queryFn: fetchUser,
    })

    const { data: cvs, isLoading: isLoadingCvs, isError: isErrorCvs, error: errorCvs } = useQuery({
        queryKey: ['cvs', id],
        queryFn: fetchCvs,
    })

    return (
        <div>
            {/* Khu vực thông tin cơ bản */}
            <div style={{ marginBottom: '30px', padding: '20px', borderBottom: '1px solid #eee' }}>
                <h1 style={{ color: '#333' }}>Thông tin chi tiết người dùng</h1>
                <p><strong>Họ và tên:</strong> {user?.fullName}</p>
                <p><strong>Email:</strong> {user?.email}</p>
            </div>

            {/* Khu vực hiển thị danh sách CV */}
            <div style={{ padding: '20px' }}>
                <h2 style={{ color: '#007bff' }}>Danh sách CV của người dùng</h2>

                {/* Kiểm tra nếu có danh sách CV thì hiển thị, không thì báo trống thưa ông chủ */}
                {cvs?.result && cvs.result.length > 0 ? (
                    <div style={{ display: 'grid', gap: '15px' }}>
                        {cvs.result.map((cv: any, index: number) => (
                            <div key={cv.id || index} style={{
                                padding: '15px',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                backgroundColor: '#f9f9f9'
                            }}>
                                <h4>{cv.title || `CV Số ${index + 1}`}</h4>
                                <p>Ngày tạo: {new Date(cv.createdAt).toLocaleDateString()}</p>
                                <a href={cv.fileUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#28a745', textDecoration: 'none', fontWeight: 'bold' }}>
                                    Xem chi tiết CV ↗
                                </a>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p style={{ fontStyle: 'italic', color: '#888' }}>
                        Người dùng này hiện chưa có CV nào thưa ông chủ.
                    </p>
                )}
            </div>
        </div>
    );
};

export default DetailUser;