export default {
  computed: {
    readyFlag() {
      return this.$store.state.ready
    }
  }
}
