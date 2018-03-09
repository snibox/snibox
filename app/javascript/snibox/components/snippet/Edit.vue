<template>
  <snippet-form :title="title" :action="action"></snippet-form>
</template>

<script>
  import SnippetForm from './Form.vue'

  export default {
    name: 'snippet-edit',

    components: {SnippetForm},

    data() {
      return {
        action: 'update'
      }
    },

    computed: {
      title() {
        return 'Edit snippet ' + this.$store.state.label_snippets.active.title
      }
    }
  }
</script>
