import React, { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { CVComponentType } from '../../types/CVComponentType';

const TemplatePanel = () => {
    const tabs = Object.keys(CVComponentType);
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const getTemplateList = () => {
        return (CVComponentType as any)[activeTab].map((ComponentItem: any, index: number) => {
            let sampleData = {};
            if (activeTab === 'PERSONAL_INFO')
                sampleData = { fullName: 'NGUYỄN VĂN A', email: 'contact@example.com' };
            if (activeTab === 'OBJECTIVE')
                sampleData = { content: 'Mục tiêu nghề nghiệp của tôi là...' };
            if (activeTab === 'EXPERIENCE')
                sampleData = { company: 'Tên Công Ty', position: 'Vị trí công tác' };
            if (activeTab === 'EDUCATION')
                sampleData = { school: 'Tên Trường Học', major: 'Ngành học' };

            return {
                id: `temp_${activeTab}_${index}`,
                type: activeTab,
                data: sampleData,
                ComponentRender: ComponentItem,
            };
        });
    };

    const listTemplates = getTemplateList();

    return (
        <div className="flex-1 bg-white p-6 shadow-sm self-start no-print md:sticky sticky top-0">
            <h4 className="text-blue-800 font-black uppercase text-xs border-b pb-3 mb-4">
                Danh sách linh kiện
            </h4>

            <div className="mb-6">
                <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block text-gray-500">
                    Phân loại
                </label>
                <select
                    value={activeTab}
                    onChange={(e) => setActiveTab(e.target.value)}
                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded text-sm font-bold outline-none cursor-pointer hover:border-blue-300"
                >
                    {tabs.map((tab) => (
                        <option key={tab} value={tab}>
                            {tab}
                        </option>
                    ))}
                </select>
            </div>

            <div className="space-y-6">
                <p className="text-[10px] font-bold text-gray-400 uppercase">
                    Kéo linh kiện vào CV
                </p>

                <ReactSortable
                    list={listTemplates}
                    setList={() => {}}
                    sort={false}
                    group={{
                        name: 'cv-builder-group',
                        pull: 'clone',
                        put: false,
                    }}
                    className="space-y-4"
                >
                    {listTemplates.map((item: any) => (
                        <div
                            key={item.id}
                            data-type={item.type}
                            data-sample={JSON.stringify(item.data)}
                            className="border border-gray-100 rounded-lg p-3 bg-white shadow-sm hover:border-blue-400 transition-all relative overflow-hidden group cursor-grab active:cursor-grabbing"
                        >
                            <div className="pointer-events-none transform scale-[0.45] origin-top-left w-[220%] min-h-[120px]">
                                <item.ComponentRender data={item.data} />
                            </div>

                            <div className="mt-2 pt-2 border-t border-gray-50 flex justify-between items-center">
                                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                                    {item.type}
                                </span>
                                <span className="text-[18px] text-gray-300">⋮⋮</span>
                            </div>
                        </div>
                    ))}
                </ReactSortable>
            </div>
        </div>
    );
};

export default TemplatePanel;
