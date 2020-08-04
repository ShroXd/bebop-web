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
  @import "../assets/less/color";

  .content-card {
    border: 1px solid var(--sys_border);
    border-top: 3px solid var(--sys_main);
    background-color: var(--sys_page_background);
  }

  .content-card__title {
    border-bottom: 1px solid var(--sys_border);
    height: 2.6rem;
    padding-left: 1.4rem;
    background-color: var(--sys_page_background);
    font-size: 1.1rem;
    line-height: 2.6rem;
    color: var(--sys_main);
  }
</style>
