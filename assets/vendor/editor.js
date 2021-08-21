import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'

export default function (content) {
  let editor

  return {
    // Passing updatedAt here to make Alpine rerender the menu buttons.
    // The value of updatedAt will be updated on every Tiptap transaction.
    isActive (type, opts = {}, updatedAt) {
      return editor.isActive(type, opts)
    },
    toggleBold () {
      editor.chain().toggleBold().focus().run()
    },
    toggleItalic () {
      editor.chain().toggleItalic().focus().run()
    },
    toggleHeading (level) {
      editor.chain().toggleHeading({ level: level }).focus().run()
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
            mention: false
          })
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
