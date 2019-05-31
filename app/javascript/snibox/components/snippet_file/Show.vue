<template>

  <card :id="`show-snippet-${index}`" class="animated">
    <header class="card-header" slot="card-header">
      <collapsible-controls
          :index="index"
          :id="`#show-snippet-${index}`"/>
      <div class="card-header-title with-text-overflow" style="padding-left: 0;">
        {{ snippetFile.id ? snippetFile.title : 'Select snippet'}}
      </div>
      <div class="card-header-title" v-if="snippetFile.id">
        <div class="field" :class="{ 'has-addons': !isMarkdown }">
          <p class="control">
            <a :id="`snippet-raw-${index}`" class="button is-outlined is-small" :href="linkRaw"
               target="_blank"><span>Raw</span></a>
          </p>
          <p class="control" v-if="!isMarkdown">
            <a :id="`snippet-copy-${index}`" class="button is-outlined is-small"
               :data-clipboard-target="`#code-${index}`">
              <icon class="icon-clippy" type="clippy"></icon>
              <span>Copy</span></a>
          </p>
        </div>
      </div>
    </header>

    <div class="card-content" slot="card-content">
      <div class="markdown-body" v-if="isMarkdown">
        <vue-markdown lang-prefix='' :source="snippetFile.content"></vue-markdown>
      </div>
      <div class="code-body" v-else>
        <pre :style="{'tab-size': snippetFile.tabs}" class="is-paddingless" v-highlightjs="snippetFile.content"><code
            :id="`code-${index}`" :class="hljsClass"></code></pre>
      </div>
    </div>

  </card>

</template>

<script>
  import Card from '../Card.vue'
  import ClipboardJS from 'clipboard'
  import CollapsibleControls from '../CollapsibleControls.vue'
  import * as HighlighterHelper from '../../utils/highlighter_helper'
  import Icon from '../Icon.vue'
  import Notifications from '../../utils/notifications'
  import VueMarkdown from 'vue-markdown'

  export default {
    name: 'snippet-file-show',

    props: ['index', 'collapse'],

    components: {Card, CollapsibleControls, Icon, VueMarkdown},

    data() {
      return {
        clipboard: null,
        destroyed: false
      }
    },

    mounted() {
      HighlighterHelper.highlightMarkdownCodeBlocks(this)

      this.clipboard = new ClipboardJS(`#snippet-copy-${this.index}`)

      this.clipboard.on('success', e => {
        Notifications.toast.success('Copied!')
      }).on('error', e => {
        Notifications.toast.error('Unable to copy snippet.')
      })
    },

    updated() {
      if (!this.destroyed) {
        HighlighterHelper.highlightMarkdownCodeBlocks(this)
      }
    },

    beforeDestroy() {
      this.clipboard.destroy()
    },

    destroyed() {
      this.destroyed = true
    },

    computed: {
      linkRaw() {
        return '/api/v1/snippets/' + this.snippet.id + '/raw/' + this.snippetFile.id
      },

      snippet() {
        return this.$store.state.labelSnippets.active
      },

      snippetFile() {
        return this.$store.state.labelSnippets.active.snippetFiles[this.index]
      },

      isMarkdown() {
        return this.snippetFile.language === 'markdown'
      },

      hljsClass() {
        return HighlighterHelper.processHljsMode(this.snippetFile.language)
      }
    }
  }
</script>
