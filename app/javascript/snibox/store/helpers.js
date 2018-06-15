import SnippetsBuilder from "../mixins/snippets_builder"
import _ from "lodash"
import Factory from "../mixins/factory"

export default {
  data: {
    setSnippets: (commit, data) => {
      commit('setSnippets', _.sortBy(data.snippets, ['title']))
    },

    setLabels: ({commit, getters}, data) => {
      let labels = []

      data.snippets.forEach(snippet => {
        if (!_.isNull(snippet.label.id)) {
          labels.push(snippet.label)
        }
      })

      if (labels.length) {
        labels = _.uniqBy(labels, 'id')
        labels = _.sortBy(labels, ['name'])
        labels.push({
          id: null,
          name: '',
          snippets_count: getters.untagged.length
        })
        commit('setLabels', labels)
      }
      else {
        commit('setLabels', [])
      }
    },

    setLabelSnippets: ({commit, state}, store) => {
      let labelSnippets = state.flags.renderAllSnippets ? state.snippets :
          SnippetsBuilder.methods.computeLabelSnippets(store, state.snippets)
      commit('setLabelSnippets', labelSnippets)
    },

    setLanguages: ({commit, state}, data) => {
      if (_.isEmpty(state.languages)) {
        commit('setLanguages', data.languages)
      }
    }
  },

  active: {
    setLabel: (state, data) => {
      let snippet = Factory.methods.factory().snippet
      localStorage.setItem('label_snippets_active', JSON.stringify(snippet))
      state.labelSnippets.active = snippet
      state.labelSnippets.mode = 'create'
      state.labelSnippets.editLabelName = ''
      state.labelSnippets.editTitle = ''
      state.labels.editName = data.name
      state.flags.renderAllSnippets = false
    },

    setLabelSnippet: (state) => {
      if (!state.flags.renderAllSnippets) {
        localStorage.setItem('labels_active', JSON.stringify(state.labelSnippets.active.label))
        state.labels.active = state.labelSnippets.active.label
        state.labelSnippets.editTitle = state.labelSnippets.active.title
        state.labelSnippets.editLabelName = state.labelSnippets.active.label.name
      }
    }
  }
}
