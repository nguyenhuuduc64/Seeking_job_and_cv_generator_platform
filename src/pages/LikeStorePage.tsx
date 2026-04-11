import instance from '@/config/axios';
import { LikeStoreType } from '@/types/RecruitmentType';
import { useQuery } from '@tanstack/react-query';
import JobCard from '@/components/common/JobCard'; // Giả sử đường dẫn này thưa ông chủ

export default function LikeStorePage() {
    const handleGetRecruitment = async () => {
        const response = await instance.get('/recruitment/liked'); // Đảm bảo đúng endpoint lấy kho thưa ông chủ
        return response.data.result;
    };

    const { data, isLoading } = useQuery<LikeStoreType>({
        queryKey: ['like-store'],
        queryFn: handleGetRecruitment,
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <p className="text-gray-500 animate-pulse">
                    Đang tải danh sách yêu thích thưa ông chủ...
                </p>
            </div>
        );
    }

    const likedJobs = data?.recruitments || [];

    return (
        <div className="pl-5 pr-5 lg:pl-40 lg:pr-40 my-10">
            <div className="mb-5 pt-5">
                <h1 className="text-2xl font-bold text-gray-900">Việc làm đã lưu</h1>
                <p className="text-gray-500 text-sm">
                    Bạn đang có {likedJobs.length} công việc đã lưu
                </p>
            </div>

            {likedJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10">
                    {likedJobs.map((job) => (
                        <JobCard
                            key={job.id}
                            job={job}
                            // Nếu ông chủ muốn nhấn vào nút tim để bỏ like, hãy truyền thêm prop xử lý vào đây thưa ông chủ
                        />
                    ))}
                </div>
            ) : (
                <div className="bg-white p-12 rounded-lg shadow-sm border border-dashed border-gray-300 text-center">
                    <div className="text-gray-400 mb-4">
                        <i className="fa-regular fa-heart text-5xl"></i>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">
                        Chưa có việc làm nào được lưu
                    </h3>
                    <p className="text-gray-500 mt-2">
                        Hãy nhấn vào biểu tượng trái tim ở các tin tuyển dụng để lưu lại thưa ông
                        chủ!
                    </p>
                </div>
            )}
        </div>
    );
}
