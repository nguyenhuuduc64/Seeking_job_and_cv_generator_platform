import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface FormState {
  openFormName: string | null;
  formValues: any;
}

const initialState: FormState = {
  openFormName: null,
  formValues: null,
};
/**
 * Khi người dùng dispatch 1 action thì payload được gửi đi là tên của form
 * redux sẽ lưu tên đó tại state và việc hiển thị form sẽ do người dùng so sánh state đó và formName của form
 */
const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    openForm: (state, action: PayloadAction<string>) => {
      state.openFormName = action.payload; //state do redux quan ly, 
      //Khi ông chủ gọi openForm('REGISTER'), 
      //Redux Toolkit sẽ tự động đóng gói nó thành một Object: { type: 'form/openForm', payload: 'REGISTER' }.
    },
    closeForm: (state) => {
      state.openFormName = null;
      state.formValues = null;
    },
    setFormValues: (state, action: PayloadAction<any>) => {
      state.formValues = action.payload;
    },
  },
});

export const { openForm, closeForm, setFormValues } = formSlice.actions;
export default formSlice.reducer;
