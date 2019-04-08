<template>

  <card :id="`show-snippet-${index}`" class="animated">
    <header class="card-header" slot="card-header">
      <div class="flex-container" :class="{ 'with-markdown': isMarkdown }">
        <div class="card-header-title with-text-overflow">
          {{ snippetFile.id ? snippetFile.title : 'Select snippet'}}
        </div>
        <div class="card-header-title" v-if="snippetFile.id">
          <div class="field" :class="{ 'has-addons': !isMarkdown }">
            <p class="control">
              <a :id="`snippet-raw-${index}`" class="button is-outlined is-small" :href="linkRaw"
                 target="_blank"><span>Raw</span></a>
            </p>
            <p class="control" v-if="!isMarkdown">
              <a :id="`snippet-copy-${index}`" class="button is-outlined is-small" :data-clipboard-target="`#code-${index}`">
                <icon class="icon-clippy" type="clippy"></icon>
                <span>Copy</span></a>
            </p>
          </div>
        </div>
      </div>
      <div class="card-header-icon" v-if="snippetFile.id">
        <a
          :id="`snippet-delete-${index}`"
          class="button is-outlined is-small is-danger"
          :disabled="this.snippet.snippet_files.length === 1"
          @click="destroySnippet"
        >
          <icon type="trashcan"></icon>
          <span>Delete</span>
        </a>
      </div>
    </header>

    <div class="card-content" slot="card-content">
      <div class="markdown-body" v-if="isMarkdown">
        <vue-markdown lang-prefix='' :source="snippetFile.content"></vue-markdown>
      </div>
      <div class="code-body" v-else>
        <pre :style="{'tab-size': snippetFile.tabs}" class="is-paddingless" v-highlightjs="snippetFile.content" v-if="snippetFile.id"><code :id="`code-${index}`" :class="hljsClass"></code></pre>
        <p v-else>Nothing to show. Select a snippet to view or create the new one!</p>
      </div>
    </div>

  </card>

</template>

<script>
  import Backend from '../../api/backend'
  import Card from '../Card.vue'
  import Clipboard from 'clipboard'
  import * as HighlighterHelper from '../../utils/highlighter_helper'
  import Icon from '../Icon.vue'
  import Notifications from '../../utils/notifications'
  import VueMarkdown from 'vue-markdown'

  export default {
    name: 'snippet-file-show',

    props: ['index'],

    components: {Card, Icon, VueMarkdown},

    data() {
      return {
        clipboard: null
      }
    },

    mounted() {
      HighlighterHelper.highlightMarkdownCodeBlocks(this)

      this.clipboard = new Clipboard('#snippet-copy')

      this.clipboard.on('success', e => {
        Notifications.toast.success('Copied!')
      }).on('error', e => {
        Notifications.toast.error('Unable to copy snippet.')
      })
    },

    updated() {
      HighlighterHelper.highlightMarkdownCodeBlocks(this)
    },

    beforeDestroy() {
      this.clipboard.destroy()
    },

    computed: {
      linkRaw() {
        return '/api/v1/snippets/' + this.snippet.id + '/raw/' + this.snippetFile.id
      },

      snippet() {
        return this.$store.state.labelSnippets.active
      },

      snippetFile() {
        return this.$store.state.labelSnippets.active.snippet_files[this.index]
      },

      isMarkdown() {
        return _.isEqual(this.$store.state.labelSnippets.active.language, 'markdown')
      },

      hljsClass() {
        return HighlighterHelper.processHljsMode(this.snippetFile.language)
      }
    },

    methods: {
      destroySnippet() {
        if (this.snippet.snippet_files.length === 1) {
          return;
        }

        Notifications.confirm(
            "Are you really sure you want to delete snippet file " +
            "<span class='has-text-weight-bold is-italic'>" +
            this.snippetFile.title +
            "</span>?",
            result => {
              if (result.value) {
                Backend.snippet.destroy_snippet_file(this, this.snippetFile.id)
              }
            })
      }
    }
  }
</script>
