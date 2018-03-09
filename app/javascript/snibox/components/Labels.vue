<template>

  <aside id="labels" class="menu animated fadeInUp" v-if="ready">
    <div class="menu-top">
      <div class="level is-mobile">
        <div class="level-left">
          <div class="level-item">
            <p class="menu-label">Labels</p>
          </div>
        </div>
      </div>
    </div>

    <div class="menu-content">
      <p class="menu-text" v-if="!data.length">No labels found.</p>
      <ul class="menu-list" v-if="data.length">
        <label-item v-for="item in data"
                    :key="item.id"
                    :label="item"
                    :active="item.id == activeId">
        </label-item>
      </ul>
    </div>
  </aside>

</template>

<script>
  import Card from './Card.vue'
  import LabelItem from './LabelItem.vue'
  import _ from 'lodash'

  export default {
    components: {Card, LabelItem},

    data() {
      return {
        entity: 'labels'
      }
    },

    computed: {
      data() {
        return this.$store.getters.labels
      },

      ready() {
        return this.$store.state.ready
      },

      activeId() {
        if (!_.isEmpty(this.$store.state.labels.active)) {
          return this.$store.state.labels.active.id
        }
        return null
      }
    },

  }
</script>
