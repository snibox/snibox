import StoreHelpers from './helpers'

export default {
  setData({commit, state, getters}, data) {
    StoreHelpers.data.setSnippets(commit, data)
    StoreHelpers.data.setLabels({commit, getters}, data)
    StoreHelpers.data.setLanguages({commit, state}, data)
    if (!this.state.flags.ready) {
      commit('setReadyFlag', true)
    }
  },

  setDefaultActiveEntities({commit, state}) {
    StoreHelpers.localStorage.setDefault(commit)
    StoreHelpers.data.setLabelSnippets({commit, state}, this)
  }
}
