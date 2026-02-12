import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useGoogleLogin } from '@react-oauth/google';
import instance from '../config/axios';
import { setUser } from '../features/modal/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmitLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await instance.post('/auth/log-in', formData);
            const accessToken = response.data.result.token;
            localStorage.setItem('accessToken', accessToken);
            dispatch(setUser(response.data.result));
            navigate('/');
            //window.location.reload();
        } catch (error) {
            console.error('Đăng nhập thất bại:', error);
            alert('Sai tài khoản hoặc mật khẩu, thưa ông chủ!');
        }
    };

    const loginWithGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const response = await instance.post('/auth/log-in/google', {
                    code: tokenResponse.code,
                });
                if (response.data?.result?.token) {
                    localStorage.setItem('accessToken', response.data.result.token);
                    console.log('token: ', response.data.result.token);
                    window.location.href = '/';
                }
            } catch (error: any) {
                console.error(error.response?.data || error.message);
            }
        },
        flow: 'auth-code',
    });

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white overflow-hidden">
            <div className="flex w-full h-full overflow-hidden">
                {/* CỘT TRÁI: WELCOME (Màu xanh) */}
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
                            Welcome <br /> Back
                        </h1>
                        <p className="max-w-md text-sm font-medium opacity-80 leading-relaxed">
                            Truy cập hệ thống quản lý CV chuyên nghiệp để bắt đầu sự nghiệp của ông
                            chủ.
                        </p>
                    </div>
                </div>

                {/* CỘT PHẢI: LOGIN FORM (Trắng) */}
                <div className="flex w-full md:w-1/2 flex-col justify-center bg-white p-12 lg:p-24">
                    <div className="mx-auto w-full max-w-sm">
                        <div className="mb-12 text-center text-blue-700">
                            <h2 className="text-3xl font-black uppercase tracking-tight">
                                Login Account
                            </h2>
                        </div>

                        <form onSubmit={handleSubmitLogin} className="space-y-8">
                            {/* Input Email */}
                            <div className="relative">
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email ID"
                                    className="w-full border-b-2 border-gray-100 py-3 pl-4 text-sm font-medium outline-none transition-all focus:border-blue-500 placeholder:text-gray-300"
                                />
                                <div className="absolute left-0 top-1/2 h-[100%] w-[3px] -translate-y-1/2 bg-blue-600 rounded-sm" />
                            </div>

                            {/* Input Password */}
                            <div className="relative">
                                <input
                                    required
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    className="w-full border-b-2 border-gray-100 py-3 pl-4 text-sm font-medium outline-none transition-all focus:border-blue-500 placeholder:text-gray-300"
                                />
                                <div className="absolute left-0 top-1/2 h-[100%] w-[3px] -translate-y-1/2 bg-blue-600 rounded-sm" />
                            </div>

                            <div className="flex items-center justify-between text-[11px] font-bold text-gray-400">
                                <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
                                    <input
                                        type="checkbox"
                                        className="h-3.5 w-3.5 rounded border-gray-300 accent-blue-600"
                                    />
                                    <span>Ghi nhớ đăng nhập</span>
                                </label>
                                <a href="#" className="text-blue-600 hover:underline">
                                    Quên mật khẩu?
                                </a>
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-full bg-blue-600 py-4 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-blue-100 transition-all hover:bg-blue-700 active:scale-95"
                            >
                                ĐĂNG NHẬP
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="relative my-10 text-center">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-100"></div>
                            </div>
                            <span className="relative bg-white px-4 text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                                Hoặc
                            </span>
                        </div>

                        {/* Google Login */}
                        <button
                            type="button"
                            onClick={() => loginWithGoogle()}
                            className="flex w-full items-center justify-center gap-3 rounded-full border-2 border-gray-100 py-3.5 text-[11px] font-black uppercase tracking-widest text-gray-600 transition-all hover:bg-gray-50 active:scale-95 shadow-sm"
                        >
                            <FontAwesomeIcon icon={faStar} className="text-red-500 text-sm" />
                            Tiếp tục với Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
