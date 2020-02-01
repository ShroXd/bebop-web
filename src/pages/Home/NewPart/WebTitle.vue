<template>
  <div class="head-component">
    <div class="web-title">蛟龍情義點交易會</div>
    <div class="des">技术信息以及其他乱七八糟的数据聚合</div>

    <v-img :src="require('../../../assets/img/qiezi_dai_kou_zhao.jpg')"
           height="100"
           width="100"></v-img>
    <div class="blog-url"
         @click="JumpToBlog()">Find me on my blog</div>
  </div>
</template>

<script>
export default {
  name: 'WebTitle',
  methods: {
    JumpToBlog () {
      window.open('http://bebopser.com/', '_blank')
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/less/pageless/index.less";
</style>
