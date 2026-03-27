import type { FieldConfig } from "./SchemaFormTypes";
export interface JobCategoryType {
    id: string | number;
    name: string;
    recruitments?: Record<string, any>;
}

export interface JobType {
    id: string | number;
    title: string;
    company?: string;
    salary?: string;
    location?: string;
    content: string;
}

export const JobCrategoryField: FieldConfig =
{
    name: "name",
    label: "Tên ngành nghề",
    type: "text",
    placeholder: "Nhập tên ngành nghề...",
    validation: {
        required: "Tên ngành nghề không được để trống thưa ông chủ",
        minLength: { value: 2, message: "Tên ngành nghề quá ngắn ạ" }
    }

}