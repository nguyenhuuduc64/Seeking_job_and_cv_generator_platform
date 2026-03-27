import { RecruitmentType } from "./RecruitmentType";

export interface CategoryType {
    id?: number;
    name: string;
    recruitments?: RecruitmentType[];
    createdAt?: string;

}