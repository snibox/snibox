<template>
  <li>
    <a :class="{'is-active': active}" href="#" @click="labelClick">
      <div class="level is-mobile">
        <div class="level-left">
          <div class="level-item" v-if="label.name != 'untagged'">
            {{ label.name | clean}}
          </div>
          <div class="level-item" v-else>
            <i>{{ label.name | clean}}</i>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <span class="tag is-rounded">{{ label.taggings_count }}</span>
          </div>
        </div>
      </div>
    </a>
  </li>
</template>

<script>
  import filters from '../mixins/filters'
  import snippets_builder from '../mixins/snippets_builder'

  export default {
    mixins: [filters, snippets_builder],

    props: ['label', 'active'],

    methods: {
      labelClick(e) {
        e.preventDefault()
        this.$store.commit('setActive', {data: this.label, entity: 'labels'})
        let label_snippets = this.compute_label_snippets(this.$store, this.$store.state.snippets)
        this.$store.commit('setItems', {items: label_snippets, entity: 'label_snippets'})
      }
    }
  }
</script>
