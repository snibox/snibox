import _ from 'lodash'
import Factory from '../mixins/factory'
import SnippetsBuilder from '../mixins/snippets_builder'

export default {
  localStorage: {
    setDefault: (commit) => {
      if (typeof localStorage.getItem('labels_active') === 'undefined') {
        var localstorage_label = {};
      } else {
        var localstorage_label = localStorage.getItem('labels_active')
      }
      // We use _ (lodash) to convert underscore_case to camelCase
      let localActive = {
        labels: JSON.parse(localstorage_label),
        labelSnippets: _.mapKeys(JSON.parse(localStorage.getItem('label_snippets_active')) || {}, (v, k) => _.camelCase(k)),
      }
      if (_.isEmpty(localActive.labels)) {
        commit('setRenderAllSnippetsFlag', true)
      }
      else {
        commit('setActiveLabel', localActive.labels)
        let snippet = Factory.methods.factory().snippet
        snippet.labels = localActive.labels
        if (localActive.labelSnippets.id) {
          commit('setActiveLabelSnippet', localActive.labelSnippets)
          commit('setSnippetMode', 'show')
        }
        else {
          commit('setActiveLabelSnippet', snippet)
          commit('setSnippetMode', 'create')
        }
      }
    }
  },

  data: {
    setSnippets: (commit, data) => {
      commit('setSnippets', _.sortBy(data.snippets, ['title']))
    },

    setLabels: ({commit, getters}, data) => {
      let labels = []

      data.snippets.forEach(snippet => {
        snippet.labels.forEach(label => {
          if (!_.isNull(label.id)) {
            labels.push(label)
          }
        })
      })

      if (labels.length) {
        labels = _.uniqBy(labels, 'id')
        labels = _.sortBy(labels, ['name'])
        labels.push({
          id: null,
          name: '',
          snippets_count: getters.untagged.length
        })
        commit('setLabels', labels)
      }
      else {
        commit('setLabels', [])
      }
    },

    setLabelSnippets: ({commit, state}, store) => {
      let labelSnippets = state.flags.renderAllSnippets ? state.snippets :
          SnippetsBuilder.methods.computeLabelSnippets(store, state.snippets)
      commit('setLabelSnippets', labelSnippets)
    },

    setLanguages: ({commit, state}, data) => {
      if (_.isEmpty(state.languages)) {
        commit('setLanguages', data.languages)
      }
    }
  },

  // TODO: refactor active helpers
  active: {
    setLabel: (state, label) => {
      let snippet = Factory.methods.factory().snippet
      localStorage.setItem('label_snippets_active', JSON.stringify(snippet))
      state.labels.edit.name = label.name
      state.labelSnippets.active = snippet
      state.labelSnippets.mode = 'create'

      // TODO: grab these values from snippet
      state.labelSnippets.edit.title = ''
      state.labelSnippets.edit.description = ''
      state.labelSnippets.edit.label = label.name
      state.labelSnippets.edit.snippetFiles = [{
        title: '',
        content: '',
        language: 'automatically',
        tabs: 4,
      }]

      state.flags.renderAllSnippets = false
    },

    setLabelSnippet: (state) => {
      // ignore active label update for initial and new snippets states
      // if (!state.flags.renderAllSnippets && !_.some(state.labelSnippets.active.labels, {id: -1})) {
      //   localStorage.setItem('labels_active', JSON.stringify(state.labelSnippets.active.label))
      //   state.labels.active = state.labelSnippets.active.label
      // }

      // for the case if current active label has been destroyed by snippet reset state to default
      if (_.some(state.labelSnippets.active.labels, {id: -1})) {
        if (!_.find(state.labels.items, {id: state.labels.active.id})) {
          localStorage.removeItem('labels_active')
          state.labels.active = {}
          state.flags.renderAllSnippets = true
        }
      }
    }
  },

  edit: {
    createEditableSnippetCopy: (state) => {
      // state.labelSnippets.edit = Object.assign({}, state.labelSnippets.active)
      // https://scotch.io/bar-talk/copying-objects-in-javascript#toc-deep-copying-objects
      state.labelSnippets.edit = JSON.parse(JSON.stringify(state.labelSnippets.active))
      if (state.labelSnippets.edit.id !== null ) {
        let labels = [];
        state.labelSnippets.active.labels.forEach(function(label) {
          labels.push(label.name)
        });
        state.labelSnippets.edit.label = labels
      } else {
        state.labelSnippets.edit.label = ''
      }
    }
  }
}
