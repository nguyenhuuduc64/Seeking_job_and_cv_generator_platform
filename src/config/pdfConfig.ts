import { Font, StyleSheet } from '@react-pdf/renderer';

// --- 1. ĐĂNG KÝ FONT CHỮ (Xử lý dứt điểm lỗi Resolve Font) ---
// Ông chủ nên dùng link CDN ổn định để tránh lỗi trắng trang
Font.register({
    family: 'Roboto',
    fonts: [
        {
            src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf',
            fontWeight: 400,
        },
        {
            src: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/fonts/HTML-CSS/TeX/otf/MathJax_Main-Italic.otf',
            fontWeight: 400,
            fontStyle: 'italic',
        },
        {
            src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf',
            fontWeight: 700,
        },
    ],
});

// --- 2. HẰNG SỐ MÀU SẮC (Đồng bộ với Tailwind của ông chủ) ---
export const PDF_COLORS = {
    primary: '#000000',
    secondary: '#4B5563', // gray-600
    subtext: '#6B7280', // gray-500
    border: '#D1D5DB', // gray-300
    background: '#FFFFFF',
};

// --- 3. STYLE DÙNG CHUNG (Tối ưu hóa tái sử dụng) ---
export const commonPdfStyles = StyleSheet.create({
    page: {
        padding: 40,
        backgroundColor: PDF_COLORS.background,
        fontFamily: 'Roboto',
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 700,
        textTransform: 'uppercase',
        borderBottomWidth: 1,
        borderBottomColor: PDF_COLORS.primary,
        paddingBottom: 2,
        marginBottom: 10,
    },
});
