import instance from '../config/axios';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { dataCv } from '../const/ckEditor';
import Resume from '../components/common/Resume';
import Button from '../components/common/Button';
import { faMagicWandSparkles } from '@fortawesome/free-solid-svg-icons';
import TemplatePanel from '../components/common/TemplatePannel';
import Toolbar from '@/components/common/toolbar/Toolbar';
import { useEditor } from '@tiptap/react';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import StarterKit from '@tiptap/starter-kit';
import { getmarkCv, handleAIReview } from '@/utils/resume';
import { toPng } from 'html-to-image';
import ButtonCustom from '../components/common/Button';
import { languageUtils } from '@/utils/language';
import i18n from '@/config/i18n';
import { useTranslation } from 'react-i18next';
function ResumeGeneratePage() {
    const { id } = useParams();
    const [cvData, setCvData] = useState<any[]>([]);
    const resumeRef = useRef<any>(null);
    const [language, setLanguage] = useState('vi');
    const { i18n } = useTranslation();
    const { data, isLoading } = useQuery({
        queryKey: ['cv', id],
        queryFn: () => instance.get(`/cvs/${id}`).then((res) => res.data),
        refetchOnWindowFocus: false,
        enabled: !!id && id !== 'undefined',
    });
    const editor = useEditor({
        extensions: [StarterKit, Bold, Italic],
        content: cvData,
    });
    useEffect(() => {
        if (isLoading) return;
        const savedDraft = localStorage.getItem('cv_draft');
        if (savedDraft) {
            setCvData(JSON.parse(savedDraft));
        } else if (id) {
            setCvData(data?.result?.content);
        } else {
            setCvData(dataCv);
        }
    }, [data, isLoading, id]);
    const handleToggleLanguage = () => {
        if (language == 'vi') setLanguage('en');
        else setLanguage('vi');
    };
    const handleSave = async () => {
        const cleanContent = cvData.map(({ chosen, selected, ...rest }) => rest);
        const payload = {
            updatedAt: new Date().toISOString(),
            content: cleanContent,
            id: id,
        };
        console.log(payload);
        try {
            if (id) {
                const response = await instance.put(`/cvs/${id}`, payload);
                console.log(response);
                localStorage.removeItem('cv_draft');
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

    if (isLoading) return <div>Đang tải dữ liệu...</div>;

    return (
        <div className="w-full bg-gray-100 py-10">
            <div className="container mx-auto px-10 md:px-20 flex gap-10">
                <div className="flex-2">
                    <div className="flex gap-2 mb-4">
                        <ButtonCustom onClick={handleSave} name="Lưu CV" />
                        <ButtonCustom
                            onClick={() => resumeRef.current?.print()}
                            name="Xuất File PDF"
                        />
                        <ButtonCustom
                            name="AI Review"
                            icon={faMagicWandSparkles}
                            variant="secondary"
                            onClick={() => resumeRef.current?.aiReview()}
                        />
                        <ButtonCustom
                            onClick={() => languageUtils.toggle()}
                            variant="outline"
                            className="no-print mb-4 min-w-[45px] h-[35px] font-black uppercase border-2"
                        >
                            {/* Dùng i18n từ hook thưa ông chủ */}
                            {i18n.language}
                        </ButtonCustom>
                    </div>
                    <div className="flex gap-10">
                        <div className="relative">
                            <Resume cvData={cvData} onItemsChange={setCvData} ref={resumeRef} />
                        </div>
                        <TemplatePanel />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResumeGeneratePage;
