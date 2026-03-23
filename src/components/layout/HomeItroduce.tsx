import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBriefcase, faBuilding, faLocationDot } from '@fortawesome/free-solid-svg-icons';

const HomeIntroduce: React.FC = () => {
    return (
        <section className="relative w-full h-[600px] md:h-[650px] overflow-hidden bg-[#0a0a0a] font-sans">

            {/* --- 1. NỀN GRADIENT & HÌNH KHỐI (THAY CHO ẢNH) --- */}
            <div className="absolute inset-0 z-0">
                {/* Luồng sáng xanh phía xa thưa ông chủ */}
                <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[60%] bg-blue-600/10 blur-[120px] rounded-full"></div>
                {/* Luồng sáng cam phía dưới thưa ông chủ */}
                <div className="absolute bottom-[-10%] right-[10%] w-[40%] h-[50%] bg-orange-500/10 blur-[100px] rounded-full"></div>

                {/* Họa tiết lưới (Grid) mờ giúp không gian có chiều sâu */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]"
                    style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
                </div>
            </div>

            {/* --- 2. BẢN ĐỒ VIỆT NAM (LÀM TRỌNG TÂM BACKGROUND) --- */}
            <div className="absolute left-[5%] md:left-[10%] top-1/2 -translate-y-1/2 w-[300px] md:w-[450px] opacity-20 z-10 pointer-events-none">
                <svg viewBox="0 0 450 650" className="w-full h-full fill-none stroke-white/40" strokeWidth="2" strokeLinecap="round">
                    {/* Đường vẽ bản đồ thanh mảnh, tinh tế thưa ông chủ */}
                    <path d="M250,50 C260,80 250,120 230,170 C210,220 250,260 270,320 C290,380 240,440 210,510 C190,580 220,620 220,620"
                        className="animate-[dash_5s_linear_infinite]"
                        strokeDasharray="10 10" />

                    {/* Các điểm sáng tại các thành phố lớn */}
                    <circle cx="250" cy="50" r="4" fill="#3b82f6" className="animate-pulse" /> {/* Hà Nội */}
                    <circle cx="235" cy="460" r="4" fill="#3b82f6" className="animate-pulse" /> {/* Đà Nẵng */}
                    <circle cx="215" cy="590" r="4" fill="#f97316" className="animate-pulse" /> {/* TP.HCM */}

                    {/* Hoàng Sa & Trường Sa */}
                    <g fill="#f97316">
                        <circle cx="340" cy="380" r="3" />
                        <circle cx="355" cy="395" r="2" />
                        <circle cx="380" cy="480" r="3" />
                        <circle cx="395" cy="495" r="2" />
                    </g>
                </svg>
            </div>

            {/* --- 3. CONTENT (CĂN PHẢI) --- */}
            <div className="relative z-20 h-full max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-end">
                <div className="w-full md:w-[55%] space-y-8 text-right flex flex-col items-end">

                    {/* Tag Phủ sóng */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                        <FontAwesomeIcon icon={faLocationDot} className="text-orange-500 animate-bounce" />
                        Phủ sóng toàn quốc
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black text-white leading-[1] tracking-tighter">
                        Viec<span className="text-blue-500">S</span> <br />
                        <span className="text-[0.4em] block mt-4 font-light text-gray-500 tracking-[0.3em] uppercase">
                            Kết nối tài năng Việt
                        </span>
                    </h1>

                    <p className="text-sm md:text-lg text-gray-400 leading-relaxed max-w-md font-medium">
                        Bỏ qua mọi rào cản. Tìm thấy công việc mơ ước hoặc nhân sự hoàn hảo
                        chỉ với vài bước đơn giản. <span className="text-white">Trực quan — Hiệu quả.</span>
                    </p>

                    {/* Nút hành động */}
                    <div className="flex flex-wrap gap-4 pt-4">
                        <button className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-sm transition-all flex items-center gap-3 uppercase tracking-widest">
                            BẮT ĐẦU NGAY
                            <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                        <button className="px-10 py-4 bg-transparent border border-white/20 text-white hover:bg-white hover:text-black text-xs font-black rounded-sm transition-all uppercase tracking-widest">
                            TUYỂN DỤNG
                        </button>
                    </div>

                    {/* Chỉ số nhanh */}
                    <div className="flex gap-12 pt-10 border-t border-white/5 mt-8 w-full justify-end">
                        <div className="text-right">
                            <span className="block text-4xl font-black text-white tracking-tighter">15K+</span>
                            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Cơ hội việc làm</span>
                        </div>
                        <div className="text-right">
                            <span className="block text-4xl font-black text-white tracking-tighter">5K+</span>
                            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Doanh nghiệp</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hiệu ứng CSS cho đường vẽ bản đồ thưa ông chủ */}
            <style>{`
                @keyframes dash {
                    to { stroke-dashoffset: -100; }
                }
            `}</style>
        </section>
    );
};

export default HomeIntroduce;