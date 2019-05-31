<template>
  <a :id="`snippet-collapse-${index}`"
     class="card-header-icon"
     @click="collapseCardContent">
    <icon v-if="collapse"
          type="chevron-right"/>
    <icon v-if="!collapse"
          type="chevron-down"/>
  </a>
</template>

<script>
  import Icon from './Icon.vue'

  export default {
    name: 'collapsible-controls',

    props: ['index', 'id'],

    components: {Icon},

    data() {
      return {
        collapse: false
      }
    },

    methods: {
      collapseCardContent(e) {
        e.preventDefault()

        if (this.collapse) {
          this.$root.$el.querySelector(this.id + ' .card-content').classList.remove('collapsed')
        } else {
          this.$root.$el.querySelector(this.id + ' .card-content').classList.add('collapsed')
        }
        this.collapse = !this.collapse
      }
    }
  }
</script>
