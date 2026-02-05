class MyUploadAdapter {
    loader: any;

    constructor(loader: any) {
        // Đối tượng loader này chứa file mà người dùng vừa chọn
        this.loader = loader;
    }

    // Đây là hàm mà CKEditor sẽ tự động gọi ngay khi người dùng đưa file vào
    upload() {
        console.log('==> Bắt đầu quá trình lắng nghe file thưa ông chủ!');
        return this.loader.file.then((file: File) => {
            console.log('Đã bắt được file:', file.name);
            // Để thấy log mà không bị lỗi Editor, ta trả về một URL giả tạm thời
            return { default: 'https://via.placeholder.com/150' };
        });
    }

    // Hàm giả lập gửi request (Chúng ta sẽ hoàn thiện ở bước sau)
    _sendRequest(file: File) {
        return new Promise((resolve, reject) => {
            // CKEditor sẽ hiển thị hiệu ứng Loading tại đây
            // Chờ lệnh tiếp theo của ông chủ để gửi lên Cloudinary...
        });
    }

    abort() {
        console.log('Ông chủ đã hủy việc tải file.');
    }
}

export default MyUploadAdapter;
