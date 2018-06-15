import Vue from 'vue/dist/vue.esm'
import Vuex from 'vuex'
import _ from 'lodash'
import factory from '../mixins/factory'
import StoreHelpers from './helpers'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    snippets: [],
    labels: {
      items: [],
      active: {},
      editName: ''
    },
    labelSnippets: {
      items: [],
      active: {},
      mode: '',
      editTitle: '',
      editLabelName: ''
    },
    languages: {},
    flags: {
      renderAllSnippets: false,
      ready: false
    }
  },

  mutations: {
    setLabelEditName(state, value) {
      state.labels.editName = value
    },

    setLabelSnippetEditTitle(state, value) {
      state.labelSnippets.editTitle = value
    },

    setLabelSnippetEditLabelName(state, value) {
      state.labelSnippets.editLabelName = value
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
    // TODO: check that local values exists in state
    setDefaultActiveEntities({commit, state}) {
      let localActive = {
        labels: JSON.parse(localStorage.getItem('labels_active')) || {},
        labelSnippets: JSON.parse(localStorage.getItem('label_snippets_active')) || {},
      }

      if (!localActive.labels.hasOwnProperty('snippets_count')) {
        commit('setRenderAllSnippetsFlag', true)
      }

      if (localActive.labelSnippets.id) {
        commit('setActiveLabelSnippet', localActive.labelSnippets)
        commit('setSnippetMode', 'show')
      }
      else {
        if (_.isEmpty(localActive.labels.name)) {
          commit('setActiveLabelSnippet', factory.methods.factory().snippet)
        }
        else {
          commit('setActiveLabel', localActive.labels)
        }
        commit('setSnippetMode', 'create')
      }
    },

    setData({commit, state, getters}, data) {
      StoreHelpers.data.setSnippets(commit, data)
      StoreHelpers.data.setLabels({commit, getters}, data)
      StoreHelpers.data.setLabelSnippets({commit, state}, this)
      StoreHelpers.data.setLanguages({commit, state}, data)
      commit('setReadyFlag', true)
    }
  }
})
