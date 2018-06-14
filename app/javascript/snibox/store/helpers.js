import SnippetsBuilder from "../mixins/snippets_builder"
import _ from "lodash"
import factory from "../mixins/factory"

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
          name: 'untagged',
          snippets_count: getters.untagged.length
        })
        commit('setLabels', labels)
      }
      else {
        commit('setLabels', [])
      }
    },

    setLabelSnippets: ({commit, state}, store) => {
      let labelSnippets = _.isEmpty(state.labels.active) ? state.snippets :
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
      let snippet = factory.methods.factory().snippet
      localStorage.setItem('label_snippets_active', JSON.stringify(snippet))
      state.labelSnippets.active = snippet
      state.labelSnippets.active.label = data
      state.labelSnippets.mode = 'create'
      state.labels.editName = data.name
    },

    setLabelSnippet: (state) => {
      localStorage.setItem('labels_active', JSON.stringify(state.labelSnippets.active.label))
      state.labels.active = state.labelSnippets.active.label
      state.labelSnippets.editTitle = state.labelSnippets.active.title
      state.labelSnippets.editLabelName = state.labelSnippets.active.label.name
    }
  },

  setReadyFlag: ({commit, state}) => {
    if (!state.ready) {
      commit('setReadyFlag', true);
    }
  }
}
