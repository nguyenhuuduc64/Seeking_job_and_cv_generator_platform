import type { Editor } from '@tiptap/core'
import type { EditorStateSnapshot } from '@tiptap/react'

export function menuBarStateSelector(ctx: EditorStateSnapshot<Editor>) {
    // Nếu chưa có editor, trả về trạng thái "tất cả đều false"
    // Phải trả về ĐẦY ĐỦ các thuộc tính để không bị lỗi Type mismatch
    if (!ctx.editor) {
        return {
            isBold: false, canBold: false,
            isItalic: false, canItalic: false,
            isStrike: false, canStrike: false,
            isCode: false, canCode: false,
            canClearMarks: false,
            isParagraph: false,
            isHeading1: false, isHeading2: false, isHeading3: false,
            isHeading4: false, isHeading5: false, isHeading6: false,
            isBulletList: false, isOrderedList: false,
            isCodeBlock: false, isBlockquote: false,
            canUndo: false, canRedo: false,
        };
    }

    const { editor } = ctx;

    return {
        // Text formatting - Rút gọn logic can() cho đúng chuẩn Tiptap thưa ông chủ
        isBold: editor.isActive('bold'),
        canBold: editor.can().toggleBold(),

        isItalic: editor.isActive('italic'),
        canItalic: editor.can().toggleItalic(),

        isStrike: editor.isActive('strike'),
        canStrike: editor.can().toggleStrike(),

        isCode: editor.isActive('code'),
        canCode: editor.can().toggleCode(),

        canClearMarks: editor.can().unsetAllMarks(),

        // Block types
        isParagraph: editor.isActive('paragraph'),
        isHeading1: editor.isActive('heading', { level: 1 }),
        isHeading2: editor.isActive('heading', { level: 2 }),
        isHeading3: editor.isActive('heading', { level: 3 }),
        isHeading4: editor.isActive('heading', { level: 4 }),
        isHeading5: editor.isActive('heading', { level: 5 }),
        isHeading6: editor.isActive('heading', { level: 6 }),

        // Lists and blocks
        isBulletList: editor.isActive('bulletList'),
        isOrderedList: editor.isActive('orderedList'),
        isCodeBlock: editor.isActive('codeBlock'),
        isBlockquote: editor.isActive('blockquote'),

        // History
        canUndo: editor.can().undo(),
        canRedo: editor.can().redo(),
    }
}

export type MenuBarState = ReturnType<typeof menuBarStateSelector>