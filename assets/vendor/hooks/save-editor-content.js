import { AlpineEditor } from '../editor'

export default {
  mounted () {
    this.el.addEventListener('click', () => {
      this.pushEvent('save', { content: AlpineEditor.getJSON() })
    })
  }
}
