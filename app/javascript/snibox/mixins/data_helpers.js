export default {
  computed: {
    data() {
      return this.$store.getters[this.entity]
    },

    activeId() {
      if (typeof (this.$store.state[this.entity].active) === 'undefined') {
        return 'Untagged'
      }
      return this.$store.state[this.entity].active.id
    }
  }
}
