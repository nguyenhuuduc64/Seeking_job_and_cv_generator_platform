import { CKEditor } from "@ckeditor/ckeditor5-react";
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
  Base64UploadAdapter,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css"; // Quan trọng: Phải có CSS của thư viện
import { getGitHubLink } from "../../utils/resume";
import { useState } from "react";
import instance from "../../config/axios";
import Button from "./Button";
import { faMagicWandSparkles } from "@fortawesome/free-solid-svg-icons";
const CKEditorDemo = () => {
  const [editorData, setEditorData] = useState<string>(
    localStorage.getItem("cv-content-ck") || ""
  );
  const [githubLink, setGithubLink] = useState<string>("");
  const [generateButton, setGenerateButton] = useState<boolean>(false);
  const getTechs = async (githubLink: string) => {
    const savedData =
      localStorage.getItem("cv-content-ck") || "<p>Bắt đầu tạo cv của bạn</p>";
    console.log("editor data before fetch: ", savedData);
    const response = await instance.post("/ai/analyze-tech", {
      message: githubLink,
    });
    console.log(response.data);
    console.log("editor data after fetch: ", savedData);
    setEditorData(
      savedData + `<p>teach stacks: ${response.data.responseMessage}</p>`
    );
  };

  return (
    <div className="ck-editor-container">
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
        data={editorData}
        config={{
          licenseKey: "GPL",
          plugins: [
            Essentials,
            Paragraph,
            Undo,
            Heading,
            Image,
            ImageUtils,
            ImageEditing,
            ImageCaption,
            ImageInline,
            ImageBlock,
            ImageInsert,
            ImageInsertViaUrl,
            ImageResize,
            ImageStyle,
            ImageTextAlternative,
            ImageToolbar,
            ImageUpload,
            AutoImage,
            LinkImage,
            PictureEditing,
            Base64UploadAdapter,
            Autosave,
            Alignment,
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
            Highlight,
            HorizontalLine,
            HtmlEmbed,
            Indent,
            IndentBlock,
            Italic,
            Link,
            List,
            ListProperties,
            MediaEmbed,
            Mention,
            PageBreak,
            PasteFromOffice,
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
          ],
          toolbar: [
            "undo",
            "redo",
            "|",
            "heading",
            "|",
            "bold",
            "italic",
            "underline",
            "|",
            "fontFamily",
            "fontSize",
            "fontColor",
            "|",
            "alignment",
            "|",
            "bulletedList",
            "numberedList",
            "todoList",
            "|",
            "insertImage",
            "insertTable",
            "|",
            "fullscreen",
          ],
          image: {
            toolbar: [
              "imageStyle:inline",
              "imageStyle:block",
              "imageStyle:side",
              "|",
              "toggleImageCaption",
              "imageTextAlternative",
            ],
          },
        }}
        onReady={(editor) => {
          const domElement = editor.ui.view.editable.element as HTMLElement;

          if (domElement) {
            // 2. Xử lý sự kiện dán (Paste)
            domElement.addEventListener("paste", (event: ClipboardEvent) => {
              const pastedData =
                event.clipboardData?.getData("text/plain") || "";
              event.preventDefault();

              const newLink = getGitHubLink(pastedData);
              if (newLink) {
                setGithubLink(newLink);
                setGenerateButton((prev) => !prev);
              }
            });

            // 3. Xử lý sự kiện click (Ủy quyền sự kiện - Event Delegation)
            // Đưa ra ngoài để chỉ gắn 1 lần duy nhất, tránh lỗi TypeScript e.target
            domElement.addEventListener("click", (e: MouseEvent) => {
              const target = e.target as HTMLElement;

              // Kiểm tra xem phần tử bị click có phải là nút phân tích không
              if (target && target.tagName === "BUTTON") {
                const link = target.getAttribute("data-link");

                if (link) {
                  getTechs(link);

                  // Cập nhật trạng thái hiển thị
                  target.innerText = "⌛ Đang phân tích...";

                  // Ép kiểu sang Button để khóa nút
                  (target as HTMLButtonElement).disabled = true;
                  target.style.opacity = "0.7";
                  target.style.cursor = "not-allowed";
                }
              }
            });
          }
          editor.editing.view.change((writer) => {
            const root = editor.editing.view.document.getRoot();

            if (root) {
              writer.setStyle("min-height", "800px", root);
            }
          });
          console.log("Editor đã sẵn sàng!", editor);
        }}
        onChange={(_, editor) => {
          const data = editor.getData();
          //getTechsFromRepo("https://github.com/facebook/react");
          localStorage.setItem("cv-content-ck", data);
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
