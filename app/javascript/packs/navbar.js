import Vue from 'vue/dist/vue.esm'
import store from '../snibox/store'
import factory from '../snibox/mixins/factory'
import logo from '../images/logo.png'
import SearchBox from '../snibox/components/SearchBox.vue'

document.addEventListener('DOMContentLoaded', () => {
  window.navbar = new Vue({
    store,

    el: '#navbar',

    mixins: [factory],

    components: {SearchBox},

    data() {
      return {
        logo
      }
    },

    mounted() {
      this.$el.style.display = 'flex'
    },

    methods: {
      addSnippet(e, redirect = false) {
        e.preventDefault()

        if (typeof repository !== 'undefined') {
          let snippet = this.factory().snippet
          snippet.label = repository.$store.state.labels.active
          repository.$store.commit('setActiveLabelSnippet', snippet)
          repository.$store.commit('setSnippetMode', 'create')
        }

        if (redirect) {
          localStorage.removeItem('label_snippets_active')
          window.location = '/'
        }
      }
    }
  })

  // navbar burger menu
  // @see: http://bulma.io/documentation/components/navbar/
  let $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0)
  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener('click', function () {
        let target = $el.dataset.target
        let $target = document.getElementById(target)
        $el.classList.toggle('is-active')
        $target.classList.toggle('is-active')
      })
    })
  }
})
