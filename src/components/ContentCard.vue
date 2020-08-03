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
  .content-card {
    border: 1px solid #d8d8d8;
    border-top: 3px solid #1966c0;
    /*border-radius: 6px;*/
    background-color: white;
  }

  .content-card__title {
    border-bottom: 1px solid #d8d8d8;
    height: 2.6rem;
    padding-left: 1.4rem;
    background-color: #f7f7f7;
    font-size: 1.1rem;
    line-height: 2.6rem;
    color: #1966c0;
  }
</style>
