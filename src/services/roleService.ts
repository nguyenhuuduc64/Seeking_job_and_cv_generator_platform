import instance from "@/config/axios";
import { store } from "@/app/store"; // Ông chủ hãy import đúng đường dẫn đến file store của mình

export class RoleService {
    static async getRoles() {
        // Lấy snapshot trạng thái hiện tại từ Redux thưa ông chủ
        const state = store.getState();
        const currentUser = state.user.user;

        // Nếu người dùng (ông chủ) đã đăng nhập thì mới gọi API lấy danh mục
        if (currentUser) {
            try {
                const response = await instance.get(`/roles`);
                // Kết quả trả về là danh sách tất cả Role trong DB
                console.log("role", response.data.result);
                return response.data.result.map((role: any) => ({
                    label: role.name, // Ví dụ: "admin"
                    value: role.name  // Giá trị dùng để lưu vào entity User
                }));
            } catch (error) {
                console.error("Lỗi lấy danh sách Role thưa ông chủ:", error);
                return [];
            }
        }

        console.warn("Chưa đăng nhập, không thể lấy danh sách Role!");
        return [];
    }
}