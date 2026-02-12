import { Octokit } from '@octokit/rest';

const octokit = new Octokit({ auth: `${import.meta.env.VITE_GITHUB_API_KEY}` });

export const analyzeRepo = async (repoUrl: string) => {
    // 1. Tách owner và repo chính xác hơn (đề phòng có dấu / ở cuối)
    const cleanPath = repoUrl.replace('https://github.com/', '').replace(/\/$/, '');
    const [owner, repo] = cleanPath.split('/');

    try {
        // 2. Lấy file package.json từ GitHub
        const { data } = await octokit.repos.getContent({
            owner,
            repo,
            path: 'package.json',
        });

        if (!Array.isArray(data) && 'content' in data) {
            // 3. GIẢI MÃ BASE64: Chuyển nội dung mã hóa sang text bình thường
            // Dùng atob (trình duyệt) hoặc Buffer (Node.js)
            const decodedContent = decodeURIComponent(
                atob(data.content.replace(/\n/g, '')) // Xóa các ký tự xuống dòng trong base64 trước khi giải mã
                    .split('')
                    .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );

            // 4. Gửi lên Spring Boot API
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/ai/analyze-tech`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Nếu API Spring Boot của ông chủ có bảo mật, hãy thêm Authorization header ở đây
                },
                body: JSON.stringify({
                    message: `Đây là nội dung file package.json, hãy phân tích các công nghệ sử dụng trong này: ${decodedContent}`,
                }),
            });

            console.log(
                `Đây là nội dung file package.json, hãy phân tích các công nghệ sử dụng trong này: ${decodedContent}`
            );

            const result = await response.text();
            return result; // Trả về kết quả phân tích từ AI
        } else {
            throw new Error('Đường dẫn không phải là một file hợp lệ!');
        }
    } catch (error) {
        console.error('Lỗi khi xử lý Repo:', error);
        throw error;
    }
};
