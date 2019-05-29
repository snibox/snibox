<template>

  <form action="/" @submit="submitAction">
    <card :id="`snippet-file-form-${index}`" class="animated">
      <header class="card-header" slot="card-header" style="justify-content: space-between">
        <div style="display: flex;">
          <collapsible-controls
              :index="index"
              :id="`#snippet-file-form-${index}`"
          />
          <div class="field has-addons is-marginless" style="align-items: center">
            <div class="control is-expanded">
              <input :id="`title-${index}`" class="input" type="text" placeholder="File title"
                     v-model="editFileTitle">
            </div>
            <div class="control">
              <a
                  :id="`snippet-delete-${index}`"
                  class="button is-danger is-outlined"
                  :disabled="this.snippet.snippetFiles.length === 1"
                  @click="destroyFile(index, $event)">
                <icon type="trashcan"></icon>
              </a>
            </div>
          </div>
        </div>

        <div class="card-header-icon">
          <div class="field is-grouped is-grouped-right is-marginless" style="align-items: center;">
            <div class="control">
              <div class="select">
                <select v-model="editFileLanguage">
                  <option v-for="(v, k) in languageOptions" :value="k">{{ v }}</option>
                </select>
              </div>
            </div>
            <div class="control">
              <div class="select">
                <select v-model="editFileTabs">
                  <option v-for="(v, k) in tabOptions" :value="k">{{ v }}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- TODO: check _card.scss -->
      <div class="card-content is-paddingless" slot="card-content"
           style="box-shadow: 0 0 1px 1px rgba(10, 10, 10, .1);">
        <div class="field">
          <div class="editor" :style="{maxHeight: editorHeight}" style="border: none;">
            <textarea class="file textarea" placeholder="Paste a snippet of code">{{ snippetFile.content }}</textarea>
          </div>
        </div>

      </div>
    </card>
  </form>

</template>

<script>
  import Backend from '../../api/backend'
  import Card from '../Card.vue'
  import CodeMirror from 'codemirror'
  import 'codemirror/addon/display/placeholder'
  import CollapsibleControls from '../CollapsibleControls.vue'
  import '../../utils/codemirror_modes'
  import Editor from '../../mixins/editor'
  import Filters from '../../mixins/filters'
  import Icon from '../Icon.vue'
  import { processEditorMode } from '../../utils/editor_helper'
  import Notifications from '../../utils/notifications'

  export default {
    props: ['title', 'action', 'index'],

    components: {Card, CollapsibleControls, Icon, Notifications},

    mixins: [Editor, Filters],

    data() {
      return {
        editor: null
      }
    },

    computed: {
      editFileTitle: {
        get() {
          return this.snippetFile.title
        },

        set(value) {
          let index = this.index
          this.$store.commit('setLabelSnippetEditFileTitle', {index, value})
        }
      },

      editFileLanguage: {
        get() {
          return this.snippetFile.language
        },

        set(value) {
          let index = this.index
          this.$store.commit('setLabelSnippetEditFileLanguage', {index, value})
          this.editor.setOption('mode', processEditorMode(value))
        }
      },

      editFileTabs: {
        get() {
          return this.snippetFile.tabs
        },

        set(value) {
          let index = this.index
          this.$store.commit('setLabelSnippetEditFileTabs', {index, value})
          this.editor.setOption('tabSize', value)
        }
      },

      snippet() {
        return this.$store.state.labelSnippets.edit
      },

      snippetFile() {
        return this.snippet.snippetFiles[this.index]
      }
    },

    methods: {
      destroyFile(snippetIndex, e) {
        e.preventDefault()

        if (this.snippet.snippetFiles.length > 1) {
          Notifications.confirm(
              'Are you really sure you want to delete snippet file ' +
              '<span class=\'has-text-weight-bold is-italic\'>' +
              this.snippet.snippetFiles[snippetIndex].title +
              '</span>?',
              result => {
                if (result.value) {
                  if (typeof this.snippet.snippetFiles[snippetIndex].id !== 'undefined') {
                    Backend.snippet.destroySnippetFile(this, this.snippet.snippetFiles[snippetIndex].id)
                  } else {
                    this.$store.commit('removeSnippetFile', snippetIndex)
                  }
                }
              })

        }
      },

      submitAction(e) {
        e.preventDefault()
        Backend.snippet[this.action](this)
      },

      cancelAction(e) {
        e.preventDefault()
        if (this.$store.state.snippets.mode === 'create') {
          this.$store.commit('setSnippetMode', null)
        } else {
          this.$store.commit('setSnippetMode', 'show')
        }
      },
    },

    mounted() {
      // init codemirror
      this.editor = CodeMirror.fromTextArea(this.$el.querySelector('.file'), {
        lineNumbers: true,
        mode:        processEditorMode(this.snippetFile.language),
        tabSize:     this.snippetFile.language.tabs
      })

      // set focus on title textfield
      setTimeout(() => {
        this.$el.querySelector('input[type=text]').focus()
      }, 100)

      // TODO: replace scrollIntoView to something where smooth is compatible with all browsers
      if (this.$store.state.flags.scrollToLatestFile) {
        this.$store.commit('setScrollToLatestFileFlag', false)
        setTimeout(() => {
          if (this.index) {
            let el = document.getElementById(`snippet-file-form-${this.index}`)
            if (el) {
              el.scrollIntoView({behavior: 'smooth'})
            }
          }
        }, 200)
      }
    }
  }
</script>
