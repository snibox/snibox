import _ from 'lodash'
import axios from 'axios'
import Factory from '../mixins/factory'
import Notifications from '../utils/notifications'

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
            this.updateState(callback, response)
          }
          else {
            // render error notification from api
            if (response.data.hasOwnProperty('errors')) {
              error_message += '<hr/>'
              response.data.errors.forEach(error => {
                error_message = error_message + error + '.<br/>'
              })
            }
            Notifications.toast.error(error_message)
          }
        })
      .catch(error => {
        console.log(error)
        Notifications.toast.error(error_message)
      })
  }

  destroy(callback = null) {
    axios.delete(this.options.path)
      .then(response => {
        this.updateState(callback, response)
      })
      .catch(error => {
        console.log(error)
        Notifications.toast.error(this.options.messages.error)
      })
  }

  updateState(callback = null, data) {
    axios.get('/api/v1/data/default-state')
      .then(response => {
        this.component.$store.dispatch('setData', response.data)
        if (_.isFunction(callback)) {
          callback(data)
        }
        this.component.$store.dispatch('setDefaultActiveEntities')
        Notifications.toast.success(this.options.messages.success)
      })
      .catch(error => {
        console.log(error)
        Notifications.toast.error('Unable to update application state.')
      })
  }
}

class SnippetService extends BackendService {
  save() {
    let snippetFilesAttributes = []
    this.component.$store.state.labelSnippets.active.snippetFiles.forEach((snippetFile, index) => {
      snippetFilesAttributes.push({
        id: snippetFile.id || null,
        title: snippetFile.title,
        content: this.component.$children[0].$children[index].editor.getValue(),
        language: snippetFile.language,
        tabs: snippetFile.tabs,
      })
    })

    this.options.data = {
      snippet: {
        id: this.component.snippet.id,
        title: this.component.snippet.title,
        description: this.component.snippet.description,
        snippet_files_attributes: snippetFilesAttributes,
        label_attributes: {
          name: this.component.$store.state.labelSnippets.edit.label
        }
      }
    }
    super.save(response => {
      this.component.$store.commit('setActiveLabelSnippet', response.data.entity)
    })
  }

  destroy() {
    super.destroy(response => {
      this.component.$store.commit('setActiveLabelSnippet', Factory.methods.factory().snippet)
    })
  }

  destroySnippetFile() {
    super.destroy(response => {
      this.component.$store.commit('setActiveLabelSnippet', response.data.entity)
    })
  }
}


class LabelService extends BackendService {
  save() {
    this.options.data = {
      label: {
        name: this.component.$store.state.labels.edit.name
      }
    }
    super.save(response => {
      this.component.$store.commit('setActiveLabel', response.data.entity)
      this.component.showLabelEdit = false
    })
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
    },

    destroySnippetFile(component, snippet_file_id) {
      let options = {
        path: '/api/v1/snippets/:id/destroy/:snippet_file'.replace(':id', component.snippet.id).replace(':snippet_file', snippet_file_id),
        messages: {
          success: 'Snippet file removed!',
          error: 'Unable to delete snippet file.'
        }
      }

      new SnippetService(component, options).destroySnippetFile()
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
