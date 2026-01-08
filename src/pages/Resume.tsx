import { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Quan trọng: Phải import CSS thì mới hiện giao diện
import CKEditorDemo from '../components/common/CKEditorDemo ';

function Resume() {
    const editorRef = useRef<HTMLDivElement>(null); // Dùng ref thay vì gọi ID trực tiếp
    const quillRef = useRef<Quill | null>(null);

    useEffect(() => {
        // 1. Khởi tạo (Chỉ chạy khi chưa có quillRef)
        if (editorRef.current && !quillRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
                placeholder: 'Hãy bắt đầu viết CV của ông chủ...',
                modules: {
                    toolbar: [
                        [{ 'header': [1, 2, false] }],
                        ['bold', 'italic', 'underline'],
                        ['image', 'code-block']
                    ]
                }
            });

            const quill = quillRef.current;
            const savedContent = localStorage.getItem('cv-content');
            if (savedContent) {
                quill.root.innerHTML = savedContent;
            }

            quill.on('text-change', () => {
                const content = quill.root.innerHTML;
                localStorage.setItem('cv-content', content);
            });
        }

        // 2. PHẢI ĐẶT Ở ĐÂY (Nằm ngoài IF nhưng trong useEffect)
        return () => {
            if (quillRef.current) {
                const toolbar = editorRef.current?.previousSibling;
                if (toolbar && (toolbar as HTMLElement).classList.contains('ql-toolbar')) {
                    toolbar.remove();
                }
                quillRef.current = null;
            }
        };
    }, []); // Dependency array vẫn để trống

    return (
        <div className="container mx-auto p-10 bg-gray-50 min-h-screen">
            <CKEditorDemo />
        </div>
    );
}

export default Resume;