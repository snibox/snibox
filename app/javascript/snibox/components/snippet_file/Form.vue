<template>

  <card :id="`snippet-file-form-${index}`" class="animated">
    <header class="card-header" slot="card-header">
      <p class="card-header-title" v-html="title"></p>
      <div class="card-header-icon">
        <a
          :id="`snippet-delete-${index}`"
          class="button is-outlined is-small is-danger"
          :disabled="this.snippet.snippet_files.length === 1"
          @click="destroySnippet(index, $event)">
          <icon type="trashcan"></icon>
          <span>Delete</span>
        </a>
      </div>
    </header>

    <div class="card-content" slot="card-content">
      <form action="/" @submit="submitAction">
        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field">
              <div class="control is-expanded">
                <input :id="`title-${index}`" class="input" type="text" placeholder="Title" v-model="editSnippetTitle">
              </div>
            </div>
            <div class="field is-grouped is-grouped-right">
              <div class="control">
                <div class="select">
                  <select v-model="editSnippetLanguage">
                    <option v-for="(v, k) in language_options" :value="k">{{ v }}</option>
                  </select>
                </div>
              </div>
              <div class="control">
                <div class="select">
                  <select v-model="editSnippetTabs">
                    <option v-for="(v, k) in tab_options" :value="k">{{ v }}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="field">
          <div class="editor" :style="{maxHeight: editorHeight}">
            <textarea class="file textarea" placeholder="Paste a snippet of code">{{ snippetFile.content }}</textarea>
          </div>
        </div>

      </form>
    </div>
  </card>

</template>

<script>
  import Backend from '../../api/backend'
  import Card from '../Card.vue'
  import CodeMirror from 'codemirror'
  import 'codemirror/addon/display/placeholder'
  import '../../utils/codemirror_modes'
  import Editor from '../../mixins/editor'
  import Filters from '../../mixins/filters'
  import Icon from '../Icon.vue'
  import { processEditorMode } from '../../utils/editor_helper'

  export default {
    props: ['title', 'action', 'index'],

    components: {Card, Icon},

    mixins: [Editor, Filters],

    data() {
      return {
        editor: null
      }
    },

    computed: {
      editSnippetTitle: {
        get() {
          return this.snippetFile.title
        },

        set(value) {
          let index = this.index
          this.$store.commit('setLabelSnippetEditTitle', {index, value})
        }
      },

      editSnippetLanguage: {
        get() {
          return this.snippetFile.language
        },

        set(value) {
          let index = this.index
          this.$store.commit('setLabelSnippetEditLanguage', {index, value})
          this.editor.setOption('mode', processEditorMode(value))
        }
      },

      editSnippetTabs: {
        get() {
          return this.snippetFile.tabs
        },

        set(value) {
          let index = this.index
          this.$store.commit('setLabelSnippetEditTabs', {index, value})
          this.editor.setOption('tabSize', value)
        }
      },

      snippet() {
        return this.$store.state.labelSnippets.active
      },

      snippetFile() {
        return this.snippet.snippet_files[this.index]
      }
    },

    methods: {
      destroySnippet(snippetIndex, e) {
        e.preventDefault();

        if (this.snippet.snippet_files.length > 1) {
          this.$store.commit('removeSnippetFile', snippetIndex)
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
        }
        else {
          this.$store.commit('setSnippetMode', 'show')
        }
      },
    },

    mounted() {
      // init codemirror
      this.editor = CodeMirror.fromTextArea(this.$el.querySelector('.file'), {
        lineNumbers: true,
        mode: processEditorMode(this.$store.state.labelSnippets.edit.language),
        tabSize: this.$store.state.labelSnippets.active.tabs
      })

      // set focus on title textfield
      setTimeout(() => {
        this.$el.querySelector('input[type=text]').focus()
      }, 100)
    }
  }
</script>
