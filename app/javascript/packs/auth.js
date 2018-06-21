import Vue from 'vue/dist/vue.esm'
import VueToasted from 'vue-toasted'

Vue.use(VueToasted, {
  duration: 3000,
  position: 'bottom-right'
})

document.addEventListener('DOMContentLoaded', () => {
  window.navbar = new Vue({
    el: '#auth-wrapper',
    mounted() {
      this.$el.style.display = 'block'
    },
    methods: {
      resetLocalStorage() {
        localStorage.removeItem('labels_active')
        localStorage.removeItem('label_snippets_active')
        this.$toasted.success('Local storage flushed!')
      }
    }
  })
})
