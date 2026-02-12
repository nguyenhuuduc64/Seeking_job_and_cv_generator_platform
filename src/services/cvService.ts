import instance from "@/config/axios";

export class CVService {
    static async getCvs() {
        const response = await instance.get('/cvs');
        return response.data;
    }

    static async getCvsByUserId(userId: string | number) {
        const response = await instance.get(`/cvs/user/${userId}`);
        return response.data;
    }
}