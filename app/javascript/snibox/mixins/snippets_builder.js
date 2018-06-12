import _ from 'lodash'

export default {
  methods: {
    computeLabelSnippets(store, snippets) {
      let labelSnippets = []
      if (_.isEqual(store.state.labels.active.id, 0)) {
        labelSnippets = store.getters.untagged
      } else {
        labelSnippets = _.filter(snippets, snippet => {
          return _.isEqual(snippet.label.id, store.state.labels.active.id)
        })
      }
      return labelSnippets
    }
  }
}
