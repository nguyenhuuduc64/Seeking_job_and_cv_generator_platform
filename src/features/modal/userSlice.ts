import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// 1. Cập nhật lại Type để khớp với API của ông chủ (có user.role.name)
type UserType = {
  fullName: string;
  email: string;
  roles: {
    name: string;
  };
  username: string;
};

interface UserState {
  user: UserType | null;
  isAuthenticated: boolean;
  isChecking: boolean; // Thêm biến này để RoleBasedRoute biết khi nào xong
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isChecking: true, // Mặc định là TRUE để đợi App.tsx gọi API xong
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isChecking = false; // API xong rồi, cho phép RoleBasedRoute chạy tiếp
    },
    removeUser(state: UserState) {
      state.user = null;
      state.isAuthenticated = false;
      state.isChecking = false; // Kể cả lỗi cũng phải tắt để không bị kẹt loading
      // Lưu ý: window.location.reload() ở đây có thể gây vòng lặp vô tận nếu không cẩn thận thưa ông chủ
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;