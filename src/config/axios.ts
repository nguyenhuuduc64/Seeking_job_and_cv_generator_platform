import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const instance = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// 1. Request Interceptor: Luôn lấy token mới nhất từ kho thưa ông chủ
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 2. Response Interceptor: Xử lý khi thẻ bài hết hạn
instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Nếu là lỗi 401 (Hết hạn hoặc sai token)
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // Nếu đang ở trang login thì không làm gì thêm để tránh vòng lặp thưa ông chủ
            if (originalRequest.url.includes('/auth/log-in')) {
                return Promise.reject(error);
            }

            const refreshToken = localStorage.getItem('refreshToken');

            if (refreshToken) {
                try {
                    // Gọi refresh token dùng instance để có sẵn baseURL
                    const res = await instance.post('/auth/refresh', { token: refreshToken });
                    const newToken = res.data.result.token;

                    localStorage.setItem('accessToken', newToken);

                    // Gán token mới vào request bị lỗi lúc nãy và gửi lại
                    originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                    return instance(originalRequest);
                } catch (refreshError) {
                    // Refresh cũng lỗi thì cho "bay màu" luôn thưa ông chủ
                    localStorage.clear();
                    window.location.href = '/login';
                    return Promise.reject(refreshError);
                }
            } else {
                // Không có cả refresh token thì mời ông chủ đăng nhập lại
                localStorage.clear();
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
            }
        }
        return Promise.reject(error);
    }
);

export default instance;