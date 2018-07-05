import StoreHelpers from "./helpers"

export default {
  setLabelEditName(state, value) {
    state.labels.edit.name = value
  },

  setLabelSnippetEditTitle(state, value) {
    state.labelSnippets.edit.title = value
  },

  setLabelSnippetEditLanguage(state, value) {
    state.labelSnippets.edit.language = value
  },

  setLabelSnippetEditTabs(state, value) {
    state.labelSnippets.edit.tabs = value
  },

  setLabelSnippetEditLabel(state, value) {
    state.labelSnippets.edit.label = value
  },

  setSnippets(state, snippets) {
    state.snippets = snippets
  },

  setLabels(state, items) {
    state.labels.items = items
  },

  setLabelSnippets(state, items) {
    state.labelSnippets.items = items
  },

  setActiveLabel(state, item) {
    state.labels.active = item
    localStorage.setItem('labels_active', JSON.stringify(item))
    StoreHelpers.active.setLabel(state, item)
  },

  setActiveLabelSnippet(state, item) {
    state.labelSnippets.active = item
    localStorage.setItem('label_snippets_active', JSON.stringify(item))
    StoreHelpers.active.setLabelSnippet(state)
  },

  setSnippetMode(state, mode) {
    state.labelSnippets.mode = mode
  },

  setLanguages(state, languages) {
    state.languages = languages
  },

  setRenderAllSnippetsFlag(state, flag) {
    state.flags.renderAllSnippets = flag
  },

  setReadyFlag(state, flag) {
    state.flags.ready = flag
  }
}
