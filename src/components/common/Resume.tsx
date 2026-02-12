import { useRef, useImperativeHandle, forwardRef, type Ref, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { ReactSortable } from 'react-sortablejs';
import classNames from 'classnames/bind';

import ObjectiveInputBlock from '../template/react-to-print/ObjectiveInputBlock';
import PersonalInfoInputBlock from '../template/react-to-print/PersonalInfoInputBlock';
import ExperienceInputBlock from '../template/react-to-print/ExperienceInputBlock';
import EducationInputBlock from '../template/react-to-print/EducationInputBlock';
import CertificateInputBlock from '../template/react-to-print/CertificateInputBlock';

import styles from '../../styles/resume.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

interface ResumeProps {
    cvData?: any[];
    onItemsChange: (items: any[]) => void;
    styles?: Record<string, string>;
}

const Resume = forwardRef(({ cvData = [], onItemsChange, styles }: ResumeProps, ref: Ref<any>) => {
    const componentRef = useRef<HTMLDivElement>(null);
    const handleUpdateBlockData = (blockId: string, newData: any) => {
        const updatedCvData = cvData.map((block) =>
            block.id === blockId ? { ...block, data: newData } : block
        );
        // ✅ Gọi onItemsChange với mảng mới hoàn toàn để kích hoạt useEffect
        onItemsChange(updatedCvData);
    };
    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: `CV_DUC_${Date.now()}`,
    });

    useImperativeHandle(ref, () => ({
        print: () => handlePrint(),
    }));

    const handleRemoveBlock = (blockId: string) => {
        const updatedCvData = cvData.filter((block) => block.id !== blockId);
        onItemsChange(updatedCvData);
    };
    useEffect(() => {
        console.log("v data da thay doi");
        if (cvData && cvData.length > 0) {
            const handler = setTimeout(() => {
                localStorage.setItem('cv_draft', JSON.stringify(cvData));
                console.log("--- Đã lưu nháp vào LocalStorage (Debounced) ---");
            }, 1000);

            return () => clearTimeout(handler);
        }
    }, [cvData]);

    return (
        <div className="flex flex-col items-center bg-gray-100 min-h-screen" style={styles}>
            <div
                ref={componentRef}
                className={cx(
                    'print-area',
                    'bg-white w-[210mm] min-h-[297mm] p-[20mm] shadow-2xl relative'
                )}
            >
                <ReactSortable
                    list={cvData}
                    setList={onItemsChange}
                    animation={200}
                    handle=".drag-handle"
                    className="flex flex-col min-h-[100px]"
                    group={{ name: 'cv-builder-group', put: true }}
                    onAdd={(evt) => {
                        const newIndex = evt.newIndex;
                        if (newIndex !== undefined && newIndex !== null) {
                            const type = evt.item.getAttribute('data-type');
                            const sampleData = evt.item.getAttribute('data-sample');

                            if (type) {
                                const newData = [...cvData];
                                const newBlock = {
                                    id: `block_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
                                    type: type,
                                    data: sampleData ? JSON.parse(sampleData) : {},
                                };

                                newData.splice(newIndex, 0, newBlock);

                                if (evt.item.parentNode) {
                                    evt.item.parentNode.removeChild(evt.item);
                                }

                                onItemsChange(newData);
                            }
                        }
                    }}
                >
                    {cvData.map((block) => {
                        const type = block.type?.toUpperCase();
                        return (

                            <div key={block.id} className="relative group/block">


                                <div
                                    className={cx(
                                        'drag-handle',
                                        'no-print',
                                        'absolute -left-8 top-2 cursor-move opacity-0 group-hover/block:opacity-100 transition-opacity p-1  rounded flex items-center gap-2 flex-col'
                                    )}
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16">
                                        <path
                                            fill="currentColor"
                                            d="M5 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm3 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm3 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-6 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm3 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm3 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                                        />
                                    </svg>
                                    <div className='no-print  z-10 cursor-pointer p-2' onClick={() => handleRemoveBlock(block.id)}>
                                        <FontAwesomeIcon icon={faTrash} className='text-gray-500' />
                                    </div>
                                </div>

                                {type === 'PERSONAL_INFO' && (
                                    <PersonalInfoInputBlock data={block.data} onDataChange={(newData) => handleUpdateBlockData(block.id, newData)} />
                                )}
                                {type === 'OBJECTIVE' && (
                                    <ObjectiveInputBlock
                                        data={block.data}
                                        onDataChange={(newData) => handleUpdateBlockData(block.id, newData)}
                                        onDelete={() => handleRemoveBlock(block.id)}
                                    />
                                )}
                                {type === 'EXPERIENCE' && (
                                    <ExperienceInputBlock data={block.data} onDataChange={(newData) => handleUpdateBlockData(block.id, newData)} />
                                )}
                                {type === 'EDUCATION' && <EducationInputBlock data={block.data} onDataChange={(newData) => handleUpdateBlockData(block.id, newData)} />}
                                {type === 'CERTIFICATE' && (
                                    <CertificateInputBlock data={block.data} onDataChange={(newData) => handleUpdateBlockData(block.id, newData)} />
                                )}
                            </div>
                        );
                    })}
                </ReactSortable>
                <div className='print-footer hidden print:block'>
                    được tạo bởi ViecS
                </div>
            </div>
        </div>
    );
});

export default Resume;
