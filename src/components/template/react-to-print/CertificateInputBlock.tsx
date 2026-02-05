import React, { useState } from 'react';

export interface CertificateItem {
    time: string;
    name: string;
}

export interface CertificateData {
    title?: string;
    list: CertificateItem[];
}

interface Props {
    data?: CertificateData;
    onDataChange?: (data: CertificateData) => void;
    onDelete?: () => void;
}

const CertificateInputBlock: React.FC<Props> = ({ data, onDataChange, onDelete }) => {
    const [localData, setLocalData] = useState<CertificateData>(() => {
        // 1. Nếu có dữ liệu truyền vào và nó có trường 'list'
        if (data && data.list) {
            return {
                title: data.title || 'CHỨNG CHỈ',
                list: data.list,
            };
        }
        // 2. Nếu dữ liệu truyền vào bị thiếu 'list' nhưng vẫn là Object
        if (data) {
            return {
                title: data.title || 'CHỨNG CHỈ',
                list: [], // Khởi tạo mảng rỗng để không bị lỗi .map()
            };
        }
        // 3. Mặc định hoàn toàn nếu không có gì
        return {
            title: 'CHỨNG CHỈ',
            list: [{ time: '', name: '' }],
        };
    });

    const updateList = (index: number, field: keyof CertificateItem, value: string) => {
        const newList = [...localData.list];
        newList[index] = { ...newList[index], [field]: value };
        const newData = { ...localData, list: newList };
        setLocalData(newData);
        if (onDataChange) onDataChange(newData);
    };

    const addRow = () => {
        const newData = { ...localData, list: [...localData.list, { time: '', name: '' }] };
        setLocalData(newData);
    };

    return (
        <div className="group relative mb-8 w-full bg-white p-2">
            <div className="mb-4 w-full border-b border-black pb-1">
                <h2 className="text-base font-bold uppercase tracking-wide text-black">
                    {localData.title}
                </h2>
            </div>

            <div className="space-y-3">
                {localData.list.map((item, index) => (
                    <div key={index} className="grid grid-cols-12 gap-4">
                        <div className="col-span-3">
                            <input
                                placeholder="Thời gian"
                                className="w-full border-none bg-transparent text-sm italic text-gray-500 outline-none focus:ring-0"
                                value={item.time}
                                onChange={(e) => updateList(index, 'time', e.target.value)}
                            />
                        </div>
                        <div className="col-span-9">
                            <input
                                placeholder="Tên chứng chỉ"
                                className="w-full border-none bg-transparent text-sm font-medium text-gray-800 outline-none focus:ring-0"
                                value={item.name}
                                onChange={(e) => updateList(index, 'name', e.target.value)}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={addRow}
                className="mt-2 text-xs text-blue-500 opacity-0 group-hover:opacity-100"
            >
                + Thêm chứng chỉ
            </button>

            <div className="mt-2 rounded bg-gray-50 p-2 font-mono text-[10px] text-gray-400 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="text-blue-400 uppercase font-bold">Debug Cert:</span>{' '}
                {JSON.stringify(localData)}
            </div>

            {onDelete && <button onClick={onDelete} />}
        </div>
    );
};

export default CertificateInputBlock;
