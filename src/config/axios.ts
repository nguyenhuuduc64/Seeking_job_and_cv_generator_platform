import axios from 'axios';

// 1. Tạo instance
export const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// 2. Request Interceptor: Luôn lấy token mới nhất gắn vào Header
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

// 3. Response Interceptor: Xử lý Refresh Token
instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const res = await axios.post(
                    'http://localhost:8080/api/auth/refresh',
                    {},
                    { withCredentials: true }
                );

                const newToken = res.data.result.token;
                localStorage.setItem('accessToken', newToken);

                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                return instance(originalRequest);
            } catch (refreshError) {
                localStorage.clear();
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default instance;
