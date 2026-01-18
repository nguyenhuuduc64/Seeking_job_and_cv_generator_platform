// app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../features/modal/formSlice";
import userReducer from "../features/modal/userSlice";
import resumeReducer from "../features/modal/resumeSlice";
export const store = configureStore({
  reducer: {
    form: formReducer,
    user: userReducer,
    resume: resumeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
