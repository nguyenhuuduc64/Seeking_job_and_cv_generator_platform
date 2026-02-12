import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import DefaultLayout from './components/layout/DefaultLayout';
import { GoogleOAuthProvider } from '@react-oauth/google';
import instance from './config/axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, removeUser } from './features/modal/userSlice';
import { adminRoutes, privateRoutes, publicRoutes } from './router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/common/AppRoutes';
import RegisterPage from './pages/RegisterPage';
import Home from './pages/Home';
import AdminLayout from './components/layout/AdminLayout';
import { LayoutProvider } from './context/layout-provider';
function App() {
    const queryClient = new QueryClient();
    const dispatch = useDispatch();
    const getMyInfo = async () => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const response = await instance.post('/auth/introspect', { token: token });
            if (response.data.result.valid) {
                console.log('da kiem tra token: ', response.data.result.valid);
                const userInfo = await instance.get('/users/my-info');
                if (userInfo) {
                    dispatch(setUser(userInfo.data.result));
                }
            } else {
                dispatch(removeUser());
            }
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
                                            <PrivateRoute> {/* Bọc bảo vệ ở đây */}
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
                                            <PrivateRoute>
                                                <AdminLayout>
                                                    <route.element />
                                                </AdminLayout>
                                            </PrivateRoute>
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
