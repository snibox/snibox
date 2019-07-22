<!-- based on https://github.com/vuejs/vuepress/blob/master/lib/default-theme/SearchBox.vue -->

<template>
  <div class="search-box">
    <p class="control has-icons-left" :class="{'has-icons-right': focused === false}">
      <input type="text" class="input search"
             @focus="focused = true"
             @blur="focused = false"
             @keyup.enter="go(focusIndex)"
             @keyup.up="onUp"
             @keyup.down="onDown"
             v-model="query"/>
      <span class="icon is-small is-left"><icon class="icon-search is-marginless" type="search"></icon></span>
      <span class="icon is-small is-right" v-if="focused === false"><span class="icon-text">/</span></span>
    </p>
    <ul class="menu-list suggestions"
        v-if="showSuggestions"
        @mouseleave="unfocus">
      <li v-for="(suggestion, i) in suggestions"
          :class="{ focused: i === focusIndex }"
          @mousedown="go(i)"
          @mouseenter="focus(i)">
        <a href="#" @click.prevent>
          <div class="flex-container">
            <div class="with-text-overflow"> {{ suggestion.title }} </div>
            <div v-for="label in suggestion.labels" class="tag is-rounded" :class="{'is-italic': label.name === ''}">
              {{ label.name === '' ? 'untagged' : label.name }}
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  import Fuse from 'fuse.js'
  import Icon from './Icon'
  import SnippetsBuilder from '../mixins/snippets_builder'

  const searchOptions = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      'description',
      'snippetFiles.content',
      'snippetFiles.title',
      'snippetFiles.language',
      'labels.name'
    ]
  }

  export default {
    components: { Icon },

    mixins: [SnippetsBuilder],

    data() {
      return {
        count: 5,
        query: '',
        focused: false,
        focusIndex: 0
      }
    },

    mounted() {
      document.addEventListener('keyup', e => {
        if ((e.key === '/' || e.key === '>') && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
          this.$el.querySelector('.search').focus()
        }

        if (e.key === 'Escape' && this.focused) {
          this.query = ''
          this.focusIndex = 0
          this.$el.querySelector('.search').blur()
        }
      }, false)
    },

    computed: {
      showSuggestions() {
        return (
            this.focused &&
            this.suggestions &&
            this.suggestions.length
        )
      },

      suggestions() {
        return this.query !== '' ?
            new Fuse(repository.$store.state.snippets, searchOptions).search(this.query).slice(0, this.count) : []
      }
    },

    methods: {
      onUp() {
        if (this.showSuggestions) {
          if (this.focusIndex > 0) {
            this.focusIndex--
          } else {
            this.focusIndex = this.suggestions.length - 1
          }
        }
      },

      onDown() {
        if (this.showSuggestions) {
          if (this.focusIndex < this.suggestions.length - 1) {
            this.focusIndex++
          } else {
            this.focusIndex = 0
          }
        }
      },

      go(i) {
        if (!this.showSuggestions) {
          return
        }
        repository.$store.commit('setActiveLabel', this.suggestions[i].labels[0])
        let labelSnippets = this.computeLabelSnippets(repository.$store, repository.$store.state.snippets)
        repository.$store.commit('setLabelSnippets', labelSnippets)
        repository.$store.commit('setActiveLabelSnippet', this.suggestions[i])
        repository.$store.commit('setSnippetMode', 'show')

        this.query = ''
        this.focusIndex = 0
      },

      focus(i) {
        this.focusIndex = i
      },

      unfocus() {
        this.focusIndex = -1
      }
    }
  }
</script>
