import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, Image as ImageIcon, ExternalLink, Search } from 'lucide-react';

export default function ConfirmPage() {
    const [activeTab, setActiveTab] = useState<'PENDING' | 'PROCESSED'>('PENDING');
    // Đây là dữ liệu mẫu, sau này ông chủ gọi API getAll nhé
    const [requests, setRequests] = useState([
        {
            id: '1',
            userFullName: 'Nguyễn Văn A',
            userEmail: 'vana@gmail.com',
            businessLicenseUrl: 'https://res.cloudinary.com/.../img.jpg',
            createdAt: '2026-03-06T10:00:00',
            status: 'PENDING'
        }
    ]);

    const handleApprove = async (id: string) => {
        // Gọi API Approve ở đây thưa ông chủ
        alert("Đang phê duyệt yêu cầu: " + id);
    };

    const handleReject = async (id: string) => {
        // Gọi API Reject ở đây thưa ông chủ
        const reason = prompt("Nhập lý do từ chối:");
        if (reason) alert("Đã từ chối với lý do: " + reason);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">

                    <div className="relative">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm email..."
                            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                    </div>
                </div>

                {/* Tab Menu */}
                <div className="flex space-x-4 mb-6 border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('PENDING')}
                        className={`pb-4 px-4 font-medium transition-all ${activeTab === 'PENDING' ? 'border-b-2 border-emerald-600 text-emerald-600' : 'text-gray-500'}`}
                    >
                        Chờ xác nhận (1)
                    </button>
                    <button
                        onClick={() => setActiveTab('PROCESSED')}
                        className={`pb-4 px-4 font-medium transition-all ${activeTab === 'PROCESSED' ? 'border-b-2 border-emerald-600 text-emerald-600' : 'text-gray-500'}`}
                    >
                        Lịch sử xử lý
                    </button>
                </div>

                {/* Danh sách yêu cầu */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 text-gray-600 uppercase text-sm font-semibold">
                            <tr>
                                <th className="px-6 py-4">Người yêu cầu</th>
                                <th className="px-6 py-4">Giấy phép</th>
                                <th className="px-6 py-4">Ngày gửi</th>
                                <th className="px-6 py-4">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {requests.map((req) => (
                                <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-gray-800">{req.userFullName}</div>
                                        <div className="text-sm text-gray-500">{req.userEmail}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <a
                                            href={req.businessLicenseUrl}
                                            target="_blank"
                                            className="inline-flex items-center text-emerald-600 hover:underline"
                                        >
                                            <ImageIcon className="w-4 h-4 mr-1" />
                                            Xem ảnh
                                            <ExternalLink className="w-3 h-3 ml-1" />
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        <div className="flex items-center">
                                            <Clock className="w-4 h-4 mr-2 text-gray-400" />
                                            {new Date(req.createdAt).toLocaleDateString('vi-VN')}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleApprove(req.id)}
                                                className="p-2 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-200 transition-colors"
                                                title="Phê duyệt"
                                            >
                                                <CheckCircle className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleReject(req.id)}
                                                className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                                                title="Từ chối"
                                            >
                                                <XCircle className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}