import { useState, useMemo, useEffect } from 'react';
import { DataTable } from './recruit/data-table';
import { getConfirmColumns } from './recruit/columns';
import { RecruiterRegistrationResponse } from '@/types/index'; // Import interface đã tạo
import instance from '@/config/axios';

export default function ConfirmPage() {
    // 1. Khai báo state với kiểu dữ liệu chuẩn để hết gạch đỏ
    const [requests, setRequests] = useState<RecruiterRegistrationResponse[]>([
        {
            id: '1',
            userFullName: 'Nguyễn Văn Đức',
            userEmail: 'duc.recruiter@gmail.com',
            businessLicenseUrl: 'https://res.cloudinary.com/demo/image/upload/v123/license.jpg',
            createdAt: '2026-03-06T10:00:00',
            status: 'PENDING',
            userId: 'user123'
        }
    ]);

    // 2. Hàm xử lý Phê duyệt
    const handleApprove = async (id: string) => {
        try {
            // Sau này ông chủ gọi: await instance.post(`/recruiter/approve/${id}`)
            console.log("Đang phê duyệt ID:", id);
            alert("Đã phê duyệt thành công!");
            // Update lại UI sau khi duyệt thành công
            setRequests(prev => prev.filter(req => req.id !== id));
        } catch (error) {
            alert("Lỗi phê duyệt rồi ông chủ ơi!");
        }
    };

    // 3. Hàm xử lý Từ chối
    const handleReject = async (id: string) => {
        const reason = prompt("Nhập lý do từ chối (Gửi mail cho người dùng):");
        if (reason) {
            console.log("Từ chối ID:", id, "Lý do:", reason);
            setRequests(prev => prev.filter(req => req.id !== id));
        }
    };

    // 4. Khởi tạo Columns (Ghi nhớ để không render lại vô ích)
    const columns = useMemo(() => {
        return getConfirmColumns({
            onApprove: handleApprove,
            onReject: handleReject,
        });
    }, []);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await instance.get('/recruiter?status=PENDING');
                setRequests(response.data.result);
                console.log("requests", response.data.result);
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };
        fetchRequests();
    }, [])

    return (
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <DataTable
                columns={columns}
                data={requests}
                filterColumn="userFullName" // Search theo tên người gửi
                filterPlaceholder="Tìm tên người yêu cầu..."
            // Không truyền onAddClick để ẩn nút "Thêm vai trò" đi thưa ông chủ
            />
        </div>
    );
}