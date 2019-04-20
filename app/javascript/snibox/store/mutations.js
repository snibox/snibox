import StoreHelpers from './helpers'

export default {
  setSnippetDescription(state, value) {
    state.labelSnippets.active.description = value
  },

  setLabelEditName(state, value) {
    state.labels.edit.name = value
  },

  setLabelSnippetEditTitle(state, {index, value}) {
    state.labelSnippets.active.snippet_files[index].title = value
  },

  setLabelSnippetEditLanguage(state, {index, value}) {
    state.labelSnippets.active.snippet_files[index].language = value
  },

  setLabelSnippetEditTabs(state, {index, value}) {
    state.labelSnippets.active.snippet_files[index].tabs = value
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
  },

  addSnippetFile(state, snippetIndex) {
    if (snippetIndex === -1) {
      snippetIndex = state.snippets.length - 1
    }
    state.labelSnippets.active.snippet_files.push({
      title: '',
      content: '',
      language: 'automatically',
      tabs: 4,
    })
  },

  removeSnippetFile(state, snippetIndex) {
    state.labelSnippets.active.snippet_files.splice(snippetIndex, 1)
  }
}
