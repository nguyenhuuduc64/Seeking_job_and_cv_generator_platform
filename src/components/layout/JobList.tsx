import { useQuery } from "@tanstack/react-query";
import instance from "@/config/axios";
import JobCard from "../common/JobCard";
import { JobType } from "@/test/jobTypes";
import { useState } from "react";
const JobList = () => {
    const [jobs, setJobs] = useState<JobType[]>([]);
    const { data, isLoading, isError } = useQuery({
        queryKey: ["jobs"],
        queryFn: async () => {
            const response = await instance.get("/recruitment");
            return response.data.result;
        },
        initialData: [] // Định nghĩa dữ liệu khởi tạo là mảng rỗng thưa ông chủ
    });

    return (
        <div>
            <h2>Việc làm tốt nhất</h2>
            {data.map((job: JobType) => (
                <JobCard key={job.id} job={job} />
            ))}
        </div>
    );
};

export default JobList;