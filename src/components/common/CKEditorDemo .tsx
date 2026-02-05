import { CKEditor } from '@ckeditor/ckeditor5-react';
import { flugins } from '../../config/ckEditor/flugin';

import 'ckeditor5/ckeditor5.css'; // Quan trọng: Phải có CSS của thư viện
import { getGitHubLink } from '../../utils/resume';
import { useState, useRef } from 'react';
import instance from '../../config/axios';
import Button from './Button';
import { faMagicWandSparkles } from '@fortawesome/free-solid-svg-icons';
import MyUploadAdapter from '../../config/ckEditor/MyUploadAdapter';
import { ClassicEditor } from 'ckeditor5';
import { toolbar, image } from '../../config/ckEditor/flugin';

interface CKEditorDemoProps {
    content?: string;
    className?: string;
}
const CKEditorDemo = ({ content, className }: CKEditorDemoProps) => {
    const [editorData, setEditorData] = useState<string>(
        localStorage.getItem('cv-content-ck') || ''
    );
    const editorInstance = useRef<any>(null);
    const [githubLink, setGithubLink] = useState<string>('');
    const [generateButton, setGenerateButton] = useState<boolean>(false);
    const getTechs = async (githubLink: string) => {
        try {
            // 1. Gọi API
            const response = await instance.post('/ai/analyze-tech', {
                message: githubLink,
            });
            const techStack = response.data.responseMessage;

            const editor = editorInstance.current;
            if (editor) {
                editor.model.change((writer: any) => {
                    const root = editor.model.document.getRoot();
                    let targetNode = null;

                    // 2. Tìm kiếm nút mục tiêu (Duyệt đệ quy hoặc duyệt sâu)
                    // Chúng ta sẽ tìm tất cả các phần tử có data-link khớp với link vừa phân tích
                    const range = editor.model.createRangeIn(root);
                    for (const value of range) {
                        const node = value.item;
                        if (
                            node.is('element', 'ai-loading-placeholder') &&
                            node.getAttribute('data-link') === githubLink
                        ) {
                            targetNode = node;
                            break;
                        }
                    }

                    if (targetNode) {
                        editor.model.change((writer: any) => {
                            // 1. Lấy vị trí ngay trước cái nút
                            const position = writer.createPositionBefore(targetNode);

                            // 2. XÓA CÁI NÚT
                            writer.remove(targetNode);

                            // 3. TẠO MỘT THẺ PARAGRAPH MỚI (Tương đương thẻ <p>)
                            const newP = writer.createElement('paragraph');

                            // 4. Chèn text vào trong thẻ Paragraph đó
                            writer.insertText(`🚀 Tech Stacks: ${techStack}`, { bold: true }, newP);

                            // 5. CHÈN NGUYÊN KHỐI PARAGRAPH VÀO (Tự động ép xuống dòng)
                            // Dùng phương thức insertContent với một Element (paragraph) sẽ ép Editor phải tạo dòng mới
                            editor.model.insertContent(newP, position);
                        });
                    }
                });

                // 6. Cập nhật State và LocalStorage từ dữ liệu MỚI NHẤT của Editor
                const updatedData = editor.getData();
                setEditorData(updatedData);
                localStorage.setItem('cv-content-ck', updatedData);
            }
        } catch (error) {
            console.error('Lỗi phân tích thưa ông chủ:', error);
        }
    };

    return (
        <div className={`ck-editor-container ${className}`}>
            {generateButton && (
                <Button
                    name="Tạo"
                    variant="secondary"
                    icon={faMagicWandSparkles}
                    onClick={() => getTechs(githubLink)}
                />
            )}
            <CKEditor
                editor={ClassicEditor}
                data={content || editorData}
                config={{
                    licenseKey: 'GPL',
                    plugins: flugins,
                    toolbar: toolbar,
                    image: image,
                    htmlSupport: {
                        allow: [
                            {
                                name: /^(span|div|button)$/, // Cho phép các thẻ này
                                attributes: true, // Cho phép mọi thuộc tính (id, contenteditable...)
                                classes: true, // Cho phép mọi class
                                styles: true, // QUAN TRỌNG: Cho phép thuộc tính style="..."
                            },
                        ],
                    },
                }}
                onReady={(editor) => {
                    // Gán ref để sử dụng ở các hàm bên ngoài
                    editorInstance.current = editor;

                    // Lấy schema từ model, lấy conversion trực tiếp từ editor
                    const { schema } = editor.model;
                    const { conversion } = editor;

                    // 1. Đăng ký Model Element
                    schema.register('ai-loading-placeholder', {
                        allowWhere: '$text',
                        isInline: true,
                        isObject: true,
                        allowAttributes: ['class', 'style', 'contenteditable', 'data-link'],
                    });

                    // 2. Định nghĩa Downcast (Model -> View)
                    conversion.for('downcast').elementToElement({
                        model: 'ai-loading-placeholder',
                        view: (modelElement, { writer }) => {
                            return writer.createContainerElement('button', {
                                class: 'ai-magic-btn',
                                style: 'display: inline-flex; align-items: center; background: #f0f7ff; color: #0369a1; border: 1px solid #bae6fd; border-radius: 20px; padding: 4px 12px; font-size: 13px; cursor: pointer; margin: 0 4px;',
                                'data-link': modelElement.getAttribute('data-link') || '',
                                contenteditable: 'false',
                            });
                        },
                    });

                    // 3. File Repository (Giữ nguyên)
                    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                        return new MyUploadAdapter(loader);
                    };

                    const domElement = editor.ui.view.editable.element as HTMLElement;

                    if (domElement) {
                        // 4. Xử lý Paste
                        domElement.addEventListener('paste', (event: ClipboardEvent) => {
                            const pastedData = event.clipboardData?.getData('text/plain') || '';
                            const newLink = getGitHubLink(pastedData);

                            if (newLink) {
                                event.preventDefault();
                                setGithubLink(newLink);

                                editor.model.change((writer) => {
                                    const insertPosition =
                                        editor.model.document.selection.getFirstPosition();
                                    const cleanLink = newLink.replace(/\.git$/, '');

                                    const loadingElement = writer.createElement(
                                        'ai-loading-placeholder',
                                        {
                                            'data-link': cleanLink,
                                        }
                                    );

                                    writer.insertText(
                                        '✨ Phân tích kỹ thuật từ Repo này',
                                        loadingElement
                                    );
                                    editor.model.insertContent(loadingElement, insertPosition);
                                });
                            }
                        });

                        // 5. Xử lý Click
                        domElement.addEventListener('click', (e: MouseEvent) => {
                            const target = e.target as HTMLElement;
                            const btn = target.closest('.ai-magic-btn') as HTMLButtonElement;

                            if (btn) {
                                const link = btn.getAttribute('data-link');
                                if (link) {
                                    getTechs(link);
                                    btn.innerText = '⌛ Đang phân tích...';
                                    btn.disabled = true;
                                }
                            }
                        });
                    }
                }}
                onChange={(_, editor) => {
                    const data = editor.getData();
                    //getTechsFromRepo("https://github.com/facebook/react");
                    localStorage.setItem('cv-content-ck', data);
                }}
            />

            <style>{`
                .ck-content.ck-editor__editable {
                    min-height: 800px !important;
                    height: auto !important;
                    cursor: text !important;
                }
                .ck-editor__main {
                    min-height: 800px !important;
                }
                .ck-editor-container {
                    margin: 20px auto;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                }
                
            `}</style>
        </div>
    );
};

export default CKEditorDemo;
