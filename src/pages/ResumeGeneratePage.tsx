import instance from '../config/axios';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { dataCv } from '../const/ckEditor';
import Resume from '../components/common/Resume';
import Button from '../components/common/Button';
import { faMagicWandSparkles } from '@fortawesome/free-solid-svg-icons';
import TemplatePanel from '../components/common/TemplatePannel';
// Tạo Document tổng thể

function ResumeGeneratePage() {
    const { id } = useParams();
    const [cvData, setCvData] = useState<any[]>([]);
    const resumeRef = useRef<any>(null);
    const { data, isLoading } = useQuery({
        queryKey: ['cv', id],
        queryFn: () => instance.get(`/cvs/${id}`).then((res) => res.data),
        refetchOnWindowFocus: false,
        enabled: !!id && id !== 'undefined',
    });

    // ✅ CHIÊU THỨ NHẤT: Đồng bộ dữ liệu từ API vào State khi fetch xong
    useEffect(() => {
        const timeOutId = setTimeout(() => {
            if (data?.result?.content) {
                // Đổ dữ liệu từ API vào state để có thể chỉnh sửa
                setCvData(data.result.content);
            } else {
                setCvData(dataCv);
            }
        }, 500);
        console.log('data cv', dataCv);
        return () => clearTimeout(timeOutId);
    }, [data]);

    const handleSave = async () => {
        const cleanContent = cvData.map(({ chosen, selected, ...rest }) => rest);
        const payload = {
            updatedAt: new Date().toISOString(),
            content: cleanContent,
            // Đừng quên gửi ID nếu ông chủ đang dùng phương thức PUT
            id: id,
        };
        console.log(payload);
        try {
            // Nếu có ID thì nên gọi PUT tới /cvs/{id} để cập nhật
            if (id) {
                const response = await instance.put(`/cvs/${id}`, payload);
                console.log(response);
                alert('Lưu thành công, thưa ông chủ!');
            } else {
                const response = await instance.post('/cvs', payload);
                console.log(response);
                alert('Lưu thành công, thưa ông chủ!');
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (isLoading) return <div>Đang tải dữ liệu của ông chủ...</div>;

    return (
        <div className="w-full bg-gray-100 py-10">
            {/* Thêm container và căn giữa, px-10 hoặc px-20 tạo khoảng cách dày 2 bên */}
            <div className="container mx-auto px-10 md:px-20 flex gap-10">
                <div className="flex-2">
                    <div className="flex gap-2 mb-4">
                        <Button onClick={handleSave} name="Lưu CV" />
                        <Button onClick={() => resumeRef.current?.print()} name="Xuất File PDF" />
                        <Button name="AI Review" icon={faMagicWandSparkles} variant="secondary" />
                    </div>
                    <Resume cvData={cvData} onItemsChange={setCvData} ref={resumeRef} />
                </div>

                <TemplatePanel />
            </div>
        </div>
    );
}

export default ResumeGeneratePage;
