export default {
  computed: {
    data() {
      return this.$store.getters[this.entity]
    },

    activeId() {
      return this.$store.state[this.entity].active.id
    }
  }
}
