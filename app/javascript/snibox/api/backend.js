// TODO: rethink backend.js
// TODO: move errors notifications from <br/> to lists

import _ from 'lodash'
import axios from 'axios'
// import factory from '../mixins/factory'

class BackendService {
  constructor(component = null, options) {
    this.component = component
    this.options   = options
  }

  // create or update
  save(callback = null) {
    let error_message = this.options.messages.error
    axios[this.options.method](this.options.path, this.options.data)
      .then(
        response => {
          if (response.data.completed) {
            this.updateState()
            this.component.$toasted.success(this.options.messages.success)
            if (_.isFunction(callback)) {
              callback(response)
            }
          }
          else {
            // render error notification from api
            if (response.data.hasOwnProperty('errors')) {
              error_message += '<br/><br/>'
              response.data.errors.forEach(error => {
                error_message = error_message + error + '.<br/>'
              })
            }
            this.component.$toasted.error(error_message, {duration: 6000})
          }
        })
      .catch(error => {
        console.log(error)
        this.component.$toasted.error(error_message, {duration: 6000})
      })
  }

  destroy(callback = null) {
    axios.delete(this.options.path)
      .then(response => {
        this.updateState()
        this.component.$toasted.success(this.options.messages.success)
        if (_.isFunction(callback)) {
          callback(response)
        }
      })
      .catch(error => {
        console.log(error)
        this.component.$toasted.error(this.options.messages.error, {duration: 6000})
      })
  }

  updateState() {
    axios.get('/api/v1/data/default-state')
      .then(response => {
        this.component.$store.dispatch('setData', response.data)
      })
      .catch(error => {
        console.log(error)
        this.component.$toasted.error('Unable to update application state.', {duration: 6000})
      })
  }
}

class SnippetService extends BackendService {
  save() {
    this.options.data = {
      snippet: {
        id: this.component.snippet.id,
        title: this.component.snippet.title,
        content: this.component.editor.getValue(),
        language: this.component.snippet.language,
        tabs: this.component.snippet.tabs,
        label_attributes: this.component.snippet.label
      }
    }
    super.save(response => {
      // show saved snippet
      this.component.$store.commit('setActive', {data: response.data.entity, entity: 'label_snippets'})
      this.component.$store.commit('setSnippetMode', 'show')
    })
  }

  destroy() {
    super.destroy(response => {
      // release snippet area
      this.component.$store.commit('setSnippetMode', 'show')
      // this.component.$store.commit('setActive', {data: factory.methods.factory().snippet, entity: 'label_snippets'})
    })
  }
}


class LabelService extends BackendService {
  save() {
    this.options.data = {
      label: {
        name: this.component.label.name
      }
    }
    super.save()
  }
}


export default {
  snippet: {
    create(component) {
      let options = {
        path: '/api/v1/snippets',
        method: 'post',
        messages: {
          success: 'Snippet created!',
          error: 'Unable to create snippet.'
        }
      }
      new SnippetService(component, options).save()
    },

    update(component) {
      let options = {
        path: '/api/v1/snippets/:id'.replace(':id', component.snippet.id),
        method: 'patch',
        messages: {
          success: 'Snippet updated!',
          error: 'Unable to update snippet.'
        }
      }
      new SnippetService(component, options).save()
    },

    destroy(component) {
      let options = {
        path: '/api/v1/snippets/:id'.replace(':id', component.snippet.id),
        messages: {
          success: 'Snippet removed!',
          error: 'Unable to delete snippet.'
        }
      }

      new SnippetService(component, options).destroy()
    }
  },

  label: {
    update(component) {
      let options = {
        path: '/api/v1/labels/' + component.label.id,
        method: 'patch',
        messages: {
          success: 'Label updated!',
          error: 'Unable to update label.'
        }
      }
      new LabelService(component, options).save()
    }
  },

  data: {
    get(link, callback) {
      axios.get(link)
        .then(response => {
          if (_.isFunction(callback)) {
            callback(response)
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
