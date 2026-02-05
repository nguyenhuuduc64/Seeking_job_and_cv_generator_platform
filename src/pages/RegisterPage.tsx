import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../config/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmitRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        // Kiểm tra khớp mật khẩu cơ bản thưa ông chủ
        if (formData.password !== formData.confirmPassword) {
            alert('Mật khẩu xác nhận không khớp, thưa ông chủ!');
            return;
        }

        try {
            // Gửi dữ liệu khớp với FieldDefaults và Entity của ông chủ
            const payload = {
                fullName: formData.fullName,
                username: formData.username,
                email: formData.email,
                password: formData.password,
            };

            await instance.post('/users', payload);
            alert('Đăng ký thành công! Mời ông chủ đăng nhập.');
            navigate('/login');
        } catch (error: any) {
            console.error('Lỗi đăng ký:', error.response?.data || error.message);
            alert('Đăng ký thất bại. Tên đăng nhập hoặc Email có thể đã tồn tại.');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white overflow-hidden">
            <div className="flex w-full h-full overflow-hidden">
                {/* CỘT TRÁI: BRAND (Giữ nguyên phong cách Welcome Back) */}
                <div className="relative hidden w-1/2 flex-col justify-center bg-blue-600 p-16 text-white md:flex leading-tight">
                    <div className="absolute inset-0 opacity-20">
                        <svg
                            className="h-full w-full"
                            viewBox="0 0 500 500"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M0,100 C150,200 350,0 500,100 L500,500 L0,500 Z"
                                fill="white"
                            />
                        </svg>
                    </div>
                    <div className="relative z-10">
                        <h1 className="mb-6 text-7xl font-black uppercase tracking-tighter">
                            Join Us <br /> Today
                        </h1>
                        <p className="max-w-md text-sm font-medium opacity-80 leading-relaxed">
                            Bắt đầu tạo những bản CV chuyên nghiệp bằng cách thiết lập tài khoản của
                            ông chủ ngay bây giờ.
                        </p>
                    </div>
                </div>

                {/* CỘT PHẢI: REGISTER FORM */}
                <div className="flex w-full md:w-1/2 flex-col justify-center bg-white p-12 lg:p-24 overflow-y-auto">
                    <div className="mx-auto w-full max-w-sm">
                        <div className="mb-8 text-center text-blue-700">
                            <h2 className="text-3xl font-black uppercase tracking-tight">
                                Create Account
                            </h2>
                        </div>

                        <form onSubmit={handleSubmitRegister} className="space-y-6">
                            {/* Full Name */}
                            <div className="relative">
                                <input
                                    required
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Họ và tên"
                                    className="w-full border-b-2 border-gray-100 py-2 pl-4 text-sm font-medium outline-none transition-all focus:border-blue-500 placeholder:text-gray-300"
                                />
                                <div className="absolute left-0 top-1/2 h-[100%] w-[3px] -translate-y-1/2 bg-blue-600 rounded-sm" />
                            </div>

                            {/* Username */}
                            <div className="relative">
                                <input
                                    required
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Tên đăng nhập"
                                    className="w-full border-b-2 border-gray-100 py-2 pl-4 text-sm font-medium outline-none transition-all focus:border-blue-500 placeholder:text-gray-300"
                                />
                                <div className="absolute left-0 top-1/2 h-[100%] w-[3px] -translate-y-1/2 bg-blue-600 rounded-sm" />
                            </div>

                            {/* Email */}
                            <div className="relative">
                                <input
                                    required
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    type="email"
                                    placeholder="Email"
                                    className="w-full border-b-2 border-gray-100 py-2 pl-4 text-sm font-medium outline-none transition-all focus:border-blue-500 placeholder:text-gray-300"
                                />
                                <div className="absolute left-0 top-1/2 h-[100%] w-[3px] -translate-y-1/2 bg-blue-600 rounded-sm" />
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <input
                                    required
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    type="password"
                                    placeholder="Mật khẩu"
                                    className="w-full border-b-2 border-gray-100 py-2 pl-4 text-sm font-medium outline-none transition-all focus:border-blue-500 placeholder:text-gray-300"
                                />
                                <div className="absolute left-0 top-1/2 h-[100%] w-[3px] -translate-y-1/2 bg-blue-600 rounded-sm" />
                            </div>

                            {/* Confirm Password */}
                            <div className="relative">
                                <input
                                    required
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    type="password"
                                    placeholder="Xác nhận mật khẩu"
                                    className="w-full border-b-2 border-gray-100 py-2 pl-4 text-sm font-medium outline-none transition-all focus:border-blue-500 placeholder:text-gray-300"
                                />
                                <div className="absolute left-0 top-1/2 h-[100%] w-[3px] -translate-y-1/2 bg-blue-600 rounded-sm" />
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-full bg-blue-600 py-4 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-blue-100 transition-all hover:bg-blue-700 active:scale-95 mt-4"
                            >
                                ĐĂNG KÝ NGAY
                            </button>
                        </form>

                        <div className="mt-8 text-center text-[11px] font-bold text-gray-400">
                            Ông chủ đã có tài khoản?{' '}
                            <button
                                onClick={() => navigate('/login')}
                                className="text-blue-600 hover:underline"
                            >
                                ĐĂNG NHẬP
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
