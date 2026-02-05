import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

const ObjectiveManager = () => {
    const [content, _] = useState('Tôi là sinh viên ngành Kỹ thuật phần mềm...');
    const componentRef = useRef<HTMLDivElement>(null);

    // ✅ Cấu hình In: Thêm hàm callback để kiểm tra
    // ✅ Cách dùng ĐÚNG cho phiên bản mới nhất
    const handlePrint = useReactToPrint({
        // Đổi 'content' thành 'contentRef'
        contentRef: componentRef,
        documentTitle: 'CV_NGUYEN_HUU_DUC',
    });

    return (
        <div className="p-8 bg-gray-400 min-h-screen">
            {/* Nút bấm */}
            <div className="mb-6 flex justify-center no-print">
                <button
                    onClick={handlePrint}
                    className="bg-red-600 text-white px-10 py-3 rounded-full font-bold shadow-2xl hover:scale-105 transition-transform"
                >
                    XUẤT PDF NGAY
                </button>
            </div>

            {/* Vùng chứa nội dung */}
            <div className="flex justify-center">
                <div
                    ref={componentRef}
                    className="bg-white p-[20mm] w-[210mm] min-h-[297mm] shadow-inner"
                    style={{ color: 'black' }} // Đảm bảo chữ màu đen khi in
                >
                    <style>{`
                        @media print {
                            .no-print { display: none !important; }
                            /* Ép hiển thị mọi thứ */
                            * { 
                                visibility: visible !important; 
                                overflow: visible !important;
                            }
                            body { background: white !important; }
                            @page { size: A4; margin: 0; }
                        }
                    `}</style>

                    <h2 className="text-2xl font-bold border-b-2 border-black mb-4 uppercase">
                        Mục tiêu nghề nghiệp
                    </h2>

                    <div
                        contentEditable
                        suppressContentEditableWarning
                        className="text-lg leading-relaxed outline-none"
                    >
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ObjectiveManager;
