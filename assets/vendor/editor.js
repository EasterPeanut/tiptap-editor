import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'

export default function (element, content) {
  return new Editor({
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
