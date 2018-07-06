<template>

  <card id="snippet-form" class="animated">
    <header class="card-header" slot="card-header">
      <p class="card-header-title" v-html="title"></p>
    </header>

    <div class="card-content" slot="card-content">
      <form action="/" @submit="submitAction">
        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field">
              <div class="control is-expanded">
                <input id="title" class="input" type="text" placeholder="Title" v-model="editSnippetTitle">
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
            <textarea class="file textarea" placeholder="Paste a snippet of code">{{ snippet.content }}</textarea>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field">
              <div class="control is-expanded">
                <input id="snippet-labels" class="input" type="text" placeholder="Label" v-model="editSnippetLabel">
              </div>
            </div>
          </div>
        </div>

        <div class="field is-grouped form-footer">
          <div class="control">
            <button class="button is-primary" @click="submitAction">{{ action | capitalize}}</button>
          </div>
          <div class="control">
            <button class="button is-text" @click="cancelAction">Cancel</button>
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
  import { processEditorMode } from '../../utils/editor_helper'

  export default {
    props: ['title', 'action'],

    components: {Card},

    mixins: [Editor, Filters],

    data() {
      return {
        editor: null
      }
    },

    computed: {
      editSnippetTitle: {
        get() {
          return this.$store.state.labelSnippets.edit.title
        },

        set(value) {
          this.$store.commit('setLabelSnippetEditTitle', value)
        }
      },

      editSnippetLanguage: {
        get() {
          return this.$store.state.labelSnippets.edit.language
        },

        set(value) {
          this.$store.commit('setLabelSnippetEditLanguage', value)
          this.editor.setOption('mode', processEditorMode(value))
        }
      },

      editSnippetTabs: {
        get() {
          return this.$store.state.labelSnippets.edit.tabs
        },

        set(value) {
          this.$store.commit('setLabelSnippetEditTabs', value)
          this.editor.setOption('tabSize', value)
        }
      },

      editSnippetLabel: {
        get() {
          return this.$store.state.labelSnippets.edit.label
        },

        set(value) {
          this.$store.commit('setLabelSnippetEditLabel', value)
        }
      },

      snippet() {
        return this.$store.state.labelSnippets.active
      }
    },

    methods: {
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
