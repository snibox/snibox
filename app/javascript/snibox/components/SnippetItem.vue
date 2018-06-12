<template>
  <li>
    <a :class="{'is-active': active}" href="#" @click="loadSnippet">
      <div class="level is-mobile">
        <div class="level-item">{{ snippet.title | clean }}</div>
      </div>
    </a>
  </li>
</template>

<script>
  import filters from '../mixins/filters'

  export default {
    mixins: [filters],

    props: ['snippet', 'active'],

    methods: {
      loadSnippet(e) {
        e.preventDefault()
        this.$store.commit('setActive', {data: this.snippet, entity: 'labelSnippets'})
        this.$store.commit('setSnippetMode', 'show')
      }
    }
  }
</script>
