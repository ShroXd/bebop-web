<template>
  <div class="content-card">
    <div class="content-card__title">
      {{ name }}
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ContentCard',
  props: {
    name: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
@import "../assets/less/componentsless/content-card";
</style>
