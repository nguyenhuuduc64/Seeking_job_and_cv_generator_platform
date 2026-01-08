import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
    ClassicEditor,
    Autosave,
    Essentials,
    Paragraph,
    Alignment,
    AutoImage,
    Autoformat,
    AutoLink,
    BlockQuote,
    Bold,
    Bookmark,
    CloudServices,
    Code,
    CodeBlock,
    Emoji,
    FindAndReplace,
    FontBackgroundColor,
    FontColor,
    FontFamily,
    FontSize,
    Fullscreen,
    GeneralHtmlSupport,
    Heading,
    Highlight,
    HorizontalLine,
    HtmlEmbed,
    Image,
    ImageEditing,
    ImageUtils,
    ImageCaption,
    ImageInsert,
    ImageInsertViaUrl,
    ImageResize,
    ImageStyle,
    ImageTextAlternative,
    ImageToolbar,
    ImageUpload,
    ImageInline,
    ImageBlock,
    Indent,
    IndentBlock,
    Italic,
    Link,
    LinkImage,
    List,
    ListProperties,
    MediaEmbed,
    Mention,
    PageBreak,
    PasteFromOffice,
    PictureEditing,
    PlainTableOutput,
    RemoveFormat,
    ShowBlocks,
    SpecialCharacters,
    SpecialCharactersArrows,
    SpecialCharactersCurrency,
    SpecialCharactersEssentials,
    SpecialCharactersLatin,
    SpecialCharactersMathematical,
    SpecialCharactersText,
    Strikethrough,
    Subscript,
    Superscript,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableLayout,
    TableProperties,
    TableToolbar,
    TextPartLanguage,
    TextTransformation,
    TodoList,
    Underline,
    WordCount,
    BalloonToolbar,
    Undo,
    Base64UploadAdapter 
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css'; // Quan trọng: Phải có CSS của thư viện

const CKEditorDemo = () => {
    return (
        <div className="ck-editor-container">
            <CKEditor
                editor={ClassicEditor}
                data="<p>Chào ông chủ, bản này đã được kích hoạt vĩnh viễn!</p>"
                config={{
                    licenseKey: 'GPL', 
                    plugins: [
                        Essentials, Paragraph, Undo, Heading,
                        Image, ImageUtils, ImageEditing, ImageCaption,
                        ImageInline, ImageBlock, ImageInsert, ImageInsertViaUrl,
                        ImageResize, ImageStyle, ImageTextAlternative, ImageToolbar,
                        ImageUpload, AutoImage, LinkImage, PictureEditing,
                        Base64UploadAdapter, 
                        Autosave, Alignment, Autoformat, AutoLink, BlockQuote, 
                        Bold, Bookmark, CloudServices, 
                        Code, CodeBlock, Emoji, FindAndReplace, FontBackgroundColor, 
                        FontColor, FontFamily, FontSize, Fullscreen, GeneralHtmlSupport, 
                        Highlight, HorizontalLine, HtmlEmbed, Indent, IndentBlock, 
                        Italic, Link, List, ListProperties, MediaEmbed, Mention, 
                        PageBreak, PasteFromOffice, PlainTableOutput, RemoveFormat, 
                        ShowBlocks, SpecialCharacters, SpecialCharactersArrows, 
                        SpecialCharactersCurrency, SpecialCharactersEssentials, 
                        SpecialCharactersLatin, SpecialCharactersMathematical, 
                        SpecialCharactersText, Strikethrough, Subscript, Superscript, 
                        Table, TableCaption, TableCellProperties, TableColumnResize, 
                        TableLayout, TableProperties, TableToolbar, TextPartLanguage, 
                        TextTransformation, TodoList, Underline, WordCount, BalloonToolbar
                    ],
                    toolbar: [
                        'undo', 'redo', '|', 
                        'heading', '|', 
                        'bold', 'italic', 'underline', '|', 
                        'fontFamily', 'fontSize', 'fontColor', '|',
                        'alignment', '|',
                        'bulletedList', 'numberedList', 'todoList', '|',
                        'insertImage', 'insertTable', '|',
                        'fullscreen'
                    ],
                    image: {
                        toolbar: [
                            'imageStyle:inline', 'imageStyle:block', 'imageStyle:side',
                            '|',
                            'toggleImageCaption', 'imageTextAlternative'
                        ]
                    }
                }}
                onReady={(editor) => {
                    editor.editing.view.change((writer) => {
                        const root = editor.editing.view.document.getRoot();
                        
                        if (root) {
                            writer.setStyle(
                                'min-height',
                                '800px',
                                root
                            );
                        }
                    });
                    console.log('Editor đã sẵn sàng!', editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
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
                    max-width: 900px;
                    margin: 20px auto;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                }
            `}</style>
        </div>
    );
};

export default CKEditorDemo;