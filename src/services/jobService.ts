import instance from "@/config/axios";

export const getJobCategory = async () => {
    const response = await instance.get(`/job-category`);
    return response.data.result;
}

export const createJobCategory = async (data: any) => {
    const response = await instance.post(`/job-category`, data);
    return response.data;
}

export const updateJobCategory = async (data: any) => {
    const response = await instance.put(`/job-category/${data.id}`, data);
    return response.data;
}

export const deleteJobCategory = async (id: string | number) => {
    const response = await instance.delete(`/job-category/${id}`);
    return response.data;
}