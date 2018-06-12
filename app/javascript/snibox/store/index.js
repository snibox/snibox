// TODO: refactor this

import Vue from 'vue/dist/vue.esm'
import Vuex from 'vuex'
import _ from 'lodash'
import factory from '../mixins/factory'
import snippets_builder from '../mixins/snippets_builder'

Vue.use(Vuex)

let set_active_label = (state, data) => {
  let snippet = factory.methods.factory().snippet
  localStorage.setItem('label_snippets_active', JSON.stringify(snippet))
  state.labelSnippets.active = snippet
  state.labelSnippets.active.label = data
  state.labelSnippets.mode = 'create'
  state.labels.editName = data.name
}

let set_active_label_snippet = (state) => {
  if (!_.isEmpty(state.labelSnippets.active.label.name)) {
  // if (_.isObject(state.labelSnippets.active.label) && !_.isEmpty(state.labelSnippets.active.label.name)) {
    localStorage.setItem('labels_active', JSON.stringify(state.labelSnippets.active.label))
    state.labels.active = state.labelSnippets.active.label
    state.labelSnippets.editTitle = state.labelSnippets.active.title
    state.labelSnippets.editLabelName = state.labelSnippets.active.label.name
  }
}

export default new Vuex.Store({
  // strict: true,
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
    ready: false
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

    setItems(state, {items, entity}) {
      state[entity].items = items
    },

    setActive(state, {data, entity}) {
      localStorage.setItem(entity + '_active', JSON.stringify(data))
      state[entity].active = data

      if (entity === 'labels') {
        set_active_label(state, data)
      }

      if (entity === 'labelSnippets') {
        set_active_label_snippet(state)
      }
    },

    setSnippetMode(state, mode) {
      state.labelSnippets.mode = mode
    },

    setLanguages(state, languages) {
      state.languages = languages
    },

    setReadyFlag(state, flag) {
      state.ready = flag
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
    setActiveFromStorage({commit, state}, default_snippet) {
      // set active values from local storage
      // TODO: local values should be checked to be valid
      // search them in available snippets
      let local_active = {
        labels: localStorage.getItem('labels_active'),
        labelSnippets: localStorage.getItem('label_snippets_active'),
      }
      _.forEach(local_active, (v, k) => {
        if (v && !_.isEmpty(v) && _.isEmpty(state[k].active)) {
          let local_value = JSON.parse(v)
          if (k === 'labelSnippets') {
            if (!_.isEqual(local_value, default_snippet)) {
              commit('setSnippetMode', 'show')
              commit('setActive', {data: local_value, entity: 'labelSnippets'})
            }
          }
          else {
            commit('setActive', {data: local_value, entity: 'labels'})
          }
        }
      })
    },

    setData({commit, state, getters}, data) {
      let snippets      = _.sortBy(data.snippets, ['title'])
      let labels        = []
      let labelSnippets = []

      // set snippets
      commit('setSnippets', data.snippets)

      // set labels
      snippets.forEach(snippet => {
        if (!_.isEmpty(snippet.label.name)) {
          labels.push(snippet.label)
        }
      })
      if (labels.length) {
        labels = _.uniqBy(labels, 'id')
        labels = _.sortBy(labels, ['name'])
        labels.push({
          id: 0,
          name: 'untagged',
          snippets_count: getters.untagged.length
        })
        commit('setItems', {items: labels, entity: 'labels'})
      }
      else {
        commit('setItems', {items: [], entity: 'labels'})
      }

      // set label snippets
      if (_.isEmpty(state.labels.active)) {
        labelSnippets = snippets
      }
      else {
        labelSnippets = snippets_builder.methods.computeLabelSnippets(this, snippets)

        // reset active label if snippets with such label not exists and label isn't untagged
        if (_.isEmpty(labelSnippets) && !(state.labels.active.hasOwnProperty('id') && state.labels.active.id === 0)) {
          labelSnippets = snippets
          commit('setActive', {data: { name: ''}, entity: 'labels'})
        }
      }
      commit('setItems', {items: labelSnippets, entity: 'labelSnippets'})

      // set languages
      if (_.isEmpty(state.languages)) {
        commit('setLanguages', data.languages)
      }

      // mark data as loaded
      if (!state.ready) {
        commit('setReadyFlag', true);
      }
    }
  }
})
