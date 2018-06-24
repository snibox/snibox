<template>
  <span v-html="icon" class="icon"></span>
</template>

<script>
  import octicons from 'octicons'

  export default {
    props: ['type'],

    computed: {
      icon() {
        return octicons[this.type].toSVG()
      }
    }
  }
</script>
