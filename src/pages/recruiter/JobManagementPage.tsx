import { useState, useEffect } from "react";
import instance from "@/config/axios";
import { useQuery } from "@tanstack/react-query";
import JobCard from "@/components/common/JobCard";
import { JobType } from "@/test/jobTypes";
export default function JobManagementPage() {

    const [jobs, setJobs] = useState<JobType[]>([]);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["jobs"],
        queryFn: async () => {
            const response = await instance.get("/recruitment");
            return response.data.result;
        }
    });

    useEffect(() => {
        if (data) {
            setJobs(data);
        }
    }, [data]);

    return (
        <div>
            <h1>Quản lý tin tuyển dụng</h1>
            {isLoading && <div>Loading...</div>}
            {isError && <div>Error fetching jobs</div>}
            {jobs.map((job: JobType) => (
                <JobCard key={job.id} job={job} />
            ))}
        </div>
    );
}