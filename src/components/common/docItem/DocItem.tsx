import { useEffect } from 'react';
import type { CVType } from '../../../types';
import { useNavigate } from 'react-router-dom';
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
        console.log(item);
    }, []);
    return (
        <div onClick={handleCvClick} className={className} style={{ fontSize: '10px' }}>
            {item.updatedAt}
        </div>
    );
}
