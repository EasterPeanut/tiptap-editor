export default {
  mounted () {
    window.addEventListener('save', (e) => {
      console.log(e.detail.content)
    })
  }
}
