import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'

export default function (content) {
  let editor

  return {
    undo () {
      editor.chain().focus().undo().run()
    },
    redo () {
      editor.chain().focus().redo().run()
    },
    clearMarkup () {
      editor.chain().focus().clearNodes().unsetAllMarks().run()
    },
    setParagraph () {
      editor.chain().focus().setParagraph().run()
    },
    toggleHeading (level) {
      editor.chain().focus().toggleHeading({ level: level }).run()
    },
    toggleBold () {
      editor.chain().focus().toggleBold().run()
    },
    toggleItalic () {
      editor.chain().focus().toggleItalic().run()
    },
    toggleUnderline () {
      editor.chain().focus().toggleUnderline().run()
    },
    toggleStrike () {
      editor.chain().focus().toggleStrike().run()
    },
    toggleCode () {
      editor.chain().focus().toggleCode().run()
    },
    toggleCodeBlock () {
      editor.chain().focus().toggleCodeBlock().run()
    },
    toggleBlockquote () {
      if (editor.isActive('bulletList')) {
        editor.chain().focus().toggleBulletList().run()
        editor.chain().focus().toggleBlockquote().run()
        editor.chain().focus().toggleBulletList().run()
      } else if (editor.isActive('orderedList')) {
        editor.chain().focus().toggleOrderedList().run()
        editor.chain().focus().toggleBlockquote().run()
        editor.chain().focus().toggleOrderedList().run()
      } else {
        editor.chain().focus().toggleBlockquote().run()
      }
    },
    toggleBulletList () {
      editor.chain().focus().toggleBulletList().run()
    },
    toggleOrderedList () {
      editor.chain().focus().toggleOrderedList().run()
    },
    setHorizontalRule () {
      editor.chain().focus().setHorizontalRule().run()
    },
    setHardBreak () {
      editor.chain().focus().setHardBreak().run()
    },
    // Passing updatedAt here to make Alpine rerender the menu buttons.
    // The value of updatedAt will be updated on every Tiptap transaction.
    isActive (type, opts = {}, updatedAt) {
      return editor.isActive(type, opts)
    },
    updatedAt: Date.now(),
    init () {
      const _this = this

      editor = new Editor({
        element: this.$refs.editorReference,
        extensions: [
          StarterKit.configure({
            heading: {
              levels: [1, 2, 3]
            },
            mention: false,
            textStyle: false
          }),
          Underline
        ],
        content: content,
        onCreate ({ editor }) {
          _this.updatedAt = Date.now()
        },
        onUpdate ({ editor }) {
          _this.updatedAt = Date.now()
        },
        onSelectionUpdate ({ editor }) {
          _this.updatedAt = Date.now()
        }
      })
    }
  }
}
