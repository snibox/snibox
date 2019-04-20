<template>

  <card id="snippet-form" class="animated">
    <header class="card-header" slot="card-header">
      <p class="card-header-title no-wrap" v-html="title"></p>
    </header>

    <div class="card-content" slot="card-content">
      <form action="/" @submit="submitAction">
        <div class="field is-horizontal">
          <div class="editor no-height no-border">
            <textarea name="description" class="file textarea" placeholder="What is your snippet about?" v-model="editSnippetDescription">{{ snippet.description }}</textarea>
          </div>
        </div>

        <div
          class="field"
          v-for="(snippetFile, index) in snippetFiles"
        >
          <snippet-file-form
            :index="index"
            :title="snippetFile.title || 'New snippet file'"
          />

          <div class="control center">
            <button class="button is-primary" @click="addFile($store.state.snippets.indexOf(snippet), $event)">Add snippet file</button>
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
  import SnippetFileForm from '../snippet_file/Form.vue'
  import CodeMirror from 'codemirror'
  import 'codemirror/addon/display/placeholder'
  import '../../utils/codemirror_modes'
  import Editor from '../../mixins/editor'
  import Filters from '../../mixins/filters'
  import { processEditorMode } from '../../utils/editor_helper'

  export default {
    props: ['title', 'action'],

    components: {Card, SnippetFileForm},

    mixins: [Editor, Filters],

    data() {
      return {
        editor: null
      }
    },

    computed: {
      editSnippetDescription: {
        get() {
          return this.snippet.description
        },

        set(value) {
          this.$store.commit('setSnippetDescription', value)
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
      },

      snippetFiles() {
        return this.snippet.snippet_files
      }
    },

    methods: {
      addFile(snippetIndex, e) {
        e.preventDefault();
        this.$store.commit('addSnippetFile', snippetIndex)
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
      // this.editor = CodeMirror.fromTextArea(this.$el.querySelector('.file'), {
      //   lineNumbers: true,
      //   mode: processEditorMode(this.$store.state.labelSnippets.edit.language),
      //   tabSize: this.$store.state.labelSnippets.active.tabs
      // })

      // set focus on title textfield
      setTimeout(() => {
        this.$el.querySelector('input[type=text]').focus()
      }, 100)
    }
  }
</script>
