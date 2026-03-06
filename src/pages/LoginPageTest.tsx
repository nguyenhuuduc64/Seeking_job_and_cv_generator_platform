import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useGoogleLogin } from '@react-oauth/google';
import instance from '../config/axios';
import { setUser } from '../features/modal/userSlice';
import { useNavigate } from 'react-router-dom';
import thumnailImage from '../assets/login-thumnail.png';
const LoginPageTest = () => {
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
            localStorage.setItem('accessToken', response.data.result.token);
            dispatch(setUser(response.data.result));
            navigate('/');
        } catch (error) {
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
                    window.location.href = '/';
                }
            } catch (error: any) {
                console.error(error);
            }
        },
        flow: 'auth-code',
    });

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white overflow-hidden font-sans" style={{ zIndex: 1000 }}>
            {/* MẢNG XANH BÊN TRÁI: Cắt chéo sắc lẹm theo ảnh */}
            <div
                className="absolute inset-y-0 left-0 w-[55%] bg-[#3b82f6]"
                style={{ clipPath: 'polygon(0 0, 100% 0, 67% 100%, 0% 100%)' }}
            >

                <img src={thumnailImage} alt="" className="w-full h-full object-cover" />
            </div>

            {/* CỘT PHẢI: NƠI CHỨA FORM XÉO TRÁI */}
            <div className="relative z-10 ml-[30vw] mr-[5%] w-full max-w-xl p-8 flex flex-col items-center">

                {/* Tiêu đề ĐĂNG NHẬP */}
                <div className="mb-12">
                    <h2 className="text-5xl font-extrabold text-[#0ea5e9] tracking-tight uppercase">
                        ĐĂNG NHẬP
                    </h2>
                </div>

                <form onSubmit={handleSubmitLogin} className="w-full flex flex-col items-center space-y-6">

                    {/* INPUT 1: Email - Nghiêng trái, nằm ngoài cùng */}
                    <div className="relative w-full max-w-[450px] translate-x-12">
                        <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#0ea5e9] skew-x-[-20deg] z-10"></div>
                        <input
                            required
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-[#d1d5db] py-5 px-10 outline-none text-gray-700 font-bold"
                            style={{ clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0% 100%)' }}
                        />
                    </div>

                    {/* INPUT 2: Password - Nghiêng trái, thụt về bên trái 1 chút */}
                    <div className="relative w-full max-w-[450px] translate-x-4">
                        <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#0ea5e9] skew-x-[-20deg] z-10"></div>
                        <input
                            required
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-[#d1d5db] py-5 px-10 outline-none text-gray-700 font-bold"
                            style={{ clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0% 100%)' }}
                        />
                    </div>

                    {/* Checkbox & Quên mật khẩu - Thụt theo hàng */}
                    <div className="w-full max-w-[450px] -translate-x-4 flex items-center justify-between text-sm font-semibold text-gray-600 px-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 accent-[#0ea5e9]" />
                            <span>Ghi nhớ đăng nhập</span>
                        </label>
                        <button type="button">Quên mật khẩu</button>
                    </div>

                    {/* NÚT ĐĂNG NHẬP: Màu xanh, thụt sâu về trái hơn nữa */}
                    <div className="w-full max-w-[450px] -translate-x-12">
                        <button
                            type="submit"
                            className="w-full bg-[#0ea5e9] py-5 text-white font-bold text-xl hover:bg-blue-600 transition-colors shadow-lg"
                            style={{ clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0% 100%)' }}
                        >
                            Đăng nhập
                        </button>
                    </div>

                    <div className="text-gray-400 font-bold -translate-x-14">hoặc</div>

                    {/* NÚT GOOGLE: Trắng, thụt sâu nhất về trái */}
                    <div className="w-full max-w-[450px] -translate-x-20">
                        <button
                            type="button"
                            onClick={() => loginWithGoogle()}
                            className="w-full bg-white py-5 border-b-4 border-gray-200 text-gray-600 font-bold text-lg hover:bg-gray-50 flex items-center justify-center gap-2 shadow-md"
                            style={{ clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0% 100%)' }}
                        >
                            Tiếp tục với Google
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPageTest;