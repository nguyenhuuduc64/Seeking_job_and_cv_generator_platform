import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import DefaultLayout from './components/layout/DefaultLayout';
import { GoogleOAuthProvider } from '@react-oauth/google';
import instance from './config/axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, removeUser } from './features/modal/userSlice';
import { publicRoutes } from './router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginPage from './pages/LoginPage';

import RegisterPage from './pages/RegisterPage';
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
                        <Routes>
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            {publicRoutes.map((route, index) => (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <DefaultLayout>
                                            <route.element />
                                        </DefaultLayout>
                                    }
                                />
                            ))}
                        </Routes>
                    </GoogleOAuthProvider>
                </div>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
