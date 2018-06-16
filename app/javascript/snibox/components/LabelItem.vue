<template>
  <li>
    <a :class="{'is-active': active}" href="#" @click="labelClick">
      <div class="level is-mobile">
        <div class="level-left">
          <div class="level-item" v-if="label.name === ''">
            <i>untagged</i>
          </div>
          <div class="level-item" v-else>
            {{ label.name | setMaxLength('medium') }}
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <span class="tag is-rounded">{{ label.snippets_count }}</span>
          </div>
        </div>
      </div>
    </a>
  </li>
</template>

<script>
  import Filters from '../mixins/filters'
  import SnippetsBuilder from '../mixins/snippets_builder'

  export default {
    mixins: [Filters, SnippetsBuilder],

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
