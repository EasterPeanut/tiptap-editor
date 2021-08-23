import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import BubbleMenu from '@tiptap/extension-bubble-menu'
import Heading from '@tiptap/extension-heading'
import Highlight from '@tiptap/extension-highlight'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import Underline from '@tiptap/extension-underline'

export default function (content) {
  let editor

  return {
    init () {
      const _this = this

      editor = new Editor({
        element: this.$refs.editorReference,
        content: content,
        editorProps: {
          attributes: { class: 'editor-contenteditable' }
        },
        extensions: [
          StarterKit.configure({
            blockquote: {
              HTMLAttributes: { class: 'centered narrow' }
            },
            bulletList: {
              HTMLAttributes: { class: 'centered narrow' }
            },
            codeBlock: {
              HTMLAttributes: { class: 'centered narrow' }
            },
            horizontalRule: {
              HTMLAttributes: { class: 'centered narrow' }
            },
            paragraph: {
              HTMLAttributes: { class: 'centered narrow' }
            },
            orderedList: {
              HTMLAttributes: { class: 'centered narrow' }
            },
            heading: false,
            mention: false,
            textStyle: false
          }),
          BubbleMenu.configure({
            element: document.querySelector('.editor-menu-bubble'),
            tippyOptions: { duration: 100 }
          }),
          Heading
            .extend({
              // Overwrite the allowed marks of Heading
              marks: 'bold italic strike underline highlight subscript superscript'
            })
            .configure({
              levels: [2, 3],
              HTMLAttributes: { class: 'centered narrow' }
            }),
          Highlight
            .extend({
              // By default set a color if using keyboard shortcut
              addKeyboardShortcuts () {
                return {
                  'Mod-Shift-h': () => this.editor.commands.toggleHighlight({ color: '#fffb91' })
                }
              }
            })
            .configure({
              multicolor: true
            }),
          Subscript,
          Superscript,
          Underline
        ],
        onCreate () {
          _this.updatedAt = Date.now()
        },
        onUpdate () {
          _this.updatedAt = Date.now()
        },
        onSelectionUpdate () {
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
    toggleHighlight (color) {
      editor.chain().focus().toggleHighlight({ color: color }).run()
    },
    toggleSubscript () {
      editor.chain().focus().toggleSubscript().run()
    },
    toggleSuperscript () {
      editor.chain().focus().toggleSuperscript().run()
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
