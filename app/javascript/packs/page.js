import Vue from 'vue/dist/vue.esm'
import Notifications from '../snibox/utils/notifications'

document.addEventListener('DOMContentLoaded', () => {
  window.navbar = new Vue({
    el: '#page-wrapper',

    mounted() {
      this.$el.style.display = 'block'
    },

    methods: {
      resetLocalStorage() {
        localStorage.removeItem('labels_active')
        localStorage.removeItem('label_snippets_active')
        Notifications.toast.success('Local storage flushed!')
      }
    }
  })
})
