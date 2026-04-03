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
    bannerUrl?: string;
}
