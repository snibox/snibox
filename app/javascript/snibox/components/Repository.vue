<template>
  <div id="app">
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
  import Card from './Card.vue';
  import Labels from './Labels.vue'
  import Snippets from './Snippets.vue'
  import SnippetNew from './snippet/New.vue'
  import SnippetShow from './snippet/Show.vue'
  import SnippetEdit from './snippet/Edit.vue'
  import Backend from '../api/backend'
  import factory from '../mixins/factory'

  export default {
    components: {Card, Labels, Snippets, SnippetNew, SnippetShow, SnippetEdit},

    mixins: [factory],

    computed: {
      showSnippet() {
        return this.$store.state.labelSnippets.mode
      }
    },

    mounted() {
      setTimeout(() => {
          Backend.data.get('/api/v1/data/default-state', response => {

          this.$store.dispatch('setDefaultActiveEntities')
          this.$store.dispatch('setData', response.data)

          // load codemirror modes
          let languages = this.$store.state.languages
          for (let mode in languages) {
            if (!['automatically', 'plain'].includes(mode)) {
              require('codemirror/mode/' + mode + '/' + mode + '.js')
            }
          }
        })
      }, 250)

    }
  }
</script>
