import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Text, Rect, Transformer, Image as KonvaImage } from 'react-konva';
// @ts-ignore
import useImage from 'use-image';
import { useReactToPrint } from 'react-to-print';

const TransformerComponent = ({ selectedId }: { selectedId: string | null }) => {
    const trRef = useRef<any>(null);
    useEffect(() => {
        if (selectedId && trRef.current) {
            const stage = trRef.current.getStage();
            const selectedNode = stage.findOne('#' + selectedId);
            if (selectedNode) {
                trRef.current.nodes([selectedNode]);
                trRef.current.getLayer().batchDraw();
            }
        }
    }, [selectedId]);
    return <Transformer ref={trRef} />;
};

const FinalCVDesigner = () => {
    const A4_WIDTH = 794;
    const A4_HEIGHT = 1123;

    const [elements, setElements] = useState<any[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [printImage, setPrintImage] = useState<string | null>(null);

    const stageRef = useRef<any>(null);
    const componentRef = useRef<HTMLDivElement>(null); // Ref này sẽ bao trùm TOÀN BỘ nội dung in

    const reactToPrintFn = useReactToPrint({
        contentRef: componentRef,
        documentTitle: `FULL_CV_EXPORT`,
    });

    const handlePrint = async () => {
        // 1. Dọn dẹp: Bỏ chọn để mất khung xanh Transformer
        setSelectedId(null);
        await new Promise(r => setTimeout(r, 300));

        if (stageRef.current) {
            // 2. Chụp ảnh Canvas chất lượng cao
            const dataURL = stageRef.current.toDataURL({ pixelRatio: 2 });
            setPrintImage(dataURL);

            // 3. Đợi ảnh render vào thẻ <img> trong DOM
            await new Promise(r => setTimeout(r, 200));

            // 4. Gọi lệnh in (Lúc này componentRef chứa cả HTML và Ảnh Canvas)
            reactToPrintFn();

            // 5. Hoàn tất: Trả lại trạng thái cũ
            setTimeout(() => setPrintImage(null), 1000);
        }
    };

    return (
        <div className="flex h-screen bg-slate-100 font-sans">
            {/* TOOLBAR - SẼ BỊ ẨN KHI IN NHỜ LỚP .no-print */}
            <div className="w-80 bg-white border-r p-6 flex flex-col gap-4 no-print shadow-xl">
                <h1 className="text-xl font-black text-indigo-600">CV Designer Pro</h1>
                <button onClick={() => setElements([...elements, { id: `txt-${Date.now()}`, type: 'text', x: 300, y: 50, text: 'NỘI DUNG MỚI', fontSize: 20, fill: '#000', draggable: true }])} className="p-3 bg-indigo-600 text-white rounded-lg font-bold"> + Thêm Chữ</button>
                <button onClick={() => setElements([...elements, { id: `rect-${Date.now()}`, type: 'rect', x: 0, y: 0, width: 250, height: A4_HEIGHT, fill: '#1e293b', draggable: true }])} className="p-3 bg-slate-800 text-white rounded-lg font-bold"> + Thêm Cột</button>

                <div className="mt-auto border-t pt-4">
                    <button onClick={handlePrint} className="w-full py-4 bg-green-600 text-white rounded-xl font-black shadow-lg hover:bg-green-700 transition-all">IN TOÀN BỘ CV (HTML + CANVAS)</button>
                </div>
            </div>

            {/* VÙNG CHỨA NỘI DUNG IN (GỒM HTML PHỤ + CANVAS) */}
            <div className="flex-1 overflow-auto p-12 flex justify-center bg-slate-200">
                <div
                    ref={componentRef}
                    className="bg-white relative shadow-2xl print:shadow-none"
                    style={{ width: A4_WIDTH, minHeight: A4_HEIGHT }}
                >
                    {/* --- THÔNG TIN HTML PHỤ (VÍ DỤ: HEADER/FOOTER) --- */}
                    <div className="p-4 bg-slate-50 border-b flex justify-between items-center no-print-content">
                        <span className="text-[10px] text-slate-400 font-mono">DEBUG MODE: ON</span>
                        <span className="text-[10px] text-slate-400">Ngày xuất: {new Date().toLocaleDateString()}</span>
                    </div>

                    {/* --- KHU VỰC KONVA CANVAS --- */}
                    <div style={{ width: A4_WIDTH, height: A4_HEIGHT, position: 'relative' }}>
                        {printImage ? (
                            <img
                                src={printImage}
                                style={{ width: '100%', height: '100%', display: 'block' }}
                                alt="CV Content"
                            />
                        ) : (
                            <Stage
                                width={A4_WIDTH}
                                height={A4_HEIGHT}
                                ref={stageRef}
                                onMouseDown={(e) => e.target === e.target.getStage() && setSelectedId(null)}
                            >
                                <Layer>
                                    {elements.map((el) => {
                                        const common = {
                                            ...el,
                                            onClick: () => setSelectedId(el.id),
                                            onDragEnd: (e: any) => setElements(elements.map(item => item.id === el.id ? { ...item, x: e.target.x(), y: e.target.y() } : item)),
                                        };
                                        if (el.type === 'rect') return <Rect key={el.id} {...common} />;
                                        if (el.type === 'text') return <Text key={el.id} {...common} />;
                                        return null;
                                    })}
                                    <TransformerComponent selectedId={selectedId} />
                                </Layer>
                            </Stage>
                        )}
                    </div>

                    {/* --- THÔNG TIN HTML PHỤ PHÍA DƯỚI --- */}
                    <div className="p-8 text-center border-t mt-4 print:block hidden">
                        <p className="text-xs text-slate-400">Cảm ơn ông chủ đã sử dụng hệ thống thiết kế CV của PiPi AI</p>
                    </div>
                </div>
            </div>

            {/* CSS ĐIỀU KHIỂN IN ẤN */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @media print {
                    @page { size: A4; margin: 0; }
                    body { margin: 0; padding: 0; background: white !important; visibility: hidden; }
                    /* Chỉ hiển thị Ref cần in, ẩn sạch sành sanh những thứ khác */
                    .no-print { display: none !important; }
                    
                    /* Bắt buộc hiển thị Ref của chúng ta */
                    div { visibility: visible; }
                    
                    /* Đảm bảo màu sắc cột màu được giữ nguyên */
                    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                }
            `}} />
        </div>
    );
};

export default FinalCVDesigner;