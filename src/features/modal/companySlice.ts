import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Interface chuẩn khớp với Entity Java thưa ông chủ
export interface CompanyType {
    id: string;
    name: string;
    taxCode: string;
    email: string;
    phoneNumber: string;
    websiteUrl: string;
    address: string[]; // Khớp với List<String> ở Backend thưa ông chủ
    logo: string;
    banner: string;
    description: string;
    logoUrl: string;
    userId?: string; // ID của user sở hữu công ty
}

interface CompanyState {
    currentCompany: CompanyType | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: CompanyState = {
    currentCompany: null,
    isLoading: false,
    error: null,
};

const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        // Khi ông chủ lấy thông tin công ty từ API thành công
        setCompanytoStore: (state, action: PayloadAction<CompanyType>) => {
            console.log('da luu company voa store');
            state.currentCompany = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        // Cập nhật từng phần (ví dụ sau khi sửa địa chỉ) thưa ông chủ
        updateCompanyField: (state, action: PayloadAction<Partial<CompanyType>>) => {
            if (state.currentCompany) {
                state.currentCompany = { ...state.currentCompany, ...action.payload };
            }
        },
        // Khi xóa hoặc logout thưa ông chủ
        clearCompany: (state) => {
            state.currentCompany = null;
            state.error = null;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

export const { setCompanytoStore, updateCompanyField, clearCompany, setLoading, setError } =
    companySlice.actions;

export default companySlice.reducer;
