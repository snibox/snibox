import { processIosEditorHeight } from '../utils/editor_helper'
import { editorHeightDelta } from '../utils/variables'

export default {
  data() {
    return {
      languageOptions: this.$store.state.languages,
      tabOptions: {
        2: '2 spaces',
        4: '4 spaces',
        8: '8 spaces',
      }
    }
  },

  computed: {
    editorHeight() {
      return processIosEditorHeight() ? document.querySelector('body').offsetHeight - editorHeightDelta + 'px' : undefined
    }
  }
}
