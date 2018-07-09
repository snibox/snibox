<template>

  <card id="show-snippet" class="animated">
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
      <div class="markdown-body" v-if="isMarkdown">
        <vue-markdown lang-prefix='' :source="snippet.content"></vue-markdown>
      </div>
      <div class="code-body" v-else>
        <pre :style="{'tab-size': snippet.tabs}" class="is-paddingless" v-highlightjs="snippet.content" v-if="snippet.id"><code id="code" :class="hljsClass"></code></pre>
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
    name: 'snippet-show',

    components: {Card, Icon, VueMarkdown},

    data() {
      return {
        clipboard: null
      }
    },

    mounted() {
      HighlighterHelper.highlightCodeBlocks(this)

      this.clipboard = new Clipboard('#snippet-copy')

      this.clipboard.on('success', e => {
        Notifications.toast.success('Copied!')
      }).on('error', e => {
        Notifications.toast.error('Unable to copy snippet.')
      })
    },

    updated() {
      HighlighterHelper.highlightCodeBlocks(this)
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

      hljsClass() {
        return HighlighterHelper.processHljsMode(this.snippet.language)
      }
    },

    methods: {
      editSnippet(e) {
        e.preventDefault()
        this.$store.commit('setSnippetMode', 'edit')
      },

      destroySnippet() {
        Notifications.confirm(
            "Are you really want to delete snippet " +
            "<span class='has-text-weight-bold is-italic'>" +
            this.$store.state.labelSnippets.active.title +
            "</span>?",
            result => {
              if (result.value) {
                Backend.snippet.destroy(this)
              }
            })
      }
    }
  }
</script>
