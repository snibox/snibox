export default {
  computed: {
    readyFlag() {
      return this.$store.state.flags.ready
    }
  }
}
