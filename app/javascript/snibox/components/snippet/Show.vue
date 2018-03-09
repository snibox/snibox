<template>

  <card id="show-snippet" class="animated fadeInDown">
    <header class="card-header" slot="card-header">
      <p class="card-header-title" v-if="!snippet.title">Select snippet</p>
      <p class="card-header-title" v-if="snippet.content">{{ snippet.title }}</p>
      <div class="card-header-title" v-if="snippet.content">
        <div class="field has-addons">
          <p class="control">
            <a id="snippet-raw" class="button is-outlined is-small" :href="linkRaw" target="_blank"><span>Raw</span></a>
          </p>
          <p class="control">
            <a id="snippet-copy" class="button is-outlined is-small" data-clipboard-target="#code">
              <icon class="icon-clippy" type="clippy"></icon>
              <span>Copy</span></a>
          </p>
        </div>
      </div>
      <div class="card-header-icon" v-if="snippet.content">
        <div class="block">
          <a id="snippet-edit" class="button is-outlined is-small" @click="editSnippet">
            <icon type="pencil"></icon>
            <span>Edit</span></a>
          <a id="snippet-delete" class="button is-outlined is-small is-danger" @click="destroySnippet">
            <icon type="trashcan"></icon>
            <span>Delete</span></a>
        </div>
      </div>
    </header>

    <div class="card-content" slot="card-content">
      <pre v-highlightjs="snippet.content" v-if="snippet.content"><code id="code"
                                                                        :class="snippet.language === 'automatically' ? '' : snippet.language "></code></pre>
      <p v-else>Nothing to show. Select a snippet to view or create new one!</p>
    </div>

  </card>

</template>

<script>
  import Clipboard from 'clipboard'
  import Card from '../Card.vue'
  import Icon from '../Icon.vue'
  import backend from '../../api/backend'

  export default {
    name: 'snippet-show',

    components: {Card, Icon},

    data() {
      return {
        clipboard: null
      }
    },

    mounted() {
      this.clipboard = new Clipboard('#snippet-copy')

      let that = this
      this.clipboard.on('success', e => {
        that.$toasted.success('Copied!')
      }).on('error', e => {
        that.$toasted.success('Unable to copy snippet.')
      });
    },

    beforeDestroy() {
      this.clipboard.destroy()
    },

    computed: {
      linkRaw() {
        return '/api/v1/snippets/' + this.snippet.id + '/raw'
      },
      snippet() {
        return this.$store.state.label_snippets.active
      },
    },

    methods: {
      editSnippet(e) {
        e.preventDefault()
        this.$store.commit('setSnippetMode', 'edit')
      },

      destroySnippet() {
        backend.snippet.destroy(this)
      }
    }
  }
</script>
