import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import DefaultLayout from './components/layout/DefaultLayout';
import { GoogleOAuthProvider } from '@react-oauth/google';
import instance from './config/axios';
import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, removeUser } from './features/modal/userSlice';
import { adminRoutes, privateRoutes, publicRoutes, recruiterRoutes, userRoutes } from './router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/common/AppRoutes';
import RegisterPage from './pages/RegisterPage';
import Home from './pages/Home';
import AdminLayout from './components/layout/AdminLayout';
import { LayoutProvider } from './context/layout-provider';
import { createContext } from 'react';
import { TitleContextType } from './types/title';
import RoleBasedRoute from './components/common/RolePasedRoute';
import { useSelector } from 'react-redux';
export const TitleContext = createContext<TitleContextType | undefined>(undefined);
function App() {
    const queryClient = new QueryClient();
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);
    // App.tsx
    const getMyInfo = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            dispatch(removeUser());
            return;
        }

        try {
            // BỎ QUA bước introspect thưa ông chủ!
            // Gọi thẳng my-info, nếu token hết hạn Interceptor sẽ tự lo refresh thưa ông chủ.
            const userInfo = await instance.get('/users/my-info');
            if (userInfo?.data?.result) {
                dispatch(setUser(userInfo.data.result));
                console.log('>>> [App] Đã set user thành công:', userInfo.data.result.username);
            }
        } catch (error) {
            // Chỉ remove user nếu thực sự lỗi (ví dụ token nát hẳn không refresh được) thưa ông chủ
            console.error('>>> [App] Không thể lấy thông tin user thưa ông chủ');
            dispatch(removeUser());
        }
    };

    useEffect(() => {
        getMyInfo();
    }, []);
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <div
                    className="min-h-screen"
                    style={{ backgroundColor: 'var(--background-default-color)' }}
                >
                    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                        <LayoutProvider>
                            <Routes>
                                {/* NHÓM 1: PUBLIC ROUTES - Ai cũng vào được */}
                                {publicRoutes.map((route, index) => (
                                    <Route
                                        key={`public-${index}`}
                                        path={route.path}
                                        element={
                                            <DefaultLayout>
                                                <route.element />
                                            </DefaultLayout>
                                        }
                                    />
                                ))}

                                {/* NHÓM 2: PRIVATE ROUTES - Phải đăng nhập mới vào được */}
                                {privateRoutes.map((route, index) => (
                                    <Route
                                        key={`private-${index}`}
                                        path={route.path}
                                        element={
                                            // Ông chủ có thể dùng một lớp PrivateRoute đơn giản hoặc tận dụng RoleBasedRoute
                                            <PrivateRoute>
                                                <DefaultLayout>
                                                    <route.element />
                                                </DefaultLayout>
                                            </PrivateRoute>
                                        }
                                    />
                                ))}

                                {/* NHÓM 3: ADMIN ROUTES - Chỉ admin mới vào được */}
                                {adminRoutes.map((route, index) => (
                                    <Route
                                        key={`admin-${index}`}
                                        path={route.path}
                                        element={
                                            <RoleBasedRoute requiredRole="ADMIN">
                                                <AdminLayout>
                                                    <route.element />
                                                </AdminLayout>
                                            </RoleBasedRoute>
                                        }
                                    />
                                ))}

                                {/* NHÓM 4: RECRUITER ROUTES - Chỉ recruiter mới vào được */}
                                {recruiterRoutes.map((route, index) => (
                                    <Route
                                        key={`recruiter-${index}`}
                                        path={route.path}
                                        element={
                                            <RoleBasedRoute requiredRole="RECRUITER">
                                                <AdminLayout>
                                                    <route.element />
                                                </AdminLayout>
                                            </RoleBasedRoute>
                                        }
                                    />
                                ))}

                                {/* NHÓM 5: USER ROUTES - Chỉ user mới vào được */}
                                {userRoutes?.map((route: any, index: number) => (
                                    <Route
                                        key={`user-${index}`}
                                        path={route.path}
                                        element={
                                            <RoleBasedRoute requiredRole="USER">
                                                <DefaultLayout>
                                                    <route.element />
                                                </DefaultLayout>
                                            </RoleBasedRoute>
                                        }
                                    />
                                ))}
                            </Routes>
                        </LayoutProvider>
                    </GoogleOAuthProvider>
                </div>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
