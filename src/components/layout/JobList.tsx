import { useQuery, keepPreviousData } from '@tanstack/react-query';
import instance from '@/config/axios';
import JobCard from '../common/JobCard';
import { JobType } from '@/test/jobTypes';
import { useState } from 'react';
import { JobFilterBar } from '../common/JobFilterBar';
import PaginationBar from '../common/Pagination';
import { useNavigate } from 'react-router-dom';
import { RecruitmentType } from '@/types/RecruitmentType';
import { Spinner } from '../common/Spiner';

const JobList = () => {
    const navigate = useNavigate();

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

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isError) return <div className="text-center my-20">Lỗi lấy dữ liệu!</div>;

    return (
        <div className="pl-5 pr-5 lg:pl-40 lg:pr-40 my-10">
            <JobFilterBar />

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10 text-center">
                    Đang tải tin tuyển dụng
                    <Spinner />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10">
                    {data?.content?.map((job: RecruitmentType) => (
                        <JobCard
                            key={job.id}
                            job={job}
                            onClick={() => navigate(`/tin-tuyen-dung/${job.id}`)}
                        />
                    ))}
                </div>
            )}

            {data && (
                <PaginationBar
                    currentPage={currentPage}
                    totalPages={data.totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
};

export default JobList;
