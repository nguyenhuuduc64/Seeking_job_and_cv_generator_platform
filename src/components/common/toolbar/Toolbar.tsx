import type { Editor } from '@tiptap/core'
import { useEditorState } from '@tiptap/react'
import React from 'react'
import { menuBarStateSelector } from './toolbarState'
import {
  Bold, Italic, Code, Heading1, Heading2, Heading3,
  Heading4, Heading5, Heading6, Undo, Redo
} from "lucide-react"

export const Toolbar = ({ editor }: { editor: Editor }) => {
  const editorState = useEditorState({
    editor,
    selector: menuBarStateSelector,
  })

  if (!editor) return null

  // Kích thước chung cho tất cả icon
  const ICON_SIZE = 18

  // Class chung cho các nút bấm: Nền trắng, không bo góc, hover nền xám
  const btnClass = (isActive: boolean = false) => `
    p-2 transition-colors duration-200 flex items-center justify-center
    ${isActive ? 'bg-slate-200 text-blue-600' : 'bg-white text-slate-600'}
    hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-white
    border-none outline-none
  `

  return (
    <div className="flex items-start border-b border-slate-200 bg-white">
      <div className="flex flex-wrap items-center">
        {/* Nhóm Định dạng */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          className={btnClass(editorState.isBold)}
        >
          <Bold size={ICON_SIZE} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          className={btnClass(editorState.isItalic)}
        >
          <Italic size={ICON_SIZE} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editorState.canCode}
          className={btnClass(editorState.isCode)}
        >
          <Code size={ICON_SIZE} />
        </button>

        <div className="w-[1px] h-6 bg-slate-200 mx-1" />

        {/* Nhóm Headings */}
        {[1, 2, 3, 4, 5, 6].map((level) => {
          const Icon = [Heading1, Heading2, Heading3, Heading4, Heading5, Heading6][level - 1]
          const isActive = (editorState as any)[`isHeading${level}`]
          return (
            <button
              key={level}
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: level as any }).run()}
              className={btnClass(isActive)}
            >
              <Icon size={ICON_SIZE} />
            </button>
          )
        })}

        <div className="w-[1px] h-6 bg-slate-200 mx-1" />

        {/* Nhóm Lịch sử */}
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState.canUndo}
          className={btnClass()}
        >
          <Undo size={ICON_SIZE} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState.canRedo}
          className={btnClass()}
        >
          <Redo size={ICON_SIZE} />
        </button>
      </div>
    </div>
  )
}

export default Toolbar;