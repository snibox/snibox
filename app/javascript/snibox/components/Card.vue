<template>
  <div :id="id" class="card">
    <slot name="card-header"></slot>
    <slot name="card-content"></slot>
    <slot name="menu"></slot>
    <slot name="card-footer"></slot>
  </div>
</template>

<script>
  export default {
    props: ['id']
  }
</script>
