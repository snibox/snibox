<template>
  <div id="app" :class="{ ready: readyFlag }">
    <div class="sidebar sidebar-labels">
      <labels ref="labels"></labels>
    </div>

    <div class="sidebar sidebar-snippets">
      <snippets ref="snippets"></snippets>
    </div>

    <div class="main">
      <snippet-show v-if="showSnippet == 'show'"></snippet-show>
      <snippet-edit v-if="showSnippet == 'edit'"></snippet-edit>
      <snippet-new v-if="showSnippet == 'create'"></snippet-new>
    </div>
  </div>
</template>

<script>
  import Backend from '../api/backend'
  import Card from './Card.vue'
  import Factory from '../mixins/factory'
  import Flags from '../mixins/flags'
  import Labels from './Labels.vue'
  import Snippets from './Snippets.vue'
  import SnippetEdit from './snippet/Edit.vue'
  import SnippetNew from './snippet/New.vue'
  import SnippetShow from './snippet/Show.vue'

  export default {
    components: {Card, Labels, Snippets, SnippetEdit, SnippetNew, SnippetShow},

    mixins: [Factory, Flags],

    computed: {
      showSnippet() {
        return this.$store.state.labelSnippets.mode
      },

      snippet() {
        return this.$store.state.labelSnippets.active
      }
    },

    mounted() {
      setTimeout(() => {
        Backend.data.get('/api/v1/data/default-state', response => {
          this.$store.dispatch('setData', response.data)
          this.$store.dispatch('setDefaultActiveEntities')
        })
      }, 250)
    }
  }
</script>
