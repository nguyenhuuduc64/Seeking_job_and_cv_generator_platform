import React from 'react';
import bannerImg from '../../assets/pic1.png';

const HomeIntroduce: React.FC = () => {
    return (
        <section className="relative w-full h-[550px] md:h-[600px] overflow-hidden bg-gray-900">
            {/* --- 1. BACKGROUND IMAGE --- */}
            <img
                src={bannerImg}
                alt="ViecS Banner"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* --- 2. OVERLAY (Chuyển hướng gradient sang phải) --- */}
            <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/40 to-transparent"></div>

            {/* --- 3. CONTENT (CĂN PHẢI 1/2) --- */}
            <div className="relative h-full max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-end">
                <div className="w-full md:w-1/2 space-y-6 text-right md:text-left">



                    {/* Tiêu đề (Đã thu nhỏ kích thước) */}
                    <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
                        Kết nối <span className="text-blue-400">tài năng</span> <br />
                        Kiến tạo <span className="text-orange-500 italic">tương lai</span>
                    </h1>

                    {/* Mô tả (Thu nhỏ font) */}
                    <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-md ml-auto md:ml-0">
                        Nền tảng tuyển dụng thông minh giúp ông chủ tối ưu hóa
                        việc tìm kiếm nhân sự và công việc. Nhanh chóng - Chính xác.
                    </p>

                    {/* Nút hành động (Kích thước compact) */}
                    <div className="flex flex-wrap gap-4 pt-2 justify-end md:justify-start">
                        <button className="px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-blue-900/40">
                            TÌM VIỆC NGAY
                        </button>
                        <button className="px-7 py-3 bg-white/5 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white text-sm font-bold rounded-lg transition-all">
                            NHÀ TUYỂN DỤNG
                        </button>
                    </div>

                    {/* Chỉ số nhanh (Thu nhỏ) */}
                    <div className="flex gap-10 pt-6 border-t border-white/10 mt-6 justify-end md:justify-start">
                        <div>
                            <span className="block text-2xl font-black text-blue-400 tracking-tight">10k+</span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Việc làm</span>
                        </div>
                        <div>
                            <span className="block text-2xl font-black text-orange-500 tracking-tight">5k+</span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Công ty</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeIntroduce;