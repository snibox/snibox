import MobileDetect from 'mobile-detect'

// ios safari 100vh fix
const processIosEditorHeight = () => {
  return new MobileDetect(window.navigator.userAgent).userAgent() === 'Safari'
      && document.querySelector('body').offsetWidth > 769
}

export default {
  data() {
    return {
      language_options: this.$store.state.languages,
      tab_options: {
        2: '2 spaces',
        4: '4 spaces',
        8: '8 spaces',
      }
    }
  },

  computed: {
    editorHeight() {
      return processIosEditorHeight() ? document.querySelector('body').offsetHeight - 271 + 'px' : undefined
    }
  }
}
