import Vue from 'vue/dist/vue.esm'
import Vuex from 'vuex'
import _ from 'lodash'
import Factory from '../mixins/factory'
import StoreHelpers from './helpers'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    snippets: [],
    labels: {
      items: [],
      active: {},
      edit: {
        name: ''
      },
    },
    labelSnippets: {
      items: [],
      active: {},
      mode: '',
      edit: {
        title: '',
        label: ''
      }
    },
    languages: {},
    flags: {
      renderAllSnippets: false,
      ready: false
    }
  },

  mutations: {
    setLabelEditName(state, value) {
      state.labels.edit.name = value
    },

    setLabelSnippetEditTitle(state, value) {
      state.labelSnippets.edit.title = value
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
  },

  getters: {
    labels: state => {
      return state.labels.items
    },

    labelSnippets: state => {
      return state.labelSnippets.items
    },

    untagged: state => {
      return _.filter(state.snippets, v => {
        return _.isEmpty(v.label.name)
      })
    }
  },

  actions: {
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
})
