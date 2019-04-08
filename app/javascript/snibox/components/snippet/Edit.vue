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
        return 'Edit snippet&nbsp;<span class="is-italic">' + this.$store.state.labelSnippets.active.description + '</span>'
      }
    }
  }
</script>
