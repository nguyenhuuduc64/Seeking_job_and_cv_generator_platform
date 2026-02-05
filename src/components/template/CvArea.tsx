import { ReactSortable } from 'react-sortablejs';
import PersonalInfoInputBlock from './react-to-print/PersonalInfoInputBlock';
import ObjectiveInputBlock from './react-to-print/ObjectiveInputBlock';
import ExperienceInputBlock from './react-to-print/ExperienceInputBlock';
import CertificateInputBlock from './react-to-print/CertificateInputBlock';
import EducationPDF from './react-pdf/EducationPDF';
import MyCVDocument from './MyCVDocument';
import EducationInputBlock from './react-to-print/EducationInputBlock';

interface CvAreaProps {
    items: any[];
    onItemsChange: (items: any[]) => void;
}

const CvArea: React.FC<CvAreaProps> = ({ items, onItemsChange }) => {
    // Cập nhật dữ liệu bên trong một block
    const handleBlockDataChange = (id: string, newData: any) => {
        const updated = items.map((b) => (b.id === id ? { ...b, data: newData } : b));
        onItemsChange(updated); // Báo lên cha cập nhật state
    };

    // Xóa block
    const handleDelete = (id: string) => {
        const filtered = items.filter((b) => b.id !== id);
        onItemsChange(filtered); // Báo lên cha
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-10 shadow-xl">
            <ReactSortable
                list={items}
                setList={onItemsChange} // Sortable tự gọi hàm này khi kéo thả xong
                animation={200}
                handle=".drag-handle"
            >
                {items.map((block) => (
                    <div key={block.id} className="drag-handle mb-6">
                        {block.type === 'EDUCATION' && (
                            <EducationInputBlock
                                initialData={block.data}
                                onDataChange={(newData) => handleBlockDataChange(block.id, newData)}
                                onDelete={() => handleDelete(block.id)}
                            />
                        )}
                        {block.type === 'PERSONAL_INFO' && (
                            <PersonalInfoInputBlock
                                initialData={block.data}
                                onDataChange={(newData) => handleBlockDataChange(block.id, newData)}
                                onDelete={() => handleDelete(block.id)}
                            />
                        )}
                        {block.type === 'OBJECTIVE' && (
                            <ObjectiveInputBlock
                                //initialData={block.data}
                                onDataChange={(newData) => handleBlockDataChange(block.id, newData)}
                                onDelete={() => handleDelete(block.id)}
                            />
                        )}

                        {block.type === 'EXPERIENCE' && (
                            <ExperienceInputBlock
                                initialData={block.data}
                                onDataChange={(newData) => handleBlockDataChange(block.id, newData)}
                                onDelete={() => handleDelete(block.id)}
                            />
                        )}

                        {block.type === 'CERTIFICATE' && (
                            <CertificateInputBlock
                                initialData={block.data}
                                onDataChange={(newData) => handleBlockDataChange(block.id, newData)}
                                onDelete={() => handleDelete(block.id)}
                            />
                        )}
                    </div>
                ))}
            </ReactSortable>
        </div>
    );
};

export default CvArea;
