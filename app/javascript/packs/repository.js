import Vue from 'vue/dist/vue.esm'
import VueHighlightJS from 'vue-highlightjs'
import store from '../snibox/store'
import Repository from '../snibox/components/Repository.vue'

Vue.use(VueHighlightJS)

document.addEventListener('DOMContentLoaded', () => {
  window.repository = new Vue({
    store,
    el: '#app',
    template: '<Repository/>',
    components: {Repository}
  })
})
