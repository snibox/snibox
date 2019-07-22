import _ from 'lodash'

export default {
  labels: state => {
    return state.labels.items
  },

  labelSnippets: state => {
    return state.labelSnippets.items
  },

  untagged: state => {
    return _.filter(state.snippets, v => {
      return _.isNull(v.labels[0].id)
    })
  }
}
