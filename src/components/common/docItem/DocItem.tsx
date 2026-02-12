import { useEffect } from 'react';
import type { CVType } from '../../../types';
import { useNavigate } from 'react-router-dom';
import Resume from '../Resume';
import { FontSize } from 'ckeditor5';
interface DocItemProps {
    item: CVType;
    className?: string;
}

export default function DocItem({ item, className }: DocItemProps) {
    const navigate = useNavigate();
    const handleCvClick = () => {
        navigate(`/tao-cv/${item.id}`);
    };
    useEffect(() => {
        console.log("item tai doc item", item);
    }, []);
    return (
        <div onClick={handleCvClick} className={className + " cursor-pointer"}>
            <Resume cvData={item.content as any} onItemsChange={() => { }} styles={{ transform: 'scale(0.4)', transformOrigin: 'top center' }} />
        </div>
    );
}
