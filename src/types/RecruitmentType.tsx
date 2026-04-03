export interface RecruitmentType {
    id: string;
    title: string;
    salary: string;
    content: string;
    categoryId: string;
    companyId: string;

    requirements: string[];
    workingDay: string;
    workingTime: string;
    expirationDate: string;
    benefits: string[];
    technologies: string[];
    level: string;
    education: string;
    workingAt: string[];
}
