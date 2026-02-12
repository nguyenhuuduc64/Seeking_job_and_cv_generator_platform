import { useQueryClient } from "@tanstack/react-query";
import { UserService } from "@/services/userService";
import type { UserType } from "@/types";
import { openForm, setFormValues } from "@/features/modal/formSlice";
import { useDispatch } from "react-redux";

export const useUserActions = () => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    // 1. Logic Xóa phải là bất đồng bộ
    const deleteUser = async (id: string | number) => {
        try {
            // Đợi Server trả lời thành công đã thưa ông chủ
            await UserService.deleteUser(id);

            // Sau đó mới ra lệnh làm mới danh sách
            await queryClient.invalidateQueries({ queryKey: ['users'] });

            console.log("Đã dọn dẹp xong User thưa ông chủ!");
        } catch (error) {
            console.error("Xóa thất bại rồi ông chủ ơi:", error);
        }
    }

    // 2. Logic Thêm cũng tương tự
    const createUser = async (data: any) => {
        try {
            await UserService.createUser(data);
            await queryClient.invalidateQueries({ queryKey: ['users'] });
        } catch (error) {
            console.error("Tạo thất bại thưa ông chủ:", error);
        }
    }

    const updateUser = async (user: UserType) => {
        dispatch(setFormValues(user));
        dispatch(openForm('updateUserForm'))
        try {
            await UserService.updateUser(user);
            await queryClient.invalidateQueries({ queryKey: ['users'] });
        } catch (error) {
            console.error("Cập nhật thất bại thưa ông chủ:", error);
        }
    }
    return {
        deleteUser,
        createUser,
        updateUser
    };
};