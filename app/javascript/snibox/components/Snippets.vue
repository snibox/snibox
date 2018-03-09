<template>
  <aside id="snippets" class="menu animated fadeInUp" v-if="ready">
    <div class="menu-top">
      <div class="level is-mobile">
        <div class="level-left">
          <div class="level-item">
            <div class="menu-label">{{ title }}</div>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <a id="label-edit" class="button is-outlined is-small" v-if="labeled" @click="editLabel"><icon type="pencil"></icon><span>Edit</span></a>
          </div>
        </div>
      </div>
    </div>

    <div class="menu-content">
      <div class="menu-form animated fadeInDown" v-if="labeled" v-show="showLabelEdit">
        <form id="label-edit-form" action="/" @submit="updateLabel">
          <div class="field has-addons">
            <p class="control" style="width: 100%">
              <input id="label-title" class="input is-small" type="text" v-model.lazy="label.name">
            </p>
            <p class="control">
              <a id="label-save" class="button is-primary is-small" @click="updateLabel">Save</a>
            </p>
          </div>
        </form>
      </div>

      <p class="menu-text" v-show="!data.length">No snippets found.</p>
      <ul class="menu-list" v-if="data.length">
        <snippet-item v-for="item in data"
                      :key="item.id"
                      :snippet="item"
                      :active="item.id == activeId">
        </snippet-item>
      </ul>
    </div>
  </aside>
</template>

<script>
  import _ from 'lodash'
  import Card from './Card.vue'
  import SnippetItem from './SnippetItem.vue'
  import Icon from './Icon.vue'
  import backend from '../api/backend'

  export default {
    components: {Card, SnippetItem, Icon},

    data() {
      return {
        entity: 'label_snippets',
        showLabelEdit: false
      }
    },

    computed: {
      data() {
        return this.$store.getters.label_snippets
      },

      ready() {
        return this.$store.state.ready
      },

      // TODO: this activeId almost same with labels.vue
      activeId() {
        if (!_.isEmpty(this.$store.state.label_snippets.active)) {
          return this.$store.state.label_snippets.active.id
        }
        return null
      },

      title() {
        if (_.isEmpty(this.$store.state.labels.active)) {
          return 'All snippets'
        }

        return this.$store.state.labels.active.name
      },

      label() {
        return this.$store.state.labels.active
      },

      labeled() {
        return !_.isEmpty(this.$store.state.labels.active) && this.$store.state.labels.active.id
      }
    },

    methods: {
      updateLabel(e) {
        e.preventDefault()
        this.showLabelEdit = false
        backend.label.update(this)
      },

      editLabel(e) {
        e.preventDefault()
        this.showLabelEdit = !this.showLabelEdit

        setTimeout(() => {
          this.$el.querySelector('input[type=text]').focus()
        }, 100)
      }
    }
  }
</script>
