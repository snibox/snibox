import _ from 'lodash'

export default {
  methods: {
    compute_label_snippets(store, snippets) {
      let label_snippets = []
      if (_.isEqual(store.state.labels.active.id, 0)) {
        label_snippets = store.getters.untagged
      } else {
        label_snippets = _.filter(snippets, snippet => {
          return _.isEqual(snippet.label.id, store.state.labels.active.id)
        })
      }
      return label_snippets
    }
  }
}
