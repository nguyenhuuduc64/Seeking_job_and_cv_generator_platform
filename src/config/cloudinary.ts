import { CloudinaryImage, CloudConfig, URLConfig } from '@cloudinary/url-gen';

// 1. Khởi tạo cấu hình chung
const cloudConfig = new CloudConfig({ cloudName: 'dnecovspp' }); // Thay 'YOUR_CLOUD_NAME' bằng tên của ông chủ
const urlConfig = new URLConfig({ secure: true });

/**
 * Hàm tạo đối tượng ảnh từ PublicID
 * @param {string} publicId - ID của ảnh trên Cloudinary (ví dụ: 'docs/shoes')
 * @returns {CloudinaryImage}
 */
export const createCldImage = (publicId: string) => {
    return new CloudinaryImage(publicId, cloudConfig, urlConfig);
};
