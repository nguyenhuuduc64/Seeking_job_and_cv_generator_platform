import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const instance = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

const refreshInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'}/api`,
    withCredentials: true, // Để gửi Cookie
});

// 1. Request Interceptor: Luôn lấy token mới nhất từ kho thưa ông chủ
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');

        // CHỐT CHẶN: Nếu đang gọi API refresh thì KHÔNG gửi kèm token cũ thưa ông chủ
        const isRefreshRequest = config.url?.includes('/auth/refresh');

        if (token && !isRefreshRequest) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // DEBUG 1: Xem lỗi ban đầu là gì thưa ông chủ
        console.log('>>> [Axios Error Status]:', error.response?.status);
        console.log('>>> [Axios Error Data]:', error.response?.data);

        // Chấp nhận cả 401 hoặc 400 (nếu Backend ném AppException Token Expired) thưa ông chủ
        const isUnauthorized = error.response?.status === 401;
        const isTokenExpired = error.response?.data?.message?.toLowerCase().includes('expired');

        if ((isUnauthorized || isTokenExpired) && !originalRequest._retry) {
            console.log('>>> [Step 1]: Phát hiện Token hết hạn, bắt đầu Refresh...');
            originalRequest._retry = true;

            const oldToken = localStorage.getItem('accessToken');
            console.log(
                '>>> [Step 2]: Token cũ lấy từ kho thưa ông chủ:',
                oldToken?.substring(0, 20) + '...'
            );

            try {
                console.log('>>> [Step 3]: Đang gọi API /auth/refresh...');
                // Dùng refreshInstance để tránh vòng lặp thưa ông chủ
                const res = await refreshInstance.post('/auth/refresh', { token: oldToken });

                console.log('>>> [Step 4]: Refresh THÀNH CÔNG! Data nhận về:', res.data);

                const newToken = res.data.result.token;
                localStorage.setItem('accessToken', newToken);

                // Gán token mới vào header của request cũ thưa ông chủ
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

                console.log('>>> [Step 5]: Đang thực hiện lại request ban đầu với token mới...');
                return instance(originalRequest);
            } catch (refreshError) {
                // DEBUG LỖI KHI REFRESH thưa ông chủ
                console.error('>>> [CRITICAL]: API Refresh thất bại thưa ông chủ!', refreshError);

                // Tạm thời KHÔNG redirect để ông chủ soi log thưa ông chủ
                console.warn('>>> [DEBUG]: Lẽ ra phải redirect về /login ở đây thưa ông chủ!');

                // localStorage.removeItem('accessToken');
                // window.location.href = '/login';

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default instance;
