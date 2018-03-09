// TODO: refactor mixins import (factory)

import Vue from 'vue/dist/vue.esm'
import Vuex from 'vuex'
import _ from 'lodash'
import factory from '../mixins/factory'
import snippets_builder from '../mixins/snippets_builder'

Vue.use(Vuex)

let set_active_label = (state, data) => {
  let snippet = factory.methods.factory().snippet
  localStorage.setItem('label_snippets_active', JSON.stringify(snippet))
  state.label_snippets.active = snippet
  state.label_snippets.active.tag_list = data.name
  state.label_snippets.mode = 'create'
}

let set_active_label_snippet = (state) => {
  if (_.isArray(state.label_snippets.active.tags) && state.label_snippets.active.tags.length) {
    localStorage.setItem('labels_active', JSON.stringify(_.head(state.label_snippets.active.tags)))
    state.labels.active = _.head(state.label_snippets.active.tags)
  }
}

export default new Vuex.Store({
  state: {
    snippets: [],
    labels: {
      items: [],
      active: {}
    },
    label_snippets: {
      items: [],
      active: {},
      mode: ''
    },
    languages: {},
    ready: false
  },

  mutations: {
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

      if (entity === 'label_snippets') {
        set_active_label_snippet(state)
      }
    },

    setSnippetMode(state, mode) {
      state.label_snippets.mode = mode
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

    label_snippets: state => {
      return state.label_snippets.items
    },

    untagged: state => {
      return _.filter(state.snippets, v => {
        return _.isEmpty(v.tags)
      })
    }
  },

  actions: {
    setActiveFromStorage({state}, default_snippet) {
      // set active values from local storage
      // TODO: local values should be cheked for valid
      // search them in available snippets
      let local_active = {
        labels: localStorage.getItem('labels_active'),
        label_snippets: localStorage.getItem('label_snippets_active'),
      }
      _.forEach(local_active, (v, k) => {
        if (v && !_.isEmpty(v) && _.isEmpty(state[k].active)) {
          let local_value = JSON.parse(v)
          if (k === 'label_snippets') {
            if (!_.isEqual(local_value, default_snippet)) {
              state.label_snippets.mode = 'show'
              state[k].active           = local_value
            }
          }
          else {
            state[k].active = local_value
          }
        }
      })
    },

    hello() {
      console.log('hello!')
    },

    setData({commit, state, getters}, data) {
      let snippets       = _.sortBy(data.snippets, ['title'])
      let labels         = []
      let label_snippets = []

      // set snippets
      commit('setSnippets', data.snippets)

      // set labels
      snippets.forEach(snippet => {
        snippet.tags.forEach(tag => {
          labels.push(tag)
        })
      })
      if (labels.length) {
        labels = _.uniqBy(labels, 'id')
        labels = _.sortBy(labels, ['name'])
        labels.push({
          id: 0,
          name: 'untagged',
          taggings_count: getters.untagged.length
        })
        commit('setItems', {items: labels, entity: 'labels'})
      }
      else {
        commit('setItems', {items: [], entity: 'labels'})
      }

      // set label snippets
      if (_.isEmpty(state.labels.active)) {
        label_snippets = snippets
      }
      else {
        label_snippets = snippets_builder.methods.compute_label_snippets(this, snippets)

        // reset active label if snippets with such label not exists and label isn't untagged
        if (_.isEmpty(label_snippets) && !(state.labels.active.hasOwnProperty('id') && state.labels.active.id === 0)) {
          label_snippets = snippets
          commit('setActive', {data: {}, entity: 'labels'})
        }
      }
      commit('setItems', {items: label_snippets, entity: 'label_snippets'})

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
