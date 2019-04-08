<template>

  <div id="show-snippet" class="animated">
    <header class="card-header" slot="card-header">
      <p class="card-header-title no-wrap" v-html="snippet.description"></p>

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

    <div
      v-for="(snippet_file, index) in snippet.snippet_files"
      :key="snippet_file.id">
      <snippet-file-show v-if="showSnippetFile == 'show'" :index="index"></snippet-file-show>
    </div>
  </div>

</template>

<script>
  import Backend from '../../api/backend'
  import Card from '../Card.vue'
  import Clipboard from 'clipboard'
  import * as HighlighterHelper from '../../utils/highlighter_helper'
  import Icon from '../Icon.vue'
  import Notifications from '../../utils/notifications'
  import VueMarkdown from 'vue-markdown'
  import SnippetFileShow from '../snippet_file/Show.vue'

  export default {
    name: 'snippet-show',

    props: ['index'],

    components: {Card, Icon, VueMarkdown, SnippetFileShow},

    computed: {
      showSnippetFile() {
        return this.$store.state.labelSnippets.mode
      },

      snippet() {
        return this.$store.state.labelSnippets.active
      },
    },

    methods: {
      editSnippet(e) {
        e.preventDefault()
        this.$store.commit('setSnippetMode', 'edit')
      },

      destroySnippet() {
        Notifications.confirm(
            "Are you really sure you want to delete snippet " +
            "<span class='has-text-weight-bold is-italic'>" +
            this.snippet.description +
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
