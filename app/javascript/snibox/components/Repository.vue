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
  import _ from 'lodash'
  import Card from './Card.vue';
  import Labels from './Labels.vue'
  import Snippets from './Snippets.vue'
  import SnippetNew from './snippet/New.vue'
  import SnippetShow from './snippet/Show.vue'
  import SnippetEdit from './snippet/Edit.vue'
  import backend from '../api/backend'
  import factory from '../mixins/factory'

  export default {
    components: {Card, Labels, Snippets, SnippetNew, SnippetShow, SnippetEdit},

    mixins: [factory],

    computed: {
      showSnippet() {
        return this.$store.state.label_snippets.mode
      }
    },

    mounted() {
      setTimeout(() => {
        backend.data.get('/api/v1/data/default-state', response => {
          let that = this

          this.$store.dispatch('setActiveFromStorage', that.factory().snippet)
          this.$store.dispatch('setData', response.data)

          // set snippets in create mode
          if (_.isEmpty(that.$store.state.label_snippets.active)) {
            that.$store.commit('setSnippetMode', 'create')
            that.$store.commit('setActive', {data: that.factory().snippet, entity: 'label_snippets'})
          }

          // load codemirror modes
          let languages = this.$store.state.languages
          for (let mode in languages) {
            if (mode !== 'plain' && mode !== 'automatically') {
              require('codemirror/mode/' + mode + '/' + mode + '.js')
            }
          }
        })
      }, 250)

    }
  }
</script>
