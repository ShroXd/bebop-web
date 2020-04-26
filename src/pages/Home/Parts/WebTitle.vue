<template>
  <div class="head-component">
    <div class="web-title">接 头 霸 王</div>
    <div class="des">凯露世界第一可爱！</div>

    <v-img src="https://bebopfzj.oss-cn-hangzhou.aliyuncs.com/uPic/2020-04-26-nUvAU1.jpg"
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
      window.open('https://www.bebopser.com/', '_blank')
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/less/pageless/index.less";
</style>
