import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid, faBuilding, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import Menu, { ItemType } from './Menu';
import { getRemainingDays } from '@/utils';
import { RecruitmentType } from '@/types/RecruitmentType';
import { useState } from 'react';
import instance from '@/config/axios';

interface JobCardProps {
    job: RecruitmentType;
    onClick?: (id: string) => void;
    menuItems?: ItemType[];
}

export default function JobCard({ job, onClick, menuItems }: JobCardProps) {
    const [isLiked, setIsLiked] = useState(false);

    const handleAddJobToLikeStore = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsLiked(!isLiked);
        const response = instance.post(`/likestore/recruitment`, {
            recruitmentId: job.id,
        });
        console.log('Đã xử lý Like cho job:', job.id);
    };

    return (
        <Card
            onClick={() => onClick?.(job.id)}
            className="group relative p-4 rounded-sm border border-gray-100 shadow-sm hover:shadow-md hover:border-[var(--primary-color)] transition-all cursor-pointer bg-white"
        >
            <div className="flex gap-4">
                <div className="flex-shrink-0 w-16 h-16 border border-gray-100 rounded-sm overflow-hidden flex items-center justify-center bg-gray-50">
                    <FontAwesomeIcon icon={faBuilding} className="text-gray-300 text-xl" />
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                    <h3 className="text-[15px] font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-[var(--primary-color)] transition-colors">
                        {job.title}
                    </h3>
                </div>

                <button
                    onClick={handleAddJobToLikeStore}
                    className={`flex-shrink-0 transition-colors h-fit p-1 cursor-pointer ${
                        isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                    }`}
                >
                    <FontAwesomeIcon
                        icon={isLiked ? faHeartSolid : faHeartRegular}
                        className="text-lg"
                    />
                </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 justify-between">
                <div className="flex flex-wrap gap-2">
                    <Badge
                        variant="secondary"
                        className="rounded-sm bg-gray-100 text-gray-700 border-none px-3 py-1 text-[12px] font-bold"
                    >
                        {job.salary || 'Tới 15 triệu'}
                    </Badge>

                    <Badge
                        className="rounded-sm border-none px-2 py-1 text-[10px] text-white uppercase font-bold"
                        style={{ backgroundColor: 'var(--primary-color)' }}
                    >
                        Mới
                    </Badge>
                    <p className="text-[var(--primary-color)] text-[12px] font-medium">
                        {getRemainingDays(job.expirationDate)}
                    </p>
                </div>
                {menuItems && <Menu items={menuItems} icon={faEllipsis} />}
            </div>
        </Card>
    );
}
