import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface ResumeState {
  resumeContent: string;
}

const initialState: ResumeState = {
  resumeContent: "",
};
/**
 * Khi người dùng dispatch 1 action thì payload được gửi đi là tên của form
 * redux sẽ lưu tên đó tại state và việc hiển thị form sẽ do người dùng so sánh state đó và formName của form
 */
const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    setResume: (state, action: PayloadAction<string>) => {
      state.resumeContent = action.payload;
    },
  },
});

export const { setResume } = resumeSlice.actions;
export default resumeSlice.reducer;
