<template>
  <li>
    <a :class="{'is-active': active}" href="#" @click="labelClick">
      <div class="flex-container">
        <div class="with-text-overflow" v-if="label.name === ''">
          <i>untagged</i>
        </div>
        <div class="with-text-overflow" v-else>
          {{ label.name }}
        </div>
        <div class="tag is-rounded" style="margin-left: 0.25em">
          {{ label.snippets_count }}
        </div>
      </div>
    </a>
  </li>
</template>

<script>
  import SnippetsBuilder from '../mixins/snippets_builder'

  export default {
    mixins: [SnippetsBuilder],

    props: ['label', 'active'],

    methods: {
      labelClick(e) {
        e.preventDefault()
        this.$store.commit('setActiveLabel', this.label)
        let labelSnippets = this.computeLabelSnippets(this.$store, this.$store.state.snippets)
        this.$store.commit('setLabelSnippets', labelSnippets)
      }
    }
  }
</script>
