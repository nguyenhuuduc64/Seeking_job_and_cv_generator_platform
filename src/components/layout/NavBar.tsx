import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoltLightning, faChevronDown, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { registerSchema } from '../../features/modal/types';
import { SchemaForm } from '../../components/common/forms/SchemaForm';
import { useAppDispatch } from '../../hooks/redux';
import { openForm } from '../../features/modal/formSlice';
import axios from 'axios';
import LoginForm from '../common/forms/LoginForm';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { removeUser } from '../../features/modal/userSlice';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const dispatch = useAppDispatch();
    const currentUser = useSelector((state: RootState) => state.user.user);
    const navigate = useNavigate();
    const handleLogin = () => {
        dispatch(openForm('loginForm'));
        console.log('mo form dang nhap');
    };

    const handleRegister = () => {
        dispatch(openForm('registerForm'));
        console.log('mo form dang ky');
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        dispatch(removeUser());
    };

    const handleSubmitRegister = async (data: Record<string, unknown>) => {
        const { confirmPassword, ...signUpData } = data;
        try {
            const response = await axios.post('http://localhost:8080/api/users', signUpData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        console.log('thong tin nguoi dung ben header', currentUser);
    }, [currentUser]);
    return (
        <>
            <nav className="flex items-center justify-between px-10 py-4 bg-white shadow-sm font-sans">
                {/* 1. Logo Group */}
                <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
                    <div className="text-blue-600 text-3xl">
                        {/* <img src="./src/assets/logo.png" alt="" className="w-25" /> */}
                        <FontAwesomeIcon icon={faBoltLightning} />
                    </div>
                </div>

                {/* 2. Navigation Links */}
                <ul className="flex items-center gap-8">
                    <li className="group relative cursor-pointer flex items-center gap-2 text-gray-600 font-medium hover:text-blue-600">
                        Việc làm
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className="text-xs transition-transform group-hover:rotate-180"
                        />
                    </li>
                    <li className="group relative cursor-pointer flex items-center gap-2 text-gray-600 font-medium hover:text-blue-600">
                        Công ty
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className="text-xs transition-transform group-hover:rotate-180"
                        />
                    </li>
                    <li className="group relative cursor-pointer flex items-center gap-2 text-gray-600 font-medium hover:text-blue-600">
                        Ứng viên
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className="text-xs transition-transform group-hover:rotate-180"
                        />
                    </li>
                </ul>

                {/* 3. Action Buttons */}
                {!currentUser && (
                    <div className="flex items-center gap-6">
                        <button
                            className="text-gray-800 font-semibold hover:text-blue-600 transition-colors underline decoration-2 underline-offset-4"
                            onClick={handleRegister}
                        >
                            Đăng ký
                        </button>
                        <button
                            className="bg-[#3498db] text-white px-8 py-2.5 rounded-full font-semibold hover:bg-blue-500 transition-all shadow-md"
                            onClick={handleLogin}
                        >
                            Đăng nhập
                        </button>
                    </div>
                )}

                {currentUser && (
                    <div className="flex items-center gap-2 cursor-pointer">
                        <p>{currentUser.fullName}</p>
                        <FontAwesomeIcon icon={faSignOut} onClick={handleLogout} />
                    </div>
                )}
            </nav>

            <LoginForm />
            <SchemaForm
                name="registerForm"
                schema={registerSchema}
                onSubmit={handleSubmitRegister}
            />
        </>
    );
};

export default Navbar;
