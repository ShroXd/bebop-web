<template>
  <div class="portal">

    <web-title></web-title>
  </div>
</template>

<script>
import WebTitle from './NewPart/WebTitle'
export default {
  name: 'Novel',
  components: {
    WebTitle
  },
  data () {
    return {
      page: 1
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/less/pageless/index.less";
</style>
