<template>
  <li>
    <a class="with-text-overflow" :class="{'is-active': active}" href="#" @click="loadSnippet">
      {{ snippet.description }}
    </a>
  </li>
</template>

<script>
  export default {
    props: ['snippet', 'active'],

    methods: {
      loadSnippet(e) {
        e.preventDefault()
        this.$store.commit('setActiveLabelSnippet', this.snippet)
        this.$store.commit('setSnippetMode', 'show')
      }
    }
  }
</script>
