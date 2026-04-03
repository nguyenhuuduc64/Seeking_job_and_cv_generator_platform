import { useState, useEffect } from 'react';
import instance from '@/config/axios';
import { useQuery } from '@tanstack/react-query';
import JobCard from '@/components/common/JobCard';
import { JobType } from '@/test/jobTypes';
import { useSelector } from 'react-redux';
import { RecruitmentType } from '@/types/RecruitmentType';
export default function JobManagementPage() {
    const [jobs, setJobs] = useState<RecruitmentType[]>([]);
    const user = useSelector((state: any) => state.user.user);
    console.log('vai tro nguoi dung :', user.roles.name);

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['jobs'],
        queryFn: async () => {
            const response = await instance.get('/recruitment');
            return response.data.result;
        },
    });

    const handleDeleteRecruitment = async (id: string) => {
        const response = await instance.delete(`/recruitment/${id}`);
        console.log(response.data);
        refetch();
    };

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
            {jobs?.map((job: RecruitmentType) => {
                const menuItems = [
                    {
                        name: 'Sửa',
                        onClick: () => {
                            console.log('Sửa tin tuyển dụng');
                        },
                    },
                    {
                        name: 'Xóa',
                        onClick: () => {
                            handleDeleteRecruitment(job.id);
                        },
                    },
                ];
                if (user.roles.name == 'recruiter')
                    return <JobCard key={job.id} job={job} menuItems={menuItems} />;
                else return <JobCard key={job.id} job={job} />;
            })}
        </div>
    );
}
