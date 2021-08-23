import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import Underline from '@tiptap/extension-underline'

// Overwrite the allowed marks of Heading
const CustomHeading = Heading.extend({
  marks: 'bold italic strike underline highlight subscript superscript'
})

export default function (content) {
  let editor

  return {
    init () {
      const _this = this

      editor = new Editor({
        element: _this.$refs.editorReference,
        extensions: [
          StarterKit.configure({
            heading: false,
            mention: false,
            textStyle: false
          }),
          CustomHeading.configure({
            levels: [1, 2, 3]
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
    },
    // Passing updatedAt here to make Alpine rerender the menu buttons.
    // The value of updatedAt will be updated on every Tiptap transaction.
    isActive (type, opts = {}, updatedAt) {
      return editor.isActive(type, opts)
    },
    updatedAt: Date.now(),
    // Menu actions/commands:
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
      editor.chain().focus().toggleBlockquote().run()
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
    }
  }
}
