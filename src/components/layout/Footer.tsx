import { Link } from "react-router-dom";
// Thay thế FontAwesome bằng Lucide thưa ông chủ
import { Facebook, Linkedin, Github, Globe, Mail } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

export function Footer() {
    return (
        <footer className="w-full border-t bg-white py-12 font-sans">
            <div className="container mx-auto px-4 md:px-40">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-4">

                    {/* 1. THƯƠNG HIỆU VIECS */}
                    <div className="col-span-1 md:col-span-1 space-y-4">
                        <Link to="/" className="flex items-center">
                            <h5 className="text-2xl font-black italic tracking-tighter">
                                <span className="text-blue-600">Viec</span>
                                <span className="text-orange-500">S</span>
                            </h5>
                        </Link>
                        <p className="text-xs font-medium leading-relaxed text-gray-500 max-w-xs">
                            Nền tảng kết nối tài năng công nghệ hàng đầu Việt Nam.
                            Đồng hành cùng các bạn trên con đường sự nghiệp.
                        </p>
                    </div>

                    {/* 2. ĐƯỜNG DẪN NHANH */}
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900">Khám phá</h4>
                        <ul className="space-y-2 text-xs font-bold uppercase text-gray-400">
                            <li><Link to="/jobs" className="hover:text-blue-600 transition-colors">Việc làm mới</Link></li>
                            <li><Link to="/companies" className="hover:text-blue-600 transition-colors">Công ty hot</Link></li>
                            <li><Link to="/categories" className="hover:text-blue-600 transition-colors">Ngành nghề</Link></li>
                        </ul>
                    </div>

                    {/* 3. HỖ TRỢ */}
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900">Hỗ trợ</h4>
                        <ul className="space-y-2 text-xs font-bold uppercase text-gray-400">
                            <li><Link to="/about" className="hover:text-blue-600 transition-colors">Về chúng tôi</Link></li>
                            <li><Link to="/privacy" className="hover:text-blue-600 transition-colors">Bảo mật</Link></li>
                            <li><Link to="/contact" className="hover:text-blue-600 transition-colors">Liên hệ</Link></li>
                        </ul>
                    </div>

                    {/* 4. KẾT NỐI (DÙNG LUCIDE ICON) */}
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900">Kết nối</h4>
                        <div className="flex gap-5 text-gray-400">
                            <a href="#" className="hover:text-blue-600 transition-all duration-300">
                                <Facebook size={20} strokeWidth={2.5} />
                            </a>
                            <a href="#" className="hover:text-blue-700 transition-all duration-300">
                                <Linkedin size={20} strokeWidth={2.5} />
                            </a>
                            <a href="#" className="hover:text-black transition-all duration-300">
                                <Github size={20} strokeWidth={2.5} />
                            </a>
                        </div>
                        <div className="pt-2 flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase">
                                <Mail size={12} className="text-orange-500" />
                                contact@viecs.vn
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase">
                                <Globe size={12} className="text-blue-500" />
                                www.viecs.vn
                            </div>
                        </div>
                    </div>
                </div>

                {/* DÒNG BẢN QUYỀN CUỐI CÙNG */}
                <div className="mt-16 border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                        <FontAwesomeIcon icon={faCopyright} />
                        2026 VIECS — SINCE 2025.
                    </p>
                    <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-gray-300">
                        <Link to="/" className="hover:text-gray-900 transition-colors">Điều khoản</Link>
                        <Link to="/" className="hover:text-gray-900 transition-colors">Cookies</Link>
                        <Link to="/" className="hover:text-gray-900 transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}