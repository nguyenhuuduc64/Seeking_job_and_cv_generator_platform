import { useState, useEffect } from 'react';
import { faCheckCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../common/Button';
import Tesseract from 'tesseract.js';
import instance from '@/config/axios';

interface ConfirmRecruiterRegistrationProps {
    url: string;
    onClose?: () => void;
    userId: string;
    userEmail: string;
    registrationId: string;
}

export default function ConfirmRecruiterRegistration({
    url,
    onClose,
    userId,
    userEmail,
    registrationId,
}: ConfirmRecruiterRegistrationProps) {
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [ocrData, setOcrData] = useState({
        companyName: '',
        taxCode: '',
        address: '',
        rawText: '',
    });

    // --- 1. Tự động chạy khi Form mở lên ---
    useEffect(() => {
        if (url) {
            handleOCRConversion();
        }
        console.log('user id', userId);
        console.log('user email', userEmail);
        console.log('registration id', registrationId);
    }, [url]);

    // --- 2. Hàm xử lý logic khi nhấn nút XÁC NHẬN (Ông chủ viết code vào đây) ---
    const handleConfirmRegistration = async () => {
        console.log('Dữ liệu cuối cùng để gửi đi:', ocrData);
        // TODO: Viết logic gọi API của ông chủ tại đây
        // Ví dụ: await instance.post('/recruiter/approve', ocrData);
        const userResponse = await instance.put(`/users/${userId}`, {
            roles: ['recruiter'],
        });

        const registerResponse = await instance.put(`/recruiter/${registrationId}`, {
            status: 'APPROVED',
        });

        const companyResponse = await instance.post(`/company?userId=${userId}`, {
            name: ocrData.companyName,
            taxCode: ocrData.taxCode,
            address: [ocrData.address],
            scale: '50-100 nhân viên',
            description: '',
            logoUrl: '',
            slogan: '',
        });
        console.log('user response', userResponse.data);
        console.log('register response', registerResponse.data);
        console.log('company response', companyResponse.data);
    };

    const handleOCRConversion = async () => {
        setLoading(true);
        try {
            const {
                data: { text },
            } = await Tesseract.recognize(url, 'vie', {
                logger: (m) => {
                    if (m.status === 'recognizing text') {
                        setProgress(Math.round(m.progress * 100));
                    }
                },
            });

            setOcrData({
                taxCode: text.match(/\d{10}/)?.[0] || 'Không tìm thấy',
                companyName: extractCompanyName(text),
                address: extractAddress(text),
                rawText: text,
            });
        } catch (error) {
            console.error('OCR lỗi:', error);
        } finally {
            setLoading(false);
            setProgress(0);
        }
    };

    const extractCompanyName = (text: string) => {
        const lines = text.split('\n');
        for (let i = 0; i < lines.length; i++) {
            const lineUpper = lines[i].toUpperCase();
            if (lineUpper.includes('TIẾNG VIỆT') || lineUpper.includes('TÊN CÔNG TY')) {
                return lines[i + 1] ? lines[i + 1].trim() : lines[i].split(':').pop()?.trim() || '';
            }
        }
        return '';
    };

    const extractAddress = (text: string) => {
        const match = text.match(/(Địa chỉ trụ sở chính|Địa chỉ):?([^]*?)\n/i);
        return match ? match[2].replace(/[:\-]/g, '').trim() : '';
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[95vh]">
                <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                    <h3 className="font-bold text-gray-700">Xác thực hồ sơ doanh nghiệp</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        ✕
                    </button>
                </div>

                <div className="flex flex-col md:flex-row overflow-hidden h-full">
                    <div className="flex-1 p-6 bg-gray-100/50 overflow-y-auto flex justify-center border-r">
                        <img
                            src={url}
                            alt="Business License"
                            crossOrigin="anonymous"
                            className="rounded-lg shadow-md object-contain w-full h-auto"
                        />
                    </div>

                    <div className="w-full md:w-96 p-6 overflow-y-auto space-y-4 bg-white">
                        <h4 className="font-bold text-sm text-gray-500 uppercase tracking-wider">
                            Thông tin từ AI
                        </h4>

                        {/* Loading indicator */}
                        {loading && (
                            <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                                <div className="flex items-center gap-3 mb-2">
                                    <FontAwesomeIcon
                                        icon={faSpinner}
                                        className="animate-spin text-blue-600"
                                    />
                                    <span className="text-sm font-bold text-blue-700">
                                        Đang quét dữ liệu ({progress}%)
                                    </span>
                                </div>
                                <div className="w-full bg-blue-200 rounded-full h-1.5">
                                    <div
                                        className="bg-blue-600 h-1.5 rounded-full transition-all"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}

                        <div className="space-y-3">
                            <div>
                                <label className="text-xs font-bold text-gray-500">
                                    Tên công ty
                                </label>
                                <input
                                    className="w-full p-2 border rounded mt-1 text-sm outline-none focus:border-orange-500 transition-colors"
                                    value={ocrData.companyName}
                                    onChange={(e) =>
                                        setOcrData({ ...ocrData, companyName: e.target.value })
                                    }
                                    placeholder={loading ? 'Đang đọc...' : 'Chưa có dữ liệu'}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500">
                                    Mã số thuế
                                </label>
                                <input
                                    className="w-full p-2 border rounded mt-1 text-sm outline-none focus:border-orange-500 font-mono"
                                    value={ocrData.taxCode}
                                    onChange={(e) =>
                                        setOcrData({ ...ocrData, taxCode: e.target.value })
                                    }
                                    placeholder={loading ? 'Đang đọc...' : 'Chưa có dữ liệu'}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500">
                                    Địa chỉ trụ sở
                                </label>
                                <textarea
                                    className="w-full p-2 border rounded mt-1 text-sm outline-none focus:border-orange-500"
                                    rows={3}
                                    value={ocrData.address}
                                    onChange={(e) =>
                                        setOcrData({ ...ocrData, address: e.target.value })
                                    }
                                    placeholder={loading ? 'Đang đọc...' : 'Chưa có dữ liệu'}
                                />
                            </div>
                        </div>

                        {ocrData.rawText && !loading && (
                            <div className="pt-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                                    Dữ liệu thô từ Tesseract
                                </label>
                                <div className="text-[10px] text-gray-400 bg-gray-50 p-2 rounded mt-1 max-h-24 overflow-y-auto border border-dashed leading-tight">
                                    {ocrData.rawText}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-4 border-t bg-white flex justify-end gap-3">
                    <Button name="Đóng" onClick={onClose} variant="outline" />

                    {/* Chỉ hiện nút Xác nhận khi không còn load và đã có một chút dữ liệu */}
                    {!loading && ocrData.companyName && (
                        <Button
                            name="Xác nhận & Lưu hồ sơ"
                            icon={faCheckCircle}
                            onClick={handleConfirmRegistration}
                            variant="primary"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
