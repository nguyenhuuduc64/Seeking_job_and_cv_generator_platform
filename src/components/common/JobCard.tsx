import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faBuilding, faEllipsis, faLocationDot, faPlane } from '@fortawesome/free-solid-svg-icons';
import Menu, { ItemType } from './Menu';
import { getRemainingDays } from '@/utils';
import { RecruitmentType } from '@/types/RecruitmentType';
import { useEffect } from 'react';
interface JobCardProps {
    job: RecruitmentType;
    onClick?: (id: string) => void;
    menuItems?: ItemType[];
}

export default function JobCard({ job, onClick, menuItems }: JobCardProps) {
    useEffect(() => {
        console.log(getRemainingDays(job.expirationDate));
    });
    return (
        <Card
            key={job.id}
            onClick={() => onClick?.(job.id)}
            className="group relative p-4 rounded-sm border border-gray-100 shadow-sm hover:shadow-md hover:border-[var(--primary-color)] transition-all cursor-pointer bg-white"
        >
            <div className="flex gap-4">
                <div className="flex-shrink-0 w-16 h-16 border border-gray-100 rounded-sm overflow-hidden flex items-center justify-center bg-gray-50">
                    <FontAwesomeIcon icon={faBuilding} className="text-gray-300 text-xl" />
                </div>

                {/* 2. KHỐI THÔNG TIN CHÍNH */}
                <div className="flex-1 min-w-0 space-y-1">
                    <h3 className="text-[15px] font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-[var(--primary-color)] transition-colors">
                        {job.title}
                    </h3>
                </div>

                {/* 3. NÚT LIKE (Tùy chọn) */}
                <button className="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors h-fit p-1">
                    <FontAwesomeIcon icon={faHeartRegular} className="text-lg" />
                </button>
            </div>
            {/* 4. KHỐI THÔNG TIN PHỤ (BADGES) Ở DƯỚI */}
            <div className="mt-4 flex flex-wrap gap-2 justify-between">
                <div className="flex flex-wrap gap-2">
                    <Badge
                        variant="secondary"
                        className="rounded-sm bg-gray-100 text-gray-700 border-none px-3 py-1 text-[12px] font-bold"
                    >
                        {job.salary || 'Tới 15 triệu'}
                    </Badge>

                    {/* Tag "Mới" có màu chủ đạo của ông chủ */}
                    <Badge
                        className="rounded-sm border-none px-2 py-1 text-[10px] text-white uppercase font-bold"
                        style={{ backgroundColor: 'var(--primary-color)' }}
                    >
                        Mới
                    </Badge>
                    <p className="text-[var(--primary-color)] fs-2">
                        {getRemainingDays(job.expirationDate)}
                    </p>
                </div>
                {menuItems && <Menu items={menuItems || []} icon={faEllipsis} />}
            </div>
        </Card>
    );
}
