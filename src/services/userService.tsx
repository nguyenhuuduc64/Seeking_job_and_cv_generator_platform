import instance from "@/config/axios";
import { openForm } from "@/features/modal/formSlice";
import type { UserType } from "@/types";

export class UserService {
    static async getUsers() {
        const response = await instance.get('/users');
        return response.data;
    }

    static async createUser(data: any) {
        const response = await instance.post('/users', data);
        return response.data;
    }

    static async deleteUser(id: string | number) {
        const response = await instance.delete(`/users/${id}`);
        return response.data;
    }

    static async updateUser(data: UserType) {
        const response = await instance.put(`/users/${data.id}`, data);
        return response.data;
    }

    static async getUserById(id: string | number) {
        const response = await instance.get(`/users/${id}`);
        console.log("user", response.data.result);
        return response.data.result;
    }
}