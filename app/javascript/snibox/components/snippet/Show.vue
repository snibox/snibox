<template>

  <div id="show-snippet" class="animated">
    <header class="card-header" slot="card-header">
      <div class="card-header-title with-text-overflow">
        {{ snippet.id ? snippet.title : 'Select snippet'}}
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

    <div class="card-description" v-if="snippet.id">
      <!-- TODO: experimental. Improve this -->
      <p class="card-header-description no-wrap" v-html="snippet.description"></p>
      <br v-if="snippet.description"/>

      <div class='show-snippet-labels' v-if="snippet.labels[0].snippetsCount !== 0">
        <h4>Labels</h4>
        <div v-for="snippetLabel in snippet.labels"> {{snippetLabel.name}} </div>
      </div>
      <br v-if="snippet.labels[0].snippetsCount !== 0"/>

      <p class="is-italic">Files ({{ snippet.snippetFilesCount }}) </p>
    </div>
    <p class="card-description no-wrap" v-else>
      Nothing to show. Select a snippet to view or create the new one!
    </p>

    <div v-if="snippet.id"
      v-for="(snippetFile, index) in snippet.snippetFiles"
      :key="snippetFile.id">
      <snippet-file-show v-if="showSnippetFile == 'show'" :index="index"></snippet-file-show>
    </div>
  </div>

</template>

<script>
  import Backend from '../../api/backend'
  import Card from '../Card.vue'
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
            this.snippet.title +
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
