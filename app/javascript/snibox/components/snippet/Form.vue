<template>

  <card id="snippet-form" class="animated fadeInDown">
    <header class="card-header" slot="card-header">
      <p class="card-header-title">{{ title }}</p>
    </header>

    <div class="card-content" slot="card-content">
      <form action="/" @submit="submitAction">
        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field">
              <div class="control is-expanded">
                <input id="title" class="input" type="text" placeholder="Title" v-model.lazy="snippet.title">
              </div>
            </div>
            <div class="field is-grouped is-grouped-right">
              <div class="control">
                <div class="select">
                  <select v-model="snippet.language" @change="changeLanguage">
                    <option v-for="(v, k) in language_options" :value="k">{{ v }}</option>
                  </select>
                </div>
              </div>
              <div class="control">
                <div class="select">
                  <select v-model="snippet.tabs">
                    <option v-for="(v, k) in tab_options" :value="k">{{ v }}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="field">
          <div class="editor">
            <textarea class="file textarea" placeholder="Paste a snippet of code">{{ snippet.content }}</textarea>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field">
              <div class="control is-expanded">
                <input id="snippet-labels" class="input" type="text"
                       placeholder="Label"
                       v-model="snippet.tag_list">
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
  import Card from '../Card.vue'
  import CodeMirror from 'codemirror'
  import 'codemirror/addon/display/placeholder'
  import Editor from '../../mixins/editor'
  import backend from '../../api/backend'
  import filters from '../../mixins/filters'

  export default {
    props: ['title', 'action'],

    components: {Card},

    mixins: [Editor, filters],

    data() {
      return {
        editor: null
      }
    },

    computed: {
      snippet() {
        return this.$store.state.label_snippets.active
      }
    },

    methods: {
      submitAction(e) {
        e.preventDefault()
        backend.snippet[this.action](this)
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

      changeLanguage(e) {
        e.preventDefault()
        this.editor.setOption('mode', e.target.value)
      }
    },

    mounted() {
      // init codemirror
      this.editor = CodeMirror.fromTextArea(this.$el.querySelector('.file'), {
        lineNumbers: true
      })
      this.editor.setOption('mode', this.$store.state.label_snippets.active.language)

      // set focus on title textfield
      setTimeout(() => {
        this.$el.querySelector('input[type=text]').focus()
      }, 100)
    }
  }
</script>
