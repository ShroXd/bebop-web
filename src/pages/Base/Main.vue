<template>
  <div class="main">
    <head-bar></head-bar>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from './Header'
import HeadBar from '../Home/Parts/HeadBar'

export default {
  name: 'Main',
  components: {
    Header,
    HeadBar
  }
}

</script>

<style lang="less" scoped>
  @import "../../assets/less/pageless/main.less";
</style>
