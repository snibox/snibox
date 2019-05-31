import StoreHelpers from './helpers'

// TODO: refactor StoreHelpers.edit.createEditableSnippetCopy usage

export default {
  setLabelEditName(state, value) {
    state.labels.edit.name = value
  },

  setLabelSnippetsEditTitle(state, value) {
    state.labelSnippets.edit.title = value
  },

  setLabelSnippetsEditDescription(state, value) {
    state.labelSnippets.edit.description = value
  },

  setLabelSnippetEditLabel(state, value) {
    state.labelSnippets.edit.label = value
  },

  setLabelSnippetEditFileTitle(state, {index, value}) {
    state.labelSnippets.edit.snippetFiles[index].title = value
  },

  setLabelSnippetEditFileLanguage(state, {index, value}) {
    state.labelSnippets.edit.snippetFiles[index].language = value
  },

  setLabelSnippetEditFileTabs(state, {index, value}) {
    state.labelSnippets.edit.snippetFiles[index].tabs = value
  },

  addSnippetFile(state, snippetIndex) {
    if (snippetIndex === -1) {
      snippetIndex = state.snippets.length - 1
    }
    state.labelSnippets.edit.snippetFiles.push({
      title: '',
      content: '',
      language: 'automatically',
      tabs: 4
    })
  },

  removeSnippetFile(state, snippetIndex) {
    if (state.labelSnippets.edit.snippetFiles[snippetIndex].id) {
      state.labelSnippets.edit.snippetFiles[snippetIndex]._destroy = true
    }
    else {
      state.labelSnippets.edit.snippetFiles.splice(snippetIndex, 1)
    }
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

    if (['create', 'edit'].includes(mode)) {
      StoreHelpers.edit.createEditableSnippetCopy(state)
    }
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

  setScrollToLatestFileFlag(state, flag) {
    state.flags.scrollToLatestFile = flag
  }
}
