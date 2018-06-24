<template>
  <aside id="snippets" class="menu animated fadeInUp" v-if="readyFlag">
    <div class="menu-top">
      <div class="level is-mobile">
        <div class="level-left">
          <div class="level-item">
            <div class="menu-label">{{ title | setMaxLength('short') }}</div>
          </div>
        </div>
        <div class="level-right" v-if="hasLabel">
          <div class="level-item">
            <a id="label-edit" class="button is-outlined is-small" @click="editLabel">
              <icon :type="editIconType"></icon><span>{{ editTitle }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="menu-content">
      <div class="menu-form animated fadeInDown" v-if="hasLabel" v-show="showLabelEdit">
        <form id="label-edit-form" action="/" @submit="updateLabel">
          <div class="field has-addons">
            <p class="control" style="width: 100%">
              <input id="label-title" class="input is-small" type="text" placeholder="Label" v-model="labelName">
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
                      :active="item.id === activeId">
        </snippet-item>
      </ul>
    </div>
  </aside>
</template>

<script>
  import _ from 'lodash'
  import Backend from '../api/backend'
  import Card from './Card.vue'
  import DataHelpers from '../mixins/data_helpers'
  import Filters from '../mixins/filters'
  import Flags from '../mixins/flags'
  import Icon from './Icon.vue'
  import SnippetItem from './SnippetItem.vue'

  export default {
    components: {Card, Icon, SnippetItem},

    mixins: [DataHelpers, Filters, Flags],

    data() {
      return {
        entity: 'labelSnippets',
        showLabelEdit: false
      }
    },

    computed: {
      editIconType() {
        return this.showLabelEdit ? 'arrow-left' : 'pencil'
      },

      editTitle() {
        return this.showLabelEdit ? 'Cancel' : 'Edit'
      },

      labelName: {
        get() {
          return this.$store.state.labels.edit.name
        },

        set(value) {
          this.$store.commit('setLabelEditName', value)
        }
      },

      title() {
        if (this.$store.state.flags.renderAllSnippets) {
          return 'All snippets'
        }

        if (_.isEmpty(this.$store.state.labels.active.name)) {
          return 'Untagged'
        }

        return this.$store.state.labels.active.name
      },

      label() {
        return this.$store.state.labels.active
      },

      hasLabel() {
        return this.$store.state.labels.active.id
      }
    },

    methods: {
      updateLabel(e) {
        e.preventDefault()
        Backend.label.update(this)
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
