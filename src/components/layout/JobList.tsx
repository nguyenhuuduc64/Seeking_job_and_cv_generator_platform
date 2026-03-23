import { useQuery } from "@tanstack/react-query";
import instance from "@/config/axios";
import JobCard from "../common/JobCard";
import { JobType } from "@/test/jobTypes";
import { useState } from "react";
import { JobFilterBar } from "../common/JobFilterBar";
const JobList = () => {
    const fakeJobs = [
        {
            id: 1,
            title: "Software Engineer",
            company: "Google",
            salary: "1000-2000",
            location: "Hà Nội",
            description: "Software Engineer",

        },
        {
            id: 2,
            title: "Software Engineer",
            company: "Google",
            salary: "1000-2000",
            location: "Hà Nội",
            description: "Software Engineer",

        },
        {
            id: 3,
            title: "Software Engineer",
            company: "Google",
            salary: "1000-2000",
            location: "Hà Nội",
            description: "Software Engineer",

        },
        {
            id: 4,
            title: "Software Engineer",
            company: "Google",
            salary: "1000-2000",
            location: "Hà Nội",
            description: "Software Engineer",

        },
        {
            id: 5,
            title: "Software Engineer",
            company: "Google",
            salary: "1000-2000",
            location: "Hà Nội",
            description: "Software Engineer",

        },
        {
            id: 6,
            title: "Software Engineer",
            company: "Google",
            salary: "1000-2000",
            location: "Hà Nội",
            description: "Software Engineer",

        },
        {
            id: 7,
            title: "Software Engineer",
            company: "Google",
            salary: "1000-2000",
            location: "Hà Nội",
            description: "Software Engineer",

        },
        {
            id: 8,
            title: "Software Engineer",
            company: "Google",
            salary: "1000-2000",
            location: "Hà Nội",
            description: "Software Engineer",

        },
        {
            id: 9,
            title: "Software Engineer",
            company: "Google",
            salary: "1000-2000",
            location: "Hà Nội",
            description: "Software Engineer",

        },
        {
            id: 10,
            title: "Software Engineer",
            company: "Google",
            salary: "1000-2000",
            location: "Hà Nội",
            description: "Software Engineer",

        },
    ]
    const [jobs, setJobs] = useState<JobType[]>([]);
    const { data, isLoading, isError } = useQuery({
        queryKey: ["jobs"],
        queryFn: async () => {
            const response = await instance.get("/recruitment");
            return response.data.result;
        },
        initialData: fakeJobs // Định nghĩa dữ liệu khởi tạo là mảng rỗng thưa ông chủ
    });

    return (
        <div className="pl-40 pr-40 my-10">
            <JobFilterBar />
            <div className="grid grid-cols-3 gap-4 my-10">
                {data.map((job: JobType) => (
                    <JobCard key={job.id} job={job} />
                ))}
            </div>
        </div>
    );
};

export default JobList;