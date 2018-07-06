import { processIosEditorHeight } from '../utils/editor_helper'
import { editorHeightDelta } from '../utils/variables'

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
      return processIosEditorHeight() ? document.querySelector('body').offsetHeight - editorHeightDelta + 'px' : undefined
    }
  }
}
