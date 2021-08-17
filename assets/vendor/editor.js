import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'

export default function (content) {
  const _window = this

  return {
    content: content,
    updatedAt: Date.now(), // force Alpine to rerender on selection change
    init (element) {
      _window.editor = new Editor({
        element: element,
        extensions: [
          StarterKit.configure({
            heading: {
              levels: [1, 2, 3]
            },
            mention: false
          })
        ],
        content: this.content,
        onUpdate: ({ editor }) => {
          this.content = editor.getHTML()
        },
        onSelectionUpdate: () => {
          this.updatedAt = Date.now()
        }
      })
    }
  }
}
