<template>
  <div class="card-header-icon">
    <a
      :id="`snippet-collapse-${index}`"
      class="button is-small"
      @click="collapseCardContent">
      <icon
        v-if="collapse"
        type="fold-down">
      </icon>
      <icon
        v-if="!collapse"
        type="fold-up">
      </icon>
      <span>Collapse</span>
    </a>
  </div>
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
        e.preventDefault();

        if (this.collapse) {
          this.$root.$el.querySelector(this.id + ' .card-content').classList.remove('collapse');
        } else {
          this.$root.$el.querySelector(this.id + ' .card-content').classList.add('collapse');
        }
        this.collapse = !this.collapse
      }
    }
  };
</script>
