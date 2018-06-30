<template>

  <card id="show-snippet" class="animated fadeInDown">
    <header class="card-header" slot="card-header">
      <div class="flex-container" :class="{ 'with-markdown': isMarkdown }">
        <div class="card-header-title with-text-overflow">
          {{ snippet.id ? snippet.title : 'Select snippet'}}
        </div>
        <div class="card-header-title" v-if="snippet.id">
          <div class="field" :class="{ 'has-addons': !isMarkdown }">
            <p class="control">
              <a id="snippet-raw" class="button is-outlined is-small" :href="linkRaw"
                 target="_blank"><span>Raw</span></a>
            </p>
            <p class="control" v-if="!isMarkdown">
              <a id="snippet-copy" class="button is-outlined is-small" data-clipboard-target="#code">
                <icon class="icon-clippy" type="clippy"></icon>
                <span>Copy</span></a>
            </p>
          </div>
        </div>
      </div>
      <div class="card-header-icon" v-if="snippet.id">
        <a id="snippet-edit" class="button is-outlined is-small" @click="editSnippet">
          <icon type="pencil"></icon>
          <span>Edit</span>
        </a>
        <a id="snippet-delete" class="button is-outlined is-small is-danger" @click="destroySnippet">
          <icon type="trashcan"></icon>
          <span>Delete</span>
        </a>
      </div>
    </header>

    <div class="card-content" slot="card-content">
      <div class='markdown-body' v-if="isMarkdown">
        <vue-markdown :source="snippet.content"></vue-markdown>
      </div>
      <div v-else>
        <pre v-highlightjs="snippet.content" v-if="snippet.id"><code id="code" :class="convertLanguage"></code></pre>
        <p v-else>Nothing to show. Select a snippet to view or create the new one!</p>
      </div>
    </div>

  </card>

</template>

<script>
  import Backend from '../../api/backend'
  import Card from '../Card.vue'
  import Clipboard from 'clipboard'
  import hljs from 'highlight.js'
  import Icon from '../Icon.vue'
  import Swal from 'sweetalert2'
  import Notifications from '../../utils/notifications'
  import VueMarkdown from 'vue-markdown'

  let syncHljsTabs = (component) => {
    hljs.configure({tabReplace: ' '.repeat(component.$store.state.labelSnippets.active.tabs)})
  }

  export default {
    name: 'snippet-show',

    components: {Card, Icon, VueMarkdown},

    data() {
      return {
        clipboard: null,
        languageMatrix: [
          {
            codemirror: 'automatically',
            hljs: ''
          },
          {
            codemirror: 'sass',
            hljs: 'scss'
          },
          {
            codemirror: 'shell',
            hljs: 'bash'
          }
        ]
      }
    },

    beforeMount() {
      syncHljsTabs(this)
    },

    mounted() {
      this.clipboard = new Clipboard('#snippet-copy')

      this.clipboard.on('success', e => {
        Notifications.toast.success('Copied!')
      }).on('error', e => {
        Notifications.toast.error('Unable to copy snippet.')
      })
    },

    beforeUpdate() {
      syncHljsTabs(this)
    },

    beforeDestroy() {
      this.clipboard.destroy()
    },

    computed: {
      linkRaw() {
        return '/api/v1/snippets/' + this.snippet.id + '/raw'
      },

      snippet() {
        return this.$store.state.labelSnippets.active
      },

      isMarkdown() {
        return _.isEqual(this.$store.state.labelSnippets.active.language, 'markdown')
      },

      convertLanguage() {
        let languageRecord = _.find(this.languageMatrix, {codemirror: this.snippet.language})

        if (languageRecord) {
          return languageRecord.hljs
        }

        return this.snippet.language
      }
    },

    methods: {
      editSnippet(e) {
        e.preventDefault()
        this.$store.commit('setSnippetMode', 'edit')
      },

      destroySnippet() {
        Notifications.confirm(
            "Are you really want to remove snippet " + this.$store.state.labelSnippets.active.title + "?",
            result => {
              if (result.value) {
                Backend.snippet.destroy(this)
              }
            })
      }
    }
  }
</script>
