<template>
  <li>
    <a :class="{'is-active': active}" href="#" @click="loadSnippet">
      <div class="level is-mobile">
        <div class="level-item">{{ snippet.title | setMaxLength('long') }}</div>
      </div>
    </a>
  </li>
</template>

<script>
  import Filters from '../mixins/filters'

  export default {
    mixins: [Filters],

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
