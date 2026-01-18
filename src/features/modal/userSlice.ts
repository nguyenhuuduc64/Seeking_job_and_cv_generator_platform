import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type UserType = {
  fullName: string;
  email: string;
  role: string;
  username: string;
};

const initialState: UserState = {
  user: null,
};

interface UserState {
  user: UserType | null;
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    removeUser(state: UserState) {
      state.user = null;
      window.location.reload();
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
