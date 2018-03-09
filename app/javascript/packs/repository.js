import Vue from 'vue/dist/vue.esm'
import VueHighlightJS from 'vue-highlightjs'
import VueToasted from 'vue-toasted'
import store from '../snibox/store'
import Repository from '../snibox/components/Repository.vue'

Vue.use(VueHighlightJS)
Vue.use(VueToasted, {
  duration: 3000,
  position: 'bottom-right'
})

document.addEventListener('DOMContentLoaded', () => {
  window.repository = new Vue({
    store,
    el: '#app',
    template: '<Repository/>',
    components: { Repository }
  })
})
