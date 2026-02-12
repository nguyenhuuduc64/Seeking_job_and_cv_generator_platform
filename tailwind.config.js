/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}', // Kiểm tra xem đường dẫn này có đúng với cấu trúc dự án của ông chủ không
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
module.exports = {
    theme: {
        container: {
            center: true, // Thay thế cho mx-auto
            padding: '1rem', // Thay thế cho px-4
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
};
