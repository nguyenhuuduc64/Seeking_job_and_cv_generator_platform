import { useState, useEffect } from 'react';
import instance from '@/config/axios';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import JobCard from '@/components/common/JobCard';
import { JobType } from '@/test/jobTypes';
import { useDispatch, useSelector } from 'react-redux';
import { RecruitmentType } from '@/types/RecruitmentType';
import PaginationBar from '@/components/common/Pagination';
import { useNavigate } from 'react-router-dom';
import { openForm } from '@/features/modal/formSlice';
import { SchemaForm } from '@/components/common/forms/SchemaForm';
import { recruitmentSchema } from '@/types/RecruitmentType';
import { getJobCategory } from '@/services/jobService';
export default function JobManagementPage() {
    const [jobs, setJobs] = useState<RecruitmentType[]>([]);
    const [job, setJob] = useState<RecruitmentType>();
    const user = useSelector((state: any) => state.user.user);
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 9;

    const { data, isLoading, isError } = useQuery({
        queryKey: ['jobs', currentPage],
        queryFn: async () => {
            const response = await instance.get(
                `/recruitment?page=${currentPage}&size=${pageSize}`
            );
            return response.data.result;
        },
        placeholderData: keepPreviousData,
    });
    const { data: categories } = useQuery({
        queryKey: ['job-category', currentPage],
        queryFn: getJobCategory,
    });
    const dynamicSchema = recruitmentSchema.map((field) => {
        if (field.name === 'categoryId') {
            return {
                ...field,
                options:
                    categories?.map((cat: any) => ({
                        label: cat.name,
                        value: cat.id,
                    })) || [],
            };
        }
        return field;
    });
    const handleDeleteRecruitment = async (id: string) => {
        const response = await instance.delete(`/recruitment/${id}`);
        queryClient.invalidateQueries({ queryKey: ['jobs'] });
        console.log(response.data);
    };
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleEditRecruitment = async (id: string) => {
        dispatch(openForm('editRecruitment'));
        try {
            const response = await instance.get(`/recruitment/${id}`);
            setJob(response.data.result);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (data: any) => {
        try {
            const response = await instance.put(`/recruitment/${job?.id}`, data);
            console.log(response.data.result);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (data) setJobs(data.content);
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
                            handleEditRecruitment(job.id);
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
            {data && (
                <PaginationBar
                    currentPage={currentPage}
                    totalPages={data.totalPages}
                    onPageChange={handlePageChange}
                />
            )}
            <SchemaForm
                name="editRecruitment"
                onSubmit={handleSubmit}
                schema={dynamicSchema}
                defaultValues={job}
            />
        </div>
    );
}
