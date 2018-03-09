import Vue from 'vue/dist/vue.esm'

document.addEventListener('DOMContentLoaded', () => {
  window.navbar = new Vue({
    el: '#auth-wrapper',
    mounted() {
      this.$el.style.display = 'block'
    }
  })
})
