# Viecs - Online Recruitment Platform (Frontend)

Hệ thống nền tảng tuyển dụng trực tuyến kết nối nhà tuyển dụng và ứng viên, tích hợp các công cụ tối ưu trải nghiệm như tạo CV tương tác thời gian thực, quét dữ liệu tự động (OCR) và quản lý quy trình ứng tuyển thông minh.

## 🚀 Tính năng cốt lõi

- **Hệ thống xác thực bảo mật:** Tích hợp đăng nhập tập trung mã nguồn mở, bảo mật phiên làm việc và phân quyền luồng User/Recruiter.
- **Trình tạo CV tương tác thời gian thực (Dynamic CV Builder):** Hỗ trợ xuất định dạng tài liệu, xử lý chuyển đổi dữ liệu hiển thị trực quan sang tệp cứng (`html-to-image`, `html2canvas`, `html2pdf.js`).
- **Trình soạn thảo văn bản nâng cao (Rich Text Editor):** Tích hợp hệ thống Tiptap và CKEditor 5 hỗ trợ đăng tin tuyển dụng, viết mô tả công việc và quản lý profile chuyên nghiệp.
- **Đa ngôn ngữ toàn diện:** Sử dụng giải pháp dịch thuật tự động `i18n` và hệ thống tự động nhận diện ngôn ngữ trình duyệt của người dùng.
- **Hệ thống UI Component phẳng và tối giản:** Xây dựng trên nền tảng Tailwind CSS, Radix UI Primitives, đem lại khả năng tương thích khả dụng (Accessibility) và hiệu ứng chuyển động mượt mà.
- **Quản lý trạng thái & Cache:** Sử dụng TanStack Query (React Query) kết hợp Redux Toolkit tối ưu hóa hiệu năng tải dữ liệu, giảm thiểu tối đa số lượng request trùng lặp lên máy chủ.

## 📁 Thư viện công nghệ chính (Tech Stack)

Hệ thống được phát triển dựa trên các thư viện cốt lõi quy định trong `package.json`:

| Phân nhóm | Thư viện sử dụng |
| :--- | :--- |
| **Framework & Core** | React 18+, TypeScript, Vite |
| **State Management** | `@reduxjs/toolkit`, `@tanstack/react-query` |
| **UI Primitives** | Radix UI (`@radix-ui/react-dialog`, `accordion`, `dropdown-menu`, etc.) |
| **Styling & Icons** | `tailwind-css`, `lucide-react`, `fortawesome` |
| **Editor** | `@tiptap/core` (& extensions), `ckeditor5` |
| **Media Handling** | `@cloudinary/react` (Tối ưu hóa và quản lý lưu trữ hình ảnh) |
| **Data Table & Form**| `@tanstack/react-table`, `axios` |
| **Internationalization**| `i18next`, `i18next-browser-languagedetector` |

## 🛠️ Hướng dẫn cài đặt và chạy ứng dụng

### 1. Tải mã nguồn về máy cục bộ
```bash
git clone [https://github.com/nguyenhuuduc64/viecs-react-FE.git](https://github.com/nguyenhuuduc64/viecs-react-FE.git)
cd viecs-react-FE

