import { useEffect, useState } from 'react';
import { Upload, FileCheck, ShieldCheck, ArrowLeft, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import uploadImageToCloudinary from '../utils/uploadToCloudinary';
import instance from '@/config/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleLeft, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

export default function RecruiterRegistrationPage() {
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const user = useSelector((state: any) => state.user.user);

    useEffect(() => {
        console.log("user", user)
        if (user?.roles == 'recruiter') {
            navigate('/tuyen-dung');
        }
    }, [user]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleRegister = async () => {
        console.log(file);
        if (file) {
            const url = await uploadImageToCloudinary(file);
            console.log(url);
            const payload = {
                businessLicenseUrl: url,
            }
            const response = await instance.post('/recruiter', payload);
            console.log(response.data.result)
        }
    };

    return (
        <div className="container mx-auto min-h-screen  flex flex-col items-center ">
            {/* Header điều hướng */}
            <div className="w-full">


                <div className="w-full  bg-white  overflow-hidden">
                    {/* Banner trang trí */}
                    <div className=" p-8 text-white text-center" style={{ backgroundColor: 'var(--secondary-color)' }}>
                        <div className="w-full  mb-8">
                            <button
                                onClick={() => navigate(-1)}
                                className="flex items-center cursor-pointer"
                            >
                                <FontAwesomeIcon icon={faAngleLeft} />
                                Quay lại
                            </button>
                        </div>
                        <h1 className="text-2xl font-bold mb-2">Đăng ký Nhà tuyển dụng</h1>
                        <p className="text-emerald-100 font-light">
                            Chỉ một bước xác minh để bắt đầu tiếp cận hàng ngàn ứng viên tiềm năng
                        </p>
                    </div>

                    <div className="p-8">
                        {/* Quy trình tóm tắt */}
                        <div className="grid grid-cols-3 gap-4 mb-10 text-center">
                            <div className="flex flex-col items-center cursor-pointer">
                                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2">
                                    <FileCheck className="w-5 h-5" />
                                </div>
                                <span className="text-xs text-gray-500">Gửi giấy phép</span>
                            </div>
                            <div className="flex flex-col items-center cursor-pointer">
                                {user?.roles?.name == 'recruiter' ? (
                                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2">
                                        <ShieldCheck className="w-5 h-5" />
                                    </div>
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mb-2">
                                        <ShieldCheck className="w-5 h-5" />
                                    </div>
                                )}
                                <span className="text-xs text-gray-500">Admin xác minh</span>
                            </div>
                            <div className="flex flex-col items-center cursor-pointer"
                                onClick={() => navigate("/tuyen-dung")}
                            >
                                <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mb-2">
                                    <Upload className="w-5 h-5" />
                                </div>
                                <span className="text-xs text-gray-500">Đăng tin ngay</span>
                            </div>
                        </div>

                        {/* Form Upload */}
                        <div className="space-y-6">
                            <div className="flex items-start p-4 bg-blue-50 rounded-lg text-blue-700 text-sm">
                                <Info className="w-5 h-5 mr-3 flex-shrink-0" />
                                <p>Vui lòng cung cấp ảnh chụp Giấy phép kinh doanh rõ nét. Thông tin này chỉ dùng cho mục đích xác thực doanh nghiệp.</p>
                            </div>

                            <div
                                className={` rounded-xl p-8 flex flex-col items-center justify-center transition-all ${preview ? ' bg-emerald-50' : 'border-gray-200 hover:border-emerald-400'
                                    }`}
                            >
                                {preview ? (
                                    <div className="relative w-full aspect-video">
                                        <img src={preview} alt="Preview" className="w-full h-full object-contain " />
                                        <button
                                            onClick={() => { setFile(null); setPreview(null); }}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                                        >
                                            <ArrowLeft className="w-4 h-4 rotate-90" />
                                        </button>
                                    </div>
                                ) : (
                                    <label className="cursor-pointer flex flex-col items-center">
                                        <Upload className="w-12 h-12 text-gray-400 mb-4" />
                                        <span className="text-gray-600 font-medium">Nhấn để tải lên hoặc kéo thả ảnh</span>
                                        <span className="text-gray-400 text-sm mt-1">Hỗ trợ JPG, PNG, PDF (Tối đa 5MB)</span>
                                        <input type="file" className="hidden" onChange={handleFileChange} accept="image/*,.pdf" />
                                    </label>
                                )}
                            </div>

                            <button
                                disabled={!file}
                                className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg ${file
                                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                                onClick={handleRegister}
                            >
                                Gửi yêu cầu xác thực
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}