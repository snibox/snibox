<template>

  <card id="snippet-form" class="animated">
    <header class="card-header" slot="card-header">
      <p class="card-header-title no-wrap" v-html="title"></p>
    </header>

    <div class="card-content" slot="card-content">
      <form action="/" @submit="submitAction">
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Title *</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input id="title" name="title" class="input" type="text" v-model="editSnippetTitle">
              </div>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Description</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input name="description" class="input" v-model="editSnippetDescription"/>
              </div>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Labels</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input id="snippet-labels" class="input" type="text" v-model="editSnippetLabel" placeholder="separate labels with a comma, for example :    rails , RUBY   ,RUBY on rails">
              </div>
            </div>
          </div>
        </div>


        <div class="field">
          <div class="field" v-for="(snippetFile, index) in snippetFiles">
            <snippet-file-form :index="index" :title="snippetFile.title || 'New snippet file'"/>
          </div>
        </div>

        <div class="field is-horizontal form-footer" style="justify-content: space-between">
          <div class="control">
            <button class="button is-primary is-outlined" type="button"
                    @click="addFile($store.state.snippets.indexOf(snippet), $event)">
              Add file
            </button>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <button class="button is-primary create-button" type="submit" @click="submitAction">{{ action | capitalize}}</button>
            </div>
            <div class="control">
              <button class="button is-text" type="button" @click="cancelAction">Cancel</button>
            </div>
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
  import 'codemirror/addon/display/placeholder'
  import '../../utils/codemirror_modes'
  import Filters from '../../mixins/filters'

  export default {
    props: ['title', 'action'],

    components: {Card, SnippetFileForm},

    mixins: [Filters],

    computed: {
      editSnippetTitle: {
        get() {
          return this.$store.state.labelSnippets.edit.title
        },

        set(value) {
          this.$store.commit('setLabelSnippetsEditTitle', value)
        }
      },

      editSnippetDescription: {
        get() {
          return this.$store.state.labelSnippets.edit.description
        },

        set(value) {
          this.$store.commit('setLabelSnippetsEditDescription', value)
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
        return this.$store.state.labelSnippets.edit
      },

      snippetFiles() {
        return this.$store.state.labelSnippets.edit.snippetFiles
      }
    },

    methods: {
      addFile(snippetIndex, e) {
        e.preventDefault()

        // TODO: move to action
        this.$store.commit('addSnippetFile', snippetIndex)
        this.$store.commit('setScrollToLatestFileFlag', true)
      },

      submitAction(e) {
        e.preventDefault()
        Backend.snippet[this.action](this)
        this.$store.commit('setSnippetMode', 'show')
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
      // set focus on title textfield
      setTimeout(() => {
        this.$el.querySelector('input[type=text]').focus()
      }, 100)
    }
  }
</script>
