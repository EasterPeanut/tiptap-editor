import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import BubbleMenu from '@tiptap/extension-bubble-menu'
import FloatingMenu from '@tiptap/extension-floating-menu'
import Heading from '@tiptap/extension-heading'
import Highlight from '@tiptap/extension-highlight'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import Underline from '@tiptap/extension-underline'
import { Figure } from './custom-extensions/figure'

export let AlpineEditor

export const initEditor = function (content) {
  return {
    init () {
      const _this = this

      AlpineEditor = new Editor({
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
          FloatingMenu.configure({
            element: document.querySelector('.editor-menu-floating'),
            tippyOptions: { duration: 100 }
          }),
          Figure.configure({
            HTMLAttributes: { class: 'centered narrow' }
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
    // Passing updatedAt here to make Alpine rerender the buttons.
    // The value of updatedAt will be updated on every Tiptap transaction.
    isActive (type, opts = {}, updatedAt) {
      return AlpineEditor.isActive(type, opts)
    },
    getJSON () {
      return AlpineEditor.getJSON()
    },
    updatedAt: Date.now(),
    togglePlaceholder () {
      this.showPlaceholder = !this.$el.innerText.trim()
    },
    // Menu actions/commands:
    undo () {
      AlpineEditor.chain().focus().undo().run()
    },
    redo () {
      AlpineEditor.chain().focus().redo().run()
    },
    clearMarkup () {
      AlpineEditor.chain().focus().clearNodes().unsetAllMarks().run()
    },
    setParagraph () {
      AlpineEditor.chain().focus().setParagraph().run()
    },
    toggleHeading (level) {
      AlpineEditor.chain().focus().toggleHeading({ level: level }).run()
    },
    toggleBold () {
      AlpineEditor.chain().focus().toggleBold().run()
    },
    toggleItalic () {
      AlpineEditor.chain().focus().toggleItalic().run()
    },
    toggleUnderline () {
      AlpineEditor.chain().focus().toggleUnderline().run()
    },
    toggleStrike () {
      AlpineEditor.chain().focus().toggleStrike().run()
    },
    toggleHighlight (color) {
      AlpineEditor.chain().focus().toggleHighlight({ color: color }).run()
    },
    toggleSubscript () {
      AlpineEditor.chain().focus().toggleSubscript().run()
    },
    toggleSuperscript () {
      AlpineEditor.chain().focus().toggleSuperscript().run()
    },
    toggleCode () {
      AlpineEditor.chain().focus().toggleCode().run()
    },
    toggleCodeBlock () {
      AlpineEditor.chain().focus().toggleCodeBlock().run()
    },
    toggleBlockquote () {
      AlpineEditor.chain().focus().toggleBlockquote().run()
    },
    toggleBulletList () {
      AlpineEditor.chain().focus().toggleBulletList().run()
    },
    toggleOrderedList () {
      AlpineEditor.chain().focus().toggleOrderedList().run()
    },
    addFigure () {
      const url = window.prompt('URL')
      const caption = window.prompt('caption')

      if (url) {
        AlpineEditor.chain().focus().setFigure({ src: url, caption }).run()
      }
    },
    setHorizontalRule () {
      AlpineEditor.chain().focus().setHorizontalRule().run()
    },
    setHardBreak () {
      AlpineEditor.chain().focus().setHardBreak().run()
    }
  }
}
