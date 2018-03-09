<template>
  <span v-html="icon" class="icon"></span>
</template>

<script>
  import octicons from 'octicons'

  export default {
    props: ['type'],

    data() {
      return {
        icon: octicons[this.type].toSVG(),
      }
    }
  }
</script>
