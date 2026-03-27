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
// axios.ts

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // 1. Chỉ xử lý logic Refresh khi gặp lỗi 401 (Unauthorized) thưa ông chủ
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // Đang ở trang login thì không refresh làm gì thưa ông chủ
            if (originalRequest.url.includes('/auth/log-in')) {
                return Promise.reject(error);
            }

            try {
                // Gọi API refresh - Trình duyệt tự đính kèm Cookie thưa ông chủ
                const res = await instance.post('/auth/refresh');
                const newToken = res.data.result.token;

                localStorage.setItem('accessToken', newToken);
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

                return instance(originalRequest);
            } catch (refreshError) {
                // Refresh thất bại (Cookie hết hạn hoặc không có)
                localStorage.removeItem('accessToken');

                // CHỈ đuổi ra ngoài nếu trang hiện tại là trang Private thưa ông chủ
                const publicPaths = ['/', '/login', '/register', '/about', '/dang-ky-tuyen-dung'];
                const isPublicPage = publicPaths.includes(window.location.pathname);

                if (!isPublicPage) {
                    window.location.href = '/login';
                }
                return Promise.reject(refreshError);
            }
        }

        // 2. Nếu là các lỗi khác (400, 404, 500...) thì cứ để nó lỗi, ĐỪNG redirect thưa ông chủ
        return Promise.reject(error);
    }
);

export default instance;