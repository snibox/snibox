import MobileDetect from 'mobile-detect'

// ios safari 100vh fix
const processIosEditorHeight = () => {
  return new MobileDetect(window.navigator.userAgent).userAgent() === 'Safari'
      && document.querySelector('body').offsetWidth > 769
}

// based on Codemirror sub-modes and hljs analogues
const editorModesMatrix = {
  bash: 'shell',
  less: 'css',
  scss: 'sass'
}

export const processEditorMode = (mode) => {
  return editorModesMatrix.hasOwnProperty(mode) ? editorModesMatrix[mode] : mode
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
