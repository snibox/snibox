import Vue from 'vue/dist/vue.esm'
import store from '../snibox/store'
import factory from '../snibox/mixins/factory'
import logo from '../images/logo.png'

document.addEventListener('DOMContentLoaded', () => {
  window.navbar = new Vue({
    store,
    el: '#navbar',
    mixins: [factory],
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

        // TODO: refactor this
        let that = this
        if (typeof repository !== 'undefined') {
          that = repository
        }

        that.$store.commit('setActive', {data: this.factory().snippet, entity: 'labelSnippets'})
        that.$store.commit('setSnippetMode', 'create')

        if (redirect) {
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
