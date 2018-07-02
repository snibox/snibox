<template>

  <aside id="labels" class="menu animated" v-if="readyFlag">
    <div class="menu-top">
      <p class="menu-label">Labels</p>
    </div>

    <div class="menu-content">
      <p class="menu-text" v-if="!data.length">No labels found.</p>
      <ul class="menu-list" v-if="data.length">
        <label-item v-for="item in data"
                    :key="item.id"
                    :label="item"
                    :active="item.id === activeId">
        </label-item>
      </ul>
    </div>
  </aside>

</template>

<script>
  import Card from './Card.vue'
  import DataHelpers from '../mixins/data_helpers'
  import Flags from '../mixins/flags'
  import LabelItem from './LabelItem.vue'

  export default {
    components: {Card, LabelItem},

    mixins: [DataHelpers, Flags],

    data() {
      return {
        entity: 'labels'
      }
    }
  }
</script>
