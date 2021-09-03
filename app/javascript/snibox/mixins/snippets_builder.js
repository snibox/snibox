import _ from 'lodash'

export default {
  methods: {
    computeLabelSnippets(store, snippets) {
      let labelSnippets = []
      if (typeof (store.state.labels.active) === 'undefined') {
        labelSnippets = store.getters.untagged
      } else {
        labelSnippets = _.filter(snippets, snippet => {
          return _.find(snippet.labels, { id: store.state.labels.active.id } );
        })
      }
      return labelSnippets
    }
  }
}
